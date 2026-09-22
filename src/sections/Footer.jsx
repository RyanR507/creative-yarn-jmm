import { Link } from "react-router-dom";
import { NAV_LINKS, FOOTER_POLICIES } from "../data/content";
import { BRAND, SOCIAL_LINKS, SOCIAL_LABELS, getWhatsAppLink } from "../data/config";
import "./Footer.css";

export default function Footer() {
  // Only networks with a real URL configured are shown to customers.
  const socials = Object.entries(SOCIAL_LINKS).filter(([, url]) => Boolean(url));

  return (
    <footer id="contacto" className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <img src="/assets/logo/logo.png" alt={BRAND.name} className="footer__logo-img" />
          <p className="footer__tagline">{BRAND.tagline}</p>
          <p className="footer__jm-note">JM — Jean Marie, el origen detrás de cada puntada.</p>
        </div>

        <nav className="footer__nav" aria-label="Enlaces del sitio">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href + link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__social">
          <p className="footer__heading">{socials.length ? "Síguenos" : "Escríbenos"}</p>
          <ul>
            {socials.map(([network, url]) => (
              <li key={network}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {SOCIAL_LABELS[network]}
                </a>
              </li>
            ))}
            <li>
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </li>
          </ul>
        </div>

        <div className="footer__policies">
          <p className="footer__heading">Políticas</p>
          <ul>
            {FOOTER_POLICIES.map((p) => (
              <li key={p.label}>
                <Link to={p.href}>{p.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>© 2026 {BRAND.name}. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
