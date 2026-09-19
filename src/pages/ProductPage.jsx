import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useScrollReveal } from "../animations/useScrollReveal";
import {
  getDefaultStyleId,
  getProductBySlug,
  getRelatedProducts,
  resolveVariant,
} from "../data/products";
import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";
import ProductCustomizer from "../components/product/ProductCustomizer";
import ProductAccordion from "../components/product/ProductAccordion";
import RelatedProducts from "../components/product/RelatedProducts";
import "./ProductPage.css";

export default function ProductPage() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);

  useDocumentTitle(product ? `${product.title} | Creative Yarn` : "Creative Yarn");

  if (!product) {
    return <Navigate to="/" replace />;
  }

  // Keyed by slug so the whole subtree remounts on every product change —
  // gallery position, selected style, personalization fields, quantity and
  // contact fields all reset to their defaults on their own, with no
  // leftover state from the previous product's page.
  return <ProductPageContent key={slug} product={product} />;
}

function ProductPageContent({ product }) {
  const scopeRef = useScrollReveal();
  // Mirrors the style selected inside <ProductCustomizer> — used to pick a
  // per-variant gallery once real variant photography exists (see
  // products.js's `styles[].image(s)` note). No visual effect today, since
  // no style carries its own images yet.
  const [activeStyleId, setActiveStyleId] = useState(() => getDefaultStyleId(product));
  // Same idea for the price variant — drives the price shown in <ProductInfo>.
  const [activeVariantId, setActiveVariantId] = useState(product.variants[0].id);
  const activeVariant = resolveVariant(product, activeStyleId, activeVariantId);

  // Runs once per mount (i.e. once per product, since this component is
  // remounted per slug above) — a plain "land at the top" reset, not state
  // synchronized with a changing prop, so a one-time effect is the right
  // tool here.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const related = getRelatedProducts(product.slug);
  const activeStyle = product.styles.find((s) => s.id === activeStyleId);
  const galleryImages = activeStyle?.images || (activeStyle?.image ? [activeStyle.image] : null) || product.images;

  return (
    <main id="main-content" className="product-page">
      <section className="product-page__hero" ref={scopeRef}>
        <div className="container" data-reveal-group>
          <div className="product-page__grid" data-reveal>
            <ProductGallery key={activeStyleId} images={galleryImages} productName={product.title} />

            <div className="product-page__buybox">
              <ProductInfo product={product} variant={activeVariant} />
              <ProductCustomizer
                product={product}
                onStyleChange={setActiveStyleId}
                onVariantChange={setActiveVariantId}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="product-page__accordion">
        <div className="container container--narrow">
          <ProductAccordion product={product} />
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
