import { createClient } from "@supabase/supabase-js";

// Public read-only server client for the aggregate RPC. It never uses a service key.
export function getServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { db: { timeout: 8000 }, auth: { persistSession: false, autoRefreshToken: false } });
}
