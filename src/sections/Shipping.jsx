import { useScrollReveal } from "../animations/useScrollReveal";
import "./Shipping.css";

const OPTIONS = [
  {
    title: "Retiro / pickup",
    text: "Disponible cuando corresponda según tu ubicación.",
  },
  {
    title: "Envío estándar",
    text: "Costo calculado según destino.",
  },
  {
    title: "Envío express",
    text: "Disponible cuando corresponda y sujeto a costo adicional.",
  },
  {
    title: "Envío internacional",
    text: "Disponible según destino. El costo y posibles cargos aduaneros/de importación pueden variar.",
  },
];

export default function Shipping() {
  const scopeRef = useScrollReveal();

  return (
    <section id="envios" className="shipping" ref={scopeRef}>
      <div className="container" data-reveal-group>
        <div className="section-head center">
          <p className="eyebrow" data-reveal>
            Envíos
          </p>
          <h2 className="section-title center" data-reveal>
            Tu pieza, cuidadosamente en camino.
          </h2>
        </div>

        <div className="shipping__grid">
          {OPTIONS.map((opt) => (
            <div className="shipping__card" key={opt.title} data-reveal>
              <h3>{opt.title}</h3>
              <p>{opt.text}</p>
            </div>
          ))}
        </div>

        <p className="shipping__note" data-reveal>
          <strong>Importante:</strong> el tiempo de producción no es lo mismo que el
          tiempo de envío. Los productos personalizados requieren tiempo de elaboración
          antes de ser despachados.
        </p>

        <div className="shipping__cta" data-reveal>
          <a href="#faq" className="btn btn-outline">
            Ver política de envíos
          </a>
        </div>
      </div>
    </section>
  );
}
