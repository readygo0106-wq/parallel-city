# Database access

`client.ts` creates a browser client for anonymous Auth and owner-scoped writes. `server.ts` creates a separate public-key client for count-only aggregate reads. Neither uses a privileged key. Live access requires project values in `.env.local` and the SQL migration.
