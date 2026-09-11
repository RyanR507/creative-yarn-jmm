import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "../animations/gsapSetup";
import { NAV_LINKS } from "../data/content";
import { BRAND } from "../data/config";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  // The transparent-navbar-over-dark-video look only makes sense on the
  // home page's Hero. Every other page (the policy pages, for now) has a
  // light background right at the top, so the navbar should read as
  // "scrolled" (solid background, dark text) there from the very first
  // frame — otherwise its text is nearly invisible: light text on a light
  // page background.
  const isHome = location.pathname === "/";
  const showSolidNavbar = scrolled || !isHome;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    if (open) {
      el.style.display = "flex";
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: -12 },
        { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" }
      );
    } else {
      gsap.to(el, {
        autoAlpha: 0,
        y: -12,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          if (el) el.style.display = "none";
        },
      });
    }
  }, [open]);

  return (
    <header className={`navbar ${showSolidNavbar ? "navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">
        <a href="/" className="navbar__logo">
          <img src="/assets/logo/logo.png" alt={BRAND.name} className="navbar__logo-img" />
        </a>

        <nav className="navbar__nav" aria-label="Navegación principal">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="/#personalizacion" className="btn btn-primary navbar__cta">
          Crea tu pieza
        </a>

        <button
          type="button"
          className="navbar__burger"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div id="mobile-menu" className="navbar__mobile-menu" ref={menuRef}>
        <ul>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="/#personalizacion"
          className="btn btn-primary"
          onClick={() => setOpen(false)}
        >
          Crea tu pieza
        </a>
      </div>
    </header>
  );
}
