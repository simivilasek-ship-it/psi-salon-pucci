import { CITY, EMAIL, ICO, PHONE_TEL, POSTCODE, STREET } from "@/lib/content";
import { buildFaqPageJsonLd } from "@/lib/faq";
import { isFilled, salon, socialLinks } from "@/lib/salon";
import { SITE_DESCRIPTION, SITE_NAME, SITE_OG_IMAGE, SITE_URL } from "@/lib/site";

function jsonLdScript(data: unknown) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

function offerFromPrice(item: { service: string; price: string }) {
  const offer: Record<string, unknown> = {
    "@type": "Offer",
    name: item.service,
    description: item.price,
    itemOffered: {
      "@type": "Service",
      name: item.service,
    },
  };

  const amount = item.price.trim().match(/^(\d+(?:[.,]\d+)?)\s*(?:Kč)?$/);
  if (amount) {
    offer.price = amount[1].replace(",", ".");
    offer.priceCurrency = "CZK";
  }

  return offer;
}

export function JsonLd() {
  const sameAs = [
    ...socialLinks().map((item) => item.href),
    isFilled(salon.googleReviewsUrl) ? salon.googleReviewsUrl.trim() : "",
  ].filter(Boolean);

  const business: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#salon`,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: `${SITE_URL}/`,
    telephone: PHONE_TEL,
    email: EMAIL,
    image: [SITE_OG_IMAGE, `${SITE_URL}/images/hero-aussie-1600.webp`],
    address: {
      "@type": "PostalAddress",
      streetAddress: STREET,
      postalCode: POSTCODE,
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

  if (salon.priceList.length > 0) {
    business.hasOfferCatalog = {
      "@type": "OfferCatalog",
      name: "Ceník",
      itemListElement: salon.priceList.map(offerFromPrice),
    };
  }

  if (sameAs.length > 0) {
    business.sameAs = sameAs;
  }

  if (isFilled(salon.openingHours)) {
    business.openingHours = salon.openingHours.trim();
  }

  return (
    <>
      {jsonLdScript(business)}
      {jsonLdScript(buildFaqPageJsonLd())}
    </>
  );
}
