import { customDomainHost } from "@/lib/salon";

const pagesUrl = "https://simivilasek-ship-it.github.io/psi-salon-pucci";

function canonicalUrl(): string {
  const domain = customDomainHost();
  if (domain) return `https://${domain}`;
  const fromEnv = process.env.SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/+$/, "");
  return pagesUrl;
}

/** Canonical URL without a trailing slash. Vyplněné customDomain má přednost před SITE_URL. */
export const SITE_URL = canonicalUrl();

export const SITE_NAME = "Psí salon Pucci";

export const SITE_TITLE = "Psí salon Pucci | stříhání psů Svitavy";

export const SITE_DESCRIPTION =
  "Psí salon Svitavy na náměstí Míru. Stříhání psů, úprava srsti, trimování a dentální hygiena. Klára Zelinka, DiS. Objednání telefonicky nebo přes Reservio.";

export const SITE_OG_IMAGE = `${SITE_URL}/og.jpg`;
