import { useScrollReveal } from "../animations/useScrollReveal";
import { CATEGORIES } from "../data/content";
import { getWhatsAppLink } from "../data/config";
import "./ProductCategories.css";

export default function ProductCategories() {
  const scopeRef = useScrollReveal();

  return (
    <section id="personalizados" className="categories" ref={scopeRef}>
      <div className="container" data-reveal-group>
        <div className="section-head center">
          <p className="eyebrow" data-reveal>
            Personalizados
          </p>
          <h2 className="section-title center" data-reveal>
            ¿Qué podemos crear para ti?
          </h2>
          <p className="section-subtitle center" data-reveal>
            Si puedes imaginarlo, podemos ayudarte a convertirlo en arte de lana.
          </p>
        </div>

        <div className="categories__grid">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={getWhatsAppLink(
                `¡Hola Creative Yarn! Quiero una pieza personalizada de la categoría "${cat.title}".`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="category-card"
              data-reveal
            >
              <span className="category-card__thread" aria-hidden="true" />
              {cat.image ? (
                <img
                  className="category-card__image"
                  src={cat.image}
                  alt={`${cat.title} personalizado de Creative Yarn, hecho a mano con yarn sobre plastic canvas`}
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <span className="category-card__image category-card__image--empty" aria-hidden="true">
                  〰
                </span>
              )}
              <h3>{cat.title}</h3>
              <p>{cat.text}</p>
              <span className="category-card__cta">Pedir esta idea →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
