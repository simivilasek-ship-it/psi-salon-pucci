import type { Metadata } from "next";
import { ADDRESS_LINE, BOOKING_URL, CITY, EMAIL, ICO, OWNER, PHONE_DISPLAY, PHONE_TEL } from "@/lib/content";
import { withBase } from "@/lib/paths";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ochrana osobních údajů",
  description: `Informace o zpracování osobních údajů v ${SITE_NAME}, ${CITY}.`,
  alternates: { canonical: "/ochrana-osobnich-udaju/" },
};

export default function PrivacyPage() {
  return (
    <main id="obsah" className="privacy">
      <article className="narrow">
        <h1>Ochrana osobních údajů</h1>
        <h2>Správce</h2>
        <p>
          Správcem osobních údajů je {OWNER}, IČO {ICO}, {ADDRESS_LINE}. Kontakt:{" "}
          <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>, <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>
        <h2>Účel zpracování</h2>
        <p>
          Zpracováváme údaje, které nám sdělíte při objednání úpravy: telefonicky, e-mailem nebo přes online
          rezervaci. Online rezervace probíhá přes{" "}
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            Reservio
          </a>
          . Údaje slouží k domluvě termínu a provedení úpravy.
        </p>
        <h2>Doba uchování</h2>
        <p>
          Údaje držíme jen po dobu nutnou k vyřízení objednávky a k zákonným povinnostem. Nepoužíváme je k
          rozesílání newsletteru.
        </p>
        <h2>Práva subjektu údajů</h2>
        <p>
          Máte právo na přístup ke svým údajům, jejich opravu nebo výmaz, omezení zpracování a námitku proti
          zpracování. Žádost pošlete na e-mail nebo telefon správce. Máte také právo podat stížnost u Úřadu pro
          ochranu osobních údajů.
        </p>
        <p className="privacy-back">
          <a href={withBase("/")}>Zpět na úvod</a>
        </p>
      </article>
    </main>
  );
}
