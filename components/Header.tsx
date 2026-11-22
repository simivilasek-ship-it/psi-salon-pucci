import { nav, PHONE_DISPLAY, PHONE_TEL } from "@/lib/content";
import { withBase } from "@/lib/paths";

export function Header() {
  return (
    <header className="bar">
      <a className="skip" href="#obsah">
        Přeskočit na obsah
      </a>
      <div className="bar-inner">
        <a className="wordmark" href={withBase("/#uvod")}>
          Psí salon Pucci
        </a>
        <nav aria-label="Hlavní navigace">
          {nav.map((item) => (
            <a key={item.href} href={withBase(item.href)}>
              {item.label}
            </a>
          ))}
          <a className="tel" href={`tel:${PHONE_TEL}`}>
            {PHONE_DISPLAY}
          </a>
        </nav>
      </div>
    </header>
  );
}
