# The Parallel City · Qingdao

[Live preview](https://parallel-city.vercel.app) · [Production readiness](docs/production-readiness.md)

An illustrated, interactive urban ecology scenario for the Zhongshan Road area. Visitors choose a bird perspective, explore four time lenses, hear four conditional viewpoints, choose an urban direction, and compare a speculative 2050 outcome. Completed anonymous decisions contribute to a public aggregate when Supabase is configured.

**The future indicators are illustrative model values, not scientific predictions or official city forecasts.** The original project artwork remains the visual foundation; timelines, cards, choices, data graphics, and maps are interactive components.

## The journey

`/` → `/enter` → `/city` → `/future` → `/collective` → restart. `/bird` is an alternate entry route, and `/about` explains methods and privacy. Direct visits to `/future` show a useful empty state until a decision exists.

## Architecture

```mermaid
flowchart LR
  Visitor --> State[Client session state]
  State --> Model[Deterministic scenario model]
  State --> Debate[/api/agents]
  Debate -->|Configured| OpenAI[OpenAI Responses API]
  Debate -->|Unavailable| Demo[Curated demo dialogue]
  State -->|Consent and decision| Supabase[(Supabase Auth + Postgres)]
  Supabase --> Aggregate[Public count-only RPC]
  Aggregate --> Collective[/collective]
  Model --> Future[/future]
```

- Next.js App Router and React 19: pages and interaction.
- `lib/simulation`: typed state, time lenses, provenance, and weighted 2050 changes.
- Supabase anonymous auth and RLS: private visitor rows and public count-only statistics.
- OpenAI Responses API: one structured four-agent server call, with a curated fallback.
- MapLibre + OpenStreetMap: geographic context alongside the original project illustration.
- Open-Meteo and eBird adapters: optional sources, excluded from the displayed scenario indices until validated.

## Run locally

Use Node.js 22+ and pnpm 11:

```sh
pnpm install
pnpm dev
```

Open `http://localhost:3000`. `pnpm dev` and `pnpm build` copy the matching MapLibre worker files into `public/maplibre/`. Those generated files are ignored by Git.

The main path runs without keys. It labels database results as unavailable and agent dialogue as Demo Mode. To enable persistence:

1. Create a Supabase project and enable **Anonymous Sign-Ins** in Auth settings.
2. Apply both SQL files in `supabase/migrations/` in numeric order. The second migration keeps public counts in a read-only summary table.
3. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SUPABASE_URL` plus either `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` or `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Restart the dev server. For live agent dialogue, also set server-only `OPENAI_API_KEY`.

`.env.local` and `.env*.local` are ignored. Never put OpenAI keys or privileged Supabase keys under `NEXT_PUBLIC_`. No service-role key is required by this app.

## Data provenance and privacy

All six city indices for 1910, 2026, 2035, and 2050 are **simulation** values, including the baseline. The 1910 label refers to an archival era, not measured numeric data. The map is real geographic context from OpenStreetMap. The 2050 branch image uses original project artwork with a declared CSS treatment. Agent messages show `LIVE AI` only after a successful API response; otherwise they show `DEMO AGENT MODE`.

Before recording a decision, the UI explains that anonymous choices enter public totals and links to `/about`. Supabase RLS restricts visitor rows to their owner. The public database function returns only total and branch counts, excluding incomplete and test records. No name, email, phone, or precise visitor location is requested.

## Production and assets

Run `pnpm lint`, `pnpm typecheck`, and `pnpm build` before deployment. Set the same public Supabase values and private OpenAI key in Vercel. Apply the SQL migration and verify an anonymous test decision before announcing real public statistics. See [production readiness](docs/production-readiness.md) for current verification status.

The 14 originals remain locally in `public/raw-assets/` and are intentionally ignored by Git to avoid shipping duplicate production imagery. The 13 unique classified assets in `public/assets/` are committed for deployment. See the [asset inventory](docs/asset-inventory.md) and [asset manifest](public/assets/manifest.json). The original large PDF is a design reference outside this repository; no broken PDF link is published.

## Known limitations and roadmap

- Dedicated artwork for all three future branches is still needed.
- Environmental indices are transparent design scenarios, not calibrated local forecasts.
- Open-Meteo and eBird adapters are present but not used as evidence for the scenario indices.
- Database persistence and live AI require project credentials and production validation.
- At larger traffic volumes, replace the small in-memory AI rate limit and community OSM tile service with production-grade infrastructure.
