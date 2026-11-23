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

Build pro GitHub Pages (cesty s `/psi-salon-pucci`) vzniká ve workflow, protože `GITHUB_ACTIONS=true` a `CUSTOM_DOMAIN` není `true`.

## Adresa a doména

Dokud je v `lib/salon.ts` pole `customDomain` prázdné, web běží na GitHub Pages s `basePath` `/psi-salon-pucci`. Build na Actions to pozná podle `GITHUB_ACTIONS`. Lokální `npm run build` prefix nemá.

Volitelně lze adresu přepsat proměnnou `SITE_URL` a kořen vynutit `CUSTOM_DOMAIN=true` (vzor v `.env.example`). Vyplněné `customDomain` má přednost před `SITE_URL`. Soubor `.env` se necommituje.

### Přepnutí na vlastní doménu

1. V `lib/salon.ts` nastavte `customDomain` na hostname bez `https://` a bez cesty, například `psisalonpucci.cz`.
2. Pushněte `main`. Build vypne `basePath`, kanonické URL a `sitemap.xml` budou `https://tato-domena/…` a do artefaktu zapíše soubor `CNAME`.
3. U registrátora nastavte DNS na GitHub Pages: pro doménu bez www čtyři záznamy A na `185.199.108.153`, `185.199.109.153`, `185.199.110.153` a `185.199.111.153`. Pro `www` záznam CNAME na `simivilasek-ship-it.github.io`.
4. V repozitáři **Settings → Pages** zkontrolujte, že se vlastní doména načetla z `CNAME`, a zapněte **Enforce HTTPS**.

Když `customDomain` zase vymažete, další deploy `CNAME` nepřiloží a web se vrátí na adresu `github.io` s `/psi-salon-pucci`. Vlastní doménu je pak potřeba smazat i v nastavení Pages.

## Co doplnit od Kláry

Všechno, co má přijít od majitelky, je v `lib/salon.ts`. Prázdné pole na webu nic nepřidá.

| Pole | Co se stane po vyplnění |
| --- | --- |
| `customDomain` | Web bez `/psi-salon-pucci`, správné kanonické URL, sitemap a soubor `CNAME`. |
| `priceList` | Tabulka ceníku a nabídky ve strukturovaných datech. Dokud je prázdné, u služeb zůstane „cena dle plemene“. |
| `googleReviewsUrl` | Odkaz „Recenze na Googlu“. Hvězdičky se nevykreslují. |
| `instagramUrl` | Odkaz na Instagram v kontaktu a v patičce. |
| `whatsappNumber` | Odkaz na WhatsApp (`wa.me`) v kontaktu a v patičce. |
| `messengerUrl` | Odkaz na Messenger v kontaktu a v patičce. |
| `openingHours` | Text místo „dle telefonické domluvy“ a hodiny ve strukturovaných datech. |
| `beforeAfterPairs` | Sekce před/po. Fotky musí být v `public/`. |

Rozvoz (100 Kč po Svitavách, 150 Kč do okolí) je v textu FAQ, to je ověřený údaj, ne ceník služeb. Instagram, WhatsApp a Messenger na webu ani na Reservio nebyly, proto jsou prázdné.

Fotky se znovu vygenerují skriptem `node scripts/optimize-images.mjs` (potřebuje [sharp](https://sharp.pixelplumbing.com/)). Originály jsou ve `fotky/`.

## Nasazení

Push do `main` spustí `.github/workflows/deploy.yml` (Node 22, `npm ci`, statický export, GitHub Pages).

Když Pages ještě nejsou zapnuté: v repozitáři **Settings → Pages → Build and deployment → Source: GitHub Actions**. První úspěšný běh workflow web vystaví.
