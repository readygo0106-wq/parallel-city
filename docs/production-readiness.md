# Production readiness

Status: **functional local MVP; external services and public deployment pending**. This checklist records observed evidence, not intended future behavior.

- [x] Production build passes locally (`pnpm build`)
- [ ] GitHub repository connected
- [ ] Vercel URL active
- [ ] Supabase project connected and migration applied
- [ ] RLS verified against a live database
- [ ] Anonymous session verified against a live database
- [ ] Decision persistence verified against a live database
- [ ] Collective statistics verified against a live database
- [x] OpenAI Demo Mode available when no key is configured
- [ ] Live OpenAI response verified with a key
- [x] Real map renders with OpenStreetMap attribution in local browser
- [x] Simulation provenance labels and methodology notice visible
- [x] Mobile main path works in local browser
- [x] No secrets found in repository source/config scan
- [x] No localhost-only API URL in application code
- [x] No fake user statistics
- [x] Primary local journey has no dead buttons

## Public links

- Production URL: pending Vercel deployment
- GitHub repository: pending repository creation and authentication

## Architecture

Next.js App Router + React client session state + deterministic simulation. Supabase anonymous auth and Postgres RLS handle persistence when configured. A count-only database function powers `/collective`. A single server-side OpenAI Responses request powers four agent voices with a demo fallback. MapLibre displays OpenStreetMap geographic context next to original project artwork.

## Environment variables

- `NEXT_PUBLIC_SUPABASE_URL`: public Supabase project URL
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` or `NEXT_PUBLIC_SUPABASE_ANON_KEY`: public browser key
- `OPENAI_API_KEY`: private server-side key for live debate
- `OPENAI_MODEL`: optional server-side model selection, default `gpt-4.1-mini`
- `EBIRD_API_KEY`: optional server-side bird observation adapter

No privileged Supabase key is used. Local secrets go in `.env.local`; production secrets must be configured in the deployment environment.

## Connected sources and demo behavior

- OpenStreetMap raster tiles: local map rendered; external tile availability remains best effort.
- Open-Meteo: optional adapter implemented but not shown as scenario evidence.
- eBird: optional adapter, unconnected without a key.
- OpenAI: Demo Agent Mode until a real API call succeeds.
- Supabase: unconnected; local results still work and public totals show unavailable rather than fake data.

## Known limitations and next steps

1. Create a Supabase project, enable anonymous sign-ins, apply `supabase/migrations/001_initial_schema.sql`, and provide its public URL and key.
2. Add an OpenAI key only if live debate is desired; verify request limits and a real response. Demo Mode is production-safe for a keyless launch.
3. Connect a GitHub remote, deploy to Vercel, and run a clearly marked production test interaction. Mark the test decision `is_test = true` in the admin SQL editor or remove it before reporting public totals.
4. Verify live RLS isolation, anonymous write, aggregate update, direct refresh, and mobile navigation at the public URL.
5. Replace branch-specific image treatments with dedicated future artwork when available and calibrate indices before making any stronger factual claims.
