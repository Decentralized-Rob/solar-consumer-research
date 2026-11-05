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

test("sales controls article keeps the distinct securities settlements and partner oversight records", async () => {
  const path = "/research/sunrun-sales-controls-investor-reporting";
  const html = await render(path);
  assert.match(html, /Sunrun.s Sales Controls Faced Lawsuits for a Decade/i);
  assert.match(html, /\$32 million/);
  assert.match(html, /\$2\.5 million/);
  assert.match(html, /\$5\.5 million/);
  assert.match(html, /We have a variety of stringent quality standards that we apply in the selection, supervision, and oversight/);
  assert.match(html, /2019 proxy/);
  assert.match(html, /Section 12/);
  assert.match(html, /2026 settlement/);
  assert.match(html, /href="\/research\/sunrun-38-billion-contract-validity"/);
  assert.match(html, /href="\/research\/sunrun-new-jersey-complaints-lawsuits"/);
  assert.match(html, /rel="canonical"[^>]*sunrun-sales-controls-investor-reporting|sunrun-sales-controls-investor-reporting[^>]*rel="canonical"/i);
  assert.doesNotMatch(html, /<meta[^>]+noindex/i);
});

test("sales controls article is listed in research and sitemap", async () => {
  const path = "/research/sunrun-sales-controls-investor-reporting";
  const index = await render("/research");
  assert.ok(index.includes(`href="${path}"`));
  const sitemap = await render("/sitemap.xml");
  assert.ok(sitemap.includes(`https://solarcomplaint.com${path}`));
});
