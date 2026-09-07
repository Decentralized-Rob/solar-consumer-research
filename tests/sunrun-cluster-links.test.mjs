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

test("cross-links the Connecticut Sunrun case and state hub", async () => {
  const caseHtml = await render("/cases/connecticut-attorney-general-sunrun-lawsuit");
  assertInternalLink(caseHtml, "/companies/sunrun");
  assertInternalLink(caseHtml, "/states/connecticut");

  const stateHtml = await render("/states/connecticut");
  assertInternalLink(stateHtml, "/companies/sunrun");
  assertInternalLink(stateHtml, "/cases/connecticut-attorney-general-sunrun-lawsuit");
});

test("connects Sunrun-relevant state hubs to the company research hub", async () => {
  for (const path of [
    "/states/massachusetts",
    "/states/florida",
    "/states/texas",
    "/states/arizona",
  ]) {
    const html = await render(path);
    assertInternalLink(html, "/companies/sunrun");
  }
});

test("uses the updates page as an internal Sunrun discovery surface", async () => {
  const html = await render("/updates");
  assertInternalLink(html, "/companies/sunrun");
  assertInternalLink(html, "/cases/connecticut-attorney-general-sunrun-lawsuit");
  assertInternalLink(html, "/states/connecticut");
  assertInternalLink(html, "/states/massachusetts");
  assertInternalLink(html, "/states/florida");
  assertInternalLink(html, "/states/texas");
  assertInternalLink(html, "/states/arizona");
});
