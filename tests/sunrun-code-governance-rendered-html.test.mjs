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

const route = "/companies/sunrun/governance/code-of-business-conduct-ethics";

test("renders the Sunrun Code of Conduct homeowner research page", async () => {
  const worker = await loadWorker();
  const response = await worker.fetch(
    new Request(`http://localhost${route}`, { headers: { accept: "text/html" } }),
    env,
    ctx,
  );

  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /<title>Sunrun Code of Conduct \(2025\): What Homeowners Should Know/i);
  assert.match(html, /<h1[^>]*>Sunrun Code of Business Conduct &amp; Ethics: What Homeowners Should Know<\/h1>/i);
  assert.match(html, /October 2025/i);
  assert.match(html, /employees, officers and directors/i);
  assert.match(html, /communicates directly and honestly with customers/i);
  assert.match(html, /misrepresentation of material facts/i);
  assert.match(html, /reported violations will be promptly investigated/i);
  assert.match(html, /customer data/i);
  assert.match(html, /2026 proxy statement/i);
  assert.match(html, /sunrun\.allvoices\.co/i);
  assert.match(html, /investors\.sunrun\.com\/leadership-governance\/governance-documents/i);
  assert.match(html, /run-20260415\.htm/i);
  assert.match(html, /independent consumer research and editorial publication/i);
  assert.match(html, /application\/ld\+json/i);
  assert.match(html, /BreadcrumbList/i);
  assert.doesNotMatch(html, /FAQPage/i);
  assert.doesNotMatch(html, /<meta[^>]+name=["']keywords["']/i);
  assert.doesNotMatch(html, /noindex/i);
  assert.doesNotMatch(html, /ethicspoint/i);
});

test("indexes and internally links the Sunrun Code of Conduct research page", async () => {
  const worker = await loadWorker();

  const sitemapResponse = await worker.fetch(new Request("http://localhost/sitemap.xml"), env, ctx);
  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  assert.match(
    sitemap,
    /<loc>https:\/\/solarcomplaint\.com\/companies\/sunrun\/governance\/code-of-business-conduct-ethics<\/loc>/,
  );

  const researchResponse = await worker.fetch(
    new Request("http://localhost/research", { headers: { accept: "text/html" } }),
    env,
    ctx,
  );
  assert.equal(researchResponse.status, 200);
  const researchHtml = await researchResponse.text();
  assert.match(researchHtml, /Sunrun Code of Business Conduct &amp; Ethics: What Homeowners Should Know/i);
  assert.match(researchHtml, /companies\/sunrun\/governance\/code-of-business-conduct-ethics/i);
});
