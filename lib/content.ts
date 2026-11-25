/** Ověřené texty webu. Kontakt a volitelná pole od Kláry jsou v lib/salon.ts. */

import { salon } from "@/lib/salon";

export const PHONE_TEL = salon.phoneTel;
export const PHONE_DISPLAY = salon.phoneDisplay;
export const EMAIL = salon.email;
export const BOOKING_URL = salon.bookingUrl;
export const STREET = salon.street;
export const POSTCODE = salon.postcode;
export const CITY = salon.city;
export const ADDRESS_LINE = `${salon.street}, ${salon.postcode} ${salon.city}`;
export const OWNER = salon.owner;
export const ICO = salon.ico;
export const PRICE_TBA = "cena dle plemene";

/** Znění z e-mailu Kláry Zelinky, 24. 11. 2026. */
export const beforeVisit = [
  "Psy přijímáme pouze na kompletní úpravu včetně koupání.",
  "Bez koupání (psa si vykoupe majitel sám) přijímáme pouze výjimečně po domluvě, a\u00A0to v\u00A0případě starého nebo agresivního psa, kdy by pro něj návštěva salonu byla hodně náročná.",
  "Úprava psa probíhá bez přítomnosti majitele pro lepší průběh celého procesu a\u00A0kontaktu mezi psem a\u00A0střihačkou.",
] as const;

export const depositIntro =
  "Protože se stále častěji stává, že zákazníci na sjednaný termín nedorazí bez předchozí omluvy, zavádím pro nové zákazníky zálohy na rezervaci.";

export const depositRules = [
  { title: "Rezervace", text: "Při objednání termínu je potřeba uhradit zálohu." },
  { title: "Účast na termínu", text: "Pokud dorazíte, celá záloha se odečte z\u00A0ceny služby." },
  {
    title: "Neomluvená neúčast",
    text: "Pokud bez včasné omluvy nedorazíte minimálně 24\u00A0hodin předem, záloha propadá.",
  },
] as const;

