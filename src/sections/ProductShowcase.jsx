import { useRef, useState } from "react";
import { useScrollReveal } from "../animations/useScrollReveal";
import { PRODUCT_SHOWCASE } from "../data/content";
import { getWhatsAppLink } from "../data/config";
import { trackEvent } from "../utils/analytics";
import ProductViewer from "../components/ProductViewer";
import "./ProductShowcase.css";

export default function ProductShowcase({ onSelectProduct }) {
  const scopeRef = useScrollReveal();
  const [activeId, setActiveId] = useState(PRODUCT_SHOWCASE[0].id);
  const navRef = useRef(null);

  const product = PRODUCT_SHOWCASE.find((p) => p.id === activeId) ?? PRODUCT_SHOWCASE[0];

  function selectProduct(id, name) {
    setActiveId(id);
    trackEvent("product_view", { product: name });
  }

  function handleCreateYours() {
    onSelectProduct?.(product.id);
    trackEvent("product_cta_click", { product: product.name, source: "showcase" });
  }

  return (
    <section id="explora-la-coleccion" className="showcase" ref={scopeRef}>
      <div className="container" data-reveal-group>
        <div className="section-head center">
          <p className="eyebrow" data-reveal>
            Explora la colección Creative Yarn
          </p>
          <h2 className="section-title center" data-reveal>
            Mira. Gira. Imagina la tuya.
          </h2>
          <p className="section-subtitle center" data-reveal>
            Explora algunas de nuestras creaciones desde distintos ángulos y descubre
            cómo una idea se convierte en algo completamente único.
          </p>
        </div>

        <div className="showcase__nav" role="tablist" aria-label="Elige un producto" ref={navRef} data-reveal>
          {PRODUCT_SHOWCASE.map((p) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={p.id === activeId}
              className={`showcase__nav-item ${p.id === activeId ? "is-active" : ""}`}
              onClick={() => selectProduct(p.id, p.name)}
            >
              {p.name}
            </button>
          ))}
        </div>

        <div className="showcase__stage" data-reveal>
          <div className="showcase__viewer">
            <ProductViewer designs={product.designs} productName={product.name} />
          </div>

          <div className="showcase__info">
            <h3 className="showcase__name">{product.name}</h3>
            <p className="showcase__description">{product.description}</p>

            <p className="showcase__disclaimer">
              Estos son ejemplos. Tu creación puede ser completamente diferente.
            </p>

            <div className="showcase__actions">
              <a
                href="#formulario-pedido"
                className="btn btn-primary"
                onClick={handleCreateYours}
              >
                Quiero crear el mío
              </a>
              <a
                href={getWhatsAppLink(
                  `¡Hola Creative Yarn! Me gustaría crear una pieza personalizada de "${product.name}", inspirada en uno de los diseños que vi en la página.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                onClick={() =>
                  trackEvent("whatsapp_click", { source: "showcase", product: product.name })
                }
              >
                Hablar por WhatsApp
              </a>
            </div>
          </div>
        </div>

        <p className="showcase__tagline" data-reveal>
          Empieza con un ejemplo. Termina con algo que es tuyo.
        </p>
      </div>
    </section>
  );
}
