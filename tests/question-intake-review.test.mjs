import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("city migration accepts historical rows without a city", async () => {
  const migration = await read("supabase/migrations/20260820233000_add_question_city_and_states.sql");

  assert.match(migration, /add column if not exists city text;/);
  assert.match(migration, /city is null or char_length\(city\) between 2 and 100/);
  assert.doesNotMatch(migration, /city text not null default ''/);
});

test("Supabase configuration fails closed without explicit environment values", async () => {
  const config = await read("lib/supabase/config.ts");

  assert.match(config, /process\.env\.NEXT_PUBLIC_SUPABASE_URL\?\.trim\(\)/);
  assert.match(config, /process\.env\.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY\?\.trim\(\)/);
  assert.doesNotMatch(config, /zuwxlbcdpvijnkzxmftc\.supabase\.co/);
  assert.doesNotMatch(config, /sb_publishable_Sga6OrGH5zRDgL_6UtyOsw_OlmJE1B6/);
  assert.match(config, /throw new Error\("Supabase public configuration is missing\."\)/);
});

test("direct contact intake records the request and notifies the research team", async () => {
  const accountPanel = await read("components/account-panel.tsx");
  const contactRoute = await read("app/api/contact/route.ts");

  assert.match(accountPanel, /fetch\("\/api\/contact"/);
  assert.doesNotMatch(accountPanel, /signInWithOtp/);
  assert.match(accountPanel, /TurnstileWidget/);
  assert.match(accountPanel, /Question received/);
  assert.match(contactRoute, /verifyTurnstile/);
  assert.match(contactRoute, /createSupabaseAdminClient/);
  assert.match(contactRoute, /formsubmit\.co\/ajax\/rbeland21@gmail\.com/);
  assert.match(contactRoute, /_captcha: "false"/);
  assert.match(contactRoute, /emailResult\?\.success === true \|\| emailResult\?\.success === "true"/);
});

test("public forms require server-side Turnstile verification", async () => {
  const contactRoute = await read("app/api/contact/route.ts");
  const sourceRoute = await read("app/api/source-submissions/route.ts");
  const sourceForm = await read("components/link-submission-form.tsx");
  const migration = await read("supabase/migrations/20260823190000_secure_public_intake.sql");

  assert.match(contactRoute, /verifyTurnstile/);
  assert.match(sourceRoute, /verifyTurnstile/);
  assert.match(sourceForm, /TurnstileWidget/);
  assert.match(migration, /revoke all on table public\.contact_requests from anon, authenticated/);
  assert.match(migration, /create table public\.source_submissions/);
});

test("featured guides keep their stable slug after the API loads", async () => {
  const guideRoute = await read("app/api/guides/route.ts");
  const contentHook = await read("components/home/use-research-content.ts");

  assert.match(guideRoute, /select\("id,slug,state_code/);
  assert.match(contentHook, /id: item\.slug/);
});
