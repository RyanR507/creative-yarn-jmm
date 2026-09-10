import { useScrollReveal } from "../animations/useScrollReveal";
import { OCCASIONS } from "../data/content";
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
            <span className={`occasions__pill ${occ === "Porque sí" ? "is-highlight" : ""}`} key={occ} data-reveal>
              {occ}
            </span>
          ))}
        </div>

        <div className="occasions__cta" data-reveal>
          <a href="#personalizacion" className="btn btn-primary">
            Hazlo personal
          </a>
        </div>
      </div>
    </section>
  );
}
