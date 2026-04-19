const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
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

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: CORS, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: CORS, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: CORS,
      body: JSON.stringify({ error: "API key not configured" }),
    };
  }

  let messages;
  try {
    ({ messages } = JSON.parse(event.body));
    if (!Array.isArray(messages) || messages.length === 0) throw new Error("invalid");
  } catch {
    return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: "Invalid request body" }) };
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 4096,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return {
        statusCode: res.status,
        headers: CORS,
        body: JSON.stringify({ error: err.error?.message || "Anthropic API error" }),
      };
    }

    const data = await res.json();
    const text = data.content?.[0]?.text ?? "(no response)";

    return {
      statusCode: 200,
      headers: CORS,
      body: JSON.stringify({ message: text, usage: data.usage }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: CORS,
      body: JSON.stringify({ error: "Failed to reach AI service" }),
    };
  }
};
