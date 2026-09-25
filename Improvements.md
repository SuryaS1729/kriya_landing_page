# Improvements

Audit of the Kriya landing page, ordered roughly by value per unit of effort.
Check items off as you land them.

Legend: `[x]` done · `[ ]` pending · `[~]` reviewed and deliberately left unchanged

---

## Repo hygiene

- [x] **Delete stale Vite leftovers.** `public/privacy/index.html` (dead static copy of the
      privacy page, superseded by `app/privacy/page.tsx`), `icon.png` (1.1 MB, unreferenced —
      `app/layout.tsx` points `icons` at `/favicon.ico`), `src/assets/react.svg` (Vite template
      asset), `src/components/ui/tooltip-card.tsx` (never imported anywhere).
- [x] **Standardise on Bun.** Deleted the committed `package-lock.json` (bun was already in use),
      added `"packageManager": "bun@1.3.0"`, and added `package-lock.json` / `yarn.lock` /
      `pnpm-lock.yaml` to `.gitignore` so they can't creep back in.
- [x] **Rewrite `README.md`.** It was still the Vite template (rolldown, React Compiler, Vite
      plugin docs). Now documents the actual stack, scripts, env vars, routes, and structure.
- [x] **Add `.env.local.example`.** `NEXT_PUBLIC_SITE_URL` was required but undocumented.
- [x] **Extract shared constants.** The iOS URL, Android URL, QR path, logo URL, and X profile
      were hardcoded in three files. They now live in `src/lib/constants.ts` and are imported by
      `app/download/page.tsx`, `src/components/DownloadButtons.tsx`, and
      `src/AmyLandingHero.tsx`.
- [x] **Drop the QR generator.** `bun generate:qr`, `scripts/generate-kriya-qr.mjs`, the `qrcode`
      devDependency, and the `generated-assets/` directory are all gone. The QR is a
      hand-maintained, committed asset now — the download URL is not expected to change.
- [x] **Serve the QR locally.** It was fetched from
      `https://kriyarecordings.bitwisedharma.com/kriya-download-blue2.svg` on every page load —
      a DNS + TLS round-trip to a third-party host for 1.7 KB. Both call sites now point at
      `/assets/kriya-download-blue2.svg`. The local copy was already sha256-identical to the
      remote file, so the pixels are unchanged. Next serves public-folder SVGs as a plain
      `<img src>` and bypasses the image optimizer entirely, so this costs nothing and needs no
      `dangerouslyAllowSVG`. `remotePatterns` is now narrowed to `/icon.webp` (the logo is still
      remote).
- [x] **Convert background images to WebP.** `public/assets/` was
      2.4 MB across four files. Converted with `cwebp -q 80 -m 6` (Homebrew `webp`; note the
      Homebrew `ffmpeg` build lacks `libwebp`, so it cannot encode WebP):
      - `6.jpeg` (1080×677, 51 KB) → `6.webp` (**18 KB**, −64%)
      - `9.jpeg` (2912×1632, 549 KB) → `9.webp` (1440×808, **76 KB**, −86%). Downscaled to 1440
        wide, which still covers a 430 px viewport at 3× DPR under `bg-cover`.
      - `41.png` (1584×993, 1.88 MB) → `41.webp` (**61 KB**, −97%). Unreferenced, kept as a
        candidate background.

      `public/assets/` is now 162 KB. Backgrounds are still applied as Tailwind arbitrary-value
      CSS backgrounds, so they bypass `next/image` — a future option is `<Image fill>` with
      `priority` for the hero.
- [x] **Localize the app logo.** `icon.webp` was fetched from
      `kriyarecordings.bitwisedharma.com` on every page load. It was a 1024×1024 / 70 KB file
      being rendered at 60×60 and 40×40, so it was re-encoded to 192×192 / **4.4 KB** (−94%) at
      `public/assets/icon.webp` and `LOGO_URL` now points there. 192 px covers the largest
      placement at 3× DPR with room to spare. `images.remotePatterns` is now gone from
      `next.config.ts` entirely — **the site makes zero third-party requests.**
- [x] **Consolidate the stylesheets.** I had this backwards initially: `src/index.css` was the
      Vite stub (just `body { margin: 0 }`) and `src/App.css` held the actual Tailwind entry
      (`@import "tailwindcss"` plus the `@theme` font tokens). Both were imported by
      `app/layout.tsx`. The `@theme` block has been moved into `src/index.css`, the redundant
      `body { margin: 0 }` dropped (Tailwind preflight already does it), the `App.css` import
      removed, and `src/App.css` deleted. Verified the font tokens still resolve:
      `--font-instrument`, `--font-sans`, `--font-space-mono`, and the Recoleta
      `--font-recoleta-family` variable all still emit.

