# Chuanyu Liu Academic Website

Single-page academic website for Chuanyu Liu.

## Content Rules

- Do not add a CV file or a CV link.
- Do not host local paper PDFs.
- Do not list GitHub repositories.
- Keep publications linked to public Google Scholar or public article pages.

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
