import assert from "node:assert/strict";
import test from "node:test";

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker;
}

const env = {
  ASSETS: {
    fetch: async () => new Response("Not found", { status: 404 }),
  },
};

const ctx = {
  waitUntil() {},
  passThroughOnException() {},
};

test("renders Michigan as a guided solar consumer hub", async () => {
  const worker = await loadWorker();
  const response = await worker.fetch(
    new Request("http://localhost/states/michigan", { headers: { accept: "text/html" } }),
    env,
    ctx,
  );

  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /<title>Michigan Solar Complaints, Financing &amp; Consumer Resources<\/title>/i);
  assert.match(html, /rel=["']canonical["'][^>]*href=["']https:\/\/solarcomplaint\.com\/states\/michigan["']/i);
  assert.match(html, /Have a solar problem in Michigan\?/i);
  assert.match(html, /Problem with the solar company/i);
  assert.match(html, /System installed but not working/i);
  assert.match(html, /Check the installer or contractor/i);
  assert.match(html, /Loan or financing problem/i);
  assert.match(html, /Loan terms, collections, credit reporting, liens, or UCC filings may involve a separate finance company/i);
  assert.match(html, /Michigan sued Climax Solar, its owner, and multiple finance companies/i);
  assert.match(html, /1,689 Climax-originated Michigan loans/i);
  assert.match(html, /\$81\.26 million/i);
  assert.match(html, /\$22\.14 million/i);
  assert.match(html, /allegations in a pending lawsuit, not court findings/i);
  assert.match(html, /Read the WWMT homeowner story/i);
  assert.match(html, /Michigan Attorney General announcement/i);
  assert.match(html, /Read the full federal complaint/i);
  assert.match(html, /Power Home Solar \/ Pink Energy/i);
  assert.match(html, /lacked personal jurisdiction over the Trivest defendants/i);
  assert.match(html, /vacated the May 23, 2025 order denying their motions to compel arbitration/i);
  assert.match(html, /preliminarily approved a proposed class settlement with former Power Home Solar founder William Waller only/i);
  assert.match(html, /Michigan Attorney General complaint directory/i);
  assert.match(html, /MPSC: What is interconnection\?/i);
  assert.match(html, /MPSC complaint process is for utility issues within the Commission(?:&apos;|')s authority/i);
  assert.match(html, /Verify a licensed professional or business through LARA/i);
  assert.match(html, /Michigan electrical permit information/i);
  assert.match(html, /Michigan DIFS financial-services complaint information/i);
  assert.match(html, /Consumer Financial Protection Bureau complaint/i);
  assert.match(html, /Michigan Consumer Protection Act/i);
  assert.match(html, /MI Solar for All is paused/i);
  assert.match(html, /termination letter from the U\.S\. Environmental Protection Agency dated August 7, 2025/i);
  assert.match(html, /MI Solar For All consumer advisory/i);
  assert.match(html, /href=["']\/research\/solar-sales-financing-after-complaint["']/i);
  assert.match(html, /href=["']\/federal-resources["']/i);
  assert.match(html, /href=["']\/guides["']/i);
  assert.match(html, /"@type":"CollectionPage"/i);
  assert.match(html, /"@type":"BreadcrumbList"/i);
  assert.doesNotMatch(html, /rel=["'][^"']*nofollow/i);
  assert.doesNotMatch(html, /noindex/i);
});

test("keeps a clean semantic heading hierarchy", async () => {
  const worker = await loadWorker();
  const response = await worker.fetch(
    new Request("http://localhost/states/michigan", { headers: { accept: "text/html" } }),
    env,
    ctx,
  );

  assert.equal(response.status, 200);
  const html = await response.text();
  const h1s = html.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/gi) ?? [];

  assert.equal(h1s.length, 1);
  assert.match(h1s[0], /Have a solar problem in Michigan\?/i);
  assert.match(html, /<h2\b[^>]*>[^<]*What is happening with your solar project\?/i);
  assert.match(html, /<h2\b[^>]*>[^<]*Michigan sued Climax Solar/i);
  assert.match(html, /<h2\b[^>]*>[^<]*A separate Michigan case involving Power Home Solar \/ Pink Energy/i);
  assert.match(html, /<h2\b[^>]*>[^<]*Official sources grouped by the problem you are trying to solve/i);
  assert.match(html, /<h3\b[^>]*>[^<]*Problem with the solar company/i);
  assert.match(html, /<h3\b[^>]*>[^<]*System installed but not working/i);
  assert.doesNotMatch(html, /<h4\b|<h5\b|<h6\b/i);
});

test("keeps Michigan discoverable to search and AI crawlers", async () => {
  const worker = await loadWorker();
  const robotsResponse = await worker.fetch(new Request("http://localhost/robots.txt"), env, ctx);
  const sitemapResponse = await worker.fetch(new Request("http://localhost/sitemap.xml"), env, ctx);

  assert.equal(robotsResponse.status, 200);
  assert.equal(sitemapResponse.status, 200);

  const robots = await robotsResponse.text();
  const sitemap = await sitemapResponse.text();

  assert.match(robots, /User-agent:\s*\*/i);
  assert.match(robots, /Allow:\s*\//i);
  assert.match(robots, /Sitemap:\s*https:\/\/solarcomplaint\.com\/sitemap\.xml/i);
  assert.doesNotMatch(robots, /User-agent:\s*OAI-SearchBot[\s\S]*?Disallow:\s*\//i);
  assert.match(
    sitemap,
    /<loc>https:\/\/solarcomplaint\.com\/states\/michigan<\/loc>[\s\S]*?<lastmod>2026-09-05/i,
  );
});
