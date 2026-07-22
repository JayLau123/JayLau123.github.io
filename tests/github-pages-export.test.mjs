import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("exports a static GitHub Pages homepage", async () => {
  const html = await readFile(new URL("../docs/index.html", import.meta.url), "utf8");

  assert.match(html, /<title>Chuanyu Liu<\/title>/i);
  assert.match(html, /Research Interests/);
  assert.match(html, /research-schematic-v2\.png/);
  assert.match(html, /profile\.jpg/);
  assert.match(html, /2026 Chuanyu Liu/);
  assert.match(html, /Hosted on GitHub Pages/);
  assert.doesNotMatch(html, /\bCV\b|curriculum vitae|download/i);
  assert.doesNotMatch(html, /Self_learning_DFT_Workbench|PerovskiteOrderingGCNNs|NOMAD/);
});
