import { useScrollReveal } from "../animations/useScrollReveal";
import { ABOUT_CARDS } from "../data/content";
import "./About.css";

export default function About() {
  const scopeRef = useScrollReveal();

  return (
    <section id="sobre-nosotros" className="about" ref={scopeRef}>
      <div className="container" data-reveal-group>
        <div className="section-head center">
          <p className="eyebrow" data-reveal>
            Sobre Creative Yarn
          </p>
          <h2 className="section-title center" data-reveal>
            Más que una pieza. Un recuerdo.
          </h2>
          <p className="section-subtitle center" data-reveal>
            En Creative Yarn transformamos nombres, fechas, fotografías, frases e ideas
            en piezas únicas hechas a mano y creadas especialmente para ti.
          </p>
        </div>

        <div className="about__grid">
          {ABOUT_CARDS.map((card) => (
            <article className="about__card" key={card.title} data-reveal>
              <span className="about__thread" aria-hidden="true" />
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
