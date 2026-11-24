import type { ReactNode } from "react";
import { Photo } from "@/components/Photo";
import { SectionDivider } from "@/components/SectionDivider";
import {
  about,
  BOOKING_URL,
  certificates,
  CITY,
  EMAIL,
  gallery,
  OWNER,
  PHONE_DISPLAY,
  PHONE_TEL,
  services,
  servicesIntro,
  STREET,
} from "@/lib/content";
import { faq } from "@/lib/faq";
import imageManifest from "@/lib/image-manifest.json";
import { withBase } from "@/lib/paths";
import { isFilled, openingHoursText, salon, socialLinks } from "@/lib/salon";

const mapQuery = encodeURIComponent(`${STREET}, ${salon.postcode} ${CITY}`);
const MAP_URL = `https://mapy.cz/zakladni?q=${mapQuery}`;
const MAP_EMBED = `https://maps.google.com/maps?q=${mapQuery}&z=16&hl=cs&output=embed`;
const googleReviewsHref = isFilled(salon.googleReviewsUrl)
  ? salon.googleReviewsUrl.trim()
  : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Psí salon Pucci, ${STREET}, ${CITY}`)}`;

const heroFacts = [
  { value: "Psi všech plemen", label: "i kočky" },
  { value: "Objednání", label: "Reservio nebo telefon" },
] as const;

const hasBeforeAfter = salon.beforeAfterPairs.length > 0;

const socialValue: Record<string, string> = {
  Instagram: "Psí salon Pucci",
  WhatsApp: PHONE_DISPLAY,
  Messenger: "Napsat zprávu",
};

function socialIcon(label: string) {
  if (label === "Instagram") return <IconInstagram />;
  if (label === "WhatsApp") return <IconWhatsApp />;
  if (label === "Messenger") return <IconMessenger />;
  return <IconMail />;
}

