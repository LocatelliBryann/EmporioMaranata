import { CATEGORIAS, LOJA } from './produtos.js';

document.documentElement.classList.add('js');
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const calmo = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- links do WhatsApp e mapa ---------- */
const waLink = (texto) => `https://wa.me/${LOJA.whatsapp}?text=${encodeURIComponent(texto)}`;
$$('[data-wa]').forEach((a) => {
  a.href = waLink('Olá! Vim pelo site do Empório Maranata.');
  a.target = '_blank'; a.rel = 'noopener';
});
$$('[data-mapa]').forEach((a) => { a.href = LOJA.mapa; });

/* ---------- abertura ---------- */
requestAnimationFrame(() => document.body.classList.add('pronto'));

const FOLHA = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 1c5 3 6 10 0 18C4 11 5 4 10 1z" fill="currentColor"/></svg>';
const nomesEsteira = CATEGORIAS.flatMap((c) => c.itens.map((i) => i.nome));
const esteira = $('[data-esteira]');
if (esteira) {
  const bloco = nomesEsteira.map((n) => `<span class="esteira__item">${n}${FOLHA}</span>`).join('');
  esteira.innerHTML = bloco + bloco;
}

/* topo fica sólido depois da abertura */
const topo = $('[data-topo]');
const abertura = $('.abertura');
new IntersectionObserver(([e]) => topo.classList.toggle('is-solido', !e.isIntersecting), { rootMargin: '-80px 0px 0px 0px' }).observe(abertura);

/* ---------- horário ao vivo (fuso de Joinville) ---------- */
function agoraJoinville() {
  const partes = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Sao_Paulo', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
    .formatToParts(new Date()).reduce((o, p) => (o[p.type] = p.value, o), {});
  const dias = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return { dia: dias[partes.weekday], min: Number(partes.hour) * 60 + Number(partes.minute) };
}
const hhmm = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
const NOMES_DIA = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];

function situacao() {
  const { dia, min } = agoraJoinville();
  const hoje = LOJA.horario[dia];
  const turno = hoje.find(([a, f]) => min >= a && min < f);
  if (turno) return { aberto: true, curto: 'Aberto agora', longo: `Aberto agora, até as ${hhmm(turno[1])}` };
  const prox = hoje.find(([a]) => a > min);
  if (prox) return { aberto: false, curto: `Abre às ${hhmm(prox[0])}`, longo: `Fechado agora. Abre hoje às ${hhmm(prox[0])}` };
  for (let k = 1; k <= 7; k++) {
    const d = (dia + k) % 7;
    if (LOJA.horario[d].length) {
      const quando = k === 1 ? 'amanhã' : NOMES_DIA[d];
      return { aberto: false, curto: `Abre ${quando}`, longo: `Fechado agora. Abre ${quando} às ${hhmm(LOJA.horario[d][0][0])}` };
    }
  }
  return { aberto: false, curto: 'Fechado', longo: 'Fechado' };
}
function atualizaHorario() {
  const s = situacao();
  const curto = $('[data-status-curto]');
  const longo = $('[data-status-longo]');
  curto.innerHTML = `<span>${s.curto}</span>`;
  curto.setAttribute('aria-label', s.longo);
  curto.classList.toggle('is-aberto', s.aberto);
  longo.textContent = s.longo;
  longo.classList.toggle('is-aberto', s.aberto);
  const { dia } = agoraJoinville();
  $$('[data-horarios] tr').forEach((tr) => tr.classList.toggle('hoje', tr.dataset.dias.split(',').map(Number).includes(dia)));
}
atualizaHorario();
setInterval(atualizaHorario, 60_000);

/* ---------- prateleira ---------- */
const CHECK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';

