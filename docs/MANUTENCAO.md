# Manual de manutenção

Guia para quem for atualizar o site no dia a dia. Toda alteração enviada para a branch `main` é publicada sozinha pela Vercel em menos de um minuto.

## Sumário
- [Produtos da prateleira](#produtos-da-prateleira)
- [Horário, WhatsApp e endereço](#horário-whatsapp-e-endereço)
- [Foto da Patricia](#foto-da-patricia)
- [Feed do Instagram](#feed-do-instagram)
- [Prévia de link (WhatsApp, Facebook)](#prévia-de-link-whatsapp-facebook)
- [Domínio próprio](#domínio-próprio)
- [Logo e imagens geradas](#logo-e-imagens-geradas)
- [Antes de publicar](#antes-de-publicar)

## Produtos da prateleira

Tudo fica em [`assets/js/produtos.js`](../assets/js/produtos.js). Cada categoria vira uma prateleira, e cada item vira um pote:

```js
{ nome: 'Castanha de caju', tipo: 'castanha', cor: '#e5c993', selos: ['vegano'] }
```

| Campo | O que é |
|---|---|
| `nome` | Texto do rótulo. É também o que vai na mensagem do WhatsApp. |
| `tipo` | Desenho do conteúdo: `grao`, `po`, `semente`, `castanha`, `folha`, `capsula`, `liquido` ou `pedaco` |
| `cor` | Cor principal do conteúdo (hexadecimal). As sombras e os brilhos são calculados a partir dela. |
| `selos` | Opcional: `sem glúten`, `sem lactose`, `sem açúcar`, `integral`, `vegano` |

O site não mostra preços de propósito: a lista vai para o WhatsApp e a loja responde com disponibilidade e valores.

## Horário, WhatsApp e endereço

O objeto `LOJA`, no fim de `assets/js/produtos.js`, guarda o WhatsApp, o Instagram, o endereço e o horário. O horário é usado no selo "Aberto agora" e no destaque do dia de hoje. É escrito em minutos desde a meia-noite, no fuso de Joinville:

```js
1: [[510, 720], [840, 1110]],   // segunda: 08:30–12:00 e 14:00–18:30
```

Se o horário mudar, atualize também a tabela da seção **Visite** e o bloco `openingHoursSpecification` dos dados estruturados, ambos em `index.html`. O Google usa esse bloco.

## Foto da Patricia

Substitua `assets/img/patricia.jpg` e `assets/img/patricia.webp` mantendo a proporção 2:3 (vertical). Se os arquivos forem removidos, a moldura mostra a logo no lugar.

## Feed do Instagram

A seção **Últimas do Instagram** consulta a função [`api/instagram.js`](../api/instagram.js). Sem configuração, ela responde `204` e o site mostra os vídeos da loja. Para exibir as três últimas publicações, crie **uma** destas variáveis em Vercel → Project → Settings → Environment Variables e faça um redeploy:

| Variável | Como obter | Observação |
|---|---|---|
| `BEHOLD_FEED_URL` | Conta grátis em [behold.so](https://behold.so), conectar o Instagram, criar feed **JSON** | Recomendado: renova o acesso sozinho |
| `IG_ACCESS_TOKEN` | App no [Meta for Developers](https://developers.facebook.com/) com *Instagram API with Instagram Login*, token de longa duração | Vale 60 dias; precisa renovar |

A resposta fica 30 minutos em cache na borda da Vercel, então o Instagram não é consultado a cada visita.

## Prévia de link (WhatsApp, Facebook)

A imagem é `assets/img/og.jpg` (1200×630). O WhatsApp guarda a prévia em cache: ao trocar a imagem, mude o `?v=2` das tags `og:image` e `twitter:image` em `index.html` (para `?v=3`, e assim por diante).

## Domínio próprio

1. Registre `emporiomaranata.com.br` no [Registro.br](https://registro.br).
2. Em Vercel → Project → Domains, adicione o domínio e configure o DNS como a Vercel indicar.
3. Troque `https://emporiomaranata.vercel.app` por `https://emporiomaranata.com.br` em `index.html`, `robots.txt` e `sitemap.xml`.
4. Envie o `sitemap.xml` no [Google Search Console](https://search.google.com/search-console) e coloque o link no Perfil da Empresa no Google.

## Logo e imagens geradas

Os arquivos de `assets/img` vieram de dois scripts em [`scripts/`](../scripts):

```bash
pip install -r scripts/requirements.txt && playwright install chromium

# logo PNG -> SVG (símbolo em partes para a animação + logo completa)
python scripts/vetorizar-logo.py logo.png saida/

# favicons e banner de prévia (com o site rodando em http://localhost:8000)
python -m http.server 8000 &
python scripts/gerar-imagens.py http://localhost:8000
```

O símbolo animado da abertura está embutido em `index.html`, dentro de `.simbolo`. Para trocar, cole o conteúdo de `icone-partes.svg` no lugar.

## Antes de publicar

```bash
npm run validar     # valida o HTML e a sintaxe do JavaScript (o mesmo que o GitHub Actions roda)
npm run serve       # abre o site em http://localhost:8000
```
