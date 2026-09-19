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
const generatorPath = new URL("../scripts/generate-research-metadata.mjs", import.meta.url);
const packagePath = new URL("../package.json", import.meta.url);

test("research metadata registry exposes discovery selectors while the story type stays canonical", async () => {
  const [registry, helper] = await Promise.all([
    readFile(registryPath, "utf8"),
    readFile(articleHelperPath, "utf8"),
  ]);
  assert.match(helper, /authorSlug\?: string/);
  assert.match(helper, /section\?: "Short Read" \| "Research"/);
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

test("dynamic research route renders discovered content", async () => {
  const [helper, route, content, contentRegistry] = await Promise.all([
    readFile(articleHelperPath, "utf8"),
    readFile(dynamicArticlePath, "utf8"),
    readFile(pilotContentPath, "utf8"),
    readFile(contentRegistryPath, "utf8"),
  ]);
  assert.match(helper, /buildResearchMetadata/);
  assert.match(helper, /buildResearchStructuredData/);
  assert.match(helper, /twitterTitle \\?\\? story\\.twitterTitle \\?\\? story\\.title/);
  assert.match(helper, /schemaHeadline \\?\\? story\\.schemaHeadline \\?\\? story\\.title/);
  assert.match(route, /generateMetadata/);
  assert.match(route, /generateStaticParams/);
  assert.match(route, /researchArticles\.keys\(\)/);
  assert.match(route, /getResearchArticle\(slug\)/);
  assert.match(contentRegistry, /new Map/);
  assert.match(content, /defineResearchArticle/);
  assert.match(content, /export const story/);
});

test("research publishing discovers article files without a hand-maintained registry", async () => {
  const [generator, pkg] = await Promise.all([
    readFile(generatorPath, "utf8"),
    readFile(packagePath, "utf8"),
  ]);
  assert.ok(generator.includes("readdir(contentDir)"));
  assert.ok(generator.includes('extname(file) === ".tsx"'));
  assert.ok(generator.includes('writeFile(resolve(contentDir, "index.ts")'));
  assert.ok(generator.includes("Duplicate research slug"));
  assert.ok(!generator.includes("massachusetts-solar-cost-2026.tsx"));
  assert.ok(!generator.includes("sunrun-25-year-solar-contracts.tsx"));
  assert.ok(pkg.includes('"dev": "npm run generate:research-metadata &&'));
});
