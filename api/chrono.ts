export const config = { runtime: 'edge' };

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const SYSTEM_PROMPT = `You are Chrono, an advanced AI assistant built by ChronigenAI.

You are knowledgeable, precise, and helpful across a wide range of domains:
- Software engineering: writing, debugging, reviewing, and explaining code in any language
- Mathematics: algebra, calculus, statistics, linear algebra, proofs
- Science: physics, chemistry, biology, computer science
- Business: strategy, analysis, writing, planning
- Research: summarising complex topics, comparing options, structured analysis
- Writing: drafting, editing, improving any kind of text
- Problem solving: breaking down complex problems step by step

Your style:
- Be clear and direct — no unnecessary filler
- Show step-by-step reasoning for complex problems
- Use code blocks when sharing code snippets
- Use bullet points and structure for complex answers
- Be honest when unsure — say so rather than guessing
- Keep responses focused and appropriately concise

You represent ChronigenAI, a company building AI agents and automation tools for businesses.
Be professional, smart, and genuinely useful.`;

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: CORS });
  }

  if (req.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405, headers: CORS });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json({ error: 'API key not configured' }, { status: 500, headers: CORS });
  }

  let messages: { role: string; content: string }[];
  try {
    const body = await req.json();
    messages = body.messages;
    if (!Array.isArray(messages) || messages.length === 0) throw new Error();
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400, headers: CORS });
  }

  try {
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 4096,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    const data = await upstream.json() as {
      content?: { text: string }[];
      usage?: unknown;
      error?: { message: string };
    };

    if (!upstream.ok) {
      return Response.json(
        { error: data.error?.message ?? 'Anthropic API error' },
        { status: upstream.status, headers: CORS }
      );
    }

    return Response.json(
      { message: data.content?.[0]?.text ?? '(no response)', usage: data.usage },
      { headers: CORS }
    );
  } catch {
    return Response.json({ error: 'Failed to reach AI service' }, { status: 500, headers: CORS });
  }
}
