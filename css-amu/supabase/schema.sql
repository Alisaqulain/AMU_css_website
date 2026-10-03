-- Run in Supabase SQL Editor

create extension if not exists "pgcrypto";

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  year text not null default '',
  is_coming_soon boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.club_interests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  course text not null,
  enrollment_number text not null,
  phone_number text not null default '',
  semester text not null default '',
  club_name text not null,
  club_names text[] not null default '{}',
  not_interested boolean not null default false,
  other_club text,
  created_at timestamptz not null default now()
);

alter table public.events enable row level security;
alter table public.club_interests enable row level security;

create policy "Public can read events"
  on public.events for select
  to anon, authenticated
  using (true);

create policy "Service role manages events"
  on public.events for all
  to service_role
  using (true)
  with check (true);

create policy "Public can submit club interest"
  on public.club_interests for insert
  to anon, authenticated
  with check (true);

create policy "Service role full access club interests"
  on public.club_interests for all
  to service_role
  using (true)
  with check (true);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null default '',
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

create policy "Public can submit contact message"
  on public.contact_messages for insert
  to anon, authenticated
  with check (true);

create policy "Service role full access contact messages"
  on public.contact_messages for all
  to service_role
  using (true)
  with check (true);

insert into public.events (title, description, year, is_coming_soon) values
  ('AMUHACKS 6.0', 'Next AMUHACKS edition. More tracks and mentors on site.', '2026', true),
  ('AMUHACKS 5.0', 'A national-level hackathon bringing together students to build innovative solutions.', '2025', false),
  ('AMUHACKS 4.0', 'A flagship CSS hackathon focused on creativity, technology, and problem solving.', '2024', false),
  ('Capture The Flag', 'A cybersecurity-focused competition designed to test problem-solving and technical skills.', '2025', false)
on conflict do nothing;
