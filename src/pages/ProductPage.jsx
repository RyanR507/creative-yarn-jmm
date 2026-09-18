import { Link, Navigate, useParams } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useScrollReveal } from "../animations/useScrollReveal";
import { getProductBySlug, getRelatedProducts } from "../data/products";
import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";
import ProductCustomizer from "../components/product/ProductCustomizer";
import ProductDetails from "../components/product/ProductDetails";
import RelatedProducts from "../components/product/RelatedProducts";
import "./ProductPage.css";

export default function ProductPage() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const scopeRef = useScrollReveal([slug]);

  useDocumentTitle(product ? `${product.title} | Creative Yarn` : "Creative Yarn");

  if (!product) {
    return <Navigate to="/" replace />;
  }

  const related = getRelatedProducts(slug);

  return (
    <main id="main-content" className="product-page">
      <section className="product-page__hero" ref={scopeRef}>
        <div className="container" data-reveal-group>
          <Link to="/#personalizados" className="product-page__back" data-reveal>
            ← Volver al catálogo
          </Link>

          <div className="product-page__grid" data-reveal>
            <ProductGallery images={product.images} productName={product.title} />
            <ProductInfo product={product} />
          </div>
        </div>
      </section>

      <section className="product-page__customizer">
        <div className="container container--narrow">
          <div className="section-head center">
            <p className="eyebrow">Crea tu idea</p>
            <h2 className="section-title center">Personaliza tu pedido: {product.title}</h2>
            <p className="section-subtitle center">
              Cuéntanos qué tienes en mente. Ningún campo es obligatorio, salvo los marcados con *.
            </p>
          </div>
          <ProductCustomizer product={product} />
        </div>
      </section>

      <section className="product-page__details">
        <div className="container">
          <ProductDetails product={product} />
        </div>
      </section>

      <section className="product-page__related">
        <div className="container">
          <RelatedProducts products={related} />
        </div>
      </section>
    </main>
  );
}
