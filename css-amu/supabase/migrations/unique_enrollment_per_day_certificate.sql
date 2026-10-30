-- One certificate per enrollment number per workshop day (first / second / third)
-- Run in Supabase SQL Editor

create unique index if not exists certificate_attendance_enrollment_day_uidx
  on public.certificate_attendance (enrollment_number, day_position);
