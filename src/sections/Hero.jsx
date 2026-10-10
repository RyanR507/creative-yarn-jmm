import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "../animations/gsapSetup";
import { BRAND, getWhatsAppLink } from "../data/config";
import { trackEvent } from "../utils/analytics";
import "./Hero.css";

export default function Hero() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const contentRef = useRef(null);
  const [videoFailed, setVideoFailed] = useState(false);

  // Muted autoplay loop on every device. React sets `muted` only as a DOM
  // property (no HTML attribute), which Safari/iOS can ignore when deciding
  // whether autoplay is allowed, so it's set explicitly here and play() is
  // called as a backstop. If the browser still blocks it (e.g. iOS Low Power
  // Mode), the rejection is logged and playback is retried once on the first
  // user gesture.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || videoFailed) return undefined;

    video.defaultMuted = true;
    video.muted = true;

    let cancelled = false;
    let removeGestureRetry = () => {};

    const attemptPlay = () =>
      video.play().then(
        () => true,
        (error) => {
          // AbortError = play() interrupted by a pause/unmount, not a block.
          if (error?.name !== "AbortError") {
            console.warn("[Hero] video.play() was rejected:", error?.name, error?.message);
          }
          return false;
        }
      );

    attemptPlay().then((started) => {
      if (started || cancelled) return;
      const retry = () => {
        removeGestureRetry();
        attemptPlay();
      };
      const events = ["pointerdown", "touchend", "keydown"];
      events.forEach((name) => window.addEventListener(name, retry, { passive: true }));
      removeGestureRetry = () =>
        events.forEach((name) => window.removeEventListener(name, retry));
    });

    return () => {
      cancelled = true;
      removeGestureRetry();
    };
  }, [videoFailed]);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 1.1, stagger: 0.12, ease: "power3.out", delay: 0.15 }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="inicio" className="hero" ref={sectionRef}>
      <div className="hero__media" aria-hidden="true">
        {!videoFailed ? (
          <video
            ref={videoRef}
            className="hero__video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/assets/yarn-hero-poster.jpg"
            onError={() => setVideoFailed(true)}
          >
            <source src="/assets/yarn-hero.mp4" type="video/mp4" />
          </video>
        ) : (
          <FallbackThread />
        )}
        <div className="hero__scrim" />
      </div>

      <div className="container hero__content" ref={contentRef}>
        <p className="hero__eyebrow">{BRAND.name}</p>
        <h1 className="hero__title">{BRAND.tagline}</h1>
        <p className="hero__quote">“Convierte tus ideas en algo que puedas tocar.”</p>
        <p className="hero__subtitle">
          Piezas personalizadas hechas a mano con plastic canvas e hilo, para las
          personas, momentos y recuerdos que más importan.
        </p>
        <div className="hero__actions">
          <a
            href="#personalizados"
            className="btn btn-primary"
            onClick={() => trackEvent("hero_primary_cta_click")}
          >
            Explorar productos
          </a>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-light-outline"
            onClick={() => {
              trackEvent("whatsapp_click", { source: "hero" });
              trackEvent("hero_secondary_cta_click");
            }}
          >
            Hablar por WhatsApp
          </a>
        </div>
      </div>

      <a href="#sobre-nosotros" className="hero__scroll-cue" aria-label="Desliza para explorar">
        <span>Desliza para explorar</span>
        <svg width="14" height="26" viewBox="0 0 14 26" fill="none" aria-hidden="true">
          <path d="M7 1v22M1 17l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  );
}

function FallbackThread() {
  return (
    <svg className="hero__fallback" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <path
        d="M-100,200 C 200,50 400,350 700,220 S 1100,50 1300,250 C 1400,350 1250,480 1050,470 C 850,460 900,600 1080,650 C 1250,700 1150,820 980,760"
        fill="none"
        stroke="#f4b6c2"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}
