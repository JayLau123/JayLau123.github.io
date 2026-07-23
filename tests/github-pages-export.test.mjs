import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("exports static GitHub Pages pages", async () => {
  const [html, blogHtml, galleryHtml] = await Promise.all([
    readFile(new URL("../docs/index.html", import.meta.url), "utf8"),
    readFile(new URL("../docs/blog/index.html", import.meta.url), "utf8"),
    readFile(new URL("../docs/gallery/index.html", import.meta.url), "utf8"),
  ]);

  assert.match(html, /<title>Chuanyu Liu<\/title>/i);
  assert.match(html, /Research Interests/);
  assert.match(html, /Recent News/);
  assert.match(html, /research-schematic-v2\.png/);
  assert.match(html, /profile\.jpg/);
  assert.match(html, /2026 Chuanyu Liu/);
  assert.match(html, /Hosted on GitHub Pages/);
  assert.match(blogHtml, /<h1 id="blog-title">Blog<\/h1>/);
  assert.match(blogHtml, /research notes and unpolished thoughts/);
  assert.match(blogHtml, /Posts will be added soon\./);
  assert.match(galleryHtml, /<h1 id="gallery-title">Gallery<\/h1>/);
  assert.match(galleryHtml, /gallery-2025\.jpg/);
  assert.match(galleryHtml, /gallery-2024\.jpg/);
  assert.match(galleryHtml, /gallery-2023\.jpg/);
  assert.match(galleryHtml, /Winter 2025\. Christmas holiday/);
  assert.match(galleryHtml, /Summer 2024\. Charles river/);
  assert.match(galleryHtml, /Fall 2023\. Kayaking/);
  assert.doesNotMatch(galleryHtml, /Photos will be added soon\./);
  assert.doesNotMatch(html, /\bCV\b|curriculum vitae|download/i);
  assert.doesNotMatch(html, /Self_learning_DFT_Workbench|PerovskiteOrderingGCNNs|NOMAD/);
});
