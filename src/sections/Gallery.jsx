import { useMemo, useState } from "react";
import { useScrollReveal } from "../animations/useScrollReveal";
import { GALLERY_FILTERS, GALLERY_ITEMS } from "../data/content";
import GalleryLightbox from "../components/GalleryLightbox";
import "./Gallery.css";

export default function Gallery() {
  const [active, setActive] = useState("Todos");
  const [selected, setSelected] = useState(null);
  const scopeRef = useScrollReveal([active]);

  const items = useMemo(
    () => (active === "Todos" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((i) => i.category === active)),
    [active]
  );

  const hasPendingPlaceholders = items.some((item) => !item.image);

  return (
    <section id="creaciones" className="gallery" ref={scopeRef}>
      <div className="container" data-reveal-group>
        <div className="section-head center">
          <p className="eyebrow" data-reveal>
            Nuestras creaciones
          </p>
          <h2 className="section-title center" data-reveal>
            Hecho con hilo. Hecho para ti.
          </h2>
        </div>

        <div className="gallery__filters" data-reveal role="tablist" aria-label="Filtrar creaciones">
          {GALLERY_FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={active === f}
              className={`gallery__filter ${active === f ? "is-active" : ""}`}
              onClick={() => setActive(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="gallery__masonry">
          {items.map((item) =>
            item.image ? (
              <figure className="gallery__item" key={item.id} data-reveal>
                <button
                  type="button"
                  className="gallery__item-trigger"
                  onClick={() => setSelected(item)}
                  aria-label={`Ver ${item.title} en tamaño completo`}
                >
                  <img
                    className="gallery__media"
                    src={item.image}
                    alt={`${item.title} — pieza personalizada de Creative Yarn`}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="gallery__overlay" aria-hidden="true">
                    <span className="gallery__category">{item.category}</span>
                    <span className="gallery__title">{item.title}</span>
                    <span className="gallery__link">Ver creación</span>
                  </span>
                </button>
              </figure>
            ) : (
              <figure className="gallery__item" key={item.id} data-reveal>
                <div
                  className="gallery__media gallery__media--empty"
                  role="img"
                  aria-label={`${item.title} — fotografía próximamente`}
                >
                  <span className="gallery__thread-icon" aria-hidden="true">
                    〰
                  </span>
                </div>
              </figure>
            )
          )}
        </div>

        {hasPendingPlaceholders && (
          <p className="gallery__note">
            Fotografías reales de Creative Yarn próximamente — estos espacios son marcadores de posición.
          </p>
        )}
      </div>

      <GalleryLightbox item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
