# Production readiness

Status: **functional local MVP; Supabase schema live; anonymous sign-in and public deployment pending**. This checklist records observed evidence, not intended future behavior.

- [x] Production build passes locally (`pnpm build`)
- [ ] GitHub repository connected
- [ ] Vercel URL active
- [x] Supabase `parallel-city` project created in `readygo0106-wq's Org` (Singapore)
- [x] Initial and aggregate-hardening migrations applied to the live database
- [x] RLS enabled on all five exposed business tables; security advisor has no findings
- [x] Public API returns the study location and zero aggregate counts; anonymous clients cannot read private decisions
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
- Supabase: schema and public aggregate connected. The project's Anonymous sign-ins provider is currently disabled, so browser decision writes remain unavailable until it is enabled.

## Known limitations and next steps

1. Enable Anonymous sign-ins in the [new project's Auth providers](https://supabase.com/dashboard/project/wslhainvyagwrfrprxze/auth/providers), then verify an anonymous session, owner-scoped insert/read, cross-user denial, and aggregate increment. The public URL and publishable key are already configured locally in ignored `.env.local`.
2. Add an OpenAI key only if live debate is desired; verify request limits and a real response. Demo Mode is production-safe for a keyless launch.
3. Create the empty `readygo0106-wq/parallel-city` GitHub repository, connect a remote, deploy to Vercel, and run a clearly marked production test interaction. Remove the test result and decision afterward so public totals exclude the test.
4. Verify live RLS isolation, anonymous write, aggregate update, direct refresh, and mobile navigation at the public URL.
5. Replace branch-specific image treatments with dedicated future artwork when available and calibrate indices before making any stronger factual claims.
