alter table public.profiles
  add column research_updates_opt_in boolean not null default false,
  add column research_updates_opted_in_at timestamptz;

comment on column public.profiles.research_updates_opt_in is
  'Separate, revocable consent to receive Solar Consumer Research site and research updates.';
