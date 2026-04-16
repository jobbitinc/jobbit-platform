-- Navigator persistence table
create table if not exists public.navigator_profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  answers jsonb not null,
  matches jsonb not null,
  completed_steps jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_navigator_profiles_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_navigator_profiles_updated_at on public.navigator_profiles;
create trigger trg_navigator_profiles_updated_at
before update on public.navigator_profiles
for each row execute function public.set_navigator_profiles_updated_at();

alter table public.navigator_profiles enable row level security;

drop policy if exists "navigator_profiles_select_own" on public.navigator_profiles;
create policy "navigator_profiles_select_own"
on public.navigator_profiles
for select
using (auth.uid() = user_id);

drop policy if exists "navigator_profiles_insert_own" on public.navigator_profiles;
create policy "navigator_profiles_insert_own"
on public.navigator_profiles
for insert
with check (auth.uid() = user_id);

drop policy if exists "navigator_profiles_update_own" on public.navigator_profiles;
create policy "navigator_profiles_update_own"
on public.navigator_profiles
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
