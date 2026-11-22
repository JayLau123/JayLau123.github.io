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

The **Sync Google Scholar publications** workflow refreshes the public profile
snapshot daily and can also run from the repository's Actions tab. The page
loads the latest committed snapshot from GitHub, so metadata updates do not
require a Pages rebuild. The bundled snapshot provides an offline fallback.
Curated abstracts, publisher links, and cover designations live in `app/page.tsx`.
