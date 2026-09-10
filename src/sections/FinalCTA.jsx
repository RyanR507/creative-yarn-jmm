import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../animations/gsapSetup";
import "./FinalCTA.css";

const HEART_PATH =
  "M240,90 C 200,20 90,20 60,90 C 30,160 100,210 240,320 C 380,210 450,160 420,90 C 390,20 280,20 240,90 Z";

export default function FinalCTA() {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return undefined;
    const length = path.getTotalLength();

    if (prefersReducedMotion()) {
      path.style.strokeDasharray = "none";
      return undefined;
    }

    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const tween = gsap.to(path, {
      strokeDashoffset: 0,
      duration: 2.2,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 65%",
        once: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section className="final-cta" ref={sectionRef}>
      <svg className="final-cta__heart" viewBox="0 0 480 340" aria-hidden="true" focusable="false">
        <path ref={pathRef} d={HEART_PATH} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>

      <div className="container final-cta__content">
        <h2>Tu idea merece convertirse en algo real.</h2>
        <p>
          Cuéntanos qué estás imaginando y creemos algo hecho especialmente para ti.
        </p>
        <div className="final-cta__actions">
          <a href="#personalizacion" className="btn btn-light">
            Crea tu pieza
          </a>
          <a href="#formulario-pedido" className="btn btn-light-outline">
            Contáctanos
          </a>
        </div>
      </div>
    </section>
  );
}
