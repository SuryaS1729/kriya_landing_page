# Kriya — Landing Page

Marketing site for **Kriya: Spiritual Productivity**, an open-source app that blends timeless
wisdom from the Bhagavad Gita with a modern daily workflow.

Built with [Next.js 16](https://nextjs.org) (App Router, Turbopack) and
[Tailwind CSS v4](https://tailwindcss.com).

## Getting started

Requires [Bun](https://bun.sh) 1.3+.

```bash
bun install
bun dev
```

The site runs at http://localhost:3000.

## Scripts

| Script              | Description                                  |
| ------------------- | -------------------------------------------- |
| `bun dev`           | Start the dev server                         |
| `bun build`         | Production build                             |
| `bun start`         | Serve the production build                   |
| `bun lint`          | Run ESLint                                   |
| `bun typecheck`     | Run TypeScript in no-emit mode               |

## Environment

| Variable                | Required | Description                                        |
| ----------------------- | -------- | -------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`  | No       | Canonical site origin, used by `sitemap.ts`, `robots.ts`, and `metadataBase` |

**Optional.** It defaults to `https://kriya.bitwisedharma.com`, so the site builds and deploys
correctly with no configuration — there is no code path that can emit a `localhost` URL.

If you do set it, scope it to the **Production** environment only in Vercel. That way preview
deployments fall back to the production domain and self-canonicalize to it, instead of
canonicalizing to their own throwaway `*.vercel.app` URL.

```bash
cp .env.local.example .env.local
```

## Project structure

```
app/
  layout.tsx           Root layout, fonts, global metadata
  page.tsx             Home route
  download/page.tsx    QR-code interstitial; redirects mobile agents to the stores
  privacy/page.tsx     Privacy policy
  robots.ts            robots.txt
  sitemap.ts           sitemap.xml
src/
  AmyLandingHero.tsx   Entire home page (hero, story, footer)
  components/          DownloadButtons and other components
  fonts.ts             Local Recoleta font
  index.css            Tailwind entry + theme tokens (the only stylesheet)
  lib/
    constants.ts       Store URLs, asset paths — single source of truth
    utils.ts           Shared helpers
public/
  assets/              Backgrounds (6/9/41.webp), logo, QR code
  og.jpg               Social preview image (1200x630)
design/
  og.png               Master source for og.jpg — not served
```

## Routes

- `/` — landing page
- `/download` — QR-code page; user agents on iOS/Android are redirected straight to the store
- `/privacy` — privacy policy
- `/robots.txt`, `/sitemap.xml` — generated

## Metadata

`app/layout.tsx` sets `metadataBase` from `NEXT_PUBLIC_SITE_URL` and a `title.template` of
`%s | Kriya: Spiritual Productivity`. Child routes build their metadata with `pageMetadata()` in
`src/lib/metadata.ts` — **`openGraph` and `twitter` must be restated per route**, because Next
merges metadata shallowly and a child that only sets `title`/`description` would otherwise inherit
the home page's `og:url` and `og:title`.

## Assets

Every image is served locally — the site makes **no third-party requests**, so
`next.config.ts` needs no `remotePatterns`.

Backgrounds are WebP (`cwebp -q 80 -m 6`); the QR code at
`public/assets/kriya-download-blue2.svg` is committed by hand and encodes
`https://kriya.bitwisedharma.com/download`. There is no generator script — if the download URL
ever changes, re-generate the QR and commit the result.

`public/assets/icon.webp` is the app logo, re-encoded from the original 1024×1024 / 70 KB source
down to 192×192 / 4.4 KB, which is ample for its largest placement (60 px) at 3× DPR.

### Regenerating the OG image

`design/og.png` is the 1200×630 master. `public/og.jpg` is what gets served, produced with:

```bash
cjpeg -quality 92 -optimize -progressive design/og.png > public/og.jpg
```

That takes it from 365 KB to 63 KB (−82%) with no visible artifacting. Quality 85 was also tried
and rejected — it rings visibly around the Recoleta wordmark and the small store-badge text. PNG
is fully opaque, so no alpha flattening is needed.

Note `next/og`'s `ImageResponse` only encodes PNG, which is why this is a committed static file
rather than a generated route: a 1200×630 gradient PNG comes out around 109 KB.

## Notes

- See [Improvements.md](./Improvements.md) for the pending cleanup list.
