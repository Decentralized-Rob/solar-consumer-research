import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const storyPath = new URL("../app/cases/freedom-forever/warning-signs/page.tsx", import.meta.url);
const hubPath = new URL("../app/cases/freedom-forever/page.tsx", import.meta.url);
const sitemapPath = new URL("../app/sitemap.ts", import.meta.url);

test("publishes Freedom Forever Story 02 with source-backed search structure", async () => {
  const story = await readFile(storyPath, "utf8");

  assert.match(story, /Story 02 of 06/);
  assert.match(story, /Before the Bankruptcy: The Freedom Forever Warning Signs Were Already Public/);
  assert.match(story, /Freedom Forever Complaints & Warning Signs Before Bankruptcy/);
  assert.match(story, /What warning signs were public before Freedom Forever filed bankruptcy\?/);
  assert.match(story, /California Contractors State License Board/);
  assert.match(story, /Texas Attorney General/);
  assert.match(story, /Supplemental Declaration of Brett Bouchy/);
  assert.match(story, /"@type": "NewsArticle"/);
  assert.match(story, /CreativeWorkSeries/);
  assert.match(story, /\/cases\/freedom-forever\/what-happened/);
  assert.match(story, /\/cases\/freedom-forever/);
});

test("Freedom Forever hub marks Story 02 published and featured", async () => {
  const hub = await readFile(hubPath, "utf8");

  assert.match(hub, /number: "02"[\s\S]*?published: "September 13, 2026"[\s\S]*?href: "\/cases\/freedom-forever\/warning-signs"/);
  assert.match(hub, /2 of 6 stories published/);
  assert.match(hub, /href="\/cases\/freedom-forever\/warning-signs">Read the latest investigation/);
});

test("sitemap includes Freedom Forever Story 02", async () => {
  const sitemap = await readFile(sitemapPath, "utf8");
  assert.match(sitemap, /cases\/freedom-forever\/warning-signs/);
  assert.match(sitemap, /2026-09-13/);
});
