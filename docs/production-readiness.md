# Production readiness

Status: **public MVP deployed with live anonymous decision persistence**. This checklist records observed evidence, not intended future behavior.

- [x] Production build passes locally (`pnpm build`)
- [x] GitHub `main` pushed and verified
- [x] Vercel production deployment Ready; all six public page routes return 200
- [x] Supabase `parallel-city` project created in `readygo0106-wq's Org` (Singapore)
- [x] Initial, aggregate-hardening, and foreign-key index migrations applied to the live database
- [x] RLS enabled on all five exposed business tables; security advisor has no findings
- [x] Public API returns the study location and zero aggregate counts; unsigned clients cannot read private decisions
- [x] Anonymous session verified against the live database
- [x] Decision persistence and aggregate increment verified against the live database
- [x] Owner-only reads and cross-user RLS isolation verified with two anonymous visitors
- [x] Temporary production test records and accounts removed; aggregate returned to zero
- [x] Collective zero-state verified against the live database on the public site
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

- Production URL: https://parallel-city.vercel.app
- GitHub repository: https://github.com/readygo0106-wq/parallel-city

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
- Supabase: schema, public aggregate, and Anonymous sign-ins are enabled in project `wslhainvyagwrfrprxze`. A production smoke test confirmed a decision/result insert, owner-only read, cross-user denial, and public count increment. The test rows and anonymous accounts were removed, returning the count to zero.
- Vercel: production deployment is Ready and the public routes and artwork return HTTP 200. The first-hour error log query returned no errors. The deployment used the authenticated CLI; automatic GitHub deploys still need a GitHub Login Connection in Vercel.

## Known limitations and next steps

1. Add an OpenAI key only if live debate is desired; verify request limits and a real response. Demo Mode is production-safe for a keyless launch.
2. Verify the full visual journey and mobile navigation at the public URL after future UI changes. All six public routes returned HTTP 200 after enabling anonymous sign-ins.
3. Consider adding a CAPTCHA if public anonymous sign-in volume grows; Supabase warns that automated sign-ups can inflate monthly active users and database usage.
4. Add a GitHub Login Connection to Vercel if automatic deployments from `main` are desired; CLI production deployment already works.
5. Replace branch-specific image treatments with dedicated future artwork when available and calibrate indices before making any stronger factual claims.
