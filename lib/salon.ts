/**
 * Jediný soubor s údaji od majitelky.
 * Prázdný řetězec nebo prázdné pole = na webu se ta část vůbec neukáže.
 * Nic sem nedoplňovat odhadem.
 */

export type PriceItem = {
  service: string;
  /** Text ceny přesně od Kláry, např. "450 Kč". */
  price: string;
};

export type BeforeAfterPair = {
  /** Cesta od kořene public/, např. "/images/pred-1.webp". */
  before: string;
  after: string;
  altBefore: string;
  altAfter: string;
};

export const salon = {
  name: "Psí salon Pucci",
  owner: "Klára Zelinka, DiS",
  ico: "21618241",
  street: "náměstí Míru 69/25",
  /** Ověřené PSČ Svitav. */
  postcode: "568 02",
  city: "Svitavy",
  phoneTel: "+420722447002",
  phoneDisplay: "722\u00A0447\u00A0002",
  email: "psisalon.pucci@gmail.com",
  bookingUrl: "https://psi-salon-pucci.reservio.com",

  /**
   * Vlastní doména bez https a bez cesty, např. "psisalonpucci.cz".
   * Prázdné = web na https://simivilasek-ship-it.github.io/psi-salon-pucci/
   * Po vyplnění a pushi na main zmizí basePath /psi-salon-pucci, do out/ se zapíše CNAME
   * a kanonické URL i sitemap použijí https://tato-domena.
   */
  customDomain: "",

  /**
   * Položky ceníku. Prázdné = žádná tabulka, u služeb zůstane „cena dle plemene“.
   */
  priceList: [] as PriceItem[],

  /**
   * Odkaz na profil recenzí na Google (celé https URL).
   * Prázdné = tlačítka otevřou vyhledání salonu. Číslo a texty recenzí se nevymýšlí.
   */
  googleReviewsUrl:
    "https://www.google.com/maps/search/?api=1&query=Ps%C3%AD%20salon%20Pucci%2C%20n%C3%A1m%C4%9Bst%C3%AD%20M%C3%ADru%2069%2F25%2C%20Svitavy",

  /**
   * Průměr a počet z Google (stav 2026-11). null = na webu jen obrysové hvězdy bez čísla.
   */
  googleRating: 5 as number | null,
  googleReviewCount: 2 as number | null,

  /** Celé https URL profilu. Prázdné = odkaz se neukáže. */
  instagramUrl: "https://www.instagram.com/psi_salon_pucci/",

  /** Odkaz na Facebook od Kláry (24. 11. 2026). */
  facebookUrl: "https://www.facebook.com/share/14thz84UbMH/",

  /**
   * Číslo pro osobní WhatsApp, např. "+420722447002".
   * Prázdné = odkaz wa.me se neukáže. Kanál níže sem nepatří.
   */
  whatsappNumber: "",

  /** WhatsApp kanál od Kláry (24. 11. 2026). Prázdné = QR a odkaz se neukážou. */
  whatsappChannelUrl: "https://whatsapp.com/channel/0029VbCHGHMLSmbYkZR0zG04",

  /**
   * Messenger. Share odkaz nepřesměruje na facebook.com/uživatelské-jméno,
   * jen na číselné ID stránky, proto tu není m.me. Odkaz vede na stejnou stránku.
   */
  messengerUrl: "https://www.facebook.com/share/14thz84UbMH/",

  /**
   * Text otevírací doby od Kláry (24. 11. 2026).
   * Prázdné = na webu zůstane „dle telefonické domluvy“.
   */
  openingHours: "pondělí až sobota, dle předchozí domluvy",

  /**
   * Dvojice fotek před a po. Prázdné = sekce se neukáže.
   * Soubory musí ležet v public/.
   */
  beforeAfterPairs: [] as BeforeAfterPair[],
};

export function isFilled(value: string): boolean {
  return value.trim().length > 0;
}

export function addressLine(): string {
  return `${salon.street}, ${salon.postcode} ${salon.city}`;
}

export function openingHoursText(): string {
  return isFilled(salon.openingHours) ? salon.openingHours.trim() : "dle telefonické domluvy";
}

export type SocialLink = { label: string; href: string };

export function socialLinks(): SocialLink[] {
  const links: SocialLink[] = [];
  if (isFilled(salon.instagramUrl)) {
    links.push({ label: "Instagram", href: salon.instagramUrl.trim() });
  }
  if (isFilled(salon.facebookUrl)) {
    links.push({ label: "Facebook", href: salon.facebookUrl.trim() });
  }
  const whatsappDigits = salon.whatsappNumber.replace(/\D/g, "");
  if (whatsappDigits) {
    links.push({ label: "WhatsApp", href: `https://wa.me/${whatsappDigits}` });
  }
  if (isFilled(salon.whatsappChannelUrl)) {
    links.push({ label: "WhatsApp kanál", href: salon.whatsappChannelUrl.trim() });
  }
  if (isFilled(salon.messengerUrl)) {
    links.push({ label: "Messenger", href: salon.messengerUrl.trim() });
  }
  return links;
}

/** Hostname bez protokolu, nebo prázdný řetězec. */
export function customDomainHost(): string {
  return salon.customDomain
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "")
    .replace(/\.$/, "");
}
