alter table public.pending_questions
  add column if not exists updates_opt_in boolean not null default false;

grant insert (updates_opt_in) on public.pending_questions to anon;
