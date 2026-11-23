import { nav, PHONE_DISPLAY, PHONE_TEL } from "@/lib/content";
import { withBase } from "@/lib/paths";
import { isFilled, salon } from "@/lib/salon";

function buildNav(): { href: string; label: string }[] {
  const items: { href: string; label: string }[] = nav.map((item) => ({
    href: item.href,
    label: item.label,
  }));
  if (!isFilled(salon.googleReviewsUrl)) return items;

  const kontaktIdx = items.findIndex((item) => item.href === "/#kontakt");
  const insertAt = kontaktIdx >= 0 ? kontaktIdx : items.length;
  items.splice(insertAt, 0, { href: "/#recenze", label: "Recenze" });
  return items;
}

export function Header() {
  const navItems = buildNav();

  return (
    <header className="bar" data-header>
      <a className="skip" href="#obsah">
        Přeskočit na obsah
      </a>
      <div className="bar-inner">
        <a className="wordmark" href={withBase("/#uvod")}>
          <img
            className="wordmark-img wordmark-img-dark"
            src={withBase("/logo.png?v=3")}
            alt="Psí salon Pucci"
            width={493}
            height={291}
          />
          <img
            className="wordmark-img wordmark-img-light"
            src={withBase("/logo-white.png?v=3")}
            alt=""
            width={493}
            height={291}
            aria-hidden="true"
          />
        </a>
        <nav aria-label="Hlavní navigace">
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={withBase(item.href)}>{item.label}</a>
              </li>
            ))}
            <li>
              <a className="nav-cta" href={`tel:${PHONE_TEL}`}>
                <PhoneIcon />
                <span>Zavolat</span>
                <span className="nav-cta-num">{PHONE_DISPLAY}</span>
              </a>
            </li>
          </ul>
        </nav>
        <label className="menu-toggle" aria-label="Menu">
          <input id="nav-toggle" className="menu-check" type="checkbox" />
          <span className="sr-only">Otevřít nebo zavřít menu</span>
          <span className="burger-box" aria-hidden="true">
            <span className="burger burger-1" />
            <span className="burger burger-2" />
            <span className="burger burger-3" />
          </span>
        </label>
      </div>
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.62 10.79a15.15 15.15 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.4 11.4 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.57 1 1 0 0 1-.25 1.02l-2.2 2.2Z"
      />
    </svg>
  );
}