---

## Bugs / correctness

- [x] **The download CTA was missing from the prerendered HTML.** `DownloadButtons` kept
      `isMobile` in state, initialised to `null`, so the server rendered an empty
      `<div class="h-20">`. Confirmed in the build output: `"Download the app"` was absent from
      `.next/server/app/index.html` and the `h-20` placeholder was present. Two consequences —
      the primary CTA only existed after JS hydrated (no-JS and slow-connection visitors got a
      blank gap), and the 80px placeholder was shorter than either real branch (~44px button,
      ~200px QR block), so the "free forever" pill below it jumped on every load.
      Both branches are static markup, so they now render simultaneously and Tailwind picks one:
      `md:hidden` for the button, `hidden ... md:flex` for the QR. State, effect, and placeholder
      deleted. `"Download the app"` and `"Scan to download"` are now both in the prerendered HTML.
- [x] **The demo video restarted once on desktop.** The ternary at
      `src/AmyLandingHero.tsx:122-135` switched the wrapper element type from `div` to
      `motion.div` when `isDesktop` flipped true after mount. React unmounts and recreates an
      element whose type changes, so the `<video>` was torn down and reloaded — every desktop
      visitor saw the demo replay from frame 0 a moment after load.
      Fixed by rendering a single `<video>` and moving the slide-in to CSS
      (`hero-video-enter` in `src/index.css`). Conditional `motion` props were **not** viable:
      `initial` is only read on mount, so by the time a client-side `matchMedia` resolved, the
      animation had already been skipped. CSS also lets the animation start at first paint and
      gates it on `prefers-reduced-motion` natively. The `isDesktop` state and its
      `matchMedia` effect are gone entirely. Verified: one `<video>` tag in the output, and the
      keyframes emitted inside `@media (min-width:768px) and (prefers-reduced-motion:no-preference)`.
- [x] **Merge the duplicated effects.** Two effects both set `showAnnotation`; the second's first
      line was a redundant duplicate of the first's early-return branch. Now one effect.
- [x] **Fix the hardcoded copyright year.** Was `&copy; 2025`; now `new Date().getFullYear()`.
- [ ] **Add `/download` to `app/sitemap.ts`.** It's a real, linked route (the QR encodes it) but
      is missing from the sitemap. Left open deliberately — low impact, since Google discovers it
      through the internal link from the home page.
- [x] **Stop shipping `localhost` URLs to production.** `app/robots.ts` and `app/sitemap.ts` each
      declared their *own* `?? "http://localhost:3000"` fallback while `app/layout.tsx` was
      already using the correct `SITE_URL` constant — so the two could disagree, and with
      `NEXT_PUBLIC_SITE_URL` unset you would have published
      `Sitemap: http://localhost:3000/sitemap.xml`, which Google fails to fetch, discarding the
      whole sitemap. Both files now import `SITE_URL` from `src/lib/constants.ts`, whose default
      is `https://kriya.bitwisedharma.com`. There is no longer any code path that can emit a
      localhost URL.

      Verified both ways: with the env var unset, `robots.txt` and `sitemap.xml` emit
      `https://kriya.bitwisedharma.com`; with it set, every surface (canonical, `og:url`,
      robots, sitemap) follows the override.

---

## SEO / metadata

- [x] **Add `metadataBase` to `app/layout.tsx`.** Set from `SITE_URL`, so canonicals and OG URLs
      are absolute.
- [x] **Add an OG image.** A designed 1200×630 image now lives at `design/og.png` (master, not
      served) and `public/og.jpg` (served, 63 KB). Previously there was no `images` entry at all,
      so link previews rendered bare.
- [x] **Upgrade `twitter.card` from `summary` to `summary_large_image`.**
- [x] **Add `alternates.canonical`** on the home, privacy, and download routes.
- [x] **Fix OG metadata being inherited across routes.** Next merges metadata *shallowly*, so
      `/privacy` and `/download` — which only set `title`/`description` — were emitting the home
      page's `og:title`, `og:description`, and `og:url`. Every route was advertising the home
      page's social preview. Fixed with `pageMetadata()` in `src/lib/metadata.ts`, which restates
      `openGraph`/`twitter` per route. Documented in the README so it doesn't regress.
- [~] **Signal new-tab links — accepted as-is, deliberately.** Seven links use
      `target="_blank"` with no visual or screen-reader hint: the two store buttons on
      `app/download/page.tsx:54,62`, the `@ash1sh0kumar` / `@indiainpixels` links in the story
      prose (`src/AmyLandingHero.tsx:124`), and the Twitter / Android / iOS footer links
      (`:165-167`). This is WCAG 3.2.5 "Change on Request", which is **Level AAA**, not an AA
      failure, and on mobile `target="_blank"` is unreliable regardless — iOS Safari may open an
      in-app browser, Android Chrome may hand off to the system browser. Reviewed and consciously
      left unchanged. Revisit only if you want the external-link affordance for its own sake, in
      which case the options are: drop `target="_blank"` (simplest, no design change), add
      `sr-only` "(opens in a new tab)" text, or add a lucide `ExternalLink` icon (a visible design
      change to the footer and store buttons).

