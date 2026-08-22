drop policy if exists pending_questions_verified_read on public.pending_questions;
drop policy if exists pending_questions_verified_delete on public.pending_questions;

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
