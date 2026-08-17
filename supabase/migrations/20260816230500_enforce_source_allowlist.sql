create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to authenticated, service_role;

create or replace function private.enforce_source_domain()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
declare
  allowed_domain text;
  submitted_host text;
  submitted_url text;
begin
  submitted_url := case when tg_table_name = 'guides' then new.source_url else new.url end;
  submitted_host := lower(split_part(regexp_replace(submitted_url, '^https://', ''), '/', 1));

  select domain into allowed_domain
  from public.source_domains
  where id = new.source_domain_id and is_active;

  if allowed_domain is null then
    raise exception 'Source domain is not active';
  end if;

  if submitted_host <> allowed_domain and submitted_host not like '%.' || allowed_domain then
    raise exception 'Source URL does not match its allowlisted domain';
  end if;

  return new;
end;
$$;

revoke all on function private.enforce_source_domain() from public;
grant execute on function private.enforce_source_domain() to authenticated, service_role;

create trigger resources_enforce_source_domain
before insert or update of url, source_domain_id on public.resources
for each row execute function private.enforce_source_domain();

create trigger guides_enforce_source_domain
before insert or update of source_url, source_domain_id on public.guides
for each row execute function private.enforce_source_domain();

create trigger updates_enforce_source_domain
before insert or update of url, source_domain_id on public.updates
for each row execute function private.enforce_source_domain();

