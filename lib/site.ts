/** Canonical URL without a trailing slash. Override with SITE_URL at build time. */
export const SITE_URL = (
  process.env.SITE_URL ?? "https://simivilasek-ship-it.github.io/psi-salon-pucci"
).replace(/\/+$/, "");

export const SITE_NAME = "Psí salon Pucci";

export const SITE_TITLE = "Psí salon Pucci | stříhání psů Svitavy";

export const SITE_DESCRIPTION =
  "Psí salon Svitavy na náměstí Míru. Stříhání psů, úprava srsti, trimování a dentální hygiena. Klára Zelinka, DiS. Objednání telefonicky nebo přes Reservio.";

export const SITE_OG_IMAGE = `${SITE_URL}/og.jpg`;