function hash(s) { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) | 0; return Math.abs(h); }
function tom(hex, f) { // clareia (f>0) ou escurece (f<0)
  const n = parseInt(hex.slice(1), 16); let r = n >> 16, g = (n >> 8) & 255, b = n & 255;
  const t = f < 0 ? 0 : 255; const p = Math.abs(f);
  r = Math.round((t - r) * p + r); g = Math.round((t - g) * p + g); b = Math.round((t - b) * p + b);
  return `rgb(${r},${g},${b})`;
}
function conteudo(tipo, cor, id) {
  const c1 = tom(cor, -.18), c2 = tom(cor, .22), c3 = tom(cor, -.32);
  const pad = {
    grao: `<pattern id="${id}" width="18" height="12" patternUnits="userSpaceOnUse"><rect width="18" height="12" fill="${cor}"/><ellipse cx="4" cy="3" rx="3.6" ry="2.2" fill="${c1}" transform="rotate(20 4 3)"/><ellipse cx="13" cy="4" rx="3.6" ry="2.2" fill="${c2}" transform="rotate(-25 13 4)"/><ellipse cx="8" cy="9.5" rx="3.6" ry="2.2" fill="${c3}" opacity=".7"/></pattern>`,
    po: `<pattern id="${id}" width="10" height="10" patternUnits="userSpaceOnUse"><rect width="10" height="10" fill="${cor}"/><circle cx="2" cy="3" r=".9" fill="${c1}" opacity=".5"/><circle cx="7" cy="7" r=".8" fill="${c2}" opacity=".7"/></pattern>`,
    semente: `<pattern id="${id}" width="10" height="8" patternUnits="userSpaceOnUse"><rect width="10" height="8" fill="${c1}"/><ellipse cx="3" cy="2.5" rx="2" ry="1.4" fill="${cor}"/><ellipse cx="8" cy="5.5" rx="2" ry="1.4" fill="${c2}"/><ellipse cx="2" cy="7" rx="1.8" ry="1.2" fill="${cor}"/></pattern>`,
    castanha: `<pattern id="${id}" width="30" height="22" patternUnits="userSpaceOnUse"><rect width="30" height="22" fill="${c3}"/><path d="M3 9c0-6 11-7 12-1 1 5-12 7-12 1z" fill="${cor}"/><path d="M17 18c1-6 12-5 12 1 0 4-12 4-12-1z" fill="${c2}"/><path d="M14 4c5-3 12 0 10 4-2 3-11 1-10-4z" fill="${c1}"/></pattern>`,
    folha: `<pattern id="${id}" width="12" height="10" patternUnits="userSpaceOnUse"><rect width="12" height="10" fill="${cor}"/><path d="M1 2l3 1M6 7l3-2M9 1l2 2M2 8l2 1" stroke="${c2}" stroke-width="1.3" stroke-linecap="round"/><path d="M5 3l2 1M10 8l1-2" stroke="${c3}" stroke-width="1.3" stroke-linecap="round"/></pattern>`,
    capsula: `<pattern id="${id}" width="26" height="16" patternUnits="userSpaceOnUse"><rect width="26" height="16" fill="${tom(cor, .55)}"/><rect x="2" y="2" width="14" height="6" rx="3" fill="${cor}" transform="rotate(-15 9 5)"/><rect x="12" y="9" width="14" height="6" rx="3" fill="${c1}" transform="rotate(10 19 12)"/></pattern>`,
    liquido: `<linearGradient id="${id}" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="${c2}"/><stop offset="1" stop-color="${c1}"/></linearGradient>`,
    pedaco: `<pattern id="${id}" width="24" height="18" patternUnits="userSpaceOnUse"><rect width="24" height="18" fill="${c3}"/><rect x="1" y="1" width="10" height="7" rx="2" fill="${cor}" transform="rotate(-8 6 4)"/><rect x="12" y="4" width="10" height="7" rx="2" fill="${c2}" transform="rotate(12 17 7)"/><rect x="4" y="10" width="10" height="7" rx="2" fill="${c1}"/></pattern>`,
  };
  return pad[tipo] || pad.po;
}
function poteSVG(item, idx) {
  const id = `c${idx}`;
  const nivel = 38 + (hash(item.nome) % 22); // altura da linha do conteúdo
  return `<svg viewBox="0 0 120 150" aria-hidden="true">
    <defs>${conteudo(item.tipo, item.cor, id)}<clipPath id="v${idx}"><rect x="8" y="26" width="104" height="120" rx="22"/></clipPath></defs>
    <rect x="8" y="26" width="104" height="120" rx="22" fill="rgba(255,255,255,.45)"/>
    <g clip-path="url(#v${idx})"><rect x="8" y="${nivel}" width="104" height="${146 - nivel}" fill="url(#${id})"/>
      <path d="M8 ${nivel} q26 -5 52 0 t52 0" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="2"/></g>
    <rect x="8" y="26" width="104" height="120" rx="22" fill="none" stroke="rgba(34,48,24,.28)" stroke-width="2"/>
    <path d="M20 44 q-4 40 2 84" stroke="rgba(255,255,255,.6)" stroke-width="5" fill="none" stroke-linecap="round"/>
    <rect x="26" y="18" width="68" height="12" rx="3" fill="rgba(34,48,24,.18)"/>
    <rect class="pote__tampa" x="20" y="2" width="80" height="20" rx="6" fill="#b9975b"/>
  </svg>`;
}

