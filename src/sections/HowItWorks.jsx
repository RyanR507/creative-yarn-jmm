import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../animations/gsapSetup";
import { useScrollReveal } from "../animations/useScrollReveal";
import { STEPS } from "../data/content";
import "./HowItWorks.css";

export default function HowItWorks() {
  const scopeRef = useScrollReveal();
  const trackRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!line || prefersReducedMotion()) return undefined;

    const tween = gsap.fromTo(
      line,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        transformOrigin: "left center",
        scrollTrigger: {
          trigger: trackRef.current,
          start: "top 75%",
          end: "bottom 60%",
          scrub: 0.6,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section id="como-funciona" className="how" ref={scopeRef}>
      <div className="container" data-reveal-group>
        <div className="section-head center">
          <p className="eyebrow" data-reveal>
            Cómo funciona
          </p>
          <h2 className="section-title center" data-reveal>
            De tu idea a algo que puedas sostener.
          </h2>
        </div>

        <div className="how__track" ref={trackRef}>
          <div className="how__line-bg" aria-hidden="true">
            <div className="how__line-fill" ref={lineRef} />
          </div>
          {STEPS.map((step) => (
            <div className="how__step" key={step.number} data-reveal>
              <span className="how__number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
