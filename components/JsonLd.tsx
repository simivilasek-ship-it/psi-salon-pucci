import { CITY, EMAIL, ICO, PHONE_TEL, STREET } from "@/lib/content";
import { SITE_DESCRIPTION, SITE_NAME, SITE_OG_IMAGE, SITE_URL } from "@/lib/site";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#salon`,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: `${SITE_URL}/`,
    telephone: PHONE_TEL,
    email: EMAIL,
    image: [SITE_OG_IMAGE, `${SITE_URL}/images/hero-1120.webp`],
    address: {
      "@type": "PostalAddress",
      streetAddress: STREET,
      addressLocality: CITY,
      addressCountry: "CZ",
    },
    areaServed: {
      "@type": "City",
      name: CITY,
    },
    identifier: {
      "@type": "PropertyValue",
      name: "IČO",
      value: ICO,
    },
    founder: {
      "@type": "Person",
      name: "Klára Zelinka",
      honorificSuffix: "DiS",
    },
    currenciesAccepted: "CZK",
    paymentAccepted: "Hotovost, QR kód",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
