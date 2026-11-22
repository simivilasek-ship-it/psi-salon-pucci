import { nav, PHONE_DISPLAY, PHONE_TEL } from "@/lib/content";
import { withBase } from "@/lib/paths";

export function Header() {
  return (
    <header className="bar" data-header>
      <a className="skip" href="#obsah">
        Přeskočit na obsah
      </a>
      <div className="bar-inner">
        <a className="wordmark" href={withBase("/#uvod")}>
          <img
            src={withBase("/logo.png?v=3")}
            alt="Psí salon Pucci"
            width={493}
            height={291}
          />
        </a>
        <label className="menu-toggle">
          <input id="nav-toggle" className="menu-check" type="checkbox" />
          <span className="sr-only">Menu</span>
          <span className="burger" />
          <span className="burger" />
          <span className="burger" />
        </label>
        <nav aria-label="Hlavní navigace">
          <ul className="nav-links">
            {nav.map((item) => (
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
