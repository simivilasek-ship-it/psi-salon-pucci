import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/content";
import { withBase } from "@/lib/paths";

export default function NotFound() {
  return (
    <main id="obsah" className="not-found">
      <div className="narrow">
        <p className="kicker">404</p>
        <h1>Stránka nenalezena</h1>
        <p>Tahle adresa na webu Psího salonu Pucci není.</p>
        <div className="actions">
          <a className="btn btn-solid" href={withBase("/")}>
            Na úvod
          </a>
          <a className="btn btn-line" href={`tel:${PHONE_TEL}`}>
            Zavolat {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </main>
  );
}
