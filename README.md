# Empório Maranata · site

Site da loja de produtos naturais **Empório Maranata** (Boehmerwald, Joinville/SC).
Página única, sem framework e sem etapa de build: HTML, CSS e JavaScript puros, hospedados na Vercel.

**Mais que produtos, um propósito de cuidado.**

## O que tem no site

| Seção | O que faz |
|---|---|
| Abertura | A logo (mãos e broto) se desenha na tela, com uma esteira dos produtos rolando embaixo |
| Nossa prateleira | Catálogo em potes, sem preços. A pessoa toca nos potes e monta uma lista |
| Lista de pedido | A lista vai pronta para o WhatsApp da loja, com quantidades e observações. Fica salva no aparelho |
| Como pedir | Os 3 passos: montar a lista, enviar pelo WhatsApp, retirar ou receber |
| Granel | O pote enche conforme a rolagem e a balança marca 100 g, 250 g, 500 g e 1 kg |
| Restrições | Sem glúten, sem lactose, sem açúcar, integrais e veganos |
| A Nutri | Apresentação da Patricia (CRN 14723) |
| Instagram | As 3 últimas publicações, ou os vídeos da loja enquanto o feed não estiver configurado |
| Visite | Horário com "aberto agora" calculado no fuso de Joinville, endereço e mapa |

Também tem SEO local (dados estruturados `Store` com endereço e horário), imagem de compartilhamento, favicon, manifest, sitemap, página 404, cabeçalhos de segurança (CSP, HSTS) e suporte a `prefers-reduced-motion`. O site **não usa cookies nem coleta dados**: o mapa do Google só carrega quando a pessoa clica.

## Estrutura

```
index.html               página
404.html                 página de erro
assets/css/site.css      estilos (cores, fontes e animações no topo do arquivo)
assets/js/produtos.js    ← CATÁLOGO, horário e contatos (é aqui que se edita)
assets/js/site.js        comportamento (lista, horário ao vivo, granel, Instagram)
assets/img/              logo vetorizada, ícones, imagem de compartilhamento
assets/video/            vídeos da loja (usados quando o feed do Instagram não está ativo)
assets/fonts/            Fraunces e Hanken Grotesk (auto-hospedadas, licença OFL)
api/instagram.js         função da Vercel que busca as últimas publicações
```

## Tarefas comuns

### Editar produtos
Abra `assets/js/produtos.js`. Cada item tem `nome`, `tipo` (o desenho dentro do pote: `grao`, `po`, `semente`, `castanha`, `folha`, `capsula`, `liquido`, `pedaco`), `cor` e `selos` opcionais. Salve, faça commit, e a Vercel publica sozinha.

> A lista inicial foi montada a partir do Instagram da loja e precisa ser conferida com o que a loja realmente vende.

### Trocar a foto da Patricia
Substitua `assets/img/patricia.jpg` e `assets/img/patricia.webp` por uma foto vertical (proporção 2:3). Se os arquivos sumirem, aparece a logo no lugar.

### Mudar horário, WhatsApp ou endereço
Tudo está em `LOJA`, no fim de `assets/js/produtos.js`. O horário também aparece em `index.html` (tabela e dados estruturados); mude nos dois lugares.

## Feed do Instagram

Sem configuração, a seção mostra os 3 vídeos da loja. Para mostrar as **3 últimas publicações reais**, escolha **uma** opção e crie a variável de ambiente na Vercel (Project → Settings → Environment Variables). Depois, faça um redeploy.

**Opção A: Behold (mais simples, recomendado)**
1. Crie uma conta grátis em [behold.so](https://behold.so) e conecte o Instagram `@emporiomaranatajoinville`.
2. Crie um feed do tipo **JSON** e copie a URL.
3. Na Vercel: `BEHOLD_FEED_URL` = a URL copiada.

O Behold renova o acesso ao Instagram sozinho.

**Opção B: token próprio da Instagram API**
1. A conta precisa ser profissional (Empresa ou Criador de conteúdo).
2. No [Meta for Developers](https://developers.facebook.com/), crie um app com o produto *Instagram API with Instagram Login* e gere um token de longa duração para a conta.
3. Na Vercel: `IG_ACCESS_TOKEN` = o token.

O token vale 60 dias e precisa ser renovado antes de vencer.

A função responde com cache de 30 minutos na borda da Vercel, então o Instagram não é consultado a cada visita.

## Rodar localmente

```bash
python3 -m http.server 8000      # só o site (o feed cai nos vídeos)
npx vercel dev                   # site + função do Instagram
```

## Publicação

- **Hospedagem:** Vercel (plano gratuito), ligada a este repositório. Todo push na `main` publica.
- **Domínio:** `emporiomaranata.com.br` (a registrar no Registro.br). Depois de registrar, adicione o domínio em Vercel → Project → Domains e aponte o DNS como a Vercel indicar. Os metadados do site já usam esse domínio.

## Depois do lançamento

- Cadastrar ou revisar o **Perfil da Empresa no Google** (Google Meu Negócio) e colocar o link do site lá.
- Colocar o link do site na bio do Instagram e no perfil do WhatsApp Business.
- Enviar o `sitemap.xml` no [Google Search Console](https://search.google.com/search-console).
