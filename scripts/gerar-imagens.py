"""Gera favicons e a imagem de prévia de link (Open Graph) a partir do site.

Precisa do site rodando localmente (para carregar as fontes):
    python -m http.server 8000          # em outro terminal, na raiz do repo
    pip install -r scripts/requirements.txt && playwright install chromium
    python scripts/gerar-imagens.py http://localhost:8000

Saídas em assets/img/: og.jpg (1200x630), icon-512.png, icon-192.png,
apple-touch-icon.png e favicon.ico na raiz.
"""
import random
import re
import sys
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright

RAIZ = Path(__file__).resolve().parent.parent
IMG = RAIZ / "assets" / "img"
BASE = sys.argv[1].rstrip("/") if len(sys.argv) > 1 else "http://localhost:8000"
D = re.search(r' d="([^"]+)"', (IMG / "icon.svg").read_text()).group(1)
random.seed(4)


def pote(x, cor, c2, c3, h=150, w=110):
    nivel = h * 0.62
    graos = "".join(
        f'<ellipse cx="{random.uniform(6, w - 6):.1f}" cy="{random.uniform(-nivel + 6, -6):.1f}" '
        f'rx="{random.uniform(4, 6.5):.1f}" ry="{random.uniform(2.6, 4):.1f}" '
        f'transform="rotate({random.randint(-60, 60)})" fill="{random.choice([c2, c3])}"/>'
        for _ in range(int(w * nivel / 50))
    )
    cid = f"c{x}_{h}_{random.randint(0, 9999)}"
    return f"""<g transform="translate({x},0)">
<clipPath id="{cid}"><rect x="3" y="{-nivel}" width="{w - 6}" height="{nivel - 3}" rx="17"/></clipPath>
<rect x="0" y="{-h}" width="{w}" height="{h}" rx="20" fill="rgba(238,240,216,.10)"/>
<g clip-path="url(#{cid})"><rect x="3" y="{-nivel}" width="{w - 6}" height="{nivel}" fill="{cor}"/>{graos}</g>
<rect x="0" y="{-h}" width="{w}" height="{h}" rx="20" fill="none" stroke="rgba(238,240,216,.45)" stroke-width="2.5"/>
<path d="M14 {-h + 18} q-5 {h * .35} 2 {h * .7}" stroke="rgba(255,255,255,.35)" stroke-width="6" fill="none" stroke-linecap="round"/>
<rect x="12" y="{-h - 22}" width="{w - 24}" height="24" rx="7" fill="#b9975b"/></g>"""


ESQ = pote(0, "#d8bd86", "#c39b5a", "#ecdcb0") + pote(130, "#8f5f36", "#b07a4e", "#6f4a28", 120, 100) + pote(250, "#6f7f3c", "#8a9a50", "#55632c", 165, 105)
DIR = pote(0, "#e3d37a", "#cdbb58", "#f1e7a4", 130, 100) + pote(120, "#b2432a", "#cc5e3c", "#86301e", 160, 110) + pote(250, "#4e4a45", "#6d675f", "#34302b", 120, 95)

OG = f"""<!DOCTYPE html><html><head><meta charset="utf-8"><base href="{BASE}/"><link rel="stylesheet" href="assets/css/site.css"><style>
body{{margin:0;width:1200px;height:630px;overflow:hidden;position:relative;color:#eef0d8;font-family:var(--sans);
background:radial-gradient(520px 420px at 50% 42%,rgba(166,192,122,.2),transparent 70%),radial-gradient(900px 300px at 50% 120%,rgba(185,151,91,.18),transparent 70%),#223018}}
.c{{position:absolute;left:0;right:0;top:58px;text-align:center}} .i{{width:190px;margin:0 auto}}
h1{{font-family:var(--serif);font-weight:300;font-size:86px;line-height:1;letter-spacing:-.025em;margin-top:22px;font-variation-settings:"opsz" 144,"SOFT" 100}}
.s{{font-family:var(--serif);font-style:italic;color:#dcc28a;font-size:36px;margin-top:14px;font-variation-settings:"opsz" 72,"SOFT" 100,"WONK" 1}}
.l{{margin-top:26px;font-size:22px;color:rgba(238,240,216,.75)}}
.p{{position:absolute;bottom:0;height:200px;width:390px}} .p svg{{position:absolute;left:0;bottom:22px;overflow:visible}}
.p::after{{content:"";position:absolute;left:-20px;right:-20px;bottom:0;height:22px;background:linear-gradient(#a7834f,#8a6a3e 55%,#6f5330)}}
</style></head><body>
<div class="p" style="left:-30px"><svg width="400" height="10"><g transform="translate(40,10)">{ESQ}</g></svg></div>
<div class="p" style="right:-40px"><svg width="400" height="10"><g transform="translate(20,10)">{DIR}</g></svg></div>
<div class="c"><div class="i"><svg viewBox="40 90 1690 1610"><path fill="#eef0d8" fill-rule="evenodd" d="{D}"/></svg></div>
<h1>Empório Maranata</h1><p class="s">Mais que produtos, um propósito de cuidado.</p>
<p class="l">Naturais, granel e suplementos em Joinville</p></div></body></html>"""

FAV = (IMG / "favicon.svg").read_text().replace("<svg ", '<svg width="100%" height="100%" ')

with sync_playwright() as p:
    nav = p.chromium.launch()
    pg = nav.new_page(viewport={"width": 1200, "height": 630})
    pg.goto(f"{BASE}/404.html")  # mesma origem do site, para as fontes carregarem
    pg.set_content(OG)
    pg.evaluate("document.fonts.ready")
    pg.wait_for_timeout(500)
    pg.screenshot(path=str(IMG / "og.jpg"), type="jpeg", quality=88)
    for tam, nome, fundo in [(512, "icon-512.png", "transparent"), (192, "icon-192.png", "transparent"),
                             (180, "apple-touch-icon.png", "#223018"), (48, "_fav48.png", "transparent")]:
        pg = nav.new_page(viewport={"width": tam, "height": tam})
        pg.set_content(f'<body style="margin:0;background:{fundo}"><div style="width:{tam}px;height:{tam}px">{FAV}</div></body>')
        pg.screenshot(path=str(IMG / nome), omit_background=True)
    nav.close()

Image.open(IMG / "_fav48.png").save(RAIZ / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
(IMG / "_fav48.png").unlink()
print("imagens geradas em", IMG)
