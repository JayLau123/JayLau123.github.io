import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
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
  assert.match(html, /computational chemistry \| ai for science/);
  assert.match(html, /Hi, I&#x27;m Chuanyu Liu,/);
  assert.match(html, /Research Interests/);
  assert.match(html, /research-schematic-v2\.png/);
  assert.match(
    html,
    /real-world conditions\.[\s\S]*research-schematic-v2\.png[\s\S]*My methodological focus/,
  );
  assert.doesNotMatch(
    html,
    /research-schematic-v1|research-schematic-v3|research-schematic-v4/,
  );
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
  assert.doesNotMatch(html, /Research Path/);
  assert.doesNotMatch(html, /Public papers/);
  assert.doesNotMatch(html, /Research focus/);
  assert.doesNotMatch(html, /class="eyebrow">Contact/);
  assert.doesNotMatch(
    html,
    /<strong>bridging<\/strong>|<strong>computational<\/strong>|<strong>accelerating<\/strong>/,
  );
  assert.doesNotMatch(html, /<nav\b|site-header/);
});

test("keeps private and excluded content out of the site source", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  const combined = `${page}\n${layout}\n${packageJson}`;
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
