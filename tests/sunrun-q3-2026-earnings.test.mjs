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

const articlePath = "/research/sunrun-q3-2026-earnings";

test("Sunrun Q3 earnings preview has indexable finance-search metadata and attributed forecasts", async () => {
  const html = await render(articlePath);
  assert.match(html, /<title>Sunrun Q3 2026 Earnings:/);
  assert.match(html, /rel="canonical"[^>]*sunrun-q3-2026-earnings|sunrun-q3-2026-earnings[^>]*rel="canonical"/i);
  assert.match(html, /"@type":"Article"/);
  assert.match(html, /"@type":"BreadcrumbList"/);
  assert.match(html, /November 4, 2026/);
  assert.match(html, /4:30 p\.m\. Eastern/);
  assert.match(html, /\$804\.1 million/);
  assert.match(html, /\$757\.53 million/);
  assert.match(html, /Zacks Equity Research/);
  assert.match(html, /MarketBeat/);
  assert.match(html, /Morgan Stanley/);
  assert.match(html, /JPMorgan/);
  assert.match(html, /KBRA/);
  assert.match(html, /37,595/);
  assert.match(html, /359\.7 million/);
  assert.match(html, /Connecticut Attorney General/);
  assert.match(html, /GBH News/);
  assert.match(html, /restitution/);
  assert.doesNotMatch(html, /<meta[^>]+noindex/i);
});

test("Sunrun Q3 earnings coverage distinguishes unproven links from documented investor risk", async () => {
  const html = await render(articlePath);
  assert.match(html, /target cuts do not establish that the Connecticut settlement caused/);
  assert.match(html, /does not establish that any Connecticut agreement covered by the settlement was included/);
  assert.match(html, /not adjudicated violations/);
  assert.match(html, /pre-earnings report/);
  assert.match(html, /not available at the time of writing/);
});

test("Sunrun Q3 earnings article is discovered from research index and sitemap", async () => {
  const index = await render("/research");
  assert.ok(index.includes(`href="${articlePath}"`));
  const sitemap = await render("/sitemap.xml");
  assert.ok(sitemap.includes(`https://solarcomplaint.com${articlePath}`));
});
