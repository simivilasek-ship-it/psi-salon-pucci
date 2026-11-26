import { ADDRESS_LINE, EMAIL, ICO, nav, OWNER, PHONE_DISPLAY, PHONE_TEL } from "@/lib/content";
import { withBase } from "@/lib/paths";
import { isFilled, salon, socialLinks as salonSocialLinks } from "@/lib/salon";
import { SITE_NAME } from "@/lib/site";

function footerNote() {
  const messenger = isFilled(salon.messengerUrl) ? (
    <a href={salon.messengerUrl.trim()} target="_blank" rel="noopener noreferrer">
      Messenger
    </a>
  ) : (
    "Messenger"
  );

  return (
    <>
      Objednat se můžete telefonicky, přes {messenger}, WhatsApp, Instagram nebo rezervační systém Reservio. Platba
      v&nbsp;hotovosti nebo přes QR kód.
    </>
  );
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
          {" · "}
          <a href={withBase("/ochrana-osobnich-udaju/")}>Ochrana osobních údajů</a>
        </p>
      </div>
      {whatsapp ? (
        <a
          className="fab fab-whatsapp"
          href={whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12.04 2a9.9 9.9 0 0 0-8.5 14.86L2 22l5.28-1.38A9.9 9.9 0 1 0 12.04 2Zm0 1.8a8.1 8.1 0 0 1 6.84 12.2l-.34.5.2.58 1.04 3.1-3.2-1.04-.55-.17-.52.3a8.1 8.1 0 0 1-11.57-7.1 8.1 8.1 0 0 1 8.1-8.37Zm-3.4 3.53c-.18 0-.47.07-.72.34-.24.28-.94.92-.94 2.24s.96 2.6 1.1 2.78c.13.18 1.86 2.97 4.6 4.05 2.26.9 2.72.72 3.21.68.5-.05 1.6-.65 1.83-1.28.22-.63.22-1.17.15-1.28-.07-.11-.26-.18-.55-.32-.28-.14-1.7-.84-1.96-.93-.26-.1-.45-.14-.64.14-.19.28-.73.93-.9 1.12-.16.18-.33.21-.61.07-.28-.14-1.2-.44-2.28-1.4-.84-.75-1.41-1.68-1.58-1.96-.16-.28-.02-.43.12-.57.13-.13.28-.33.42-.5.14-.16.19-.28.28-.47.1-.18.05-.35-.02-.49-.07-.14-.64-1.54-.88-2.11-.23-.55-.47-.47-.64-.48Z"
            />
          </svg>
          WhatsApp
        </a>
      ) : null}
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
