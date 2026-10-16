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

test("EverBright case gets a crawlable, source-backed search landing page", async () => {
  const href = "/research/everbright-sher-solar-lawsuit-arbitration";
  const html = await render(href);
  assert.match(html, /<title>EverBright Solar Lawsuit: Judge Denies Arbitration<\/title>/i);
  assert.match(html, /rel="canonical"[^>]*href="https:\/\/solarcomplaint\.com\/research\/everbright-sher-solar-lawsuit-arbitration"/i);
  assert.match(html, /"@type":"Article"/);
  assert.match(html, /"@type":"BreadcrumbList"/);
  assert.match(html, /September 10, 2026/);
  assert.match(html, /did not sign or enter the power purchase agreement/i);
  assert.match(html, /remaining claims in the lawsuit/i);
  assert.match(html, /law\.justia\.com\/cases\/federal\/district-courts\/california\/caedce\/1:2026cv04646\/492533\/20\//);
  assert.match(html, /href="\/states\/california"/);
  assert.match(html, /href="\/guides\/solar-complaint-record-checklist"/);
  assert.doesNotMatch(html, /noindex/i);
});

test("research index and sitemap discover the EverBright article", async () => {
  const url = "/research/everbright-sher-solar-lawsuit-arbitration";
  const index = await render("/research");
  assert.match(index, /EverBright Solar Lawsuit/);
  assert.ok(index.includes(`href="${url}"`));
  const sitemap = await render("/sitemap.xml");
  assert.ok(sitemap.includes(`https://solarcomplaint.com${url}`));
});
