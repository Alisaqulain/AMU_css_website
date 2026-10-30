-- Team applications, CS360 certificates / attendance, event images
-- Run in Supabase SQL Editor (you already have club_interests, contact_messages, events)

-- Event cover image
alter table public.events
  add column if not exists image_url text;

-- Core team applications (join the team)
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

-- QR / barcode sessions for CS360 workshop certificates
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

create policy "Public can read open certificate codes"
  on public.certificate_codes for select
  to anon, authenticated
  using (true);

create policy "Service role manages certificate codes"
  on public.certificate_codes for all
  to service_role
  using (true)
  with check (true);

-- Attendance + issued certificates from barcode scan
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

-- One certificate per enrollment per workshop day (even across different QR codes)
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
