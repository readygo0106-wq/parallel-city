-- The Parallel City: one study location, anonymous decisions, private rows, public aggregates.
create extension if not exists pgcrypto;

create table if not exists public.locations (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  latitude double precision,
  longitude double precision,
  created_at timestamptz not null default now()
);

create table if not exists public.decisions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  location_id uuid not null references public.locations(id),
  bird_type text not null check (bird_type in ('black-tailed-gull', 'egret', 'migratory-sparrow')),
  decision_type text not null check (decision_type in ('ecology', 'balanced', 'development')),
  ecology_weight numeric not null check (ecology_weight between 0 and 1),
  development_weight numeric not null check (development_weight between 0 and 1),
  culture_weight numeric not null check (culture_weight between 0 and 1),
  is_test boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.simulation_results (
  id uuid primary key default gen_random_uuid(),
  decision_id uuid not null unique references public.decisions(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  future_year integer not null check (future_year = 2050),
  green_coverage numeric not null,
  bird_habitat numeric not null,
  building_density numeric not null,
  heat_island numeric not null,
  noise numeric not null,
  culture_retention numeric not null,
  result_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.agent_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  location_id uuid not null references public.locations(id),
  messages jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

insert into public.locations (id, slug, name, latitude, longitude)
values ('3ac80bf0-a71f-4cf9-86ba-fced98009605', 'qingdao-zhongshan-road', 'Qingdao Zhongshan Road area', 36.0671, 120.3826)
on conflict (id) do nothing;

create index if not exists decisions_location_created_idx on public.decisions (location_id, created_at desc);
create index if not exists decisions_user_idx on public.decisions (user_id);
create index if not exists results_user_idx on public.simulation_results (user_id);

alter table public.locations enable row level security;
alter table public.decisions enable row level security;
alter table public.simulation_results enable row level security;
alter table public.agent_sessions enable row level security;

revoke all on public.locations, public.decisions, public.simulation_results, public.agent_sessions from anon, authenticated;
grant select on public.locations to anon, authenticated;
grant select, insert on public.decisions, public.simulation_results, public.agent_sessions to authenticated;

create policy "Anyone can read study locations" on public.locations for select to anon, authenticated using (true);
create policy "Read own decisions" on public.decisions for select to authenticated using ((select auth.uid()) = user_id);
create policy "Insert own decisions" on public.decisions for insert to authenticated with check ((select auth.uid()) = user_id and is_test = false);
create policy "Read own results" on public.simulation_results for select to authenticated using ((select auth.uid()) = user_id);
create policy "Insert own result for own decision" on public.simulation_results for insert to authenticated
  with check ((select auth.uid()) = user_id and exists (
    select 1 from public.decisions d where d.id = decision_id and d.user_id = (select auth.uid())
  ));
create policy "Read own agent sessions" on public.agent_sessions for select to authenticated using ((select auth.uid()) = user_id);
create policy "Insert own agent sessions" on public.agent_sessions for insert to authenticated with check ((select auth.uid()) = user_id);

-- Only completed, non-test decisions contribute. No user rows or identifiers are exposed.
create or replace function public.public_decision_stats()
returns table (total bigint, ecology bigint, balanced bigint, development bigint)
language sql stable security definer set search_path = ''
as $$
  select count(*)::bigint,
    count(*) filter (where d.decision_type = 'ecology')::bigint,
    count(*) filter (where d.decision_type = 'balanced')::bigint,
    count(*) filter (where d.decision_type = 'development')::bigint
  from public.decisions d
  inner join public.simulation_results r on r.decision_id = d.id
  where d.location_id = '3ac80bf0-a71f-4cf9-86ba-fced98009605'::uuid and d.is_test = false;
$$;
revoke all on function public.public_decision_stats() from public;
grant execute on function public.public_decision_stats() to anon, authenticated;
