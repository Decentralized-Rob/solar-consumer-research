create index audit_logs_actor_user_idx on public.audit_logs (actor_user_id);
create index guides_source_domain_idx on public.guides (source_domain_id);
create index profiles_state_idx on public.profiles (state_code);
create index responses_created_by_idx on public.question_responses (created_by);
create index questions_state_idx on public.questions (state_code);
create index resources_source_domain_idx on public.resources (source_domain_id);
create index updates_source_domain_idx on public.updates (source_domain_id);

drop policy resources_public_read on public.resources;
drop policy resources_admin_all on public.resources;
create policy resources_anon_read on public.resources for select to anon using (status = 'published');
create policy resources_authenticated_read on public.resources for select to authenticated using (
  status = 'published' or exists (select 1 from public.admin_users where user_id = (select auth.uid()))
);
create policy resources_admin_insert on public.resources for insert to authenticated
  with check (exists (select 1 from public.admin_users where user_id = (select auth.uid())));
create policy resources_admin_update on public.resources for update to authenticated
  using (exists (select 1 from public.admin_users where user_id = (select auth.uid())))
  with check (exists (select 1 from public.admin_users where user_id = (select auth.uid())));
create policy resources_admin_delete on public.resources for delete to authenticated
  using (exists (select 1 from public.admin_users where user_id = (select auth.uid())));

drop policy guides_public_read on public.guides;
drop policy guides_admin_all on public.guides;
create policy guides_anon_read on public.guides for select to anon using (status = 'published');
create policy guides_authenticated_read on public.guides for select to authenticated using (
  status = 'published' or exists (select 1 from public.admin_users where user_id = (select auth.uid()))
);
create policy guides_admin_insert on public.guides for insert to authenticated
  with check (exists (select 1 from public.admin_users where user_id = (select auth.uid())));
create policy guides_admin_update on public.guides for update to authenticated
  using (exists (select 1 from public.admin_users where user_id = (select auth.uid())))
  with check (exists (select 1 from public.admin_users where user_id = (select auth.uid())));
create policy guides_admin_delete on public.guides for delete to authenticated
  using (exists (select 1 from public.admin_users where user_id = (select auth.uid())));

drop policy guide_steps_public_read on public.guide_steps;
drop policy guide_steps_admin_all on public.guide_steps;
create policy guide_steps_anon_read on public.guide_steps for select to anon using (
  exists (select 1 from public.guides where guides.id = guide_steps.guide_id and guides.status = 'published')
);
create policy guide_steps_authenticated_read on public.guide_steps for select to authenticated using (
  exists (select 1 from public.guides where guides.id = guide_steps.guide_id and guides.status = 'published')
  or exists (select 1 from public.admin_users where user_id = (select auth.uid()))
);
create policy guide_steps_admin_insert on public.guide_steps for insert to authenticated
  with check (exists (select 1 from public.admin_users where user_id = (select auth.uid())));
create policy guide_steps_admin_update on public.guide_steps for update to authenticated
  using (exists (select 1 from public.admin_users where user_id = (select auth.uid())))
  with check (exists (select 1 from public.admin_users where user_id = (select auth.uid())));
create policy guide_steps_admin_delete on public.guide_steps for delete to authenticated
  using (exists (select 1 from public.admin_users where user_id = (select auth.uid())));

drop policy updates_public_read on public.updates;
drop policy updates_admin_all on public.updates;
create policy updates_anon_read on public.updates for select to anon using (status = 'published');
create policy updates_authenticated_read on public.updates for select to authenticated using (
  status = 'published' or exists (select 1 from public.admin_users where user_id = (select auth.uid()))
);
create policy updates_admin_insert on public.updates for insert to authenticated
  with check (exists (select 1 from public.admin_users where user_id = (select auth.uid())));
create policy updates_admin_update on public.updates for update to authenticated
  using (exists (select 1 from public.admin_users where user_id = (select auth.uid())))
  with check (exists (select 1 from public.admin_users where user_id = (select auth.uid())));
create policy updates_admin_delete on public.updates for delete to authenticated
  using (exists (select 1 from public.admin_users where user_id = (select auth.uid())));

drop policy questions_owner_read on public.questions;
drop policy questions_owner_insert on public.questions;
drop policy questions_admin_all on public.questions;
create policy questions_authenticated_read on public.questions for select to authenticated using (
  (select auth.uid()) = user_id or exists (select 1 from public.admin_users where user_id = (select auth.uid()))
);
create policy questions_authenticated_insert on public.questions for insert to authenticated with check (
  (select auth.uid()) = user_id or exists (select 1 from public.admin_users where user_id = (select auth.uid()))
);
create policy questions_admin_update on public.questions for update to authenticated
  using (exists (select 1 from public.admin_users where user_id = (select auth.uid())))
  with check (exists (select 1 from public.admin_users where user_id = (select auth.uid())));
create policy questions_admin_delete on public.questions for delete to authenticated
  using (exists (select 1 from public.admin_users where user_id = (select auth.uid())));

drop policy responses_owner_read on public.question_responses;
drop policy responses_admin_all on public.question_responses;
create policy responses_authenticated_read on public.question_responses for select to authenticated using (
  exists (select 1 from public.questions where questions.id = question_responses.question_id and questions.user_id = (select auth.uid()))
  or exists (select 1 from public.admin_users where user_id = (select auth.uid()))
);
create policy responses_admin_insert on public.question_responses for insert to authenticated
  with check (exists (select 1 from public.admin_users where user_id = (select auth.uid())));
create policy responses_admin_update on public.question_responses for update to authenticated
  using (exists (select 1 from public.admin_users where user_id = (select auth.uid())))
  with check (exists (select 1 from public.admin_users where user_id = (select auth.uid())));
create policy responses_admin_delete on public.question_responses for delete to authenticated
  using (exists (select 1 from public.admin_users where user_id = (select auth.uid())));

