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

async function render(path) {
  const worker = await loadWorker();
  const response = await worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    env,
    ctx,
  );
  assert.equal(response.status, 200, path);
  return response.text();
}

function assertInternalLink(html, href) {
  const escapedHref = href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  assert.match(html, new RegExp(`href=["']${escapedHref}["']`, "i"), href);
}

test("renders the Sunrun sales-training research with core claim boundaries", async () => {
  const html = await render("/research/sunrun-sales-training-consumer-protection");

  assert.match(html, /Sunrun Sales Training, Ethics and Consumer Protection/i);
  assert.match(html, /Power Play 2\.0/i);
  assert.match(html, /SUNRUN Way Sales Process/i);
  assert.match(html, /Sales Integrity Program/i);
  assert.match(html, /does not establish that Power Play 2\.0 was still in use in 2025/i);
  assert.match(html, /at least annually/i);
  assert.match(html, /consumer protection laws/i);

  assertInternalLink(html, "/companies/sunrun");
  assertInternalLink(html, "/companies/sunrun/ethics-compliance");
  assertInternalLink(html, "/research/sunrun-25-year-solar-contracts");
  assertInternalLink(html, "/guides/solar-complaint-record-checklist");
  assertInternalLink(html, "/methodology");
  assertInternalLink(html, "/corrections");

  assert.match(html, /sec\.gov\/Archives\/edgar/i);
  assert.match(html, /investors\.sunrun\.com\/filings-financials\/sec-filings/i);
  assert.match(html, /bloomberg\.com\/graphics\/2019-sunrun-solar-panels/i);
  assert.match(html, /builtin\.com\/job\/field-sales-consultant/i);
});

test("surfaces the new Sunrun training article in research and company discovery", async () => {
  const researchHtml = await render("/research");
  assertInternalLink(researchHtml, "/research/sunrun-sales-training-consumer-protection");

  const sunrunHtml = await render("/companies/sunrun");
  assertInternalLink(sunrunHtml, "/research/sunrun-sales-training-consumer-protection");
});