const filtros = $('[data-filtros]');
const estantes = $('[data-estantes]');
let idx = 0;
estantes.innerHTML = CATEGORIAS.map((cat) => `
  <section class="estante" data-cat="${cat.id}" aria-labelledby="est-${cat.id}">
    <div class="estante__cabeca"><h3 class="estante__nome" id="est-${cat.id}">${cat.nome}</h3><p class="estante__texto">${cat.texto}</p></div>
    <ul class="estante__potes">
      ${cat.itens.map((item, i) => {
        const n = idx++;
        const giro = ((hash(item.nome) % 5) - 2) * .8;
        const selos = item.selos?.length ? `<span class="pote__selos">${item.selos.join(', ')}</span>` : '';
        return `<li style="--i:${i}"><button class="pote" type="button" aria-pressed="false" data-nome="${item.nome}">
          <span class="pote__vidro">${poteSVG(item, n)}</span>
          <span class="pote__rotulo" style="--giro:${giro}deg">${item.nome}${selos}</span>
          <span class="pote__marca">${CHECK}</span>
          <span class="sr-only"></span>
        </button></li>`;
      }).join('')}
    </ul>
  </section>`).join('');

filtros.innerHTML = [`<button class="filtro" type="button" aria-pressed="true" data-f="todos">Tudo</button>`,
  ...CATEGORIAS.map((c) => `<button class="filtro" type="button" aria-pressed="false" data-f="${c.id}">${c.nome.split(',')[0].replace(' e farinhas', '').replace(' e sementes', '').replace(' e chás', '').replace(' e naturais', '')}</button>`)].join('');
filtros.addEventListener('click', (e) => {
  const b = e.target.closest('.filtro'); if (!b) return;
  $$('.filtro', filtros).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
  $$('.estante', estantes).forEach((s) => {
    s.hidden = !(b.dataset.f === 'todos' || s.dataset.cat === b.dataset.f);
    if (!s.hidden) { s.classList.remove('visivel'); void s.offsetWidth; s.classList.add('visivel'); }
  });
});

const obsEstante = new IntersectionObserver((ents) => ents.forEach((e) => {
  if (e.isIntersecting) { e.target.classList.add('visivel'); obsEstante.unobserve(e.target); }
}), { threshold: .2 });
$$('.estante').forEach((s) => obsEstante.observe(s));

/* ---------- lista de pedido (fica salva no aparelho) ---------- */
const CHAVE = 'maranata-lista';
let lista = [];
try { lista = JSON.parse(localStorage.getItem(CHAVE) || '[]'); } catch { lista = []; }
const salva = () => { try { localStorage.setItem(CHAVE, JSON.stringify(lista)); } catch { /* modo privado */ } };

