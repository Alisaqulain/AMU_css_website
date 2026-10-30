-- Run in Supabase SQL Editor

create extension if not exists "pgcrypto";

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  year text not null default '',
  is_coming_soon boolean not null default false,
  image_url text,
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

create table if not exists public.team_applications (
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
  resume_url text,
  resume_filename text,
  created_at timestamptz not null default now()
);

alter table public.team_applications enable row level security;

create policy "Public can submit team application"
  on public.team_applications for insert
  to anon, authenticated
  with check (true);

create policy "Service role full access team applications"
  on public.team_applications for all
  to service_role
  using (true)
  with check (true);

create table if not exists public.certificate_codes (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  label text not null default 'CS360 4.0',
  day_position text not null check (day_position in ('first', 'second', 'third')),
  status text not null default 'open' check (status in ('open', 'closed', 'expired')),
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists certificate_codes_code_idx on public.certificate_codes (code);

alter table public.certificate_codes enable row level security;

create policy "Public can read certificate codes"
  on public.certificate_codes for select
  to anon, authenticated
  using (true);

create policy "Service role manages certificate codes"
  on public.certificate_codes for all
  to service_role
  using (true)
  with check (true);

create table if not exists public.certificate_attendance (
  id uuid primary key default gen_random_uuid(),
  code_id uuid not null references public.certificate_codes (id) on delete cascade,
  name text not null,
  enrollment_number text not null,
  course text not null,
  phone_number text not null default '',
  semester text not null default '',
  day_position text not null,
  created_at timestamptz not null default now(),
  unique (code_id, enrollment_number)
);

create unique index if not exists certificate_attendance_enrollment_day_uidx
  on public.certificate_attendance (enrollment_number, day_position);

create index if not exists certificate_attendance_name_idx
  on public.certificate_attendance (lower(name));

alter table public.certificate_attendance enable row level security;

create policy "Public can insert attendance when claiming"
  on public.certificate_attendance for insert
  to anon, authenticated
  with check (true);

create policy "Public can verify certificates by name"
  on public.certificate_attendance for select
  to anon, authenticated
  using (true);

create policy "Service role full access certificate attendance"
  on public.certificate_attendance for all
  to service_role
  using (true)
  with check (true);

insert into public.events (title, description, year, is_coming_soon) values
  ('AMUHACKS 6.0', 'Next AMUHACKS edition. More tracks and mentors on site.', '2026', true),
  ('AMUHACKS 5.0', 'A national-level hackathon bringing together students to build innovative solutions.', '2025', false),
  ('AMUHACKS 4.0', 'A flagship CSS hackathon focused on creativity, technology, and problem solving.', '2024', false),
  ('Capture The Flag', 'A cybersecurity-focused competition designed to test problem-solving and technical skills.', '2025', false)
on conflict do nothing;
