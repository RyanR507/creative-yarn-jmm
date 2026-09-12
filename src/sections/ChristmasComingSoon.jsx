import { useEffect, useMemo, useRef } from "react";
import { useScrollReveal } from "../animations/useScrollReveal";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../animations/gsapSetup";
import { CHRISTMAS_TEASER } from "../data/content";
import { getWhatsAppLink } from "../data/config";
import "./ChristmasComingSoon.css";

const SNOW_COUNT = 18;
const SPARKLE_COUNT = 7;

function makeSnow() {
  return Array.from({ length: SNOW_COUNT }, (_, i) => ({
    id: i,
    style: {
      "--x": `${Math.round(Math.random() * 100)}%`,
      "--size": `${(2 + Math.random() * 3).toFixed(1)}px`,
      "--duration": `${(11 + Math.random() * 9).toFixed(1)}s`,
      "--delay": `${(Math.random() * -18).toFixed(1)}s`,
      "--drift": `${Math.round(-20 + Math.random() * 40)}px`,
      "--max-opacity": (0.35 + Math.random() * 0.35).toFixed(2),
    },
  }));
}

function makeSparkles() {
  return Array.from({ length: SPARKLE_COUNT }, (_, i) => ({
    id: i,
    style: {
      "--x": `${Math.round(8 + Math.random() * 84)}%`,
      "--y": `${Math.round(10 + Math.random() * 75)}%`,
      "--size": `${(3 + Math.random() * 3).toFixed(1)}px`,
      "--duration": `${(4 + Math.random() * 3).toFixed(1)}s`,
      "--delay": `${(Math.random() * -7).toFixed(1)}s`,
      "--max-opacity": (0.6 + Math.random() * 0.3).toFixed(2),
    },
  }));
}

export default function ChristmasComingSoon() {
  const scopeRef = useScrollReveal();
  const threadPathRef = useRef(null);
  const titleShineRef = useRef(null);

  // Computed once — this section doesn't re-render for reasons that would
  // change the user's motion preference mid-session.
  const reduceMotion = useMemo(() => prefersReducedMotion(), []);
  const snow = useMemo(() => (reduceMotion ? [] : makeSnow()), [reduceMotion]);
  const sparkles = useMemo(() => (reduceMotion ? [] : makeSparkles()), [reduceMotion]);

  // Ambient atmosphere (snow drift, sparkle glow, title shine, thread draw-on):
  // kept separate from useScrollReveal's fade/rise reveal so the two concerns
  // don't get tangled, but triggered off the same section entering the
  // viewport. Skipped entirely under reduced motion — the CSS particles
  // aren't even rendered in that case, and there is nothing left to animate.
  useEffect(() => {
    if (reduceMotion) return undefined;
    const section = scopeRef.current;
    if (!section) return undefined;

    const ctx = gsap.context(() => {
      const path = threadPathRef.current;
      if (path) {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      }

      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        once: true,
        onEnter: () => {
          section.classList.add("christmas-teaser--active");

          if (path) {
            gsap.to(path, {
              strokeDashoffset: 0,
              duration: 1.8,
              ease: "power2.inOut",
              delay: 0.3,
            });
          }

          if (titleShineRef.current) {
            gsap.fromTo(
              titleShineRef.current,
              { xPercent: -160 },
              { xPercent: 360, duration: 1.3, ease: "power2.inOut", delay: 0.55 }
            );
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reduceMotion, scopeRef]);

  return (
    <section id="navidad" className="christmas-teaser" ref={scopeRef}>
      {!reduceMotion && (
        <div className="christmas-teaser__atmosphere" aria-hidden="true">
          <svg
            className="christmas-teaser__thread"
            viewBox="0 0 220 60"
            fill="none"
            aria-hidden="true"
          >
            <path
              ref={threadPathRef}
              d="M4,42 C40,10 70,52 108,26 S176,4 216,30"
              stroke="var(--cy-gold)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          <div className="christmas-teaser__snow-layer">
            {snow.map((flake) => (
              <span key={flake.id} className="christmas-teaser__snow" style={flake.style} />
            ))}
          </div>

          <div className="christmas-teaser__sparkle-layer">
            {sparkles.map((sparkle) => (
              <span
                key={sparkle.id}
                className="christmas-teaser__sparkle"
                style={sparkle.style}
              />
            ))}
          </div>
        </div>
      )}

      <div className="container christmas-teaser__inner" data-reveal-group>
        <span className="christmas-teaser__badge" data-reveal>
          Próximamente
        </span>
        <p className="eyebrow" data-reveal>
          {CHRISTMAS_TEASER.eyebrow}
        </p>
        <h2 className="section-title center" data-reveal>
          <span className="christmas-teaser__title-wrap">
            {CHRISTMAS_TEASER.title}
            {!reduceMotion && (
              <span ref={titleShineRef} className="christmas-teaser__title-shine" />
            )}
          </span>
        </h2>
        <p className="section-subtitle center" data-reveal>
          {CHRISTMAS_TEASER.text}
        </p>

        <a
          className="btn btn-outline"
          href={getWhatsAppLink(
            "¡Hola Creative Yarn! Quiero que me avisen cuando lancen la colección de Navidad."
          )}
          target="_blank"
          rel="noopener noreferrer"
          data-reveal
        >
          {CHRISTMAS_TEASER.cta}
        </a>
      </div>
    </section>
  );
}
