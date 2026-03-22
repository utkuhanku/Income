export default async function handler(req, res) {
  const MINT = '5QmbJw7mM6tcCdXVy8ftc2bu8izded7Etc57TMA2pump';
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');
  try {
    const r = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${MINT}`, {
      headers: { 'Accept': 'application/json' }
    });
    const data = await r.json();
    const pairs = (data.pairs || []).sort((a, b) => (b.liquidity?.usd || 0) - (a.liquidity?.usd || 0));
    res.status(200).json({ pair: pairs[0] || null });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
