alter table public.club_interests
  add column if not exists club_names text[] not null default '{}';

alter table public.club_interests
  add column if not exists not_interested boolean not null default false;
