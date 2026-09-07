import assert from "node:assert/strict";
import test from "node:test";

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker;
}

const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
const ctx = { waitUntil() {}, passThroughOnException() {} };
const ethicsHref = "/companies/sunrun/ethics-compliance";

for (const [label, path] of [
  ["homepage", "/"],
  ["research hub", "/research"],
  ["Sunrun company hub", "/companies/sunrun"],
  ["Connecticut Sunrun case", "/cases/connecticut-attorney-general-sunrun-lawsuit"],
]) {
  test(`highlights the Sunrun ethics guide on the ${label}`, async () => {
    const worker = await loadWorker();
    const response = await worker.fetch(
      new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
      env,
      ctx,
    );

    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, /Sunrun Ethics &amp; Compliance/i);
    assert.match(html, new RegExp(`href=["']${ethicsHref.replaceAll("/", "\\/")}["']`, "i"));
    assert.match(html, /AllVoices/i);
  });
}

test("Connecticut case exposes the ethics guide as a structured related link", async () => {
  const worker = await loadWorker();
  const response = await worker.fetch(
    new Request("http://localhost/cases/connecticut-attorney-general-sunrun-lawsuit", { headers: { accept: "text/html" } }),
    env,
    ctx,
  );
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /https:\/\/solarcomplaint\.com\/companies\/sunrun\/ethics-compliance/i);
});
