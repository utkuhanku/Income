export default async function handler(req, res) {
  const MINT = '5QmbJw7mM6tcCdXVy8ftc2bu8izded7Etc57TMA2pump';
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');

  const RPC = 'https://api.mainnet-beta.solana.com';

  try {
    const [supplyRes, holdersRes] = await Promise.all([
      fetch(RPC, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'getTokenSupply', params: [MINT] })
      }).then(r => r.json()),
      fetch(RPC, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jsonrpc: '2.0', id: 2, method: 'getTokenLargestAccounts', params: [MINT] })
      }).then(r => r.json())
    ]);

    res.status(200).json({
      supply:  supplyRes?.result?.value?.uiAmount ?? null,
      holders: holdersRes?.result?.value ?? []
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
