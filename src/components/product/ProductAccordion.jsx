import { Link } from "react-router-dom";
import { ORDER_PROCESS_STEPS } from "../../data/content";
import "./ProductAccordion.css";

// Native <details>/<summary> — full keyboard + screen-reader support for
// free, no custom JS state needed. Only sections with real, confirmed
// content are rendered; nothing here is a placeholder.
export default function ProductAccordion({ product }) {
  const personalizationSummary = buildPersonalizationSummary(product);

  return (
    <div className="product-accordion">
      <details className="product-accordion__item" open>
        <summary>
          Detalles del producto
          <span className="product-accordion__icon" aria-hidden="true">
            ⌄
          </span>
        </summary>
        <div className="product-accordion__body">
          <p>{product.shortDescription}</p>
          <p>{product.description}</p>
        </div>
      </details>

      {personalizationSummary.length > 0 && (
        <details className="product-accordion__item">
          <summary>
            Personalización
            <span className="product-accordion__icon" aria-hidden="true">
              ⌄
            </span>
          </summary>
          <div className="product-accordion__body">
            <p>Puedes personalizar:</p>
            <ul>
              {personalizationSummary.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </details>
      )}

      <details className="product-accordion__item">
        <summary>
          Materiales y elaboración
          <span className="product-accordion__icon" aria-hidden="true">
            ⌄
          </span>
        </summary>
        <div className="product-accordion__body">
          <p>{product.materials}</p>
          <p>{product.productionTimeLabel}</p>
          <p>{product.variationsNote}</p>
        </div>
      </details>

      <details className="product-accordion__item">
        <summary>
          Cuidados
          <span className="product-accordion__icon" aria-hidden="true">
            ⌄
          </span>
        </summary>
        <div className="product-accordion__body">
          <p>
            {product.careNote} <Link to={product.careHref}>Ver política de cuidado →</Link>
          </p>
        </div>
      </details>

      <details className="product-accordion__item">
        <summary>
          Envío y entrega
          <span className="product-accordion__icon" aria-hidden="true">
            ⌄
          </span>
        </summary>
        <div className="product-accordion__body">
          <p>
            {product.shippingNote} <Link to={product.shippingHref}>Ver política de envíos →</Link>
          </p>
          <p>Cómo hacer tu pedido: {ORDER_PROCESS_STEPS.join(" → ")}.</p>
        </div>
      </details>
    </div>
  );
}

function buildPersonalizationSummary(product) {
  const items = [];
  if (product.styles.length) {
    items.push(`${product.styleNoun} (${product.styles.map((s) => s.label).join(", ")})`);
  }
  product.fields
    .filter((f) => !f.showWhen)
    .forEach((f) => items.push(f.label));
  return items;
}
