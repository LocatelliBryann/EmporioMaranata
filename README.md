<div align="center">

<img src="assets/img/og.jpg" alt="Empório Maranata: mais que produtos, um propósito de cuidado" width="100%">

# Empório Maranata

**Site da loja de produtos naturais do Boehmerwald, em Joinville/SC**

[**emporiomaranata.vercel.app**](https://emporiomaranata.vercel.app)

![Lighthouse Performance](https://img.shields.io/badge/performance-99-2f7d32?style=flat-square&logo=lighthouse&logoColor=white)
![Lighthouse Acessibilidade](https://img.shields.io/badge/acessibilidade-100-2f7d32?style=flat-square&logo=lighthouse&logoColor=white)
![Lighthouse Boas práticas](https://img.shields.io/badge/boas%20pr%C3%A1ticas-100-2f7d32?style=flat-square&logo=lighthouse&logoColor=white)
![Lighthouse SEO](https://img.shields.io/badge/SEO-100-2f7d32?style=flat-square&logo=lighthouse&logoColor=white)
<br>
![HTML5](https://img.shields.io/badge/HTML5-223018?style=flat-square&logo=html5&logoColor=eef0d8)
![CSS3](https://img.shields.io/badge/CSS3-223018?style=flat-square&logo=css3&logoColor=eef0d8)
![JavaScript](https://img.shields.io/badge/JavaScript-223018?style=flat-square&logo=javascript&logoColor=eef0d8)
![Vercel](https://img.shields.io/badge/Vercel-223018?style=flat-square&logo=vercel&logoColor=eef0d8)
![Zero dependências](https://img.shields.io/badge/depend%C3%AAncias-0-b9975b?style=flat-square)
[![Qualidade](https://github.com/LocatelliBryann/EmporioMaranata/actions/workflows/qualidade.yml/badge.svg)](https://github.com/LocatelliBryann/EmporioMaranata/actions/workflows/qualidade.yml)

</div>

<br>

<p align="center">
  <img src="docs/img/abertura.gif" alt="Abertura do site: a logo se desenha na tela enquanto o título sobe" width="820">
</p>

## Sobre o projeto

O Empório Maranata é uma loja de bairro com granel, castanhas, temperos, suplementos e opções sem glúten, sem lactose e sem açúcar. A dona é nutricionista. Com as vendas em queda e um Instagram parado, a loja precisava de um endereço próprio na internet: algo que aparecesse no Google, passasse a mesma confiança do balcão e transformasse visita em pedido.

O site resolve isso com uma ideia simples: **a prateleira da loja vira o catálogo**. Cada produto é um pote de vidro desenhado; o cliente toca nos potes, monta uma lista e envia pronta para o WhatsApp da loja. Sem cadastro, sem carrinho, sem preços desatualizados. A loja responde com disponibilidade e valores, como já fazia no balcão.

## Destaques

<table>
  <tr>
    <td width="50%"><img src="docs/img/desktop-prateleira.jpg" alt="Prateleira de potes com o catálogo"></td>
    <td width="50%"><img src="docs/img/desktop-granel.jpg" alt="Pote de granel que enche com a rolagem e balança marcando os gramas"></td>
  </tr>
  <tr>
    <td><b>Prateleira de potes.</b> 40 potes gerados em SVG a partir de um arquivo de dados. O conteúdo de cada um (grão, pó, semente, castanha, erva, cápsula, líquido) é uma textura procedural com tons calculados a partir de uma única cor.</td>
    <td><b>Granel pela rolagem.</b> Seção fixa em que o pote enche, a tampa abre, os grãos caem e a balança marca 100 g, 250 g, 500 g e 1 kg conforme o usuário rola a página.</td>
  </tr>
  <tr>
    <td width="50%"><img src="docs/img/desktop-nutri.jpg" alt="Seção da nutricionista com foto em moldura de arco"></td>
    <td width="50%"><img src="docs/img/desktop-visite.jpg" alt="Seção de visita com horário ao vivo e mapa"></td>
  </tr>
  <tr>
    <td><b>Quem cuida da loja.</b> Apresentação da nutricionista em moldura de arco, como a janela de um empório.</td>
    <td><b>Horário ao vivo.</b> "Aberto agora, até as 18:30" e o dia de hoje destacado, calculados no fuso de Joinville. O mapa só carrega quando o usuário pede.</td>
  </tr>
</table>

<p align="center">
  <img src="docs/img/mobile.jpg" alt="Versão para celular: abertura, prateleira com itens marcados e lista de pedido" width="820">
</p>

### Funcionalidades
- **Lista de pedido pelo WhatsApp:** itens, quantidades e observações viram uma mensagem pronta (`wa.me`). A lista fica salva no aparelho (`localStorage`).
- **Logo animada:** a logo original foi vetorizada a partir de um PNG de 640 px. O símbolo é dividido em partes (aro, mãos, caule, folhas) que se desenham e brotam na abertura.
- **Feed do Instagram:** função serverless que busca as três últimas publicações (Behold ou Instagram API), com cache na borda. Sem configuração, mostra os vídeos da própria loja.
- **SEO local:** dados estruturados `Store` com endereço, telefone e horário, Open Graph com banner próprio, sitemap e canonical.
- **Página 404** no tom da marca: *"Este pote está vazio."*

## Design

A identidade parte da logo existente (mãos acolhendo um broto, em creme sobre verde) e de um objeto que todo mundo reconhece num empório: **o pote de vidro do granel**.

| | Cor | Uso |
|---|---|---|
| <img src="docs/img/cores/223018.svg" width="22"> | `#223018` Mata | Fundo da logo; seções escuras, botões |
| <img src="docs/img/cores/eef0d8.svg" width="22"> | `#EEF0D8` Creme do broto | Fundo claro, tirado do próprio símbolo |
| <img src="docs/img/cores/b9975b.svg" width="22"> | `#B9975B` Ouro velho | Tampas dos potes, detalhes |
| <img src="docs/img/cores/dcc28a.svg" width="22"> | `#DCC28A` Ouro claro | Segunda linha do título, assinatura |
| <img src="docs/img/cores/a6c07a.svg" width="22"> | `#A6C07A` Broto | Tampa do pote selecionado, acentos |
| <img src="docs/img/cores/8a6a3e.svg" width="22"> | `#8A6A3E` Madeira | Tábuas da prateleira |

**Tipografia:** [Fraunces](https://fonts.google.com/specimen/Fraunces) nos títulos, usando os eixos variáveis `SOFT` (cantos arredondados, orgânicos) e `WONK` (itálico com personalidade), e [Hanken Grotesk](https://fonts.google.com/specimen/Hanken+Grotesk) no texto. As duas fontes são auto-hospedadas, sem chamadas ao Google Fonts. A escala tipográfica é 4:3.

**Movimento:** cada animação tem um significado na loja: a logo brota, os potes são *colocados* na prateleira, o pote do granel enche e a contagem de itens pula quando algo entra na lista. Tudo respeita `prefers-reduced-motion`.

## Engenharia

| | |
|---|---|
| **Stack** | HTML, CSS e JavaScript (ES modules), sem framework e sem etapa de build |
| **Hospedagem** | Vercel: estático na CDN e uma função Node em `api/` |
| **Peso** | ~100 KB de HTML (com a logo animada embutida), ~57 KB de CSS + JS sem minificar, ~300 KB de fontes em WOFF2 |
| **Segurança** | CSP restritiva (`script-src 'self'`), HSTS, `X-Frame-Options`, `Permissions-Policy`, `Referrer-Policy` |
| **Privacidade** | Sem cookies, sem analytics, sem formulários. O Google Maps só carrega com um clique e a lista só sai do aparelho quando o usuário toca em enviar |
| **Acessibilidade** | HTML semântico, link "pular para o conteúdo", foco visível, `aria-pressed` nos potes, painel da lista como `dialog` com Esc, contraste AA |
| **Qualidade** | GitHub Actions valida o HTML ([html-validate](https://html-validate.org)), a sintaxe do JS e os JSON a cada push |

### Estrutura

```
.
├── index.html               página única (logo animada embutida)
├── 404.html
├── api/
│   └── instagram.js         função serverless: últimas publicações do Instagram
├── assets/
│   ├── css/site.css         tokens de design, layout e animações
│   ├── js/produtos.js       catálogo, horário e contatos (dados editáveis)
│   ├── js/site.js           prateleira, lista, horário ao vivo, granel, feed
│   ├── fonts/               Fraunces e Hanken Grotesk (OFL)
│   ├── img/                 logo vetorizada, foto, favicons, banner OG
│   └── video/               vídeos da loja (reserva do feed)
├── scripts/
│   ├── vetorizar-logo.py    PNG → SVG com potrace (símbolo em partes)
│   └── gerar-imagens.py     favicons e banner Open Graph via Playwright
├── docs/                    manual de manutenção e imagens deste README
├── vercel.json              cabeçalhos de segurança e cache
└── .github/workflows/       validação automática
```

## Rodando localmente

```bash
git clone https://github.com/LocatelliBryann/EmporioMaranata.git
cd EmporioMaranata
npm run serve        # http://localhost:8000 (o feed cai nos vídeos)
npm run dev          # com a função do Instagram, via Vercel CLI
npm run validar      # mesma checagem do CI
```

Para editar produtos, horário, foto, feed do Instagram ou domínio, veja o [**manual de manutenção**](docs/MANUTENCAO.md).

## Próximos passos

- [ ] Domínio `emporiomaranata.com.br`
- [ ] Feed real do Instagram (Behold)
- [ ] Fotos reais dos produtos mais vendidos no lugar de alguns potes
- [ ] Seção "Produto da Semana" alimentada pelo mesmo arquivo de dados

## English summary

A one-page website for **Empório Maranata**, a neighborhood natural-foods store in Joinville, Brazil. The store's shelf *is* the catalog: 40 procedurally textured SVG jars that visitors tap to build a shopping list, sent as a ready-made WhatsApp message (no prices, no checkout). Highlights include the store's raster logo vectorized with potrace and animated part by part, a scroll-driven bulk-food jar that fills while a scale counts grams, a live "open now" status in the store's time zone, an Instagram feed via a Vercel serverless function with a fallback, local-SEO structured data, a strict CSP and no cookies. Vanilla HTML/CSS/JS, zero runtime dependencies, Lighthouse 99/100/100/100.

## Licença e créditos

O **código** está sob a [licença MIT](LICENSE). O nome, a logo, o slogan, as fotos e os vídeos do Empório Maranata pertencem à loja e **não** podem ser reutilizados. As fontes seguem a SIL Open Font License.

Projeto, design e desenvolvimento por **[Bryann Locatelli](https://github.com/LocatelliBryann)**.