const ui = {
  caixa: $('[data-lista]'), abrir: $('[data-lista-abrir]'), painel: $('[data-lista-painel]'),
  contador: $('[data-lista-contador]'), resumo: $('[data-lista-resumo]'), itens: $('[data-lista-itens]'),
  extra: $('[data-lista-extra]'), enviar: $('[data-lista-enviar]'), fechar: $('[data-lista-fechar]'), limpar: $('[data-lista-limpar]'),
};
function mensagem() {
  const linhas = lista.map((i) => `• ${i.nome}${i.qtd ? ` (${i.qtd})` : ''}`);
  const extra = ui.extra.value.trim();
  return `Olá! Montei esta lista no site do Empório Maranata:\n\n${linhas.join('\n')}${extra ? `\n\nTambém quero: ${extra}` : ''}\n\nPode me passar disponibilidade e valores?`;
}
function desenhaLista(pula = false) {
  const n = lista.length;
  ui.caixa.hidden = n === 0 && ui.painel.hidden;
  ui.contador.textContent = n;
  ui.resumo.textContent = n === 1 ? 'item na sua lista' : 'itens na sua lista';
  if (pula) { ui.contador.classList.remove('pula'); void ui.contador.offsetWidth; ui.contador.classList.add('pula'); }
  ui.itens.innerHTML = n ? lista.map((i, k) => `<li><span>${i.nome}</span>
      <input type="text" inputmode="text" placeholder="quantidade" aria-label="Quantidade de ${i.nome}" value="${i.qtd || ''}" data-qtd="${k}">
      <button class="lista__remover" type="button" aria-label="Remover ${i.nome}" data-rem="${k}">×</button></li>`).join('')
    : '<li><span>Sua lista está vazia. Toque nos potes da prateleira para adicionar.</span></li>';
  ui.enviar.href = waLink(mensagem());
  $$('.pote').forEach((p) => {
    const tem = lista.some((i) => i.nome === p.dataset.nome);
    p.setAttribute('aria-pressed', String(tem));
    p.querySelector('.sr-only').textContent = tem ? ' (na sua lista)' : '';
  });
}
function voa(de) {
  if (calmo) return;
  const a = de.getBoundingClientRect(); const b = ui.contador.getBoundingClientRect();
  const bola = document.createElement('span'); bola.className = 'lista__voa';
  bola.style.left = `${a.left + a.width / 2 - 12}px`; bola.style.top = `${a.top + a.height / 3}px`;
  document.body.appendChild(bola);
  requestAnimationFrame(() => requestAnimationFrame(() => {
    bola.style.transform = `translate(${b.left + b.width / 2 - (a.left + a.width / 2)}px, ${b.top + b.height / 2 - (a.top + a.height / 3)}px) scale(.5)`;
    bola.style.opacity = '.2';
  }));
  setTimeout(() => bola.remove(), 750);
}
estantes.addEventListener('click', (e) => {
  const p = e.target.closest('.pote'); if (!p) return;
  const nome = p.dataset.nome;
  const k = lista.findIndex((i) => i.nome === nome);
  if (k >= 0) lista.splice(k, 1);
  else {
    lista.push({ nome, qtd: '' });
    p.classList.remove('salta'); void p.offsetWidth; p.classList.add('salta');
    ui.caixa.hidden = false;
    requestAnimationFrame(() => voa(p));
  }
  salva(); desenhaLista(k < 0);
});
ui.itens.addEventListener('input', (e) => {
  const k = e.target.dataset.qtd; if (k == null) return;
  lista[k].qtd = e.target.value.slice(0, 30); salva(); ui.enviar.href = waLink(mensagem());
});
ui.itens.addEventListener('click', (e) => {
  const k = e.target.closest('[data-rem]')?.dataset.rem; if (k == null) return;
  lista.splice(Number(k), 1); salva(); desenhaLista();
  if (!lista.length) ui.extra.focus();
});
ui.extra.addEventListener('input', () => { ui.enviar.href = waLink(mensagem()); });
function abrePainel(abre) {
  ui.painel.hidden = !abre; ui.abrir.setAttribute('aria-expanded', String(abre));
  ui.abrir.hidden = abre;
  if (abre) (ui.itens.querySelector('input') || ui.fechar).focus(); else { ui.abrir.focus(); desenhaLista(); }
}
ui.abrir.addEventListener('click', () => abrePainel(true));
ui.fechar.addEventListener('click', () => abrePainel(false));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !ui.painel.hidden) abrePainel(false); });
ui.limpar.addEventListener('click', () => { lista = []; ui.extra.value = ''; salva(); desenhaLista(); abrePainel(false); });
desenhaLista();

/* ---------- granel: o pote enche com a rolagem ---------- */
const granel = $('[data-granel]');
const gramas = $('[data-gramas]');
const chuva = $('[data-chuva]');
if (chuva) chuva.innerHTML = Array.from({ length: 18 }, (_, i) => `<i style="left:${(i * 37) % 100}%;animation-delay:${(i * .173) % 1}s;animation-duration:${.8 + (i % 4) * .12}s;background:${['#d1ab68', '#c39b5a', '#e9d6a6', '#b48848'][i % 4]}"></i>`).join('');
let ultimo = -1;
function rolaGranel() {
  const r = granel.getBoundingClientRect();
  const total = r.height - innerHeight;
  const p = Math.min(1, Math.max(0, -r.top / total));
  if (Math.abs(p - ultimo) < .001) return;
  ultimo = p;
  const passos = [0, 100, 250, 500, 1000];
  const fase = p * (passos.length - 1);
  const i = Math.min(passos.length - 2, Math.floor(fase));
  const t = fase - i;
  const e = t < .7 ? t / .7 : 1; // enche e segura
  const g = Math.round(passos[i] + (passos[i + 1] - passos[i]) * e);
  gramas.textContent = g >= 1000 ? '1' : g;
  gramas.nextElementSibling.textContent = g >= 1000 ? 'kg' : 'g';
  granel.style.setProperty('--enche', (g / 1000) * .82 + .04);
  const enchendo = p > .02 && p < .98 && t < .7;
  granel.style.setProperty('--chove', enchendo ? 1 : 0);
  granel.style.setProperty('--abre', p > .02 && p < .98 ? 1 : 0);
}
if (granel && !calmo) {
  addEventListener('scroll', () => requestAnimationFrame(rolaGranel), { passive: true });
  rolaGranel();
} else if (granel) { granel.style.setProperty('--enche', .7); gramas.textContent = '500'; }

