create type public.content_status as enum ('draft', 'reviewed', 'published', 'archived');
create type public.publisher_type as enum ('government', 'regulator', 'private_nonprofit');
create type public.resource_topic as enum ('complaints', 'utility', 'financing', 'records', 'programs');
create type public.question_status as enum ('submitted', 'researching', 'answered', 'closed');

create table public.states (
  code text primary key check (code ~ '^[A-Z]{2}$'),
  name text not null unique,
  is_active boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.source_domains (
  id uuid primary key default gen_random_uuid(),
  domain text not null unique check (domain = lower(domain) and domain !~ '[/:]'),
  publisher_name text not null,
  publisher_type public.publisher_type not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  state_code text not null references public.states(code),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table public.resources (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  state_code text references public.states(code),
  source_domain_id uuid not null references public.source_domains(id),
  title text not null check (char_length(title) between 4 and 160),
  summary text not null check (char_length(summary) between 20 and 800),
  topic public.resource_topic not null,
  url text not null check (url ~ '^https://'),
  status public.content_status not null default 'draft',
  last_verified_at date not null,
  published_at timestamptz,
  sort_order integer not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check ((status = 'published' and published_at is not null) or status <> 'published')
);

create table public.guides (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  state_code text references public.states(code),
  source_domain_id uuid not null references public.source_domains(id),
  title text not null check (char_length(title) between 4 and 160),
  summary text not null check (char_length(summary) between 20 and 800),
  time_label text not null,
  source_title text not null,
  source_url text not null check (source_url ~ '^https://'),
  status public.content_status not null default 'draft',
  last_verified_at date not null,
  published_at timestamptz,
  sort_order integer not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check ((status = 'published' and published_at is not null) or status <> 'published')
);

create table public.guide_steps (
  id uuid primary key default gen_random_uuid(),
  guide_id uuid not null references public.guides(id) on delete cascade,
  step_order smallint not null check (step_order between 1 and 30),
  title text not null check (char_length(title) between 3 and 120),
  detail text not null check (char_length(detail) between 10 and 600),
  unique (guide_id, step_order)
);

create table public.updates (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  state_code text references public.states(code),
  source_domain_id uuid not null references public.source_domains(id),
  title text not null check (char_length(title) between 4 and 180),
  summary text not null check (char_length(summary) between 20 and 1000),
  url text not null check (url ~ '^https://'),
  source_published_at date,
  status public.content_status not null default 'draft',
  last_verified_at date not null,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check ((status = 'published' and published_at is not null) or status <> 'published')
);

create table public.questions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  state_code text not null references public.states(code),
  body text not null check (char_length(body) between 20 and 4000),
  status public.question_status not null default 'submitted',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.question_responses (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.questions(id) on delete cascade,
  body text not null check (char_length(body) between 20 and 6000),
  sources jsonb not null default '[]'::jsonb check (jsonb_typeof(sources) = 'array'),
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);

create table public.audit_logs (
  id bigint generated always as identity primary key,
  actor_user_id uuid references auth.users(id),
  entity_type text not null,
  entity_id text not null,
  action text not null,
  detail jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index resources_state_status_sort_idx on public.resources (state_code, status, sort_order);
create index resources_topic_status_idx on public.resources (topic, status);
create index guides_state_status_sort_idx on public.guides (state_code, status, sort_order);
create index guide_steps_guide_order_idx on public.guide_steps (guide_id, step_order);
create index updates_state_status_published_idx on public.updates (state_code, status, published_at desc);
create index questions_user_created_idx on public.questions (user_id, created_at desc);
create index questions_status_created_idx on public.questions (status, created_at);
create index responses_question_created_idx on public.question_responses (question_id, created_at);
create index audit_entity_created_idx on public.audit_logs (entity_type, entity_id, created_at desc);

alter table public.states enable row level security;
alter table public.source_domains enable row level security;
alter table public.profiles enable row level security;
alter table public.admin_users enable row level security;
alter table public.resources enable row level security;
alter table public.guides enable row level security;
alter table public.guide_steps enable row level security;
alter table public.updates enable row level security;
alter table public.questions enable row level security;
alter table public.question_responses enable row level security;
alter table public.audit_logs enable row level security;

create policy states_public_read on public.states for select to anon, authenticated using (is_active);
create policy source_domains_public_read on public.source_domains for select to anon, authenticated using (is_active);

create policy profiles_owner_read on public.profiles for select to authenticated using ((select auth.uid()) = user_id);
create policy profiles_owner_insert on public.profiles for insert to authenticated with check ((select auth.uid()) = user_id);
create policy profiles_owner_update on public.profiles for update to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create policy admin_users_self_read on public.admin_users for select to authenticated using ((select auth.uid()) = user_id);

create policy resources_public_read on public.resources for select to anon, authenticated using (status = 'published');
create policy guides_public_read on public.guides for select to anon, authenticated using (status = 'published');
create policy guide_steps_public_read on public.guide_steps for select to anon, authenticated using (
  exists (select 1 from public.guides where guides.id = guide_steps.guide_id and guides.status = 'published')
);
create policy updates_public_read on public.updates for select to anon, authenticated using (status = 'published');

create policy questions_owner_read on public.questions for select to authenticated using ((select auth.uid()) = user_id);
create policy questions_owner_insert on public.questions for insert to authenticated with check ((select auth.uid()) = user_id);
create policy responses_owner_read on public.question_responses for select to authenticated using (
  exists (select 1 from public.questions where questions.id = question_responses.question_id and questions.user_id = (select auth.uid()))
);

create policy resources_admin_all on public.resources for all to authenticated
  using (exists (select 1 from public.admin_users where user_id = (select auth.uid())))
  with check (exists (select 1 from public.admin_users where user_id = (select auth.uid())));
create policy guides_admin_all on public.guides for all to authenticated
  using (exists (select 1 from public.admin_users where user_id = (select auth.uid())))
  with check (exists (select 1 from public.admin_users where user_id = (select auth.uid())));
create policy guide_steps_admin_all on public.guide_steps for all to authenticated
  using (exists (select 1 from public.admin_users where user_id = (select auth.uid())))
  with check (exists (select 1 from public.admin_users where user_id = (select auth.uid())));
create policy updates_admin_all on public.updates for all to authenticated
  using (exists (select 1 from public.admin_users where user_id = (select auth.uid())))
  with check (exists (select 1 from public.admin_users where user_id = (select auth.uid())));
create policy questions_admin_all on public.questions for all to authenticated
  using (exists (select 1 from public.admin_users where user_id = (select auth.uid())))
  with check (exists (select 1 from public.admin_users where user_id = (select auth.uid())));
create policy responses_admin_all on public.question_responses for all to authenticated
  using (exists (select 1 from public.admin_users where user_id = (select auth.uid())))
  with check (exists (select 1 from public.admin_users where user_id = (select auth.uid())));
create policy audit_admin_read on public.audit_logs for select to authenticated
  using (exists (select 1 from public.admin_users where user_id = (select auth.uid())));
create policy audit_admin_insert on public.audit_logs for insert to authenticated
  with check (exists (select 1 from public.admin_users where user_id = (select auth.uid())));

grant select on public.states, public.source_domains, public.resources, public.guides, public.guide_steps, public.updates to anon, authenticated;
grant select, insert, update on public.profiles to authenticated;
grant select on public.admin_users to authenticated;
grant select, insert on public.questions to authenticated;
grant select on public.question_responses to authenticated;
grant insert, update, delete on public.resources, public.guides, public.guide_steps, public.updates to authenticated;
grant update, delete on public.questions to authenticated;
grant insert, update, delete on public.question_responses to authenticated;
grant select, insert on public.audit_logs to authenticated;
grant usage, select on sequence public.audit_logs_id_seq to authenticated;

insert into public.states (code, name, is_active) values
  ('MA', 'Massachusetts', true),
  ('CT', 'Connecticut', false),
  ('RI', 'Rhode Island', false),
  ('NY', 'New York', false),
  ('NJ', 'New Jersey', false),
  ('PA', 'Pennsylvania', false),
  ('CA', 'California', false),
  ('TX', 'Texas', false),
  ('FL', 'Florida', false);

insert into public.source_domains (id, domain, publisher_name, publisher_type) values
  ('10000000-0000-4000-8000-000000000001', 'mass.gov', 'Commonwealth of Massachusetts', 'government'),
  ('10000000-0000-4000-8000-000000000002', 'consumerfinance.gov', 'Consumer Financial Protection Bureau', 'government'),
  ('10000000-0000-4000-8000-000000000003', 'reportfraud.ftc.gov', 'Federal Trade Commission', 'government'),
  ('10000000-0000-4000-8000-000000000004', 'bbb.org', 'Better Business Bureau', 'private_nonprofit');

insert into public.resources
  (id, slug, state_code, source_domain_id, title, summary, topic, url, status, last_verified_at, published_at, sort_order)
values
  ('20000000-0000-4000-8000-000000000001', 'ma-ago-consumer-complaint', 'MA', '10000000-0000-4000-8000-000000000001', 'File a Massachusetts consumer complaint', 'The Attorney General''s Consumer Advocacy and Response Division accepts complaints involving businesses, home improvement contracts, financing, and utility disputes.', 'complaints', 'https://www.mass.gov/how-to/file-a-consumer-complaint', 'published', '2026-08-16', now(), 10),
  ('20000000-0000-4000-8000-000000000002', 'ma-dpu-utility-complaint', 'MA', '10000000-0000-4000-8000-000000000001', 'File a utility complaint with the DPU', 'Instructions for Massachusetts residents with unresolved concerns involving a regulated electric, gas, or water company.', 'utility', 'https://www.mass.gov/how-to/file-a-complaint-involving-a-gas-electric-or-water-company', 'published', '2026-08-16', now(), 20),
  ('20000000-0000-4000-8000-000000000003', 'ma-dpu-records', 'MA', '10000000-0000-4000-8000-000000000001', 'Request public records from the DPU', 'Official instructions for locating DPU filings and requesting records that are not already available online.', 'records', 'https://www.mass.gov/how-to/request-a-public-record-from-the-dpu', 'published', '2026-08-16', now(), 30),
  ('20000000-0000-4000-8000-000000000004', 'ma-electric-company', 'MA', '10000000-0000-4000-8000-000000000001', 'Find your electric company', 'Search the state''s official city-by-city list to identify the electric company serving an address.', 'utility', 'https://www.mass.gov/info-details/find-my-electric-gas-and-water-company', 'published', '2026-08-16', now(), 40),
  ('20000000-0000-4000-8000-000000000005', 'ma-solar-consumer-protection', 'MA', '10000000-0000-4000-8000-000000000001', 'Massachusetts solar consumer protection information', 'State information about solar marketing claims, consumer precautions, complaint channels, and current program notices.', 'programs', 'https://www.mass.gov/info-details/consumer-protection', 'published', '2026-08-16', now(), 50),
  ('20000000-0000-4000-8000-000000000006', 'federal-cfpb-complaint', null, '10000000-0000-4000-8000-000000000002', 'Submit a consumer finance complaint', 'The CFPB accepts complaints about consumer financial products and services and sends eligible complaints to the company for a response.', 'financing', 'https://www.consumerfinance.gov/complaint/', 'published', '2026-08-16', now(), 60),
  ('20000000-0000-4000-8000-000000000007', 'federal-ftc-report-fraud', null, '10000000-0000-4000-8000-000000000003', 'Report fraud to the FTC', 'The Federal Trade Commission''s official reporting channel for scams, deceptive practices, and other consumer fraud.', 'complaints', 'https://reportfraud.ftc.gov/', 'published', '2026-08-16', now(), 70),
  ('20000000-0000-4000-8000-000000000008', 'bbb-complaint', null, '10000000-0000-4000-8000-000000000004', 'File a BBB complaint', 'BBB''s complaint channel may send a complaint to a business for a response. BBB is a private nonprofit, not a government agency or regulator.', 'complaints', 'https://www.bbb.org/file-a-complaint', 'published', '2026-08-16', now(), 80);

insert into public.guides
  (id, slug, state_code, source_domain_id, title, summary, time_label, source_title, source_url, status, last_verified_at, published_at, sort_order)
values
  ('30000000-0000-4000-8000-000000000001', 'organize-record', null, '10000000-0000-4000-8000-000000000001', 'Build a clean project record', 'Create a dated, source-backed file before contacting an agency or asking a research question.', '15-30 minutes', 'Resolving a consumer complaint', 'https://www.mass.gov/info-details/resolving-a-consumer-complaint', 'published', '2026-08-16', now(), 10),
  ('30000000-0000-4000-8000-000000000002', 'ma-ago-complaint-guide', 'MA', '10000000-0000-4000-8000-000000000001', 'Prepare a Massachusetts AGO complaint', 'A plain-language checklist based on the Attorney General''s published filing instructions.', '20-40 minutes', 'File a consumer complaint', 'https://www.mass.gov/how-to/file-a-consumer-complaint', 'published', '2026-08-16', now(), 20),
  ('30000000-0000-4000-8000-000000000003', 'ma-30-day-information', 'MA', '10000000-0000-4000-8000-000000000001', 'Review the official 30-day demand letter information', 'An index of the information the Massachusetts Courts page says a letter should contain. This is public information, not individualized guidance.', 'Official checklist', '30 Day Demand Letter', 'https://www.mass.gov/info-details/30-day-demand-letter', 'published', '2026-08-16', now(), 30),
  ('30000000-0000-4000-8000-000000000004', 'bbb-complaint-guide', null, '10000000-0000-4000-8000-000000000004', 'Prepare a BBB complaint', 'A simple checklist for using BBB''s own complaint channel. BBB is a private nonprofit, not a regulator.', '10-20 minutes', 'BBB complaint portal', 'https://www.bbb.org/file-a-complaint', 'published', '2026-08-16', now(), 40);

insert into public.guide_steps (guide_id, step_order, title, detail) values
  ('30000000-0000-4000-8000-000000000001', 1, 'Create a timeline', 'List the major events in date order using short, factual descriptions.'),
  ('30000000-0000-4000-8000-000000000001', 2, 'Gather primary documents', 'Keep contracts, change orders, designs, permits, inspection records, bills, and written correspondence together.'),
  ('30000000-0000-4000-8000-000000000001', 3, 'Keep originals intact', 'Submit copies when requested and retain original files and unedited messages.'),
  ('30000000-0000-4000-8000-000000000001', 4, 'Write down the unresolved question', 'Separate what the documents show from what is still missing or unclear.'),
  ('30000000-0000-4000-8000-000000000002', 1, 'Confirm the channel', 'Review the AGO page to make sure the complaint type is accepted.'),
  ('30000000-0000-4000-8000-000000000002', 2, 'Summarize the issue', 'Use dates, names, amounts, and a short description of what remains unresolved.'),
  ('30000000-0000-4000-8000-000000000002', 3, 'Follow the document instructions', 'The AGO says not to send additional documentation until requested.'),
  ('30000000-0000-4000-8000-000000000002', 4, 'Save your submission', 'Use the option to save or print a copy after filing.'),
  ('30000000-0000-4000-8000-000000000003', 1, 'Read the state page first', 'The official page explains when this process is used and lists exceptions.'),
  ('30000000-0000-4000-8000-000000000003', 2, 'Review the required information', 'The state lists identity, the conduct at issue, dates and facts, the claimed injury, and the requested relief.'),
  ('30000000-0000-4000-8000-000000000003', 3, 'Use the state sample only as a reference', 'Do not rely on a third-party template or assume a sample fits a particular situation.'),
  ('30000000-0000-4000-8000-000000000003', 4, 'Track delivery and response dates', 'The state recommends keeping a copy and describes certified and regular mail options.'),
  ('30000000-0000-4000-8000-000000000004', 1, 'Confirm the business', 'Use the business name and location requested by the BBB form.'),
  ('30000000-0000-4000-8000-000000000004', 2, 'Keep the account factual', 'Use a short timeline and describe the unresolved issue without speculation.'),
  ('30000000-0000-4000-8000-000000000004', 3, 'State the requested resolution', 'Describe the response or correction you are asking the business to consider.'),
  ('30000000-0000-4000-8000-000000000004', 4, 'Save the case information', 'Keep the confirmation and any business response with the rest of your project record.');

insert into public.updates
  (id, slug, state_code, source_domain_id, title, summary, url, source_published_at, status, last_verified_at, published_at)
values
  ('40000000-0000-4000-8000-000000000001', 'ma-solar-for-all-status', 'MA', '10000000-0000-4000-8000-000000000001', 'Massachusetts Solar for All remains paused', 'The state''s consumer protection page says program funding is paused and warns residents about organizations claiming to represent the program.', 'https://www.mass.gov/info-details/consumer-protection', '2025-08-07', 'published', '2026-08-16', now()),
  ('40000000-0000-4000-8000-000000000002', 'ma-consumer-law-update', 'MA', '10000000-0000-4000-8000-000000000001', 'Massachusetts refreshed its consumer protection law index', 'The state''s law library page collects current statutes, regulations, forms, court materials, and official complaint channels.', 'https://www.mass.gov/info-details/massachusetts-law-about-consumer-protection', '2026-07-01', 'published', '2026-08-16', now());

