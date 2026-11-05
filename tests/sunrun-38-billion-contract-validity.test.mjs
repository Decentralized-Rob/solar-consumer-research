import assert from "node:assert/strict";
import test from "node:test";

async function render(path) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", String(process.pid) + "-" + Date.now() + "-" + Math.random());
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("http://localhost" + path, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.equal(response.status, 200, path);
  return response.text();
}

test("Sunrun $38.9B investor story links to the NJ case and original SEC sources", async () => {
  const path = "/research/sunrun-38-billion-contract-validity";
  const html = await render(path);
  assert.match(html, /Sunrun Reports \$38\.9 Billion in Future Revenue/i);
  assert.match(html, /All energy systems, including construction-in-progress, have been leased to or are subject to signed Customer Agreements with customers/);
  assert.match(html, /Macquarie Infrastructure Corp\. v\. Moab Partners/);
  assert.match(html, /In this District alone, Sunrun has been sued on numerous occasions based upon strikingly similar allegations of forged customer signatures/);
  assert.match(html, /run-20260930\.htm/);
  assert.match(html, /USCOURTS-njd-1_24-cv-11462-0\.pdf/);
  assert.match(html, /href="\/research\/sunrun-new-jersey-complaints-lawsuits"/);
  assert.match(html, /href="\/research\/sunrun-sales-controls-investor-reporting"/);
  assert.match(html, /rel="canonical"[^>]*sunrun-38-billion-contract-validity|sunrun-38-billion-contract-validity[^>]*rel="canonical"/i);
  assert.doesNotMatch(html, /<meta[^>]*noindex/i);
});

test("investor story is listed in research and sitemap", async () => {
  const path = "/research/sunrun-38-billion-contract-validity";
  const index = await render("/research");
  assert.ok(index.includes('href="' + path + '"'));
  const sitemap = await render("/sitemap.xml");
  assert.ok(sitemap.includes('https://solarcomplaint.com' + path));
});
