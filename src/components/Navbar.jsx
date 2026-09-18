import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "../animations/gsapSetup";
import { NAVBAR_LINKS } from "../data/content";
import { BRAND } from "../data/config";
import { trackEvent } from "../utils/analytics";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const burgerRef = useRef(null);
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

  // Accessible close behavior for the mobile menu: Escape, and a tap/click
  // outside both the menu and the burger button that opens it. Both
  // listeners are only attached while the menu is actually open, and are
  // removed the moment it closes (or the component unmounts) — nothing is
  // ever left listening in the background.
  useEffect(() => {
    if (!open) return undefined;

    function handleKeyDown(e) {
      if (e.key === "Escape") setOpen(false);
    }
    function handlePointerDown(e) {
      const menu = menuRef.current;
      const burger = burgerRef.current;
      if (menu?.contains(e.target) || burger?.contains(e.target)) return;
      setOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open]);

  return (
    <header className={`navbar ${showSolidNavbar ? "navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">
        <a href="/" className="navbar__logo">
          <img src="/assets/logo/logo.png" alt={BRAND.name} className="navbar__logo-img" />
          <span className="navbar__logo-text">{BRAND.name}</span>
        </a>

        <nav className="navbar__nav" aria-label="Navegación principal">
          <ul>
            {NAVBAR_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={link.isChristmas ? "navbar__link--christmas" : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="/#personalizados"
          className="btn btn-primary navbar__cta"
          onClick={() => trackEvent("navbar_cta_click")}
        >
          Crear mi idea
        </a>

        <button
          ref={burgerRef}
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
          {NAVBAR_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={link.isChristmas ? "navbar__link--christmas" : undefined}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="/#personalizados"
          className="btn btn-primary"
          onClick={() => {
            trackEvent("navbar_cta_click");
            setOpen(false);
          }}
        >
          Crear mi idea
        </a>
      </div>
    </header>
  );
}
