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
  assert.match(blogHtml, /<h2 id="posts-title">Content<\/h2>/);
  assert.match(blogHtml, /From Observation to Integration: The Four Paradigms of Scientific Discovery/);
  assert.match(blogHtml, /Beyond the Shadow of Language: AI as the New Observer of Nature/);
  assert.match(blogHtml, /href="#from-observation-to-integration"/);
  assert.match(blogHtml, /href="#beyond-the-shadow-of-language"/);
  assert.match(blogHtml, /id="from-observation-to-integration"/);
  assert.match(blogHtml, /id="beyond-the-shadow-of-language"/);
  assert.match(blogHtml, /class="blog-page-number">1/);
  assert.match(blogHtml, /class="blog-page-number">2/);
  assert.match(blogHtml, /The Fourth Paradigm: AI for Science \(AI4S\)/);
  assert.match(blogHtml, /class="katex-display"/);
  assert.match(blogHtml, /application\/x-tex/);
  assert.match(blogHtml, /<mi>H<\/mi>/);
  assert.match(blogHtml, /Uncovering the &quot;Alien&quot; Eigenvalue/);
  assert.doesNotMatch(blogHtml, /Posts will be added soon\./);
  assert.doesNotMatch(blogHtml, /H_hat psi = E psi/);
  assert.match(galleryHtml, /<h1 id="gallery-title">Gallery<\/h1>/);
  assert.match(galleryHtml, /2026\/2026_1\.JPG/);
  assert.match(galleryHtml, /2025\/2025_1\.JPG/);
  assert.match(galleryHtml, /2024\/2024_1\.JPG/);
  assert.match(galleryHtml, /2023\/2023_2\.JPG/);
  assert.match(galleryHtml, /Sunset in Chongqing/);
  assert.match(galleryHtml, /Spring 2025\. Chongqing/);
  assert.match(galleryHtml, /Winter 2024\. Rainy day in Kendall Square/);
  assert.match(galleryHtml, /Summer 2023\. Indiana Dunes National Park/);
  assert.match(galleryHtml, /Previous 2026 photo/);
  assert.match(galleryHtml, /Next 2026 photo/);
  assert.doesNotMatch(galleryHtml, /Photos will be added soon\./);
  assert.doesNotMatch(galleryHtml, /2023\/2023_1\.JPG|Spring 2023\. UChicago campus/);
  assert.doesNotMatch(galleryHtml, /gallery-2025\.jpg|gallery-2024\.jpg|gallery-2023\.jpg/);
  assert.doesNotMatch(html, /\bCV\b|curriculum vitae|download/i);
  assert.doesNotMatch(html, /Self_learning_DFT_Workbench|PerovskiteOrderingGCNNs|NOMAD/);
});
