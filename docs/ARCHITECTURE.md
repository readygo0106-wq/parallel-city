# Architecture and data boundaries

The Parallel City is a Next.js App Router application. The original project imagery remains in `public/assets/`, while all controls, timelines, decisions, indicators, and public results are rendered as interactive React components.

## State and simulation

`lib/simulation/store.tsx` owns minimal browser session state and persists it in local storage. It records the selected bird, year, decision, result, and whether the result reached the database. The deterministic city values live in `city-states.ts`; branch deltas and narrative live in `decision-engine.ts`. All displayed city indices are modeled, including 2026. The 1910 lens has archival *context*, but its numeric indicators remain illustrative model values. Future artwork treatment is configured in `future-visuals.ts`.

## Persistence

The browser obtains a Supabase anonymous user and inserts one decision and one result after explicit disclosure. Row-level security allows users to insert and read only their own records; no client uses a service-role key. The public `public_decision_stats()` function returns count-only aggregates of complete, non-test records. `/collective` runs the query on the server for every request and displays an unavailable state when no database exists or the query fails.

Migration: `supabase/migrations/001_initial_schema.sql`. This migration is prepared but cannot be applied without a user-owned Supabase project.

## Agent debate

`/api/agents` validates short scenario input, imposes a basic in-memory IP request limit, and requests one structured four-agent response through the server-side OpenAI Responses API. The API key stays server-only. Missing credentials, API failure, timeout, rate limit, or invalid output returns curated demo dialogue. The client triggers this only when the user opens or manually refreshes the debate; dragging the timeline does not call AI. A browser-session cap further limits requests.

## Geographic and environmental data

The city panel includes original illustrated artwork and a separate MapLibre map centered on the Zhongshan Road study area. Map tiles use OpenStreetMap with visible attribution; the worker is copied from the installed package during dev/build. `lib/data` contains provenance-aware Open-Meteo and optional eBird adapters. They do not feed the scenario indicators until source suitability and calibration are verified.

## Failure behavior

The core simulated outcome runs without Supabase or OpenAI. `/future` marks unsaved local results explicitly. `/collective` never invents totals. An unavailable map shows an OpenStreetMap link. Missing state on direct `/future` refresh produces a route back to onboarding. `/about` documents the speculative method and anonymous participation.

## Visual references

The project PDF informed the exhibition typography, palette, timeline, and card language. The PDF is not stored in the deployment bundle. The original classified artwork is documented in `docs/asset-inventory.md` and `public/assets/manifest.json`.
