import { useState } from "react";
import { useScrollReveal } from "../animations/useScrollReveal";
import { TESTIMONIALS } from "../data/content";
import "./Testimonials.css";

export default function Testimonials() {
  const scopeRef = useScrollReveal();
  const [index, setIndex] = useState(0);

  const go = (dir) => {
    setIndex((prev) => (prev + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const hasTestimonials = TESTIMONIALS.length > 0;
  const current = hasTestimonials ? TESTIMONIALS[index] : null;

  return (
    <section id="testimonios" className="testimonials" ref={scopeRef}>
      <div className="container" data-reveal-group>
        <div className="section-head center">
          <p className="eyebrow" data-reveal>
            Testimonios
          </p>
          <h2 className="section-title center" data-reveal>
            Hecho con amor. Amado por nuestros clientes.
          </h2>
        </div>

        {hasTestimonials ? (
          <div className="testimonials__card" data-reveal>
            <div className="testimonials__stars" aria-hidden="true">
              {"★".repeat(current.stars)}
              {"☆".repeat(5 - current.stars)}
            </div>
            <p className="testimonials__text">“{current.text}”</p>
            <p className="testimonials__name">— {current.name}</p>

            <div className="testimonials__nav">
              <button type="button" onClick={() => go(-1)} aria-label="Testimonio anterior">
                ←
              </button>
              <div className="testimonials__dots">
                {TESTIMONIALS.map((t, i) => (
                  <button
                    key={t.name + i}
                    type="button"
                    className={i === index ? "is-active" : ""}
                    aria-label={`Ver testimonio ${i + 1}`}
                    onClick={() => setIndex(i)}
                  />
                ))}
              </div>
              <button type="button" onClick={() => go(1)} aria-label="Siguiente testimonio">
                →
              </button>
            </div>
          </div>
        ) : (
          <div className="testimonials__card testimonials__card--empty" data-reveal>
            <p className="testimonials__empty-text">
              Estamos reuniendo las primeras experiencias de nuestras clientas y clientes.
              Si ya creaste una pieza con nosotros, escríbenos — nos encantaría compartir tu historia aquí.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
