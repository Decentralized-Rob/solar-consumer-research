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

test("Sunrun design-change investigation shows SEC exceptions without treating them as proof of unauthorized panel removal", async () => {
  const path = "/research/sunrun-solar-design-changes-change-orders";
  const html = await render(path);
  assert.match(html, /<title>Sunrun Solar Panel Changes: SEC Findings/i);
  assert.match(html, /rel="canonical"[^>]*sunrun-solar-design-changes-change-orders|sunrun-solar-design-changes-change-orders[^>]*rel="canonical"/i);
  assert.match(html, /"@type":"Article"/);
  assert.match(html, /<h1[^>]*>Sunrun Solar Panel Changes/i);
  assert.match(html, /1\.84 kW/);
  assert.match(html, /2\.28 kW/);
  assert.match(html, /11\.13 kW/);
  assert.match(html, /10\.92 kW/);
  assert.match(html, /\$95\.72/);
  assert.match(html, /\$102\.41/);
  assert.match(html, /2\.90%/);
  assert.match(html, /3\.90%/);
  assert.match(html, /not evidence of how many panels were installed/i);
  assert.match(html, /no representation about the validity or execution/i);
  assert.match(html, /writing and agreed to by both parties/i);
  assert.match(html, /does not itself say every type of solar lease amendment must be signed/i);
  assert.match(html, /000119312526318223\/d149204dex991\.htm/);
  assert.match(html, /Chapter142A\/Section17/);
  assert.ok(html.includes('href="/companies/sunrun"'));
  assert.doesNotMatch(html, /<meta[^>]+noindex/i);
});

test("revised Sunrun report is linked from the research index and in the sitemap", async () => {
  const path = "/research/sunrun-solar-design-changes-change-orders";
  const index = await render("/research");
  assert.ok(index.includes(`href="${path}"`));
  const sitemap = await render("/sitemap.xml");
  assert.ok(sitemap.includes(`https://solarcomplaint.com${path}`));
});
