-- Index the referencing side of foreign keys flagged by Supabase advisors.
create index if not exists agent_sessions_location_idx on public.agent_sessions (location_id);
create index if not exists agent_sessions_user_idx on public.agent_sessions (user_id);
create index if not exists simulation_results_stats_location_idx on public.simulation_results (stats_location_id);
