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
  notes,
  OWNER,
  PHONE_DISPLAY,
  PHONE_TEL,
  PRICE_TBA,
  services,
  servicesIntro,
  STREET,
} from "@/lib/content";
import { faq } from "@/lib/faq";
import imageManifest from "@/lib/image-manifest.json";
import { withBase } from "@/lib/paths";

const mapQuery = encodeURIComponent(`${STREET}, ${CITY}`);
const MAP_URL = `https://mapy.cz/zakladni?q=${mapQuery}`;
const MAP_EMBED = `https://maps.google.com/maps?q=${mapQuery}&z=16&hl=cs&output=embed`;

const heroFacts = [
  { value: "Psi všech plemen", label: "i kočky" },
  { value: "Objednání", label: "Reservio nebo telefon" },
] as const;

export function HomePage() {
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
          <ul className="service-grid">
            {services.map((item) => (
              <li key={item.title}>
                <article className="service-card">
                  <div className="service-card-top">
                    <div className="service-card-title">
                      <h3>{item.title}</h3>
                      <p className="service-price tba">{PRICE_TBA}</p>
                    </div>
                    <p className="service-card-desc">{item.text}</p>
                  </div>
                  <div className="service-card-foot">
                    {"note" in item && item.note ? (
                      <details className="service-more">
                        <summary>
                          Více informací
                          <span aria-hidden="true">↓</span>
                        </summary>
                        <p className="note">{item.note}</p>
                      </details>
                    ) : (
                      <span className="service-more-spacer" aria-hidden="true" />
                    )}
                  </div>
                </article>
              </li>
            ))}
          </ul>
          <div className="services-cta">
            <a className="btn btn-solid" href={BOOKING_URL}>
              Rezervovat termín
            </a>
          </div>
        </div>
      </section>

      <SectionDivider from="bg" to="alt" />

      <section className="section section-alt" id="galerie" aria-labelledby="galerie-heading">
        <div className="wrap">
          <SectionHead id="galerie-heading" kicker="Ukázky" title="Galerie" center />
          <div className="gallery">
            {gallery.map((item) => (
              <figure key={item.name} data-focus={"focus" in item ? item.focus : undefined}>
                <Photo
                  name={item.name}
                  alt={item.alt}
                  sizes="(max-width: 560px) calc(100vw - 40px), (max-width: 800px) calc(50vw - 28px), 360px"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider from="alt" to="bg" flip />

      <section className="section" id="info" aria-labelledby="info-heading">
        <div className="wrap">
          <SectionHead id="info-heading" kicker="Než přijdete" title="Důležité informace" center />
          <ul className="info-list">
            {notes.map((note, index) => (
              <li key={note.title} className="info-card">
                <span className="info-icon" aria-hidden="true">
                  {index === 0 ? <IconDroplet /> : null}
                  {index === 1 ? <IconDoor /> : null}
                  {index === 2 ? <IconCalendar /> : null}
                </span>
                <h3 className="info-card-title">{note.title}</h3>
                <p className="info-card-text">{note.text}</p>
              </li>
            ))}
          </ul>
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

      <SectionDivider from="bg" to="brand" />

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

      <section className="section" id="kontakt" aria-labelledby="kontakt-heading">
        <div className="wrap contact">
          <div>
            <SectionHead id="kontakt-heading" kicker={CITY} title="Kontakt" />
            <div className="contact-list">
              <ContactCard href={`tel:${PHONE_TEL}`} icon={<IconPhone />} label="Telefon" value={PHONE_DISPLAY} />
              <ContactCard href={`mailto:${EMAIL}`} icon={<IconMail />} label="E-mail" value={EMAIL} />
              <ContactCard icon={<IconPin />} label="Adresa" value={`${STREET}, ${CITY}`} />
              <ContactCard icon={<IconClock />} label="Otevírací doba" value="dle telefonické domluvy" />
              <ContactCard href={BOOKING_URL} icon={<IconCalendar />} label="Online rezervace" value="Reservio" />
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

      <SectionDivider from="bg" to="dark" />
    </main>
  );
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
  icon,
  label,
  value,
}: {
  href?: string;
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

  return (
    <a className="contact-card" href={href}>
      {body}
    </a>
  );
}

function IconDroplet() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2.2C8.4 7.1 6 10.7 6 14a6 6 0 0 0 12 0c0-3.3-2.4-6.9-6-11.8Zm0 16.3A3.5 3.5 0 0 1 8.5 15c0-1.9 1.3-4.1 3.5-7.1 2.2 3 3.5 5.2 3.5 7.1A3.5 3.5 0 0 1 12 18.5Z"
      />
    </svg>
  );
}

function IconDoor() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M19 19V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v14H3v2h18v-2h-2ZM9 19V5h8v14H9Zm5.5-6.5A1.25 1.25 0 1 1 13 11.25 1.25 1.25 0 0 1 14.5 12.5Z"
      />
    </svg>
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
