import assert from "node:assert/strict";
import test from "node:test";

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker;
}

const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
const ctx = { waitUntil() {}, passThroughOnException() {} };

test("renders Sunrun ethics guide as an independent source-first editorial page", async () => {
  const worker = await loadWorker();
  const response = await worker.fetch(
    new Request("http://localhost/companies/sunrun/ethics-compliance", { headers: { accept: "text/html" } }),
    env,
    ctx,
  );

  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /<title>Sunrun Ethics Complaint: AllVoices, Code of Conduct &amp; Compliance Guide/i);
  assert.match(html, /<h1[^>]*>Sunrun Ethics &amp; Compliance<\/h1>/i);
  assert.match(html, /independent consumer research and editorial publication/i);
  assert.match(html, /not affiliated with, endorsed by or sponsored by Sunrun/i);
  assert.match(html, /https:\/\/sunrun\.allvoices\.co\//i);
  assert.match(html, /866-602-6613/);
  assert.doesNotMatch(html, /ethicspoint/i);
  assert.match(html, />Timeline</i);
  assert.match(html, />Evidence</i);
  assert.match(html, />Featured</i);
  assert.match(html, />The latest</i);
  assert.match(html, /Vendor Code of Conduct/i);
  assert.match(html, /Mary Powell/i);
  assert.match(html, /Jeanna Steele/i);
  assert.match(html, /Chance Allred/i);
  assert.match(html, /Paul Dickson/i);
  assert.match(html, /Patrick Kent/i);
  assert.doesNotMatch(html, /Becki Berkeley/i);
  assert.match(html, /application\/ld\+json/i);
  assert.doesNotMatch(html, /noindex/i);
});

test("includes Sunrun ethics guide in sitemap and keeps image review page out of index", async () => {
  const worker = await loadWorker();
  const sitemapResponse = await worker.fetch(new Request("http://localhost/sitemap.xml"), env, ctx);
  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  assert.match(sitemap, /<loc>https:\/\/solarcomplaint\.com\/companies\/sunrun\/ethics-compliance<\/loc>/);
  assert.doesNotMatch(sitemap, /ethics-compliance\/preview-images/);

  const previewResponse = await worker.fetch(
    new Request("http://localhost/companies/sunrun/ethics-compliance/preview-images", { headers: { accept: "text/html" } }),
    env,
    ctx,
  );
  assert.equal(previewResponse.status, 200);
  const previewHtml = await previewResponse.text();
  assert.match(previewHtml, /noindex/i);
  assert.match(previewHtml, /ethics-hero-option-a\.svg/i);
  assert.match(previewHtml, /ethics-hero-option-b\.svg/i);
});
