import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const sitemap = fs.readFileSync(new URL("../app/sitemap.ts", import.meta.url), "utf8");

const goodLeapRoutes = [
  "/goodleap",
  "/goodleap/states",
  "/goodleap/states/minnesota",
  "/goodleap/states/virginia",
  "/goodleap/resources",
];

test("GoodLeap launch routes are integrated into the production sitemap", () => {
  for (const path of goodLeapRoutes) {
    assert.ok(sitemap.includes(`path: \"${path}\"`), `${path} missing from app/sitemap.ts`);
  }
});
