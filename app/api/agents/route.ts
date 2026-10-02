import OpenAI from "openai";
import { agents, demoDebate, isAgentMessages, isDebateContext } from "@/lib/ai/agents";

const attempts = new Map<string, { count: number; expires: number }>();
const windowMs = 60 * 60 * 1000;
export async function POST(request: Request) {
  if (Number(request.headers.get("content-length") || 0) > 4096) return Response.json({ error: "Payload too large" }, { status: 413 });
  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 4096) return Response.json({ error: "Payload too large" }, { status: 413 });
    body = JSON.parse(raw);
  } catch { return Response.json({ error: "Invalid JSON" }, { status: 400 }); }
  if (!isDebateContext(body)) return Response.json({ error: "Invalid debate context" }, { status: 400 });
  const fallback = { mode: "demo" as const, messages: demoDebate(body) };
  if (!process.env.OPENAI_API_KEY) return Response.json(fallback);

  const key = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const entry = attempts.get(key);
  if (entry && entry.expires > now && entry.count >= 12) return Response.json(fallback);
  attempts.set(key, { count: entry && entry.expires > now ? entry.count + 1 : 1, expires: entry && entry.expires > now ? entry.expires : now + windowMs });
  if (attempts.size > 2000) for (const [ip, value] of attempts) if (value.expires <= now) attempts.delete(ip);

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, timeout: 8000, maxRetries: 0 });
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      max_output_tokens: 450,
      instructions: `Write a concise four-perspective design debate about the Zhongshan Road area of Qingdao. The numerical input is an illustrative model, NOT measured environmental data. Never fabricate specific scientific or archival facts. Use conditional scenario language. Each voice speaks 1-3 short sentences, under 300 characters. The four voices are: ${Object.entries(agents).map(([id, a]) => `${id}: ${a.instruction}`).join(" ")}`,
      input: JSON.stringify({ question: "What should happen to this corner?", context: body }),
      text: { format: { type: "json_schema", name: "agent_debate", strict: true, schema: { type: "object", additionalProperties: false, properties: { messages: { type: "array", items: { type: "object", additionalProperties: false, properties: { agent: { type: "string", enum: ["bird", "planner", "historian", "ecologist"] }, text: { type: "string" } }, required: ["agent", "text"] } } }, required: ["messages"] } } },
    });
    const parsed = JSON.parse(response.output_text || "null") as { messages?: unknown } | null;
    if (!isAgentMessages(parsed?.messages)) return Response.json(fallback);
    return Response.json({ mode: "live", messages: parsed.messages });
  } catch { return Response.json(fallback); }
}
