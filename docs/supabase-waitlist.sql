-- Waitlist API uses SUPABASE_SERVICE_ROLE_KEY (server only). That key bypasses RLS.
-- If you use the anon key by mistake, inserts will fail (RLS blocks everything below).
-- Get the service_role secret from Supabase Dashboard → Project Settings → API.

create table if not exists public.waitlist_leads (
  id bigint generated always as identity primary key,
  first_name text not null,
  last_name text not null default '',
  email text not null unique,
  age int,
  zip text not null default '',
  role text not null default '',
  created_at timestamptz not null default now()
);

alter table public.waitlist_leads enable row level security;

drop policy if exists "waitlist_no_direct_access" on public.waitlist_leads;
create policy "waitlist_no_direct_access"
  on public.waitlist_leads
  for all
  using (false)
  with check (false);
