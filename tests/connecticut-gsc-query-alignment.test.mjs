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

test("aligns the Connecticut case with observed Sunrun and Bright Planet search intent", async () => {
  const worker = await loadWorker();
  const response = await worker.fetch(
    new Request("http://localhost/cases/connecticut-attorney-general-sunrun-lawsuit", { headers: { accept: "text/html" } }),
    env,
    ctx,
  );

  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /<title>Connecticut Sunrun Settlement: Fraud Claims &amp; Consumer Relief<\/title>/i);
  assert.match(html, /<h1>Connecticut&#x27;s Sunrun Settlement: What the Court Records Actually Say<\/h1>/i);
  assert.match(html, /Bright Planet Solar/i);
  assert.match(html, /Elevate Solar Solutions/i);
  assert.match(html, /Sunrun Inc\./i);
  assert.match(html, /DocumentNo=33860223/i);
  assert.match(html, /resolved within 120 days/i);
  assert.match(html, /Bright Planet.*remains pending/i);
  assert.match(html, /does.*not.*create a private right/i);
  assert.doesNotMatch(html, /"author":/i);
  assert.match(html, /"@type":"Organization","name":"Bright Planet Solar"/i);
  assert.match(html, /rel=["']canonical["'][^>]*href=["']https:\/\/solarcomplaint\.com\/cases\/connecticut-attorney-general-sunrun-lawsuit["']/i);
  assert.doesNotMatch(html, /noindex/i);
});
