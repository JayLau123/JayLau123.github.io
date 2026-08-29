import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("exports static GitHub Pages pages", async () => {
  const [html, blogHtml, galleryHtml, galleryData] = await Promise.all([
    readFile(new URL("../docs/index.html", import.meta.url), "utf8"),
    readFile(new URL("../docs/blog/index.html", import.meta.url), "utf8"),
    readFile(new URL("../docs/gallery/index.html", import.meta.url), "utf8"),
    readFile(new URL("../app/gallery-data.ts", import.meta.url), "utf8"),
  ]);

  assert.match(html, /<title>Chuanyu Liu<\/title>/i);
  assert.match(html, /Research Interests/);
  assert.match(html, /Recent News/);
  assert.match(html, /CLEAR-AI selected for Genesis Mission Phase I/);
  assert.match(
    html,
    /I am excited to have the opportunity to contribute to CLEAR-AI:[\s\S]*Phase I project in the Genesis Mission\./,
  );
  assert.match(html, /genesis-logo-lockup-black\.png/);
  assert.match(html, /<div class="news-mark"><img/);
  assert.doesNotMatch(html, /<a class="news-mark"/);
  assert.doesNotMatch(html, /genesis-mission\.svg/);
  assert.match(html, /class="news-meta">07\/2026/);
  assert.match(html, /href="https:\/\/www\.linkedin\.com\/feed\/update\/urn:li:activity:7485926986947858432\/"/);
  assert.match(html, /citations\?user=NK94F4kAAAAJ&amp;hl=en/);
  assert.match(html, /citations\?user=P_iNYbQAAAAJ&amp;hl=en/);
  assert.match(html, /citations\?user=u6tJUFwAAAAJ&amp;hl=en/);
  assert.match(html, /citations\?user=2U-7B-MAAAAJ&amp;hl=en/);
  assert.match(html, /user=C2bjyO8AAAAJ&amp;view_op=list_works&amp;sortby=pubdate/);
  assert.match(html, /Dr\.Thomas Mallouk/);
  assert.match(html, /Dr\.Hongliang Xin/);
  assert.match(html, /Dr\.Sen Zhang/);
  assert.match(html, /Dr\.Yugang Zhang/);
  assert.match(html, /Dr\.Chang Liu/);
  assert.match(
    html,
    /I am open to chat and collaboration about quantum chemistry,[\s\S]*art of photography/,
  );
  assert.doesNotMatch(html, /News updates will be added soon\./);
  assert.match(html, /research-schematic-v2\.png/);
  assert.match(html, /class="geometry-ring geometry-ring-left"/);
  assert.match(html, /class="geometry-ring geometry-ring-right"/);
  assert.doesNotMatch(html, /geometry-dot-grid/);
  assert.match(
    html,
    /class="geometry-coordinate geometry-coordinate-left"/,
  );
  assert.match(
    html,
    /class="geometry-coordinate geometry-coordinate-right"/,
  );
  assert.doesNotMatch(html, /geometry-origin/);
  assert.doesNotMatch(html, /geometry-parabola/);
  assert.doesNotMatch(html, /geometry-triangle/);
  assert.match(html, /profile\.jpg/);
  assert.match(
    html,
    /<li class="publication-item"><a class="publication-item-link" href="https:\/\/scholar\.google\.com\//,
  );
  assert.match(html, /aria-label="Toggle light and dark mode"/);
  assert.match(html, /class="ambient-geometry" aria-hidden="true"/);
  assert.match(html, /href="https:\/\/x\.com\/Chuanyuliu21" aria-label="X \(Twitter\)"/);
  assert.match(html, /2026 Chuanyu Liu/);
  assert.doesNotMatch(html, /Built with OpenAI Sites/);
  assert.match(html, /Hosted on GitHub Pages/);
  assert.match(html, /JACS Au/);
  assert.match(html, /ACS Energy Letters/);
  assert.match(html, /citation_for_view=f2qAmGIAAAAJ:4DMP91E08xMC/);
  assert.match(blogHtml, /<h1 id="blog-title">Blog<\/h1>/);
  assert.match(blogHtml, /research notes and unpolished thoughts/);
  assert.doesNotMatch(blogHtml, /<h2 id="posts-title">Content<\/h2>/);
  assert.match(blogHtml, /1(?:<!-- -->)?\.\s*(?:<!-- -->)?Beyond the Shadow of Language: AI as the New Observer of Nature/);
  assert.match(blogHtml, /2(?:<!-- -->)?\.\s*(?:<!-- -->)?From Observation to Integration: The Four Paradigms of Scientific Discovery/);
  assert.match(blogHtml, /class="blog-content-date" dateTime="2026-05">05\/2026/);
  assert.match(blogHtml, /class="blog-content-date" dateTime="2025-09">09\/2025/);
  assert.match(blogHtml, /<time dateTime="2025-09">09\/2025<\/time>/);
  assert.match(blogHtml, /<time dateTime="2026-05">05\/2026<\/time>/);
  assert.match(blogHtml, /href="#from-observation-to-integration"/);
  assert.match(blogHtml, /href="#beyond-the-shadow-of-language"/);
  assert.match(blogHtml, /id="from-observation-to-integration"/);
  assert.match(blogHtml, /id="beyond-the-shadow-of-language"/);
  assert.match(blogHtml, /class="blog-page-number">1/);
  assert.match(blogHtml, /class="blog-page-number">2/);
  assert.doesNotMatch(blogHtml, />Next<\/a>/);
  assert.match(blogHtml, /The Fourth Paradigm: AI for Science \(AI4S\)/);
  assert.match(blogHtml, /class="katex-display"/);
  assert.match(blogHtml, /application\/x-tex/);
  assert.match(blogHtml, /<mi>H<\/mi>/);
  assert.match(blogHtml, /<mo>:<\/mo>/);
  assert.match(blogHtml, /Uncovering the &quot;Alien&quot; Eigenvalue/);
  assert.doesNotMatch(blogHtml, /Posts will be added soon\./);
  assert.doesNotMatch(blogHtml, /H_hat psi = E psi/);
  assert.doesNotMatch(blogHtml, /<strong>/);
  assert.match(galleryHtml, /<h1 id="gallery-title">Gallery<\/h1>/);
  assert.match(galleryHtml, /2026\/2026_1\.JPG/);
  assert.match(galleryHtml, /2025\/2025_1\.JPG/);
  assert.match(galleryHtml, /2024\/2024_1\.JPG/);
  assert.match(galleryHtml, /2023\/2023_2\.JPG/);
  assert.match(galleryHtml, /Sunset in winter\. Chongqing/);
  assert.match(galleryHtml, /01\/2025\. Yangtze River\. Chongqing/);
  assert.match(galleryData, /2026_2\.JPG[\s\S]*One Thousand and One Nights/);
  assert.match(galleryData, /2026_3\.JPG[\s\S]*Angeles Gate Park/);
  assert.match(galleryData, /2026_4\.JPG[\s\S]*Sunset after rain/);
  assert.match(galleryData, /2025_3\.jpg[\s\S]*Christmas holiday \(Peng Lab 2\.0\)/);
  assert.match(galleryHtml, /01\/2024\. Rainy day in Kendall Square/);
  assert.match(galleryHtml, /05\/2023\. Indiana Dunes National Park/);
  assert.match(galleryHtml, /Previous 2026 photo/);
  assert.match(galleryHtml, /Next 2026 photo/);
  assert.doesNotMatch(galleryHtml, /Photos will be added soon\./);
  assert.doesNotMatch(galleryHtml, /2023\/2023_1\.JPG|Spring 2023\. UChicago campus/);
  assert.doesNotMatch(galleryHtml, /gallery-2025\.jpg|gallery-2024\.jpg|gallery-2023\.jpg/);
  assert.doesNotMatch(html, /\bCV\b|curriculum vitae|download/i);
  assert.doesNotMatch(html, /Self_learning_DFT_Workbench|PerovskiteOrderingGCNNs|NOMAD/);
});
