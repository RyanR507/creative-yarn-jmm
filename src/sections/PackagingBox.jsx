import { useScrollReveal } from "../animations/useScrollReveal";
import { PACKAGING_IMAGES, PACKAGING_HIGHLIGHTS } from "../data/content";
import ReferenceBadge from "../components/ReferenceBadge";
import "./PackagingBox.css";

export default function PackagingBox() {
  const scopeRef = useScrollReveal();

  return (
    <section id="empaque" className="packaging" ref={scopeRef}>
      <div className="container" data-reveal-group>
        <div className="section-head center">
          <p className="eyebrow" data-reveal>
            The Creative Yarn Box
          </p>
          <h2 className="section-title center" data-reveal>
            Una presentación pensada para regalar.
          </h2>
          <p className="section-subtitle center" data-reveal>
            The Creative Yarn Box es nuestro concepto de presentación — no es un producto
            en sí, sino el cuidado con el que preparamos tu pedido. Los componentes exactos
            se adaptan al tipo de pieza y pueden variar.
          </p>
        </div>

        <div className="packaging__gallery" data-reveal>
          {PACKAGING_IMAGES.map((item) => (
            <div className="packaging__photo" key={item.id}>
              <img src={item.image} alt={`${item.alt} — imagen de referencia`} loading="lazy" decoding="async" />
              <ReferenceBadge />
            </div>
          ))}
        </div>

        <ul className="packaging__highlights">
          {PACKAGING_HIGHLIGHTS.map((item) => (
            <li key={item.title} data-reveal>
              <span className="packaging__dot" aria-hidden="true" />
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
