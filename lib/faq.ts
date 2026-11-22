export interface FaqItem {
  question: string;
  answer: string;
}

export const faq: readonly FaqItem[] = [
  {
    question: "Stříháte psy ve Svitavách?",
    answer:
      "Ano, Psí salon Pucci sídlí na náměstí Míru 69/25 ve Svitavách. Přijímáme psy všech plemen a velikostí, do salonu chodí i kočky.",
  },
  {
    question: "Co všechno je v celkové úpravě?",
    answer:
      "Koupání, fénování, rozčesání, střih nebo vyčesávání srsti, stříhání drápků a čištění uší. Na přání majitele také čištění análních žlázek.",
  },
  {
    question: "Co je trimování a pro které psy je?",
    answer:
      "Je to úprava srsti hrubosrstých plemen, při které se vytrhává odumřelá srst, která sama nevypadá. Díky tomu srst hrubne a je odolnější. Pes by neměl být minimálně 4 týdny před trimováním koupaný.",
  },
  {
    question: "Je dentální hygiena bez anestezie bezpečná? Nahradí veterináře?",
    answer:
      "Plak se odstraňuje ultrazvukovým kartáčkem a pak mechanickým očištěním. Má preventivní, kosmetický účinek. Veterinární ošetření nenahrazuje.",
  },
  {
    question: "Dovezete psa ze salonu a zpět?",
    answer:
      "Ano, rozvoz po Svitavách je za 100 Kč, do okolních obcí za 150 Kč (např. Hradec nad Svitavou, Vendolí, Radiměř, Opatovec, Koclířov, Javorník). Hodí se, když se nemáte jak do salonu dostat.",
  },
  {
    question: "Jak můžu platit?",
    answer: "V hotovosti nebo přes QR kód.",
  },
] as const;

export function buildFaqPageJsonLd(items: readonly FaqItem[] = faq) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
