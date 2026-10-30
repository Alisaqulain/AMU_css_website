-- Admin-issued certificates with a unique serial number + public verification
-- Run in Supabase SQL Editor (after add_team_certificates_events_image.sql)

create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  serial text not null unique,
  name text not null,
  enrollment_number text,
  course text,
  label text not null default 'CS360 4.0',
  day_position text not null check (day_position in ('first', 'second', 'third')),
  status text not null default 'valid' check (status in ('valid', 'revoked')),
  created_at timestamptz not null default now()
);

create index if not exists certificates_name_idx
  on public.certificates (lower(name));

alter table public.certificates enable row level security;

drop policy if exists "Public can verify issued certificates" on public.certificates;
create policy "Public can verify issued certificates"
  on public.certificates for select
  to anon, authenticated
  using (true);

drop policy if exists "Service role manages issued certificates" on public.certificates;
create policy "Service role manages issued certificates"
  on public.certificates for all
  to service_role
  using (true)
  with check (true);

-- Give every certificate already claimed through the old QR flow a serial number
insert into public.certificates
  (serial, name, enrollment_number, course, label, day_position, created_at)
select
  'CSS-' || upper(substr(md5(a.id::text || random()::text), 1, 8)),
  a.name,
  a.enrollment_number,
  a.course,
  coalesce(c.label, 'CS360 4.0'),
  a.day_position,
  a.created_at
from public.certificate_attendance a
left join public.certificate_codes c on c.id = a.code_id
where not exists (
  select 1 from public.certificates x
  where x.enrollment_number = a.enrollment_number
    and x.day_position = a.day_position
);

-- Creative Team was renamed to Editorial Team
update public.club_interests
  set club_name = 'Editorial Team' where club_name = 'Creative Team';
update public.club_interests
  set club_names = array_replace(club_names, 'Creative Team', 'Editorial Team')
  where 'Creative Team' = any (club_names);
update public.team_applications
  set club_name = 'Editorial Team' where club_name = 'Creative Team';
update public.team_applications
  set club_names = array_replace(club_names, 'Creative Team', 'Editorial Team')
  where 'Creative Team' = any (club_names);
