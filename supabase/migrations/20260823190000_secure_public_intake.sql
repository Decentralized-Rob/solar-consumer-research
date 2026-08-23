revoke all on table public.contact_requests from anon, authenticated;
drop policy if exists "contact_requests_anon_insert" on public.contact_requests;

create table public.source_submissions (
  id uuid primary key,
  url text not null check (char_length(url) between 8 and 2048),
  title text check (title is null or char_length(title) between 1 and 200),
  note text not null check (char_length(note) between 20 and 2000),
  email text check (email is null or char_length(email) between 3 and 320),
  created_at timestamptz not null default now(),
  status text not null default 'received' check (status in ('received', 'reviewed', 'added', 'declined'))
);

alter table public.source_submissions enable row level security;
revoke all on table public.source_submissions from anon, authenticated;
