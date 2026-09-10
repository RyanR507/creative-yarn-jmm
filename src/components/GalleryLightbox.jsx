import { useEffect, useRef } from "react";
import { getWhatsAppLink } from "../data/config";
import "./GalleryLightbox.css";

export default function GalleryLightbox({ item, onClose }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!item) return undefined;

    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab") {
        const focusable = panelRef.current.querySelectorAll("button, a[href]");
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div className="lightbox" onClick={onClose}>
      <div
        className="lightbox__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lightbox-title"
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="lightbox__close" onClick={onClose} aria-label="Cerrar" ref={closeRef}>
          ×
        </button>

        <img
          className="lightbox__image"
          src={item.image}
          alt={`${item.title} — pieza personalizada de Creative Yarn`}
        />

        <div className="lightbox__info">
          <span className="lightbox__category">{item.category}</span>
          <h3 id="lightbox-title" className="lightbox__title">
            {item.title}
          </h3>
          <a
            className="btn btn-primary"
            href={getWhatsAppLink(
              `¡Hola Creative Yarn! Me encantó "${item.title}" y quiero crear algo así.`
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            Quiero crear algo así
          </a>
        </div>
      </div>
    </div>
  );
}
