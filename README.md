# Psí salon Pucci

Web salonu Kláry Zelinky, DiS (náměstí Míru 69/25, Svitavy). Jedna stránka v češtině, statický export Next.js, nasazení na GitHub Pages.

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

Build pro GitHub Pages (cesty s `/psi-salon-pucci`) vzniká ve workflow, protože `GITHUB_ACTIONS=true` a `CUSTOM_DOMAIN` není `true`.

## Adresa a doména

| Proměnná | Význam |
| --- | --- |
| `SITE_URL` | Kanonická adresa bez lomítka na konci. Výchozí je adresa na GitHub Pages. |
| `CUSTOM_DOMAIN` | `true` jen až web běží v kořeni vlastní domény. Jinak Pages používá `basePath` `/psi-salon-pucci`. |

Obě hodnoty se nastavují v `.github/workflows/deploy.yml`. Vzor je v `.env.example`. Soubor `.env` se necommituje.

Až bude doména, v workflow nastavte `CUSTOM_DOMAIN: "true"`, `SITE_URL` na tu doménu a do `public/CNAME` dejte hostname. Pages v nastavení repozitáře pak přepněte na vlastní doménu.

## Co doplní Klára

V `lib/content.ts` jsou u služeb ceny `[ceník doplní Klára]`. Rozvoz (100 Kč / 150 Kč) je z ověřeného textu, ten neměnit bez podkladu. Mapa v kontaktu je schválně zástupný blok: „Mapa se doplní na ostrém webu.“ Hodiny, odkazy na Messenger, WhatsApp a Instagram na webu nejsou, dokud nebudou konkrétní adresy.

Fotky se znovu vygenerují skriptem `node scripts/optimize-images.mjs` (potřebuje [sharp](https://sharp.pixelplumbing.com/)). Originály jsou ve `fotky/`.

## Nasazení

Push do `main` spustí `.github/workflows/deploy.yml` (Node 22, `npm ci`, statický export, GitHub Pages).

Když Pages ještě nejsou zapnuté: v repozitáři **Settings → Pages → Build and deployment → Source: GitHub Actions**. První úspěšný běh workflow web vystaví.
