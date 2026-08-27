import assert from "node:assert/strict";
import test from "node:test";

const productTitle = /<title>Solar Complaints and Consumer Resources \| Solar Consumer Research<\/title>/i;
const productDescription =
  /<meta(?=[^>]*\bname=["']description["'])(?=[^>]*\bcontent=["']Find official solar complaint channels, consumer agencies, public records, and source-verified resources by state\.["'])[^>]*>/i;
const featuredResearchTitle = /Solar Sales, Financing and What Happens After a Complaint/i;

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

test("renders product metadata and prominent featured research", async () => {
  const worker = await loadWorker();

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    env,
    ctx,
  );

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, productTitle);
  assert.match(html, productDescription);
  assert.match(html, /Featured Research/i);
  assert.match(html, featuredResearchTitle);
  assert.match(html, /href=["']\/research\/solar-sales-financing-after-complaint["']/i);
});

test("serves canonical robots and sitemap files", async () => {
  const worker = await loadWorker();
  const robotsResponse = await worker.fetch(new Request("http://localhost/robots.txt"), env, ctx);
  const sitemapResponse = await worker.fetch(new Request("http://localhost/sitemap.xml"), env, ctx);

  assert.equal(robotsResponse.status, 200);
  assert.equal(sitemapResponse.status, 200);

  const robots = await robotsResponse.text();
  const sitemap = await sitemapResponse.text();

  assert.match(robots, /Sitemap: https:\/\/solarcomplaint\.com\/sitemap\.xml/);
  assert.match(robots, /Disallow: \/api\//);
  assert.match(sitemap, /<loc>https:\/\/solarcomplaint\.com<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/solarcomplaint\.com\/research<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/solarcomplaint\.com\/research\/solar-sales-financing-after-complaint<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/solarcomplaint\.com\/companies\/sunrun<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/solarcomplaint\.com\/states\/massachusetts<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/solarcomplaint\.com\/federal-resources<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/solarcomplaint\.com\/states\/new-york<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/solarcomplaint\.com\/resources<\/loc>[\s\S]*?<lastmod>2026-08-21/i);
  assert.doesNotMatch(`${robots}\n${sitemap}`, /solar-resource-mvp\.rbeland21\.chatgpt\.site/);
});

test("indexes verified state complaint and litigation pages", async () => {
  const worker = await loadWorker();
  const response = await worker.fetch(
    new Request("http://localhost/states/new-york", { headers: { accept: "text/html" } }),
    env,
    ctx,
  );

  assert.equal(response.status, 200);
  const html = await response.text();
  assert.doesNotMatch(html, /noindex/i);
  assert.match(html, /File a New York goods or services complaint/i);
  assert.match(html, /New York sues Attyx and solar lenders/i);
  assert.match(html, /Source dated[\s\S]*Mar 17, 2026/i);
  assert.doesNotMatch(html, /Verified Aug 21, 2026/i);
  assert.match(html, /application\/ld\+json/i);
});

test("cross-links the Texas source directory to related research", async () => {
  const worker = await loadWorker();
  const response = await worker.fetch(
    new Request("http://localhost/states/texas", { headers: { accept: "text/html" } }),
    env,
    ctx,
  );

  assert.equal(response.status, 200);
  const html = await response.text();
  const complaintIndex = html.indexOf('id="consumer-protection"');
  const enforcementIndex = html.indexOf('id="current-enforcement-sources"');
  const relatedResearchIndex = html.indexOf('id="related-research"');
  const lawsuitIndex = html.indexOf('id="solar-case"');

  assert.ok(complaintIndex >= 0);
  assert.ok(enforcementIndex > complaintIndex);
  assert.ok(relatedResearchIndex > enforcementIndex);
  assert.ok(lawsuitIndex > relatedResearchIndex);
  assert.doesNotMatch(html, /DSIRE/i);
  assert.match(html, /File a Texas consumer complaint/i);
  assert.match(html, /Texas Attorney General residential solar investigation involving Sunrun/i);
  assert.match(html, featuredResearchTitle);
  assert.match(html, /href=["']\/research\/solar-sales-financing-after-complaint["']/i);
});

test("renders the featured research article with canonical metadata, article schema, and primary sources", async () => {
  const worker = await loadWorker();
  const response = await worker.fetch(
    new Request("http://localhost/research/solar-sales-financing-after-complaint", { headers: { accept: "text/html" } }),
    env,
    ctx,
  );

  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, featuredResearchTitle);
  assert.match(html, /rel=["']canonical["'][^>]*href=["']https:\/\/solarcomplaint\.com\/research\/solar-sales-financing-after-complaint["']/i);
  assert.match(html, /"@type":"Article"/i);
  assert.match(html, /"@type":"BreadcrumbList"/i);
  assert.match(html, /Michigan Attorney General complaint against Climax Solar/i);
  assert.match(html, /Texas Attorney General residential solar investigation involving Sunrun/i);
  assert.match(html, /Arizona stipulated consent agreement with Sunrun and Vivint Solar/i);
  assert.match(html, /1,689 Climax-originated/i);
  assert.match(html, /\$81\.26 million/i);
  assert.match(html, /\$600,000 to civil penalties/i);
  assert.match(html, /response within two business days/i);
  assert.match(html, /href=["']\/states\/michigan["']/i);
  assert.match(html, /href=["']\/states\/texas["']/i);
  assert.match(html, /href=["']\/states\/arizona["']/i);
  assert.match(html, /href=["']\/companies\/sunrun["']/i);
  assert.doesNotMatch(html, /noindex/i);
});

test("renders the research hub as an indexable collection", async () => {
  const worker = await loadWorker();
  const response = await worker.fetch(
    new Request("http://localhost/research", { headers: { accept: "text/html" } }),
    env,
    ctx,
  );

  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Source-backed research on residential solar/i);
  assert.match(html, featuredResearchTitle);
  assert.match(html, /"@type":"CollectionPage"/i);
  assert.match(html, /href=["']\/companies\/sunrun["']/i);
  assert.doesNotMatch(html, /noindex/i);
});

test("renders a Sunrun company hub that keeps enforcement statuses distinct", async () => {
  const worker = await loadWorker();
  const response = await worker.fetch(
    new Request("http://localhost/companies/sunrun", { headers: { accept: "text/html" } }),
    env,
    ctx,
  );

  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Sunrun investigations, enforcement and documented cases/i);
  assert.match(html, /Texas residential solar investigation involving Sunrun/i);
  assert.match(html, /Arizona settlement with Sunrun and Vivint Solar/i);
  assert.match(html, /Connecticut Attorney General lawsuit naming Sunrun/i);
  assert.match(html, /An investigation is not a finding of wrongdoing/i);
  assert.match(html, featuredResearchTitle);
  assert.match(html, /"@type":"CollectionPage"/i);
  assert.doesNotMatch(html, /noindex/i);
});

test("serves the federal resource page", async () => {
  const worker = await loadWorker();
  const response = await worker.fetch(new Request("http://localhost/federal-resources", { headers: { accept: "text/html" } }), env, ctx);

  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>Federal Solar Complaint and Consumer Resources<\/title>/i);
  assert.match(html, /Consumer Financial Protection Bureau/i);
  assert.match(html, /Federal Trade Commission/i);
});
