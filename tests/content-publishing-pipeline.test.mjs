import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const registryPath = new URL("../lib/research-stories.ts", import.meta.url);
const homePath = new URL("../components/home/latest-research.tsx", import.meta.url);
const statePath = new URL("../components/state-resource-page.tsx", import.meta.url);
const sitemapPath = new URL("../app/sitemap.ts", import.meta.url);
const authorPath = new URL("../app/authors/jules-young/page.tsx", import.meta.url);
const articleHelperPath = new URL("../lib/research-article.ts", import.meta.url);
const pilotArticlePath = new URL("../app/research/massachusetts-solar-cost-2026/page.tsx", import.meta.url);

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


test("pilot article derives repeated SEO and schema fields from its story record", async () => {
  const [helper, pilot] = await Promise.all([
    readFile(articleHelperPath, "utf8"),
    readFile(pilotArticlePath, "utf8"),
  ]);

  assert.match(helper, /buildResearchMetadata/);
  assert.match(helper, /buildResearchStructuredData/);
  assert.match(helper, /story\.datePublished/);
  assert.match(helper, /story\.dateModified/);
  assert.match(helper, /story\.topics/);
  assert.match(pilot, /getResearchStory\("massachusetts-solar-cost-2026"\)/);
  assert.match(pilot, /buildResearchMetadata/);
  assert.match(pilot, /buildResearchStructuredData/);
  assert.doesNotMatch(pilot, /export const metadata: Metadata = \{/);
  assert.doesNotMatch(pilot, /const canonicalUrl =/);
  assert.doesNotMatch(pilot, /const authorUrl =/);
});
