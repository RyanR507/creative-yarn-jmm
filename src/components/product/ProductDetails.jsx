import { Link } from "react-router-dom";
import { ORDER_PROCESS_STEPS } from "../../data/content";
import "./ProductDetails.css";

export default function ProductDetails({ product }) {
  return (
    <div className="product-details">
      <div className="product-details__grid">
        <article>
          <h3>Materiales y elaboración</h3>
          <p>{product.materials}</p>
          <p>{product.productionTimeLabel}</p>
        </article>

        <article>
          <h3>Cuidados</h3>
          <p>
            {product.careNote}{" "}
            <Link to={product.careHref}>Ver política de cuidado →</Link>
          </p>
        </article>

        <article>
          <h3>Cómo hacer tu pedido</h3>
          <ol>
            {ORDER_PROCESS_STEPS.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </article>

        <article>
          <h3>Nota artesanal</h3>
          <p>{product.variationsNote}</p>
        </article>
      </div>
    </div>
  );
}
