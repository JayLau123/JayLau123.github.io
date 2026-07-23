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
  assert.match(html, /2026 Chuanyu Liu/);
  assert.match(html, /Built with OpenAI Sites/);
  assert.match(html, /Hosted on GitHub Pages/);
  assert.match(html, /Schematic generated with GPT Image/);
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
  assert.match(blogHtml, /Posts will be added soon\./);
  assert.match(blogHtml, /href="\/blog\/" aria-current="page"[\s\S]*Blog/);
  assert.doesNotMatch(blogHtml, /notes \| research logs/);

  const galleryResponse = await render("/gallery");
  assert.equal(galleryResponse.status, 200);
  const galleryHtml = await galleryResponse.text();
  assert.match(galleryHtml, /<h1 id="gallery-title">Gallery<\/h1>/);
  assert.match(galleryHtml, /solo travel and snapping photos/);
  assert.match(
    galleryHtml,
    /gallery-2025\.jpg[\s\S]*Winter 2025\. Christmas holiday[\s\S]*gallery-2024\.jpg[\s\S]*Summer 2024\. Charles river[\s\S]*gallery-2023\.jpg[\s\S]*Fall 2023\. Kayaking/,
  );
  assert.match(
    galleryHtml,
    /href="\/gallery\/" aria-current="page"[\s\S]*Gallery/,
  );
  assert.doesNotMatch(galleryHtml, /travel \| people \| mentorship/);
  assert.doesNotMatch(galleryHtml, /Photos will be added soon\./);
});

test("keeps private and excluded content out of the site source", async () => {
  const [page, blog, gallery, shell, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/blog/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/gallery/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/site-shell.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  const combined = `${page}\n${blog}\n${gallery}\n${shell}\n${layout}\n${packageJson}`;
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
