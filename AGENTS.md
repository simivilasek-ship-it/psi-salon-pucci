# Psí salon Pucci

- Dev: `npm run dev`
- Build: `npm run build` (static export do `out/`). Skript po buildu smaže hydrataci Nextu a nechá JSON-LD plus malý skript menu (`data-keep`).
- Stack: Next.js App Router, TypeScript, statický export
- Kanonická adresa: `customDomain` v `lib/salon.ts`, jinak `SITE_URL` nebo `https://simivilasek-ship-it.github.io/psi-salon-pucci`
- GitHub Pages: `basePath` `/psi-salon-pucci`, dokud `customDomain` není vyplněné a `CUSTOM_DOMAIN` není `true`
- Údaje od Kláry jen v `lib/salon.ts`. Prázdné pole se na webu neukáže. Nevymýšlet ceny, recenze, hodnocení, hodiny, odkazy ani fotky.
- Fotky: originály ve `fotky/`, ostré WebP v `public/images/` (`node scripts/optimize-images.mjs`, potřebuje balíček `sharp`)

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
