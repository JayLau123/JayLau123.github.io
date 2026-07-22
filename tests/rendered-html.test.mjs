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
  assert.match(html, /Computational materials/);
  assert.match(html, /Research Path/);
  assert.match(html, /Publications/);
  assert.match(html, /jayjob2023@gmail\.com/);
  assert.match(html, /Google Scholar/);
  assert.match(html, /GitHub/);
  assert.match(html, /LinkedIn/);
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
