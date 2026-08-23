create table public.contact_requests (
  id uuid primary key,
  email text not null check (char_length(email) between 3 and 320),
  state_code text not null check (state_code ~ '^[A-Z]{2}$'),
  city text not null check (char_length(city) between 2 and 100),
  body text not null check (char_length(body) between 20 and 4000),
  created_at timestamptz not null default now(),
  status text not null default 'received' check (status in ('received', 'reviewed', 'replied', 'closed'))
);

alter table public.contact_requests enable row level security;
revoke all on table public.contact_requests from anon, authenticated;
grant insert (id, email, state_code, city, body) on table public.contact_requests to anon;

create policy "contact_requests_anon_insert"
on public.contact_requests
for insert
to anon
with check (
  char_length(email) between 3 and 320
  and state_code ~ '^[A-Z]{2}$'
  and char_length(city) between 2 and 100
  and char_length(body) between 20 and 4000
);
