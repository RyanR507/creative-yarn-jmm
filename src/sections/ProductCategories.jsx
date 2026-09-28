import { Link } from "react-router-dom";
import { useScrollReveal } from "../animations/useScrollReveal";
import { PRODUCTS } from "../data/products";
import { REFERENCE_IMAGE_NOTE } from "../data/content";
import { trackEvent } from "../utils/analytics";
import ReferenceBadge from "../components/ReferenceBadge";
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
          <p className="categories__note" data-reveal>
            {REFERENCE_IMAGE_NOTE}
          </p>
        </div>

        <div className="categories__grid">
          {PRODUCTS.map((product) => (
            <Link
              key={product.id}
              to={`/productos/${product.slug}`}
              className="category-card"
              data-reveal
              onClick={() =>
                trackEvent("product_cta_click", { product: product.title, source: "category_grid" })
              }
            >
              <span className="category-card__thread" aria-hidden="true" />
              {product.image ? (
                <>
                  <img
                    className="category-card__image"
                    src={product.image}
                    alt={`${product.title} personalizado de Creative Yarn, hecho a mano con yarn sobre plastic canvas — imagen de referencia`}
                    loading="lazy"
                    decoding="async"
                  />
                  <ReferenceBadge />
                </>
              ) : (
                <span className="category-card__image category-card__image--empty" aria-hidden="true">
                  〰
                </span>
              )}
              <h3>{product.title}</h3>
              <p>{product.shortDescription}</p>
              <span className="category-card__cta">Personalizar y cotizar →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
