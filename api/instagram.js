// Últimas 3 publicações do Instagram do Empório.
// Funciona com UMA destas variáveis de ambiente na Vercel:
//   BEHOLD_FEED_URL   – URL do feed JSON do behold.so (mais simples, renova sozinho)
//   IG_ACCESS_TOKEN   – token de longa duração da Instagram API (conta profissional)
// Sem nenhuma delas, responde 204 e o site mostra os vídeos da loja no lugar.

const LIMITE = 3;

async function viaBehold(url) {
  const r = await fetch(url, { headers: { accept: 'application/json' } });
  if (!r.ok) throw new Error(`behold ${r.status}`);
  const j = await r.json();
  const posts = Array.isArray(j) ? j : j.posts || [];
  return posts.slice(0, LIMITE).map((p) => ({
    id: p.id,
    url: p.permalink,
    image: p.sizes?.medium?.mediaUrl || p.sizes?.small?.mediaUrl || p.thumbnailUrl || p.mediaUrl,
    caption: p.prunedCaption || p.caption || '',
    date: p.timestamp,
    type: p.isReel ? 'REEL' : p.mediaType,
  }));
}

async function viaToken(token) {
  const campos = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp';
  const r = await fetch(`https://graph.instagram.com/me/media?fields=${campos}&limit=${LIMITE}&access_token=${encodeURIComponent(token)}`);
  if (!r.ok) throw new Error(`instagram ${r.status}`);
  const j = await r.json();
  return (j.data || []).map((p) => ({
    id: p.id,
    url: p.permalink,
    image: p.media_type === 'VIDEO' ? p.thumbnail_url : p.media_url,
    caption: p.caption || '',
    date: p.timestamp,
    type: p.media_type,
  }));
}

export default async function handler(req, res) {
  const { BEHOLD_FEED_URL, IG_ACCESS_TOKEN } = process.env;
  if (!BEHOLD_FEED_URL && !IG_ACCESS_TOKEN) {
    res.status(204).end();
    return;
  }
  try {
    const items = BEHOLD_FEED_URL ? await viaBehold(BEHOLD_FEED_URL) : await viaToken(IG_ACCESS_TOKEN);
    res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=86400');
    res.status(200).json({ items: items.filter((i) => i.url && i.image) });
  } catch (e) {
    console.error('feed do instagram:', e.message);
    res.setHeader('Cache-Control', 'public, s-maxage=300');
    res.status(502).json({ error: 'Feed do Instagram indisponível no momento.' });
  }
}