---

## Performance

- [ ] **Respect `prefers-reduced-motion` for the demo video.**
      `src/AmyLandingHero.tsx:130` autoplays a looping video unconditionally. Pause it (or don't
      render it) when reduced motion is requested.
- [ ] **Pause the video when off-screen.** It loops forever even when scrolled past. A small
      `IntersectionObserver` hook fixes it.
- [ ] **Self-host or optimise the video.** It's pulled from an R2 bucket with no
      `next.config.ts` entry needed, but there's no poster preload strategy and no `width`/`height`
      reservation beyond the intrinsic aspect ratio — worth confirming there's no layout shift.
- [ ] **Audit the font stack.** Three Google families (Inter, Instrument Serif, Space Mono) plus
      local Recoleta. Confirm all four are used above the fold; drop any that aren't.

---

## Accessibility

- [ ] **Add a caption/track or `aria-describedby` for the demo video.** It has an `aria-label` but
      no text alternative beyond that.
- [ ] **Re-check contrast.** `text-gray-500` on `bg-gray-50` (`AmyLandingHero.tsx:200`) and the
      `font-space-mono text-[11px]` pill at `:119` are both likely below 4.5:1.
- [ ] **Add a visible focus style.** Tailwind's rings are present by default, but the
      `transition-colors` links and the custom teal button should be verified with a keyboard
      pass.

---

## Tooling / config

- [ ] **Widen the ESLint scope.** `eslint.config.js:7` targets `files: ['src/**/*.{ts,tsx}']`, so
      the entire `app/` directory is unlinted. Change to `['**/*.{ts,tsx}']` and add an ignores
      entry for `.agents/`.
- [ ] **Drop `reactRefresh.configs.vite`** from `eslint.config.js:14`. It's a Vite HMR rule with
      no meaning in Next.js and may fight the App Router conventions.
- [x] **Add a `typecheck` script.** `package.json` now has `"typecheck": "tsc --noEmit"`.
- [ ] **Bump the TS target.** `tsconfig.json` targets `ES2017`; ES2022 is a better floor for
      Next 16. Consider adding `noUncheckedIndexedAccess`.
- [ ] **Tighten `next.config.ts`.** `poweredByHeader: false` and an explicit `turbopack.root` are
      now set (the root pin silences a warning caused by a stray `package-lock.json` in the
      parent directory), and `images.remotePatterns` has been removed now that all images are
      local. Little left here.
- [ ] **Drop the unused `--font-recoleta` theme token.** `src/index.css` declares
      `--font-recoleta: var(--font-recoleta-family), serif`, but no `font-recoleta` utility is
      used anywhere — the Recoleta face is applied via `recoleta.className` from
      `next/font/local` instead. The token is dead config.
- [ ] **Optimise the PWA icons.** `public/android-chrome-512x512.png` is **399 KB** and
      `public/android-chrome-192x192.png` is 62 KB, both PNGs of what is almost certainly the same
      flat-coloured artwork. Run them through `oxipng`/`pngquant`, or serve WebP — 399 KB for a
      home-screen icon is a real download for anyone who installs the site.
- [ ] **Convert `app/privacy/privacy.module.css` to Tailwind** for consistency with the rest of
      the app.
- [ ] **Consider a CI workflow** running `bun run lint`, `bun run typecheck`, and `bun run build`.

---

## Refactor

- [x] **Extract shared constants** — done, see Repo hygiene above.
- [ ] **Split `AmyLandingHero.tsx`.** It's a 207-line client component holding the hero, the story
      section, and the footer — so all of it ships as client JS. Break out `Hero`, `Story`, and
      `Footer`; only the animated leaf nodes need `"use client"`.
- [ ] **Check whether `src/lib/utils.ts` (`cn`) is still needed** after removing `tooltip-card`.
      It's currently unused.

---

## Component library

- [ ] **`motion` vs `framer-motion`.** The `motion` package is imported as `motion/react`. Fine as
      is — just be aware the import path is intentional and not a typo.
- [ ] **`react-rough-notation` is client-only and adds ~15 KB.** It's used twice
      (`AmyLandingHero.tsx:100` and `:164`) for the hand-drawn underlines. Consider whether a CSS
      or inline-SVG underline would be visually close enough to drop the dependency.
