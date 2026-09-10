import { useScrollReveal } from "../animations/useScrollReveal";
import { PERSONALIZATION_OPTIONS } from "../data/content";
import "./Personalization.css";

export default function Personalization() {
  const scopeRef = useScrollReveal();

  return (
    <section id="personalizacion" className="personalization" ref={scopeRef}>
      <div className="container personalization__inner" data-reveal-group>
        <div className="personalization__text">
          <p className="eyebrow" data-reveal>
            Hazlo tuyo
          </p>
          <h2 className="section-title" data-reveal>
            Hazlo tuyo.
          </h2>
          <p className="section-subtitle" data-reveal>
            Cada pieza puede adaptarse a tu historia. Elige lo que quieres personalizar
            y nosotros nos encargamos del resto.
          </p>

          <blockquote className="personalization__quote" data-reveal>
            “No existen dos historias exactamente iguales. Tu pieza tampoco debería serlo.”
          </blockquote>

          <a href="#formulario-pedido" className="btn btn-primary" data-reveal>
            Comenzar mi diseño
          </a>
        </div>

        <ul className="personalization__options" data-reveal>
          {PERSONALIZATION_OPTIONS.map((opt) => (
            <li key={opt}>
              <span className="personalization__dot" aria-hidden="true" />
              {opt}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
