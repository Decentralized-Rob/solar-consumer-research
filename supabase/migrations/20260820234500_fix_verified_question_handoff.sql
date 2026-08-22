-- Keep historical questions valid when city was not collected.
alter table public.questions
  alter column city drop not null,
  alter column city drop default;

alter table public.questions
  drop constraint if exists questions_city_length_check;

alter table public.questions
  add constraint questions_city_length_check
  check (city is null or char_length(city) between 2 and 100) not valid;

alter table public.questions
  validate constraint questions_city_length_check;

-- A pending intake survives the email magic-link handoff without exposing its
-- contents in the URL. The random id is useful only after the same email has
-- been verified by Supabase Auth.
create table public.pending_questions (
  id uuid primary key,
  email_hash text not null check (email_hash ~ '^[0-9a-f]{64}$'),
  state_code text not null check (state_code ~ '^[A-Z]{2}$'),
  city text not null check (char_length(city) between 2 and 100),
  body text not null check (char_length(body) between 20 and 4000),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '1 hour'),
  check (expires_at > created_at and expires_at <= created_at + interval '1 hour')
);

alter table public.pending_questions enable row level security;

revoke all on table public.pending_questions from anon, authenticated;
grant insert (id, email_hash, state_code, city, body) on public.pending_questions to anon;
grant select, delete on public.pending_questions to authenticated;

create policy pending_questions_anon_insert
on public.pending_questions
for insert
to anon
with check (
  char_length(city) between 2 and 100
  and char_length(body) between 20 and 4000
);

create policy pending_questions_verified_read
on public.pending_questions
for select
to authenticated
using (
  email_hash = encode(
    extensions.digest(lower(coalesce(((select auth.jwt()) ->> 'email'), '')), 'sha256'),
    'hex'
  )
);

create policy pending_questions_verified_delete
on public.pending_questions
for delete
to authenticated
using (
  email_hash = encode(
    extensions.digest(lower(coalesce(((select auth.jwt()) ->> 'email'), '')), 'sha256'),
    'hex'
  )
);

alter table public.questions
  add column if not exists pending_question_id uuid;

create unique index if not exists questions_pending_question_id_idx
  on public.questions (pending_question_id)
  where pending_question_id is not null;
