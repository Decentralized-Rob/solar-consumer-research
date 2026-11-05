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

test("Sunrun investor investigation uses Q3 2026 numbers and original court sources", async () => {
  const path = "/research/sunrun-sales-controls-investor-reporting";
  const html = await render(path);
  assert.match(html, /<title>[^<]*Sunrun.*38\.9/i);
  assert.match(html, /\$38\.9 billion/);
  assert.match(html, /\$17\.41 billion/);
  assert.match(html, /All energy systems, including construction-in-progress, have been leased to or are subject to signed Customer Agreements with customers/);
  assert.match(html, /Macquarie Infrastructure Corp\. v\. Moab Partners/);
  assert.match(html, /In this District alone, Sunrun has been sued on numerous occasions based upon strikingly similar allegations of forged customer signatures/);
  assert.match(html, /USCOURTS-njd-1_24-cv-11462-0\.pdf/);
  assert.match(html, /run-20260930\.htm/);
  assert.match(html, /\$2\.5 million/);
  assert.match(html, /\$32 million/);
  assert.doesNotMatch(html, /scheduled third-quarter earnings for November 4, 2026/i);
  assert.doesNotMatch(html, /<meta[^>]*noindex/i);
  assert.match(html, /rel="canonical"[^>]*sunrun-sales-controls-investor-reporting|sunrun-sales-controls-investor-reporting[^>]*rel="canonical"/i);
});

test("Sunrun investor report appears in research index and sitemap", async () => {
  const path = "/research/sunrun-sales-controls-investor-reporting";
  const index = await render("/research");
  assert.ok(index.includes(`href="${path}"`));
  const sitemap = await render("/sitemap.xml");
  assert.ok(sitemap.includes(`https://solarcomplaint.com${path}`));
});