export function HomePage() {
  const hoursValue = openingHoursText();
  const contactSocials = socialLinks();

  return (
    <main id="obsah" tabIndex={-1}>
      <section className="hero" id="uvod" aria-labelledby="hero-heading">
        <div className="hero-media">
          <Photo
            name="hero"
            alt="Australský ovčák po úpravě v Psím salonu Pucci"
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="hero-photo"
            priority
          />
        </div>
        <div className="hero-shell">
          <div className="hero-copy">
            <p className="kicker hero-kicker hero-enter hero-enter-1">
              {STREET} · {CITY}
            </p>
            <h1 id="hero-heading" className="hero-enter hero-enter-2">
              Stříhání a&nbsp;úprava psů ve&nbsp;Svitavách
            </h1>
            <p className="hero-sub hero-enter hero-enter-3">
              Místo, kde je péče o&nbsp;vaše mazlíčky radostí. „Protože každý pes si zaslouží hvězdnou péči.“
            </p>
            <div className="actions hero-enter hero-enter-4">
              <a className="btn btn-solid" href={BOOKING_URL}>
                Rezervovat termín
              </a>
              <a className="btn btn-outline hero-call" href={`tel:${PHONE_TEL}`}>
                Zavolat {PHONE_DISPLAY}
              </a>
            </div>
            <ul className="hero-facts hero-enter hero-enter-5" aria-label="Základní informace">
              {heroFacts.map((item) => (
                <li key={item.value}>
                  <span className="hero-tick" aria-hidden="true">
                    ✓
                  </span>
                  <span>
                    {item.value}
                    <span className="hero-fact-label"> · {item.label}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section" id="sluzby" aria-labelledby="sluzby-heading">
        <div className="wrap">
          <SectionHead id="sluzby-heading" kicker="Nabídka" title="Služby" center>
            <p>{servicesIntro}</p>
          </SectionHead>
          {salon.priceList.length === 0 ? <p className="services-rate">Cena dle plemene.</p> : null}
          <ul className="service-grid">
            {services.map((item) => {
              const price = listedPrice(item.title);
              const wide = "wide" in item && item.wide;
              return (
                <li key={item.title} className={wide ? "is-wide" : undefined}>
                  <article className="service-card">
                    <div className="service-card-top">
                      <div className="service-card-title">
                        <h3>{item.title}</h3>
                        {price ? <p className="service-price">{price}</p> : null}
                      </div>
                      <p className="service-card-desc">{item.text}</p>
                    </div>
                    {"note" in item && item.note ? (
                      <div className="service-card-foot">
                        <details className="service-more">
                          <summary>
                            Více informací
                            <span aria-hidden="true">↓</span>
                          </summary>
                          <p className="note">{item.note}</p>
                        </details>
                      </div>
                    ) : null}
                  </article>
                </li>
              );
            })}
          </ul>
          <div className="services-cta">
            <a className="btn btn-solid" href={BOOKING_URL}>
              Rezervovat termín
            </a>
          </div>
        </div>
      </section>

      {salon.priceList.length > 0 ? (
        <section className="section" id="cenik" aria-labelledby="cenik-heading">
          <div className="wrap">
            <SectionHead id="cenik-heading" kicker="Služby" title="Ceník" center />
            <dl className="price-list">
              {salon.priceList.map((row) => (
                <div key={row.service}>
                  <dt>{row.service}</dt>
                  <dd>{row.price}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      ) : null}

      <SectionDivider from="bg" to="alt" />

      <section className="section section-alt" id="galerie" aria-labelledby="galerie-heading">
        <div className="wrap">
          <SectionHead id="galerie-heading" kicker="Ukázky" title="Před a po" center />
          <div className="gallery" id="galerie-grid" data-gallery>
            {gallery.map((item) => (
              <figure key={item.name}>
                <Photo
                  name={item.name}
                  alt={item.alt}
                  sizes="(max-width: 719px) calc(100vw - 32px), 540px"
                />
              </figure>
            ))}
          </div>
          <p className="gallery-expand">
            <button
              type="button"
              className="btn btn-outline"
              data-gallery-toggle
              aria-expanded="false"
              aria-controls="galerie-grid"
            >
              Více
            </button>
          </p>
        </div>
      </section>

      {hasBeforeAfter ? (
        <section className="section section-alt" id="pred-po" aria-labelledby="pred-po-heading">
          <div className="wrap">
            <SectionHead id="pred-po-heading" kicker="Výsledek" title="Před a po" center />
            <ul className="before-after">
              {salon.beforeAfterPairs.map((pair) => (
                <li key={`${pair.before}-${pair.after}`}>
                  <figure className="before-after-pair">
                    <div className="before-after-shots">
                      <div>
                        <img
                          src={withBase(pair.before.startsWith("/") ? pair.before : `/${pair.before}`)}
                          alt={pair.altBefore}
                          loading="lazy"
                        />
                        <p className="before-after-label">Před</p>
                      </div>
                      <div>
                        <img
                          src={withBase(pair.after.startsWith("/") ? pair.after : `/${pair.after}`)}
                          alt={pair.altAfter}
                          loading="lazy"
                        />
                        <p className="before-after-label">Po</p>
                      </div>
                    </div>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <SectionDivider from="alt" to="brand" />

      <section className="section section-brand" id="o-mne" aria-labelledby="about-heading">
        <div className="wrap about">
          <Photo
            name="portrait"
            className="portrait"
            alt="Klára Zelinka, zakladatelka Psího salonu Pucci, se svými mazlíčky"
            sizes="(max-width: 800px) calc(100vw - 40px), 560px"
          />
          <div>
            <SectionHead id="about-heading" kicker="O mně" title="Jmenuji se Klára" />
            {about.map((paragraph) => (
              <p key={paragraph} className="about-copy">
                {paragraph}
              </p>
            ))}
            <div className="about-seminars-intro" data-seminars>
              <p className="about-certs-title">Absolvované semináře</p>
              <button
                type="button"
                className="about-seminars-more"
                data-seminars-toggle
                aria-expanded="false"
                aria-controls="seminare-galerie"
              >
                Více
              </button>
            </div>
          </div>
        </div>

        <div
          className="about-seminars-panel"
          id="seminare-galerie"
          data-seminars-panel
          hidden
        >
          <div
            className="cert-fan"
            data-cert-fan
            data-start="2"
            role="region"
            aria-roledescription="karusel"
            aria-label="Galerie absolvovaných seminářů"
            tabIndex={0}
          >
            <div className="cert-fan-stage" data-cert-stage>
              {certificates.map((item, index) => {
                const variant = imageManifest[item.name].variants.at(-1)!;
                return (
                  <button
                    key={item.name}
                    type="button"
                    className="cert-fan-card"
                    data-cert-card
                    data-index={index}
                    data-full={withBase(`/images/${item.name}-full.webp`)}
                    data-alt={item.alt}
                    aria-label={item.alt}
                    style={{ aspectRatio: `${variant.width} / ${variant.height}` }}
                  >
                    <Photo name={item.name} alt={item.alt} sizes="(max-width: 640px) 70vw, 420px" />
                  </button>
                );
              })}
            </div>
            <div className="cert-fan-nav">
              <button type="button" className="cert-fan-btn" data-cert-prev aria-label="Předchozí osvědčení">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 6l-6 6 6 6"
                  />
                </svg>
              </button>
              <p className="cert-fan-counter" data-cert-counter aria-live="polite">
                3 / {certificates.length}
              </p>
              <button type="button" className="cert-fan-btn" data-cert-next aria-label="Další osvědčení">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 6l6 6-6 6"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="cert-lightbox" data-cert-lightbox hidden>
        <button type="button" className="cert-lightbox-close" data-cert-lightbox-close aria-label="Zavřít">
          ×
        </button>
      </div>

      <SectionDivider from="brand" to="bg" flip />

      <section className="section" id="recenze" aria-labelledby="recenze-heading">
        <div className="wrap">
          <SectionHead id="recenze-heading" kicker="Google" title="Recenze" center>
              <p>Celé texty jsou na Google.</p>
          </SectionHead>
          <div className="reviews">
            <p className="review-stars" aria-hidden="true">
              {Array.from({ length: 5 }, (_, index) => (
                <svg key={index} viewBox="0 0 24 24">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                    d="M12 2.6l2.84 5.97 6.56.86-4.8 4.55 1.2 6.5L12 17.27 6.2 20.48l1.2-6.5-4.8-4.55 6.56-.86z"
                  />
                </svg>
              ))}
            </p>
            <div className="reviews-actions">
              <a className="btn btn-solid" href={googleReviewsHref} target="_blank" rel="noopener noreferrer">
                Číst na Google
              </a>
              <a className="btn btn-outline" href={googleReviewsHref} target="_blank" rel="noopener noreferrer">
                Napsat recenzi
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="faq" aria-labelledby="faq-heading">
        <div className="wrap faq-wrap">
          <SectionHead id="faq-heading" kicker="FAQ" title="Časté otázky" center />
          <div className="faq-list">
            {faq.map((item, index) => (
              <details key={item.question} className="faq-item" open={index === 0 || undefined}>
                <summary>
                  <span className="faq-question">{item.question}</span>
                  <span className="faq-icon" aria-hidden="true" />
                </summary>
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
          <div className="faq-cta">
            <p className="faq-cta-title">Nenašli jste odpověď?</p>
            <div className="actions">
              <a className="btn btn-solid" href={`tel:${PHONE_TEL}`}>
                Zavolat
              </a>
              <a className="btn btn-outline" href={`mailto:${EMAIL}`}>
                Napsat e-mail
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="kontakt" aria-labelledby="kontakt-heading">
        <div className="wrap contact">
          <div>
            <SectionHead id="kontakt-heading" kicker={CITY} title="Kontakt" />
            <div className="contact-list">
              <ContactCard href={`tel:${PHONE_TEL}`} icon={<IconPhone />} label="Telefon" value={PHONE_DISPLAY} />
              <ContactCard href={`mailto:${EMAIL}`} icon={<IconMail />} label="E-mail" value={EMAIL} />
              <ContactCard icon={<IconPin />} label="Adresa" value={`${STREET}, ${salon.postcode} ${CITY}`} />
              <ContactCard icon={<IconClock />} label="Otevírací doba" value={hoursValue} />
              <ContactCard href={BOOKING_URL} icon={<IconCalendar />} label="Online rezervace" value="Reservio" external />
              {contactSocials.map((link) => (
                <ContactCard
                  key={link.label}
                  href={link.href}
                  icon={socialIcon(link.label)}
                  label={link.label}
                  value={socialValue[link.label] ?? link.label}
                  external
                />
              ))}
            </div>
            <p className="owner">{OWNER}</p>
          </div>
          <div className="mapbox">
            <iframe
              title={`Mapa: ${STREET}, ${CITY}`}
              src={MAP_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <a className="map-link" href={MAP_URL} target="_blank" rel="noopener noreferrer">
              Otevřít v Mapách.cz
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <SectionDivider from="bg" to="brand" />
    </main>
  );
}

function listedPrice(service: string): string | undefined {
  const row = salon.priceList.find((item) => item.service === service);
  return row && isFilled(row.price) ? row.price : undefined;
}

function SectionHead({
  id,
  kicker,
  title,
  center = false,
  children,
}: {
  id: string;
  kicker: string;
  title: string;
  center?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className={center ? "section-head is-center" : "section-head"}>
      <p className="kicker">{kicker}</p>
      <h2 id={id}>{title}</h2>
      <span className="section-rule" aria-hidden="true" />
      {children}
    </div>
  );
}

function ContactCard({
  href,
  external = false,
  icon,
  label,
  value,
}: {
  href?: string;
  external?: boolean;
  icon: ReactNode;
  label: string;
  value: string;
}) {
  const body = (
    <>
      <span className="contact-icon">{icon}</span>
      <span>
        <span className="label">{label}</span>
        <span className="value">{value}</span>
      </span>
    </>
  );

  if (!href) {
    return <div className="contact-card">{body}</div>;
  }

  if (external) {
    return (
      <a className="contact-card" href={href} target="_blank" rel="noopener noreferrer">
        {body}
      </a>
    );
  }

  return (
    <a
      className="contact-card"
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {body}
    </a>
  );
}

function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.62 10.79a15.15 15.15 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.4 11.4 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.57 1 1 0 0 1-.25 1.02l-2.2 2.2Z"
      />
    </svg>
  );
}

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z"
      />
    </svg>
  );
}

function IconPin() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z"
      />
    </svg>
  );
}

function IconClock() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm-1 3v5.41l3.8 3.8 1.4-1.42L13 11.59V7h-2Z"
      />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7 2h2v2h6V2h2v2h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3V2Zm13 8H4v10h16V10Z"
      />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm11 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
      />
    </svg>
  );
}

function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.25-1.38A9.9 9.9 0 1 0 12.04 2Zm0 1.8a8.1 8.1 0 0 1 6.8 12.5l-.3.45.9 2.4-2.5-.85-.42.25a8.1 8.1 0 1 1-4.48-14.75Zm-3.4 3.3c-.24 0-.55.1-.72.42-.25.38-.95 1.16-.95 2.82s.97 3.26 1.1 3.48c.14.22 1.88 3 4.64 4.1 2.23.9 2.68.72 3.16.68.48-.04 1.55-.63 1.77-1.24.22-.61.22-1.13.15-1.24-.07-.11-.26-.18-.55-.32-.28-.14-1.7-.84-1.96-.93-.26-.1-.45-.14-.64.14-.19.28-.74.93-.9 1.12-.17.2-.33.22-.61.08-.28-.14-1.19-.44-2.27-1.4-.84-.75-1.4-1.67-1.57-1.95-.16-.28-.02-.43.12-.57.13-.13.28-.33.42-.5.14-.16.19-.28.28-.47.1-.19.05-.35-.02-.5-.08-.14-.64-1.54-.88-2.11-.23-.54-.46-.47-.64-.48Z"
      />
    </svg>
  );
}

function IconMessenger() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.14 2 11.25c0 2.9 1.44 5.48 3.7 7.18V22l3.4-1.87c.92.25 1.9.39 2.9.39 5.52 0 10-4.14 10-9.27S17.52 2 12 2Zm1.05 12.48-2.54-2.7-4.96 2.7 5.46-5.8 2.6 2.7 4.9-2.7-5.46 5.8Z"
      />
    </svg>
  );
}
