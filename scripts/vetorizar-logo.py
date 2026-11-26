"""Vetoriza a logo do Empório Maranata (PNG claro sobre fundo escuro) em SVG.

Gera dois arquivos:
  - icone-partes.svg  : o símbolo (mãos + broto) separado em partes, usado na
                        animação da abertura (aro, mão esquerda, mão direita,
                        folhas e caule recebem classes próprias)
  - logo-completa.svg : a logo inteira (símbolo, nome, slogan)

Uso:
    pip install -r scripts/requirements.txt
    python scripts/vetorizar-logo.py caminho/da/logo.png saida/
"""
import json
import sys
from pathlib import Path

import numpy as np
import potrace
from PIL import Image, ImageFilter

LIMIAR = 150  # 0-255: acima disso o pixel é "tinta" (creme)


def tracar(img, caixa, escala, circulo=None):
    recorte = img.crop(caixa)
    recorte = recorte.resize((recorte.width * escala, recorte.height * escala), Image.LANCZOS)
    recorte = recorte.filter(ImageFilter.GaussianBlur(1.2))
    tinta = np.asarray(recorte) > LIMIAR
    if circulo:  # descarta o que estiver fora do aro do símbolo
        cx, cy, r = circulo
        yy, xx = np.mgrid[0:tinta.shape[0], 0:tinta.shape[1]]
        tinta[(xx - cx) ** 2 + (yy - cy) ** 2 > r ** 2] = False
    # o potracer inverte o bitmap internamente; passamos o negativo
    curvas = potrace.Bitmap(~tinta).trace(turdsize=40, alphamax=1.0, opticurve=True, opttolerance=0.3)
    caminhos = []
    for c in curvas:
        s = c.start_point
        d = [f"M{s.x:.0f},{s.y:.0f}"]
        for seg in c.segments:
            if seg.is_corner:
                d.append(f"L{seg.c.x:.0f},{seg.c.y:.0f}L{seg.end_point.x:.0f},{seg.end_point.y:.0f}")
            else:
                d.append(f"C{seg.c1.x:.0f},{seg.c1.y:.0f} {seg.c2.x:.0f},{seg.c2.y:.0f} {seg.end_point.x:.0f},{seg.end_point.y:.0f}")
        caminhos.append("".join(d) + "Z")
    return caminhos, tinta.shape[1], tinta.shape[0]


def main(origem, destino):
    destino = Path(destino)
    destino.mkdir(parents=True, exist_ok=True)
    img = Image.open(origem).convert("L")

    # símbolo: recorte do círculo no topo da logo 640x640, ampliado 6x
    partes, w, h = tracar(img, (170, -6, 470, 284), 6, circulo=(900, 918, 846))
    partes = [p for p in partes if len(p) > 300]  # remove sujeira (acento do texto abaixo)
    nomes = ["ring", "hand-l", "hand-r", "leaf-r", "leaf-l", "sprout"]
    corpo = "".join(
        f'<path{" pathLength=\"1\"" if n in ("ring", "hand-l", "hand-r") else ""} class="ic-{n}" d="{p}"/>'
        for n, p in zip(nomes, partes)
    )
    (destino / "icone-partes.svg").write_text(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="40 90 1690 1610" fill="currentColor" fill-rule="evenodd">{corpo}</svg>'
    )

    tudo, w, h = tracar(img, (0, 0, 640, 640), 4)
    (destino / "logo-completa.svg").write_text(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}"><path fill="currentColor" fill-rule="evenodd" d="{" ".join(tudo)}"/></svg>'
    )
    print(json.dumps({"partes_do_simbolo": len(partes), "caminhos_logo": len(tudo)}))


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2])
