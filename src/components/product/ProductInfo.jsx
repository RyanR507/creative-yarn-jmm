import { Link } from "react-router-dom";
import "./ProductInfo.css";

export default function ProductInfo({ product }) {
  return (
    <div className="product-info">
      <nav className="product-info__breadcrumb" aria-label="Ruta de navegación">
        <Link to="/">Inicio</Link>
        <span aria-hidden="true">/</span>
        <Link to="/#personalizados">Personalizados</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{product.title}</span>
      </nav>

      <h1 className="product-info__title">{product.title}</h1>
      <p className="product-info__quote-note">{product.quoteNote}</p>
      {product.presentationNote && (
        <p className="product-info__presentation-note">{product.presentationNote}</p>
      )}

      <p className="product-info__short">{product.shortDescription}</p>
    </div>
  );
}
