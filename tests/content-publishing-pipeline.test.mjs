import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const registryPath = new URL("../lib/research-stories.ts", import.meta.url);
const homePath = new URL("../components/home/latest-research.tsx", import.meta.url);
const statePath = new URL("../components/state-resource-page.tsx", import.meta.url);
const sitemapPath = new URL("../app/sitemap.ts", import.meta.url);
const authorPath = new URL("../app/authors/jules-young/page.tsx", import.meta.url);
const articleHelperPath = new URL("../lib/research-article.ts", import.meta.url);
const dynamicArticlePath = new URL("../app/research/[slug]/page.tsx", import.meta.url);
const pilotContentPath = new URL("../content/research/massachusetts-solar-cost-2026.tsx", import.meta.url);
const contentRegistryPath = new URL("../content/research/index.ts", import.meta.url);
const homeDepotContentPath = new URL("../content/research/sunrun-home-depot-sales-home-visit.tsx", import.meta.url);
const contractsContentPath = new URL("../content/research/sunrun-25-year-solar-contracts.tsx", import.meta.url);
const financingContentPath = new URL("../content/research/solar-sales-financing-after-complaint.tsx", import.meta.url);
const generatorPath = new URL("../scripts/generate-research-metadata.mjs", import.meta.url);

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


test("dynamic research route renders the pilot from the content layer", async () => {
  const [helper, route, content, contentRegistry] = await Promise.all([
    readFile(articleHelperPath, "utf8"),
    readFile(dynamicArticlePath, "utf8"),
    readFile(pilotContentPath, "utf8"),
    readFile(contentRegistryPath, "utf8"),
  ]);

  assert.match(helper, /buildResearchMetadata/);
  assert.match(helper, /buildResearchStructuredData/);
  assert.match(helper, /formatResearchDate\(story\.dateModified\)/);
  assert.match(route, /generateMetadata/);
  assert.match(route, /generateStaticParams/);
  assert.match(route, /getResearchArticle\(slug\)/);
  assert.match(route, /researchArticles/);
  assert.match(route, /buildResearchMetadata/);
  assert.match(route, /buildResearchStructuredData/);
  assert.match(contentRegistry, /massachusetts-solar-cost-2026/);
  assert.match(content, /defineResearchArticle/);
  assert.match(content, /export const story/);
  assert.match(content, /What Solar Costs|Massachusetts solar panel cost/);
});


test("research publishing discovers article files without a hand-maintained registry", async () => {
  const generator = await readFile(generatorPath, "utf8");
  assert.match(generator, /readdir\(contentDir\)/);
  assert.match(generator, /extname\(file\) === "\\.tsx"/);
  assert.match(generator, /writeFile\(resolve\(contentDir, "index\\.ts"\)/);
  assert.doesNotMatch(generator, /massachusetts-solar-cost-2026\\.tsx/);
  assert.doesNotMatch(generator, /sunrun-25-year-solar-contracts\\.tsx/);
});
