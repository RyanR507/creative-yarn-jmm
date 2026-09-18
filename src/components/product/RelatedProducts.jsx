import { Link } from "react-router-dom";
import "./RelatedProducts.css";

export default function RelatedProducts({ products }) {
  if (!products.length) return null;

  return (
    <section className="related-products">
      <p className="eyebrow">También te puede gustar</p>
      <div className="related-products__grid">
        {products.map((p) => (
          <Link key={p.slug} to={`/productos/${p.slug}`} className="related-products__card">
            {p.image ? (
              <img src={p.image} alt={p.title} loading="lazy" decoding="async" />
            ) : (
              <span className="related-products__card-empty" aria-hidden="true">
                〰
              </span>
            )}
            <h3>{p.title}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
