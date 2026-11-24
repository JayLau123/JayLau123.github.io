# Personal Academic Website

Single-page academic website for Chuanyu Liu.

## Development

```bash
pnpm install
pnpm run dev
pnpm run build
pnpm test
```

The site is built with vinext and exported to `docs/` for GitHub Pages.

## GitHub Pages

The public GitHub Pages site is exported to `docs/`.

```bash
pnpm run pages:build
node --test tests/rendered-html.test.mjs tests/github-pages-export.test.mjs
```

After editing the source, run the commands above, commit the source and `docs/`
changes, then push to GitHub. GitHub Pages publishes from `main` branch `/docs`.

## Publications

The **Sync Google Scholar publications** workflow runs daily and can also run
from the repository's Actions tab. If Scholar is unavailable, the workflow
checks [the verified OpenAlex author record](https://openalex.org/authors/A5122074882)
for published journal papers. It keeps Scholar-only entries and records a
warning if both providers are temporarily unavailable.

The page loads the latest committed snapshot from GitHub without a Pages rebuild.
The bundled snapshot provides an offline fallback. Curated abstracts, publisher
links, and cover designations live in `app/page.tsx`.
