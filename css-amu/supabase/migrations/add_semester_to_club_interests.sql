-- Run in Supabase SQL Editor if club_interests already exists without semester
alter table public.club_interests
  add column if not exists semester text not null default '1';
