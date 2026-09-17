import test from "node:test"; import assert from "node:assert/strict"; import fs from "node:fs";
const note=fs.readFileSync(new URL("../app/goodleap/sitemap-note.ts",import.meta.url),"utf8");
test("GoodLeap launch routes are enumerated for sitemap integration",()=>{for(const p of ["/goodleap","/goodleap/states","/goodleap/states/minnesota","/goodleap/states/virginia","/goodleap/resources"])assert.ok(note.includes(`\"${p}\"`),p)});
