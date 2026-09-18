import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../animations/gsapSetup";
import { BRAND } from "../data/config";
import { trackEvent } from "../utils/analytics";
import "./Hero.css";

export default function Hero() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const contentRef = useRef(null);
  const [videoFailed, setVideoFailed] = useState(false);

  // Scroll-scrubbed playback: as the visitor scrolls through the Hero, the
  // video's currentTime is nudged forward/back instead of just looping.
  // Falls back to a plain autoplay loop on touch devices, reduced-motion,
  // or if the metadata never loads (keeps performance > effects).
  useEffect(() => {
    const video = videoRef.current;
    if (!video || videoFailed) return undefined;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch || prefersReducedMotion()) return undefined;

    let trigger;
    const onLoaded = () => {
      if (!video.duration || !isFinite(video.duration)) return;
      // Scroll takes over the timeline entirely, so playback must stop —
      // otherwise autoplay keeps advancing currentTime and fights the scrub.
      video.pause();
      trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        // "+=height" ties the scrub distance to the Hero's own height (it
        // isn't pinned), so the clip finishes right as it scrolls out of view.
        end: () => `+=${sectionRef.current.offsetHeight}`,
        scrub: 1,
        onUpdate: (self) => {
          const t = self.progress * video.duration;
          if (Math.abs(video.currentTime - t) > 0.03) {
            video.currentTime = t;
          }
        },
      });
    };

    if (video.readyState >= 1) onLoaded();
    else video.addEventListener("loadedmetadata", onLoaded);

    return () => {
      video.removeEventListener("loadedmetadata", onLoaded);
      trigger?.kill();
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
          Creamos piezas personalizadas hechas a mano para las personas, momentos y
          recuerdos que más importan.
        </p>
        <div className="hero__actions">
          <a
            href="#personalizados"
            className="btn btn-primary"
            onClick={() => trackEvent("hero_primary_cta_click")}
          >
            Crear mi idea
          </a>
          <a
            href="#personalizados"
            className="btn btn-light-outline"
            onClick={() => trackEvent("hero_secondary_cta_click")}
          >
            Ver productos
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
