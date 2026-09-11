import { Link } from "react-router-dom";
import { NAV_LINKS, FOOTER_POLICIES } from "../data/content";
import { BRAND, SOCIAL_LINKS, getWhatsAppLink } from "../data/config";
import "./Footer.css";

export default function Footer() {
  return (
    <footer id="contacto" className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <img src="/assets/logo/logo.png" alt={BRAND.name} className="footer__logo-img" />
          <p className="footer__tagline">{BRAND.tagline}</p>
        </div>

        <nav className="footer__nav" aria-label="Enlaces del sitio">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__social">
          <p className="footer__heading">Síguenos</p>
          <ul>
            <li>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
            <li>
              <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer">
                TikTok
              </a>
            </li>
            <li>
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </li>
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
