import assert from "node:assert/strict";
import test from "node:test";

const productTitle = /<title>Solar Complaints and Consumer Resources \| Solar Consumer Research<\/title>/i;
const productDescription =
  /<meta(?=[^>]*\bname=["']description["'])(?=[^>]*\bcontent=["']Find official solar complaint channels, consumer agencies, public records, and source-verified resources by state\.["'])[^>]*>/i;

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

test("renders product metadata", async () => {
  const worker = await loadWorker();

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    env,
    ctx,
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.match(html, productTitle);
  assert.match(html, productDescription);
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
  assert.match(sitemap, /<loc>https:\/\/solarcomplaint\.com\/states\/massachusetts<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/solarcomplaint\.com\/federal-resources<\/loc>/);
  assert.doesNotMatch(sitemap, /<loc>https:\/\/solarcomplaint\.com\/states\/new-york<\/loc>/);
  assert.doesNotMatch(`${robots}\n${sitemap}`, /solar-resource-mvp\.rbeland21\.chatgpt\.site/);
});

test("keeps unfinished state pages out of search", async () => {
  const worker = await loadWorker();
  const response = await worker.fetch(
    new Request("http://localhost/states/new-york", { headers: { accept: "text/html" } }),
    env,
    ctx,
  );

  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<meta name="robots" content="noindex, follow"\/>/i);
});

test("serves the federal resource page", async () => {
  const worker = await loadWorker();
  const response = await worker.fetch(
    new Request("http://localhost/federal-resources", { headers: { accept: "text/html" } }),
    env,
    ctx,
  );

  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>Federal Solar Complaint and Consumer Resources<\/title>/i);
  assert.match(html, /Consumer Financial Protection Bureau/i);
  assert.match(html, /Federal Trade Commission/i);
});
