-- Keep the public contact intake deliberately narrow while making the stored
-- responses practical to review and analyze as volume grows.
--
-- The application already writes email, state_code, city, body, created_at,
-- and status into public.contact_requests from the server-side /api/contact
-- route after Turnstile verification.

comment on table public.contact_requests is
  'Consumer-submitted SolarComplaint.com contact requests. Contains personal information and is not publicly readable.';

comment on column public.contact_requests.email is
  'Contact email supplied by the visitor. Personal information; do not expose publicly.';
comment on column public.contact_requests.state_code is
  'Two-letter US state code supplied by the visitor.';
comment on column public.contact_requests.city is
  'City or town supplied by the visitor.';
comment on column public.contact_requests.body is
  'Visitor-provided summary of the solar situation or question.';
comment on column public.contact_requests.status is
  'Internal review state: received, reviewed, replied, or closed.';

create index if not exists contact_requests_created_at_idx
  on public.contact_requests (created_at desc);

create index if not exists contact_requests_status_created_at_idx
  on public.contact_requests (status, created_at desc);

create index if not exists contact_requests_state_created_at_idx
  on public.contact_requests (state_code, created_at desc);

-- Reassert the intended privacy boundary. The application inserts through a
-- server-side service-role client; browsers should have no direct table access.
alter table public.contact_requests enable row level security;
revoke all on table public.contact_requests from anon, authenticated;
drop policy if exists "contact_requests_anon_insert" on public.contact_requests;
