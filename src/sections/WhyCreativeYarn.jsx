import { useScrollReveal } from "../animations/useScrollReveal";
import { DIFFERENTIATORS } from "../data/content";
import "./WhyCreativeYarn.css";

export default function WhyCreativeYarn() {
  const scopeRef = useScrollReveal();

  return (
    <section id="por-que-creative-yarn" className="why-cy" ref={scopeRef}>
      <div className="container" data-reveal-group>
        <div className="section-head center">
          <p className="eyebrow" data-reveal>
            Lo que nos hace diferentes
          </p>
          <h2 className="section-title center" data-reveal>
            No es una manualidad más.
          </h2>
          <p className="section-subtitle center" data-reveal>
            Cada detalle de Creative Yarn está pensado para que tu pieza se sienta
            única, cuidada y hecha especialmente para ti.
          </p>
        </div>

        <div className="why-cy__grid">
          {DIFFERENTIATORS.map((item) => (
            <article className="why-cy__card" key={item.title} data-reveal>
              <span className="why-cy__thread" aria-hidden="true" />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
