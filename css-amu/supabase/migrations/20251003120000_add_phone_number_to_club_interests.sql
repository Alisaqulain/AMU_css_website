alter table public.club_interests
  add column if not exists phone_number text not null default '';

comment on column public.club_interests.phone_number is
  'Contact phone or mobile number from interest form';
