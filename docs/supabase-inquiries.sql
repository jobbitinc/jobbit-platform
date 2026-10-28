-- Demo / partnership inquiries from the corporate site contact form (/contact → /api/inquiry).
-- Inserted server-side with SUPABASE_SERVICE_ROLE_KEY, which bypasses RLS.

create table if not exists public.partner_inquiries (
  id bigint generated always as identity primary key,
  inquiry_type text not null check (inquiry_type in ('school', 'employer', 'workforce', 'community', 'funder', 'other')),
  intent text not null default 'general' check (intent in ('demo', 'partnership', 'general')),
  first_name text not null,
  last_name text not null,
  email text not null,
  organization text not null,
  job_title text not null default '',
  phone text not null default '',
  state text not null default '',
  message text not null default '',
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create index if not exists partner_inquiries_created_at_idx on public.partner_inquiries (created_at desc);

alter table public.partner_inquiries enable row level security;

drop policy if exists "partner_inquiries_no_direct_access" on public.partner_inquiries;
create policy "partner_inquiries_no_direct_access"
  on public.partner_inquiries
  for all
  using (false)
  with check (false);
