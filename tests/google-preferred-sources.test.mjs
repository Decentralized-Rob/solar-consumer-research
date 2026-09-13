import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const layoutPath = new URL("../app/layout.tsx", import.meta.url);
const componentPath = new URL("../components/google-preferred-source.tsx", import.meta.url);

test("loads Google's Preferred Sources library from the root layout before hydration", async () => {
  const layout = await readFile(layoutPath, "utf8");

  assert.match(layout, /https:\/\/news\.google\.com\/swg\/js\/v1\/publisher\.js/);
  assert.match(layout, /strategy="beforeInteractive"/);
  assert.match(layout, /<Script[\s\S]*?\basync\b[\s\S]*?publisher\.js/);
});

test("uses Google's standard declarative control and browser-language localization", async () => {
  const component = await readFile(componentPath, "utf8");

  assert.match(component, /"google-add-preferred-source-btn": ""/);
  assert.match(component, /"data-theme": "light"/);
  assert.doesNotMatch(component, /data-lang/);
  assert.doesNotMatch(component, /next\/script/);
});

test("automatically covers research and case stories without duplicating the Freedom Forever hub control", async () => {
  const component = await readFile(componentPath, "utf8");

  assert.match(component, /"\/research"/);
  assert.match(component, /pathname\.startsWith\("\/research\/"\)/);
  assert.match(component, /pathname === "\/cases\/freedom-forever"/);
  assert.match(component, /pathname\.startsWith\("\/cases\/"\)/);
});
