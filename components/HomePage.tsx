import { HERO_SIZES, Photo } from "@/components/Photo";
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
  priceNotes,
  prices,
  PRICE_TBA,
  services,
  servicesIntro,
  STREET,
} from "@/lib/content";
import { withBase } from "@/lib/paths";

export function HomePage() {
  return (
    <main id="obsah">
      <div className="intro" id="uvod">
        <div className="wrap">
          <div className="intro-text">
            <h1>Vítejte v&nbsp;Psím salonu Pucci</h1>
            <p className="lead">Místo, kde je péče o vaše mazlíčky radostí.</p>
            <p className="slogan">„Protože každý pes si zaslouží hvězdnou péči.“</p>
            <p className="meta">
              {STREET}, {CITY}
              <br />
              Objednání dle telefonické domluvy
            </p>
            <div className="actions">
              <a className="btn btn-dark" href={BOOKING_URL}>
                Rezervovat termín
              </a>
              <a className="btn btn-line" href={`tel:${PHONE_TEL}`}>
                Zavolat {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </div>

      <figure className="hero-fig">
        <Photo
          name="hero"
          alt="Upravený pejsek po návštěvě Psího salonu Pucci"
          sizes={HERO_SIZES}
          priority
        />
      </figure>

      <section id="o-mne">
        <div className="wrap about">
          <Photo
            name="portrait"
            className="portrait"
            alt="Klára Zelinka, zakladatelka Psího salonu Pucci, se svými mazlíčky"
            sizes="(max-width: 800px) calc(100vw - 40px), 480px"
          />
          <div>
            <h2>Jmenuji se Klára</h2>
            {about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="certs">
              {certificates.map((item) => (
                <a key={item.name} href={withBase(`/images/${item.name}-full.webp`)}>
                  <Photo
                    name={item.name}
                    alt={item.alt}
                    sizes="(max-width: 800px) 32vw, 200px"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="sluzby">
        <div className="wrap">
          <h2>Služby</h2>
          <p className="sluzby-uvod">{servicesIntro}</p>
          <ul className="sluzby-list">
            {services.map((item) => (
              <li key={item.title} className={"wide" in item && item.wide ? "wide" : undefined}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                {"note" in item && item.note ? <p className="note">{item.note}</p> : null}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="cenik">
        <div className="wrap">
          <h2>Ceník</h2>
          <div className="table-wrap">
            <table>
              <caption className="sr-only">Ceník služeb Psího salonu Pucci</caption>
              <thead>
                <tr>
                  <th scope="col">Služba</th>
                  <th scope="col">Cena</th>
                </tr>
              </thead>
              <tbody>
                {prices.map((row) => (
                  <tr key={row.service}>
                    <td>{row.service}</td>
                    <td className={row.price === PRICE_TBA ? "tba" : undefined}>{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {priceNotes.map((note) => (
            <p key={note} className="price-note">
              {note}
            </p>
          ))}
        </div>
      </section>

      <section id="info">
        <div className="wrap">
          <h2>Důležité informace</h2>
          <div className="info-block">
            {notes.map((note) => (
              <p key={note}>{note}</p>
            ))}
          </div>
        </div>
      </section>

      <section id="galerie">
        <div className="wrap">
          <h2>Galerie</h2>
          <div className="gallery">
            {gallery.map((item) => (
              <figure key={item.name} className={"center" in item && item.center ? "center" : undefined}>
                <Photo
                  name={item.name}
                  alt={item.alt}
                  sizes="(max-width: 380px) calc(100vw - 40px), (max-width: 800px) calc(50vw - 24px), 360px"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="kontakt">
        <div className="wrap contact">
          <address>
            <h2>Kontakt</h2>
            <p>
              <span className="label">Telefon</span>
              <a className="value" href={`tel:${PHONE_TEL}`}>
                {PHONE_DISPLAY}
              </a>
            </p>
            <p>
              <span className="label">E-mail</span>
              <a className="value" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
            </p>
            <p>
              <span className="label">Adresa</span>
              <span className="value">
                {STREET}, {CITY}
              </span>
            </p>
            <p>
              <span className="label">Otevírací doba</span>
              <span className="value">dle telefonické domluvy</span>
            </p>
            <p>
              <span className="label">Online rezervace</span>
              <a className="value" href={BOOKING_URL}>
                Reservio
              </a>
            </p>
            <p className="owner">{OWNER}</p>
          </address>
          <div className="mapbox">
            <strong>Psí salon Pucci</strong>
            <p>
              {STREET}, {CITY}
              <br />
              Mapa se doplní na ostrém webu.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
