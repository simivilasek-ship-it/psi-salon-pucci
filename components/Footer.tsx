import { ADDRESS_LINE, EMAIL, ICO, nav, OWNER, PHONE_DISPLAY, PHONE_TEL } from "@/lib/content";
import { withBase } from "@/lib/paths";
import { isFilled, salon, socialLinks as salonSocialLinks } from "@/lib/salon";
import { SITE_NAME } from "@/lib/site";

function footerNote() {
  const channels = ["telefonicky", "přes Reservio"];
  const social = salonSocialLinks();
  for (const link of social) {
    channels.push(link.label);
  }

  const booking =
    channels.length === 2
      ? `${channels[0]} nebo ${channels[1]}`
      : `${channels.slice(0, -1).join(", ")} nebo ${channels[channels.length - 1]}`;

  return `Objednání ${booking}. Platba v hotovosti nebo přes QR kód.`;
}

export function Footer() {
  const year = new Date().getFullYear();
  const whatsapp = salonSocialLinks().find((link) => link.label === "WhatsApp");
  const links = [
    ...salonSocialLinks().map((link) => ({ href: link.href, label: link.label })),
    isFilled(salon.googleReviewsUrl)
      ? { href: salon.googleReviewsUrl.trim(), label: "Google recenze" }
      : null,
  ].filter((link): link is { href: string; label: string } => Boolean(link?.href));

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
            {links.length > 0 ? (
              <div>
                <dt>Sítě</dt>
                <dd>
                  {links.map((link, index) => (
                    <span key={link.label}>
                      {index > 0 ? " · " : null}
                      <a href={link.href} target="_blank" rel="noopener noreferrer">
                        {link.label}
                      </a>
                    </span>
                  ))}
                </dd>
              </div>
            ) : null}
          </dl>
        </div>
        <div className="footer-side">
          <nav className="footer-nav" aria-label="Patička">
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={withBase(item.href)}>{item.label}</a>
                </li>
              ))}
              <li>
                <a href={withBase("/ochrana-osobnich-udaju/")}>Ochrana osobních údajů</a>
              </li>
            </ul>
          </nav>
          <p className="footer-note">{footerNote()}</p>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <p>
          © {year} {SITE_NAME}. Web vytvořil{" "}
          <a href="https://simivilasek.cz" target="_blank" rel="noopener noreferrer">
            Simon Vilášek
          </a>
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
