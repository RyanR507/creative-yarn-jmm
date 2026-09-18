import { useEffect, useState } from "react";
import "./ProductGallery.css";

// Reuses the same full-screen lightbox visual language as the Home gallery
// (see GalleryLightbox.css's .lightbox* classes) instead of introducing a
// second modal design — the CSS is generic enough to share directly.
export default function ProductGallery({ images, productName }) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const hasImages = images.length > 0;
  const hasMultiple = images.length > 1;

  useEffect(() => {
    if (!zoomed) return undefined;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setZoomed(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [zoomed]);

  return (
    <div className="product-gallery">
      <div className="product-gallery__main">
        {hasImages ? (
          <button
            type="button"
            className="product-gallery__main-trigger"
            onClick={() => setZoomed(true)}
            aria-label={`Ver ${productName} en tamaño completo`}
          >
            <img
              src={images[active]}
              alt={`${productName} — pieza personalizada de Creative Yarn, hecha a mano con yarn sobre plastic canvas`}
              loading="eager"
              decoding="async"
            />
          </button>
        ) : (
          <div className="product-gallery__main product-gallery__main--empty" role="img" aria-label={`${productName} — fotografía próximamente`}>
            <span aria-hidden="true">〰</span>
          </div>
        )}
      </div>

      {hasMultiple && (
        <div className="product-gallery__thumbs" role="group" aria-label="Miniaturas del producto">
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              className={`product-gallery__thumb ${i === active ? "is-active" : ""}`}
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              aria-label={`Ver imagen ${i + 1} de ${productName}`}
            >
              <img src={img} alt="" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      )}

      {zoomed && hasImages && (
        <div className="lightbox" onClick={() => setZoomed(false)}>
          <div
            className="lightbox__panel product-gallery__zoom-panel"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" className="lightbox__close" onClick={() => setZoomed(false)} aria-label="Cerrar">
              ×
            </button>
            <img className="lightbox__image" src={images[active]} alt={`${productName} — vista ampliada`} />
          </div>
        </div>
      )}
    </div>
  );
}
