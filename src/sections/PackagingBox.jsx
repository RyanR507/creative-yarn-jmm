import { useScrollReveal } from "../animations/useScrollReveal";
import { PACKAGING_IMAGES, PACKAGING_HIGHLIGHTS } from "../data/content";
import "./PackagingBox.css";

export default function PackagingBox() {
  const scopeRef = useScrollReveal();

  return (
    <section id="empaque" className="packaging" ref={scopeRef}>
      <div className="container" data-reveal-group>
        <div className="section-head center">
          <p className="eyebrow" data-reveal>
            La caja Creative Yarn
          </p>
          <h2 className="section-title center" data-reveal>
            Abrirla también es parte del regalo.
          </h2>
          <p className="section-subtitle center" data-reveal>
            Cada pedido llega envuelto con el mismo cuidado con el que se hizo tu pieza.
          </p>
        </div>

        <div className="packaging__gallery" data-reveal>
          {PACKAGING_IMAGES.map((item) => (
            <div className="packaging__photo" key={item.id}>
              <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
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