/* ---------- mesas: os checks marcam ao rolar ---------- */
const obsMesa = new IntersectionObserver((ents) => ents.forEach((e) => {
  if (e.isIntersecting) { e.target.classList.add('ok'); obsMesa.unobserve(e.target); }
}), { rootMargin: '0px 0px -35% 0px' });
$$('[data-mesas] li').forEach((li) => obsMesa.observe(li));

/* ---------- foto da nutri ---------- */
const foto = $('[data-foto-nutri]');
if (foto) {
  const semFoto = () => foto.closest('.nutri__foto').classList.add('sem-foto');
  foto.addEventListener('error', semFoto);
  if (foto.complete && !foto.naturalWidth) semFoto();
}

/* ---------- mapa sob demanda ---------- */
$('[data-mapa-botao]')?.addEventListener('click', (e) => {
  const caixa = $('[data-mapa-caixa]');
  caixa.innerHTML = `<iframe title="Mapa: Empório Maranata, Rua Adolfo da Veiga, 281" src="${LOJA.mapaEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>`;
});

/* ---------- Instagram ---------- */
const grade = $('[data-insta]');
const PLAY = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>';
const RESERVA = [
  { video: '/assets/video/03_produto_da_semana.mp4', poster: '/assets/video/03_produto_da_semana.jpg', legenda: 'Produto da Semana: pão de mel integral, com farinha integral, açúcar mascavo e especiarias.' },
  { video: '/assets/video/01_tem_aqui.mp4', poster: '/assets/video/01_tem_aqui.jpg', legenda: 'Sem glúten, sem lactose, sem açúcar, integrais, veganos. Tem aqui.' },
  { video: '/assets/video/02_granel.mp4', poster: '/assets/video/02_granel.jpg', legenda: 'No granel, você escolhe a quantidade. Menos desperdício e mais economia.' },
];
const perfil = `https://www.instagram.com/${LOJA.instagram}/`;
const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const dataBR = (iso) => new Date(iso).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', timeZone: 'America/Sao_Paulo' });

function reserva() {
  grade.innerHTML = RESERVA.map((r) => `<a class="post" href="${perfil}" target="_blank" rel="noopener">
    <div class="post__midia"><video src="${r.video}" poster="${r.poster}" muted loop playsinline preload="none" aria-hidden="true"></video><span class="post__tipo">${PLAY}</span></div>
    <p class="post__legenda">${r.legenda}</p></a>`).join('');
  const obsVideo = new IntersectionObserver((ents) => ents.forEach((e) => {
    const v = e.target; if (e.isIntersecting && !calmo) v.play().catch(() => {}); else v.pause();
  }), { threshold: .4 });
  $$('video', grade).forEach((v) => obsVideo.observe(v));
}
async function carregaInsta() {
  grade.innerHTML = Array.from({ length: 3 }, () => '<div class="post post--carregando"><div class="post__midia"></div></div>').join('');
  try {
    const r = await fetch('/api/instagram', { headers: { accept: 'application/json' } });
    if (!r.ok || r.status === 204) throw new Error('sem feed');
    const { items } = await r.json();
    if (!items?.length) throw new Error('vazio');
    grade.innerHTML = items.slice(0, 3).map((p) => `<a class="post" href="${esc(p.url)}" target="_blank" rel="noopener">
      <div class="post__midia"><img src="${esc(p.image)}" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer">${/VIDEO|REEL/i.test(p.type || '') ? `<span class="post__tipo">${PLAY}</span>` : ''}</div>
      <p class="post__legenda">${esc((p.caption || '').split('\n')[0] || 'Ver no Instagram')}</p>
      ${p.date ? `<p class="post__data">${dataBR(p.date)}</p>` : ''}</a>`).join('');
  } catch { reserva(); }
}
const obsInsta = new IntersectionObserver(([e]) => { if (e.isIntersecting) { carregaInsta(); obsInsta.disconnect(); } }, { rootMargin: '400px' });
obsInsta.observe(grade);
