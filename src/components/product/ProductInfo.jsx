import "./ProductInfo.css";

export default function ProductInfo({ product }) {
  return (
    <div className="product-info">
      <p className="eyebrow">{product.category}</p>
      <h1 className="product-info__title">{product.title}</h1>
      <p className="product-info__price">{product.price.priceLabel}</p>
      <p className="product-info__short">{product.shortDescription}</p>
      <p className="product-info__description">{product.description}</p>
    </div>
  );
}
