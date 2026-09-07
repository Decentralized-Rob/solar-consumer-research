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

test("Titan tracker answers bankruptcy and takeover search intent", async () => {
  const worker = await loadWorker();
  const response = await worker.fetch(
    new Request("http://localhost/cases/titan-solar-power", { headers: { accept: "text/html" } }),
    env,
    ctx,
  );

  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /<title>Titan Solar Power Bankruptcy, Closure &amp; Customer Help/i);
  assert.match(html, /Who took over Titan Solar Power\?/i);
  assert.match(html, /What happened to Titan Solar Power\?/i);
  assert.match(html, /Titan Solar Power bankruptcy status/i);
  assert.match(html, /What can former Titan customers do now\?/i);
  assert.match(html, /did not take over Titan or assume its warranties, debts or legal obligations/i);
  assert.match(html, /EnergyAid says it acquired selected Titan assets/i);
  assert.match(html, /Chapter 7/i);
  assert.match(html, /href=["']\/cases\/titan-solar-power\/customer-help["']/i);
  assert.match(html, /href=["']\/cases\/titan-solar-power\/warranty-after-bankruptcy["']/i);
  assert.doesNotMatch(html, /noindex/i);
});
