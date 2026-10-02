-- Keep public statistics in an RLS-protected summary table. Trigger functions
-- live outside exposed schemas and are not executable through the Data API.
create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create table public.decision_stats (
  location_id uuid primary key references public.locations(id),
  total bigint not null default 0 check (total >= 0),
  ecology bigint not null default 0 check (ecology >= 0),
  balanced bigint not null default 0 check (balanced >= 0),
  development bigint not null default 0 check (development >= 0)
);

alter table public.decision_stats enable row level security;
revoke all on public.decision_stats from anon, authenticated;
grant select on public.decision_stats to anon, authenticated;
create policy "Anyone can read aggregate decision counts"
  on public.decision_stats for select to anon, authenticated using (true);

-- Snapshot the category on each completed result so a later cascade delete
-- can decrement the right counter even if the decision was already removed.
alter table public.simulation_results
  add column stats_location_id uuid references public.locations(id),
  add column stats_decision_type text check (stats_decision_type in ('ecology', 'balanced', 'development')),
  add column stats_contributes boolean not null default false;

update public.simulation_results r
set stats_location_id = d.location_id,
    stats_decision_type = d.decision_type,
    stats_contributes = not d.is_test
from public.decisions d
where d.id = r.decision_id;

alter table public.simulation_results
  alter column stats_location_id set not null,
  alter column stats_decision_type set not null;

insert into public.decision_stats (location_id, total, ecology, balanced, development)
select l.id,
       count(r.id) filter (where r.stats_contributes)::bigint,
       count(r.id) filter (where r.stats_contributes and r.stats_decision_type = 'ecology')::bigint,
       count(r.id) filter (where r.stats_contributes and r.stats_decision_type = 'balanced')::bigint,
       count(r.id) filter (where r.stats_contributes and r.stats_decision_type = 'development')::bigint
from public.locations l
left join public.simulation_results r on r.stats_location_id = l.id
group by l.id;

create function private.capture_result_stats()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
  select d.location_id, d.decision_type, not d.is_test
    into new.stats_location_id, new.stats_decision_type, new.stats_contributes
  from public.decisions d where d.id = new.decision_id;
  if not found then
    raise exception 'Decision not found for simulation result';
  end if;
  return new;
end;
$$;

create function private.adjust_decision_stats()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
  if tg_op = 'INSERT' and new.stats_contributes then
    insert into public.decision_stats (location_id, total, ecology, balanced, development)
    values (new.stats_location_id, 1,
      (new.stats_decision_type = 'ecology')::int,
      (new.stats_decision_type = 'balanced')::int,
      (new.stats_decision_type = 'development')::int)
    on conflict (location_id) do update
    set total = public.decision_stats.total + excluded.total,
        ecology = public.decision_stats.ecology + excluded.ecology,
        balanced = public.decision_stats.balanced + excluded.balanced,
        development = public.decision_stats.development + excluded.development;
  elsif tg_op = 'DELETE' and old.stats_contributes then
    update public.decision_stats
    set total = total - 1,
        ecology = ecology - (old.stats_decision_type = 'ecology')::int,
        balanced = balanced - (old.stats_decision_type = 'balanced')::int,
        development = development - (old.stats_decision_type = 'development')::int
    where location_id = old.stats_location_id;
  end if;
  if tg_op = 'DELETE' then return old; end if;
  return new;
end;
$$;

revoke all on function private.capture_result_stats() from public, anon, authenticated;
revoke all on function private.adjust_decision_stats() from public, anon, authenticated;

create trigger capture_result_stats_before_insert
before insert on public.simulation_results
for each row execute function private.capture_result_stats();

create trigger adjust_decision_stats_after_change
after insert or delete on public.simulation_results
for each row execute function private.adjust_decision_stats();

create or replace function public.public_decision_stats()
returns table (total bigint, ecology bigint, balanced bigint, development bigint)
language sql stable security invoker set search_path = ''
as $$
  select s.total, s.ecology, s.balanced, s.development
  from public.decision_stats s
  where s.location_id = '3ac80bf0-a71f-4cf9-86ba-fced98009605'::uuid;
$$;
