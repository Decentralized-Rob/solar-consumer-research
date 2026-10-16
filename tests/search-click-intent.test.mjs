import assert from "node:assert/strict";
import test from "node:test";

async function render(path) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.equal(response.status, 200, path);
  return response.text();
}

test("high-impression Sunrun contract page gives an immediate sourced answer and clear SERP title", async () => {
  const html = await render("/research/sunrun-25-year-solar-contracts");
  assert.match(html, /<title>Sunrun 25-Year Solar Lease: Transfers, Buyouts &amp; Guarantees<\/title>/i);
  assert.match(html, /rel="canonical"[^>]*href="https:\/\/solarcomplaint\.com\/research\/sunrun-25-year-solar-contracts"/i);
  assert.match(html, /Selling your home:/);
  assert.match(html, /End of the lease:/);
  assert.match(html, /Production guarantee:/);
  assert.match(html, /90%, 85% or 0%/);
  assert.match(html, /Read the April 2026 fleet review filed with the SEC/);
});

test("GoodLeap Minnesota lawsuit page preserves allegation framing and primary sources", async () => {
  const html = await render("/goodleap/states/minnesota");
  assert.match(html, /<title>GoodLeap Minnesota Solar Loan Lawsuit \| SolarComplaint\.com<\/title>/i);
  assert.match(html, /<h1>GoodLeap Minnesota Solar Loan Lawsuit: What the State Alleges<\/h1>/i);
  assert.match(html, /four lender defendants collectively/);
  assert.match(html, /not GoodLeap-only totals/);
  assert.match(html, /Minnesota Attorney General: filed complaint/);
});

test("GoodLeap subpages render unique search, Open Graph and Twitter metadata", async () => {
  const cases = [
    ["/goodleap/states", "GoodLeap Solar Financing by State: Lawsuits & Arbitration"],
    ["/goodleap/states/minnesota", "GoodLeap Minnesota Solar Loan Lawsuit"],
    ["/goodleap/states/virginia", "GoodLeap in Virginia: 2026 Solar Financing Lawsuit"],
    ["/goodleap/resources", "GoodLeap Solar Financing Resources for Consumers"],
  ];
  for (const [path, expected] of cases) {
    const html = await render(path);
    const escaped = expected.replace(/&/g, "&amp;");
    const title = `${escaped} | SolarComplaint.com`;
    assert.ok(html.includes(`<title>${title}</title>`), `Page title on ${path}`);
    const canonical = `https://solarcomplaint.com${path}`;
    assert.match(html, new RegExp(`<link(?=[^>]*rel="canonical")(?=[^>]*href="${canonical}")[^>]*>`), `Canonical on ${path}`);
    assert.ok(html.includes(`property="og:title" content="${escaped}"`), `Open Graph title on ${path}`);
    assert.ok(html.includes(`name="twitter:title" content="${escaped}"`), `Twitter title on ${path}`);
    assert.ok(!html.includes('<meta name="robots" content="noindex"'), `Indexable ${path}`);
  }
});
