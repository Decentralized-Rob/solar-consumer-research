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

test("renders resources as a decision hub with crawlable internal paths", async () => {
  const worker = await loadWorker();
  const response = await worker.fetch(
    new Request("http://localhost/resources", { headers: { accept: "text/html" } }),
    env,
    ctx,
  );

  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /<title>Solar Complaint Resources: State, Company &amp; Federal Help<\/title>/i);
  assert.match(html, /Solar complaint resources: where to start/i);
  assert.match(html, /What are you trying to resolve\?/i);
  assert.match(html, /Company or installer issue/i);
  assert.match(html, /State complaint route/i);
  assert.match(html, /Loan or financing issue/i);
  assert.match(html, /Federal complaint route/i);
  assert.match(html, /Need to prepare a complaint/i);
  assert.match(html, /Research a lawsuit or case/i);

  assert.match(html, /href=["']\/companies\/sunrun["']/i);
  assert.match(html, /href=["']\/cases\/titan-solar-power["']/i);
  assert.match(html, /href=["']\/cases\/connecticut-attorney-general-sunrun-lawsuit["']/i);
  assert.match(html, /href=["']\/research\/solar-sales-financing-after-complaint["']/i);
  assert.match(html, /href=["']\/federal-resources["']/i);
  assert.match(html, /href=["']\/guides["']/i);
  assert.match(html, /href=["']\/guides\/solar-complaint-record-checklist["']/i);
  assert.match(html, /href=["']\/updates["']/i);
  assert.match(html, /href=["']\/states\/massachusetts["']/i);

  assert.match(html, /rel=["']canonical["'][^>]*href=["']https:\/\/solarcomplaint\.com\/resources["']/i);
  assert.match(html, /"@type":"CollectionPage"/i);
  assert.match(html, /"@type":"ItemList"/i);
  assert.doesNotMatch(html, /noindex/i);
});
