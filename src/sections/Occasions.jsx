import { useScrollReveal } from "../animations/useScrollReveal";
import { OCCASIONS } from "../data/content";
import { trackEvent } from "../utils/analytics";
import "./Occasions.css";

export default function Occasions() {
  const scopeRef = useScrollReveal();

  return (
    <section id="ocasiones" className="occasions" ref={scopeRef}>
      <div className="container" data-reveal-group>
        <div className="section-head center">
          <p className="eyebrow" data-reveal>
            Ocasiones
          </p>
          <h2 className="section-title center" data-reveal>
            Siempre hay una razón para hacerlo especial.
          </h2>
          <p className="section-subtitle center" data-reveal>
            Y cuando no la hay — a veces no necesitas una ocasión.
          </p>
        </div>

        <div className="occasions__grid">
          {OCCASIONS.map((occ) => (
            <a
              href="#formulario-pedido"
              className={`occasions__pill ${occ === "Porque sí" ? "is-highlight" : ""}`}
              key={occ}
              data-reveal
              aria-label={`Crear una idea personalizada para ${occ}`}
              onClick={() => trackEvent("occasion_selection", { occasion: occ })}
            >
              {occ}
            </a>
          ))}
        </div>

        <div className="occasions__cta" data-reveal>
          <a
            href="#personalizacion"
            className="btn btn-primary"
            onClick={() => trackEvent("personalization_interaction", { action: "occasions_cta_click" })}
          >
            Hazlo personal
          </a>
        </div>
      </div>
    </section>
  );
}
