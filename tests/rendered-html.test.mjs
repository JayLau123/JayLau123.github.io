import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(new URL(pathname, "http://localhost"), {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the academic homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Chuanyu Liu<\/title>/i);
  assert.match(html, /Hi, I&#x27;m Chuanyu Liu,/);
  assert.match(html, /Research Interests/);
  assert.match(html, /research-schematic-v2\.png/);
  assert.match(html, /<nav class="site-nav" aria-label="Primary navigation">/);
  assert.match(html, /href="\/" aria-current="page"[\s\S]*About/);
  assert.match(html, /href="\/blog\/"[\s\S]*Blog/);
  assert.match(html, /href="\/gallery\/"[\s\S]*Gallery/);
  assert.match(
    html,
    /real-world conditions\.[\s\S]*research-schematic-v2\.png[\s\S]*My methodological focus/,
  );
  assert.doesNotMatch(
    html,
    /research-schematic-v1|research-schematic-v3|research-schematic-v4/,
  );
  assert.match(html, /Recent News/);
  assert.match(html, /News updates will be added soon\./);
  assert.match(html, /Publications/);
  assert.match(html, /profile\.jpg/);
  assert.match(html, /mailto:jayjob2023@gmail\.com/);
  assert.match(html, /aria-label="Email"/);
  assert.match(html, /aria-label="GitHub"/);
  assert.match(html, /aria-label="Google Scholar"/);
  assert.match(html, /aria-label="LinkedIn"/);
  assert.match(html, /href="https:\/\/x\.com\/home" aria-label="X \(Twitter\)"/);
  assert.match(html, /2026 Chuanyu Liu/);
  assert.match(html, /Built with OpenAI Sites/);
  assert.match(html, /Hosted on GitHub Pages/);
  assert.doesNotMatch(html, /GPT Image/);
  assert.match(html, /art of photography/);
  assert.doesNotMatch(html, /computational chemistry \| ai for science/);
  assert.doesNotMatch(html, /Research Path/);
  assert.doesNotMatch(html, /Public papers/);
  assert.doesNotMatch(html, /Research focus/);
  assert.doesNotMatch(html, /class="eyebrow">Contact/);
  assert.doesNotMatch(
    html,
    /<strong>bridging<\/strong>|<strong>computational<\/strong>|<strong>accelerating<\/strong>/,
  );
});

test("server-renders the blog and gallery pages", async () => {
  const blogResponse = await render("/blog");
  assert.equal(blogResponse.status, 200);
  const blogHtml = await blogResponse.text();
  assert.match(blogHtml, /<title>Chuanyu Liu<\/title>/i);
  assert.match(blogHtml, /<h1 id="blog-title">Blog<\/h1>/);
  assert.match(blogHtml, /research notes and unpolished thoughts/);
  assert.match(blogHtml, /strictly my own/);
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
  assert.match(blogHtml, /href="\/blog\/" aria-current="page"[\s\S]*Blog/);
  assert.doesNotMatch(blogHtml, /notes \| research logs/);
  assert.doesNotMatch(blogHtml, /Posts will be added soon\./);
  assert.doesNotMatch(blogHtml, /H_hat psi = E psi/);
  assert.doesNotMatch(blogHtml, /<strong>/);

  const galleryResponse = await render("/gallery");
  assert.equal(galleryResponse.status, 200);
  const galleryHtml = await galleryResponse.text();
  assert.match(galleryHtml, /<h1 id="gallery-title">Gallery<\/h1>/);
  assert.match(galleryHtml, /solo travel and snapping photos/);
  assert.match(
    galleryHtml,
    /gallery-year-label[\s\S]*2026[\s\S]*2026\/2026_1\.JPG[\s\S]*Sunset in winter\. Chongqing[\s\S]*gallery-year-label[\s\S]*2025[\s\S]*2025\/2025_1\.JPG[\s\S]*01\/2025\. Yangtze River\. Chongqing[\s\S]*gallery-year-label[\s\S]*2024[\s\S]*2024\/2024_1\.JPG[\s\S]*01\/2024\. Rainy day in Kendall Square[\s\S]*gallery-year-label[\s\S]*2023[\s\S]*2023\/2023_2\.JPG[\s\S]*05\/2023\. Indiana Dunes National Park/,
  );
  const galleryData = await readFile(
    new URL("../app/gallery-data.ts", import.meta.url),
    "utf8",
  );
  assert.match(galleryData, /2026_2\.JPG[\s\S]*One Thousand and One Nights/);
  assert.match(galleryData, /2026_3\.JPG[\s\S]*Angeles Gate Park/);
  assert.match(galleryData, /2026_4\.JPG[\s\S]*Sunset after rain/);
  assert.match(galleryData, /2025_3\.jpg[\s\S]*Christmas holiday \(Peng Lab 2\.0\)/);
  assert.doesNotMatch(galleryHtml, /2023\/2023_1\.JPG|Spring 2023\. UChicago campus/);
  assert.match(galleryHtml, /Previous 2026 photo/);
  assert.match(galleryHtml, /Next 2026 photo/);
  assert.match(
    galleryHtml,
    /href="\/gallery\/" aria-current="page"[\s\S]*Gallery/,
  );
  assert.doesNotMatch(galleryHtml, /travel \| people \| mentorship/);
  assert.doesNotMatch(galleryHtml, /Photos will be added soon\./);
  assert.doesNotMatch(galleryHtml, /gallery-2025\.jpg|gallery-2024\.jpg|gallery-2023\.jpg/);
});

test("keeps private and excluded content out of the site source", async () => {
  const [page, blog, carousel, gallery, galleryData, shell, layout, packageJson] =
    await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/blog/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/gallery-year-carousel.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/gallery/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/gallery-data.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/components/site-shell.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  const combined = `${page}\n${blog}\n${carousel}\n${gallery}\n${galleryData}\n${shell}\n${layout}\n${packageJson}`;
  const privateDocumentPattern = new RegExp(
    String.raw`\b${"C"}${"V"}\b|curriculum vitae|download`,
    "i",
  );
  const excludedRepositoryPattern = new RegExp(
    [
      "Self_learning_DFT_Workbench",
      "PerovskiteOrderingGCNNs",
      "NOMAD",
    ].join("|"),
  );

  assert.doesNotMatch(combined, privateDocumentPattern);
  assert.doesNotMatch(combined, /Bonner Hall|117 Bonner/i);
  assert.doesNotMatch(combined, excludedRepositoryPattern);
  assert.doesNotMatch(
    combined,
    /react-loading-skeleton|codex-preview|_sites-preview/,
  );
});
