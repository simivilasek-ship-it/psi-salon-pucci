import { ADDRESS_LINE, EMAIL, ICO, OWNER, PHONE_DISPLAY, PHONE_TEL } from "@/lib/content";
import { withBase } from "@/lib/paths";
import { socialLinks } from "@/lib/salon";
import { SITE_NAME } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="wrap footer-grid">
        <div>
          <p className="footer-brand">
            <img
              className="footer-logo"
              src={withBase("/logo-white.png?v=2")}
              alt={SITE_NAME}
              width={493}
              height={291}
            />
          </p>
          <p className="footer-owner">{OWNER}</p>
          <dl className="footer-dl">
            <div>
              <dt>Sídlo</dt>
              <dd>{ADDRESS_LINE}</dd>
            </div>
            <div>
              <dt>IČO</dt>
              <dd>{ICO}</dd>
            </div>
            <div>
              <dt>Telefon</dt>
              <dd>
                <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
              </dd>
            </div>
            <div>
              <dt>E-mail</dt>
              <dd>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </dd>
            </div>
            {socialLinks().map((link) => (
              <div key={link.href}>
                <dt>{link.label}</dt>
                <dd>
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="footer-note">Objednání telefonicky nebo přes Reservio. Platba v hotovosti nebo přes QR kód.</p>
      </div>
      <div className="wrap footer-bottom">
        <p>
          © {year} {SITE_NAME}. Web vytvořil{" "}
          <a href="https://simivilasek.cz" target="_blank" rel="noopener noreferrer">
            Simon Vilášek
          </a>
          {" · "}
          <a href={withBase("/ochrana-osobnich-udaju/")}>Ochrana osobních údajů</a>
        </p>
      </div>
      <a className="fab" href={`tel:${PHONE_TEL}`}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M6.62 10.79a15.15 15.15 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.4 11.4 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.57 1 1 0 0 1-.25 1.02l-2.2 2.2Z"
          />
        </svg>
        Zavolat
      </a>
    </footer>
  );
}