export const nav = [
  { href: "/#sluzby", label: "Služby" },
  ...(salon.priceList.length > 0 ? [{ href: "/#cenik", label: "Ceník" }] : []),
  { href: "/#galerie", label: "Galerie" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#o-mne", label: "O mně" },
  { href: "/#recenze", label: "Recenze" },
  { href: "/#kontakt", label: "Kontakt" },
];

export const about = [
  "Jsem zakladatelkou Psího salonu Pucci, který nese jméno po mém čtyřnohém parťákovi.",
  "Pejsky miluji už od dětství a práce s nimi se pro mě stala splněným snem. Abych jim mohla poskytnout tu nejlepší péči, absolvovala jsem v roce 2023 rekvalifikační kurz střihačky psů v Psím salonu Fatima.",
  "Ve svém oboru se neustále vzdělávám, zdokonaluji své dovednosti a účastním se odborných kurzů a seminářů. Věřím totiž, že je stále co se učit a že každý nový poznatek pomáhá poskytovat ještě lepší péči.",
  "Věřím, že každý pejsek i kočička si zaslouží individuální přístup, trpělivost a laskavou péči. Záleží mi na tom, aby se u nás cítili příjemně a odcházeli nejen krásně upravení, ale především spokojení.",
  "Budu se těšit na vás i vaše čtyřnohé kamarády.",
] as const;

export const certificates = [
  {
    name: "cert1" as const,
    alt: "Osvědčení: Veterinární minimum II pro specialisty na střihovou úpravu psů, Klára Zelinka, DiS",
  },
  {
    name: "cert2" as const,
    alt: "Osvědčení: Veterinární minimum pro specialisty na střihovou úpravu psů, Klára Zelinka, DiS",
  },
  {
    name: "cert3" as const,
    alt: "Osvědčení z odborného semináře Dentální hygiena, Klára Zelinka",
  },
  {
    name: "cert4" as const,
    alt: "Osvědčení: odborný seminář úpravy anglického a amerického kokršpaněla, Klára Zelinka",
  },
  {
    name: "cert5" as const,
    alt: "Osvědčení: komerční a výstavní úprava West Highland White teriéra, Klára Zelinka",
  },
  {
    name: "cert6" as const,
    alt: "Osvědčení: seminář psychologie, poruch chování psů a komunikace se psy s Rudolfem Desenským, Klára Zelinka",
  },
  {
    name: "cert7" as const,
    alt: "Osvědčení o získání profesní kvalifikace Střihač / střihačka psů, Klára Zelinka, DiS",
  },
] as const;

export const servicesIntro =
  "Přijímáme psy všech plemen a velikostí. Do salonu přijímáme i kočky. Celková úprava zahrnuje koupání, fénování, rozčesání, střih nebo vyčesávání srsti, stříhání drápků, čištění uší. Na přání majitele také čištění análních žlázek.";

export const services = [
  {
    title: "Koupání, fénování",
    text: "Použití kvalitní kosmetiky, vysušení srsti a pečlivé rozčesání.",
  },
  {
    title: "Stříhání",
    text: "Dle plemene, přání majitele.",
  },
  {
    title: "Vyčesání srsti",
    text: "Odstranění staré srsti krátkosrstých a dlouhosrstých plemen, která se nestříhají.",
  },
  {
    title: "Další služby",
    text: "Stříhání drápků, čištění a depilace uší, čištění análních žláz.",
  },
  {
    title: "Trimování",
    wide: true,
    text: "Speciální úprava srsti hrubosrstých plemen psů. Spočívá ve vytrhávání odumřelé srsti, která sama nevypadá. Díky trimování srst hrubne a stává se odolnější vůči vlivům okolí. Pokud se hrubosrsté plemeno ostříhá, jeho srst plstnatí a ztrácí svou ochrannou funkci.",
    note: "Pes by neměl být vykoupaný před trimováním minimálně 4 týdny. Pes je po trimování vykoupán šamponem vhodným pro trimování, aby se srst a kůže zbavila všech nečistot.",
  },
  {
    title: "Dentální hygiena bez anestezie",
    wide: true,
    text: "Dentální hygiena spočívá v odstranění plaku na zubech za použití ultrazvukového kartáčku s následným mechanickým očištěním. Působí preventivně proti zánětu dásní, vzniku paradontózy, tvorby zubního plaku, následně kamene a tím zabraňuje vypadávání zubů.",
    note: "Dentální hygiena rozhodně nenahrazuje veterinární ošetření, je to pouze kosmetický efekt, nikoli léčebný.",
  },
] as const;

export const gallery = [
  { name: "ba01" as const, alt: "Černobílý pejsek s mašlí před úpravou a po ní" },
  { name: "ba02" as const, alt: "Bílý pejsek před úpravou a po ní" },
  { name: "ba03" as const, alt: "Hnědý kudrnatý pejsek před úpravou a po ní" },
  { name: "ba04" as const, alt: "Bílý kudrnatý pejsek před úpravou a po ní" },
  { name: "ba05" as const, alt: "Jorkšírský teriér s mašlí před úpravou a po ní" },
  { name: "ba06" as const, alt: "Jorkšírský teriér s culíkem před úpravou a po ní" },
  { name: "ba07" as const, alt: "Malý černobílý pejsek před úpravou a po ní" },
  { name: "ba08" as const, alt: "West highland white teriér před úpravou a po ní" },
  { name: "ba09" as const, alt: "Jorkšírský teriér před střihem a po něm" },
  { name: "ba10" as const, alt: "Kočka před vyčesáním a po něm" },
  { name: "ba11" as const, alt: "Dlouhosrstý jorkšírský teriér před úpravou a po ní" },
  { name: "ba12" as const, alt: "Afgánský chrt před úpravou a po ní" },
  { name: "ba13" as const, alt: "Kokršpaněl před úpravou a po ní" },
] as const;
