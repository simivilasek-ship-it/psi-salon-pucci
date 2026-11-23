# Psí salon Pucci

Web salonu Kláry Zelinky, DiS (náměstí Míru 69/25, 568 02 Svitavy). Jedna stránka v češtině, statický export Next.js, nasazení na GitHub Pages.

Dokud není vybraná vlastní doména, kanonická adresa je:

https://simivilasek-ship-it.github.io/psi-salon-pucci/

## Vývoj

```bash
npm ci
npm run dev
```

Build po `next build` odstraní hydratační runtime Nextu, nechá malý skript menu a vloží CSS do HTML, aby se hero nenačítalo až za runtime Nextu.

Lokální build bez prefixu (náhled z `out/`):

```bash
npm run build
npx serve out
```

Build pro GitHub Pages (cesty s `/psi-salon-pucci`) vzniká ve workflow, protože `GITHUB_ACTIONS=true` a `customDomain` v `lib/salon.ts` je prázdné.

## Adresa a doména

Dokud je v `lib/salon.ts` pole `customDomain` prázdné, web běží na GitHub Pages s `basePath` `/psi-salon-pucci`. Vyplněné `customDomain` má přednost před `SITE_URL`. Volitelně lze kořen vynutit `CUSTOM_DOMAIN=true` (vzor v `.env.example`). Soubor `.env` se necommituje.

Po vyplnění domény a pushi na `main` build vypne `basePath`, kanonické URL i sitemap použijí `https://tato-domena` a do `out/` zapíše `CNAME`.

## Co doplní Klára

Všechno od majitelky je v `lib/salon.ts`. Prázdné pole na webu nic nepřidá: ceník, odkaz na recenze, Instagram, WhatsApp, Messenger, otevírací dobu ani fotky před/po. U služeb zůstane „cena dle plemene“. Hvězdičky se nevykreslují. Rozvoz (100 Kč / 150 Kč) je v textu FAQ, to je ověřený údaj.

Fotky se znovu vygenerují skriptem `node scripts/optimize-images.mjs` (potřebuje [sharp](https://sharp.pixelplumbing.com/)). Originály jsou ve `fotky/`.

## Nasazení

Push do `main` spustí `.github/workflows/deploy.yml` (Node 22, `npm ci`, statický export, GitHub Pages).

Když Pages ještě nejsou zapnuté: v repozitáři **Settings → Pages → Build and deployment → Source: GitHub Actions**. První úspěšný běh workflow web vystaví.
