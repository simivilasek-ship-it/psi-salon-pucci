import { CITY, ICO, OWNER, STREET } from "@/lib/content";
import { SITE_NAME } from "@/lib/site";

export function Footer() {
  return (
    <footer>
      <div className="wrap footer-inner">
        <span>
          {SITE_NAME} · {OWNER} · IČO {ICO}
        </span>
        <span>
          {STREET}, {CITY}
        </span>
      </div>
    </footer>
  );
}
