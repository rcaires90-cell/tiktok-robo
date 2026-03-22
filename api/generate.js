export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { market, niche, product, format } = req.body;
  if (!market || !niche || !product) return res.status(400).json({ error: 'Missing fields' });

  const prompt = `You are an expert viral TikTok creator for ${market} market.

Write a ${format || '30-second TikTok hook'} for niche: ${niche}, promoting: ${product}.

Rules: English only, spoken naturally, strong hook first 3 seconds, mention "link in bio", max 100 words.

Format exactly:
SCRIPT:
[script]

CAPTION:
[caption under 100 chars]

HASHTAGS:
[10 hashtags for ${market}, space separated, no commas]`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 700,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();
    const text = data.content?.[0]?.text || '';

    const sm = text.match(/SCRIPT:\s*([\s\S]*?)(?=CAPTION:|$)/i);
    const cm = text.match(/CAPTION:\s*([\s\S]*?)(?=HASHTAGS:|$)/i);
    const hm = text.match(/HASHTAGS:\s*([\s\S]*?)$/i);

    res.status(200).json({
      script: sm ? sm[1].trim() : text,
      caption: cm ? cm[1].trim() : '',
      hashtags: hm ? hm[1].trim() : ''
    });
  } catch (e) {
    res.status(500).json({ error: 'API error: ' + e.message });
  }
}
