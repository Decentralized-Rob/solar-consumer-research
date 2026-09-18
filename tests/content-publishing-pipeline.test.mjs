import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const registryPath = new URL("../lib/research-stories.ts", import.meta.url);
const homePath = new URL("../components/home/latest-research.tsx", import.meta.url);
const statePath = new URL("../components/state-resource-page.tsx", import.meta.url);
const sitemapPath = new URL("../app/sitemap.ts", import.meta.url);
const authorPath = new URL("../app/authors/jules-young/page.tsx", import.meta.url);

test("research registry owns discovery metadata and selectors", async () => {
  const registry = await readFile(registryPath, "utf8");
  assert.match(registry, /authorSlug\?: string/);
  assert.match(registry, /section\?: "Short Read" \| "Research"/);
  assert.match(registry, /getResearchStoriesForState/);
  assert.match(registry, /getResearchStoriesForCompany/);
  assert.match(registry, /getResearchStoriesForAuthor/);
  assert.match(registry, /getLatestResearchStories/);
  assert.match(registry, /getLatestResearchModifiedDate/);
});

test("homepage, state pages, author page and sitemap discover stories from registry", async () => {
  const [home, state, sitemap, author] = await Promise.all([
    readFile(homePath, "utf8"),
    readFile(statePath, "utf8"),
    readFile(sitemapPath, "utf8"),
    readFile(authorPath, "utf8"),
  ]);

  assert.match(home, /getLatestResearchStories\(3\)/);
  assert.doesNotMatch(home, /index === 0/);
  assert.match(state, /getResearchStoriesForState\(state\.code\)/);
  assert.match(author, /getResearchStoriesForAuthor\("jules-young"\)/);
  assert.match(sitemap, /researchStories\.map/);
  assert.match(sitemap, /getLatestResearchModifiedDate\(\)/);
});
