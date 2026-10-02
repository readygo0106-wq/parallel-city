# Dialogue provider

`agents.ts` defines four constrained perspectives, validates input and output, and supplies curated fallback dialogue. `/api/agents` makes one server-side OpenAI Responses request only when `OPENAI_API_KEY` is configured. The browser never reads that key.
