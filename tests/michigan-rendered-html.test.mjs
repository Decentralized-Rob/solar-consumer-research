import assert from "node:assert/strict";
import test from "node:test";

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker;
}

const env = {
  ASSETS: {
    fetch: async () => new Response("Not found", { status: 404 }),
  },
};

const ctx = {
  waitUntil() {},
  passThroughOnException() {},
};

test("renders Michigan as a guided solar consumer hub", async () => {
  const worker = await loadWorker();
  const response = await worker.fetch(
    new Request("http://localhost/states/michigan", { headers: { accept: "text/html" } }),
    env,
    ctx,
  );

  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /<title>Michigan Solar Complaints, Financing &amp; Consumer Resources<\/title>/i);
  assert.match(html, /rel=["']canonical["'][^>]*href=["']https:\/\/solarcomplaint\.com\/states\/michigan["']/i);
  assert.match(html, /Have a solar problem in Michigan\?/i);
  assert.match(html, /Problem with the solar company/i);
  assert.match(html, /System installed but not working/i);
  assert.match(html, /Check the installer or contractor/i);
  assert.match(html, /Loan or financing problem/i);
  assert.match(html, /Michigan sued Climax Solar, its owner, and multiple finance companies/i);
  assert.match(html, /1,689 Climax-originated Michigan loans/i);
  assert.match(html, /\$81\.26 million/i);
  assert.match(html, /\$22\.14 million/i);
  assert.match(html, /allegations in a pending lawsuit/i);
  assert.match(html, /Read the WWMT homeowner story/i);
  assert.match(html, /Michigan Attorney General announcement/i);
  assert.match(html, /Read the full federal complaint/i);
  assert.match(html, /Power Home Solar \/ Pink Energy/i);
  assert.match(html, /preliminarily approved a proposed class settlement with former Power Home Solar founder William Waller only/i);
  assert.match(html, /Michigan Attorney General complaint directory/i);
  assert.match(html, /MPSC: What is interconnection\?/i);
  assert.match(html, /Verify a licensed professional or business through LARA/i);
  assert.match(html, /Consumer Financial Protection Bureau complaint/i);
  assert.match(html, /Michigan Consumer Protection Act/i);
  assert.match(html, /href=["']\/research\/solar-sales-financing-after-complaint["']/i);
  assert.match(html, /href=["']\/federal-resources["']/i);
  assert.match(html, /href=["']\/guides["']/i);
  assert.match(html, /"@type":"CollectionPage"/i);
  assert.match(html, /"@type":"BreadcrumbList"/i);
  assert.doesNotMatch(html, /noindex/i);
});
