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

test("Sunrun Q3 earnings results have indexable finance-search metadata and attributed forecasts", async () => {
  const html = await render(articlePath);
  assert.match(html, /<title>Sunrun Q3 2026 Earnings:/);
  assert.match(html, /Consumer Complaints &amp; Contract Risk|Consumer Complaints (?:&amp;|&) Contract Risk/);
  assert.match(html, /Consumer Complaints and the Contracts Behind Wall Street/);
  assert.match(html, /<strong>TL;DR:<\/strong>/);
  assert.match(html, /contract cancellations and restitution/);
  assert.match(html, /1,099\.5 million/);
  assert.match(html, /0\.56 in diluted earnings per share/);
  assert.match(html, /Subscriber additions fell 24%/);
  assert.match(html, /\$6 million in Cash Generation/);
  assert.match(html, /2026-11-07/);
  assert.match(html, /37,595 Sunrun solar contracts backing securities/);
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

test("Sunrun Q3 earnings article reads as connected reporting with limited section breaks", async () => {
  const html = await render(articlePath);
  assert.match(html, /Most of those revisions preceded Connecticut/);
  assert.match(html, /what happens to collateral when an agreement is unwound/);
  assert.match(html, /customer agreement all the way from the sale/);
  assert.match(html, /research checked November 2, 2026/);
  assert.match(html, /results and analysis updated November 7/);
  assert.doesNotMatch(html, /Before Sunrun reports November 4|Sunrun reports earnings November 4|next earnings report arrives/);
  assert.doesNotMatch(html, /Five questions for Sunrun/);
  assert.doesNotMatch(html, /Sunrun Q3 2026 earnings: quick answers/);
  assert.doesNotMatch(html, /The settlement does not establish/);
});

test("Sunrun Q3 earnings article is discovered from research index and sitemap", async () => {
  const index = await render("/research");
  assert.ok(index.includes(`href="${articlePath}"`));
  assert.doesNotMatch(index, /Before Sunrun reports November 4/);
  const sunrun = await render("/companies/sunrun");
  assert.doesNotMatch(sunrun, /Before Sunrun reports November 4/);
  const sitemap = await render("/sitemap.xml");
  assert.ok(sitemap.includes(`https://solarcomplaint.com${articlePath}`));
});
