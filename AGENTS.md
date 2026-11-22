# Psí salon Pucci

- Dev: `npm run dev`
- Build: `npm run build` (static export do `out/`). Skript po buildu smaže hydrataci Nextu a nechá JSON-LD plus malý skript menu (`data-keep`).
- Stack: Next.js App Router, TypeScript, statický export
- Kanonická adresa: `SITE_URL` v `lib/site.ts` (výchozí `https://simivilasek-ship-it.github.io/psi-salon-pucci`)
- GitHub Pages: `basePath` `/psi-salon-pucci`, dokud `CUSTOM_DOMAIN` není `true`
- Texty a kontakty: `lib/content.ts`. Ceny služeb nechávat jako `[ceník doplní Klára]`, dokud je Klára nedodá. Nevymýšlet hodiny, sociální sítě ani ceny.
- Fotky: originály ve `fotky/`, ostré WebP v `public/images/` (`node scripts/optimize-images.mjs`, potřebuje balíček `sharp`)

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
