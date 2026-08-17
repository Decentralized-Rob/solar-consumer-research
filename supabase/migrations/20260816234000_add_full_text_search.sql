alter table public.resources
  add column search_vector tsvector generated always as (
    setweight(to_tsvector('english'::regconfig, coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english'::regconfig, coalesce(summary, '')), 'B')
  ) stored;

alter table public.guides
  add column search_vector tsvector generated always as (
    setweight(to_tsvector('english'::regconfig, coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english'::regconfig, coalesce(summary, '')), 'B') ||
    setweight(to_tsvector('english'::regconfig, coalesce(source_title, '')), 'C')
  ) stored;

alter table public.updates
  add column search_vector tsvector generated always as (
    setweight(to_tsvector('english'::regconfig, coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english'::regconfig, coalesce(summary, '')), 'B')
  ) stored;

create index resources_published_search_idx
  on public.resources using gin (search_vector)
  where status = 'published';

create index guides_published_search_idx
  on public.guides using gin (search_vector)
  where status = 'published';

create index updates_published_search_idx
  on public.updates using gin (search_vector)
  where status = 'published';
