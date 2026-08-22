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

test("email verification handoff uses a server-held pending intake", async () => {
  const accountPanel = await read("components/account-panel.tsx");
  const pendingRoute = await read("app/api/questions/pending/route.ts");
  const claimRoute = await read("app/api/questions/route.ts");

  assert.doesNotMatch(accountPanel, /pending-question/);
  assert.match(accountPanel, /fetch\("\/api\/questions\/pending"/);
  assert.match(accountPanel, /submitQuestionPayload\(session, \{ claimPending: true \}\)/);
  assert.match(accountPanel, /emailRedirectTo: `\$\{window\.location\.origin\}\/\#questions`/);
  assert.match(pendingRoute, /email_hash: await sha256\(email\)/);
  assert.match(pendingRoute, /updates_opt_in: updatesOptIn/);
  assert.match(claimRoute, /\.from\("pending_questions"\)/);
  assert.match(claimRoute, /payload\?\.claimPending === true/);
  assert.match(claimRoute, /pending_question_id: pending\.id/);
});

test("featured guides keep their stable slug after the API loads", async () => {
  const guideRoute = await read("app/api/guides/route.ts");
  const contentHook = await read("components/home/use-research-content.ts");

  assert.match(guideRoute, /select\("id,slug,state_code/);
  assert.match(contentHook, /id: item\.slug/);
});
