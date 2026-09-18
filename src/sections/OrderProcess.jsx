import { useScrollReveal } from "../animations/useScrollReveal";
import { ORDER_PROCESS_STEPS } from "../data/content";
import "./OrderProcess.css";

export default function OrderProcess() {
  const scopeRef = useScrollReveal();

  return (
    <section id="como-pedir" className="order-process" ref={scopeRef}>
      <div className="container" data-reveal-group>
        <div className="section-head center">
          <p className="eyebrow" data-reveal>
            Tu pedido
          </p>
          <h2 className="section-title center" data-reveal>
            ¿Listo para crear el tuyo?
          </h2>
        </div>

        <ol className="order-process__list" data-reveal>
          {ORDER_PROCESS_STEPS.map((step, i) => (
            <li key={step}>
              <span className="order-process__index">{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>

        <div className="order-process__cta" data-reveal>
          <a href="#personalizados" className="btn btn-primary">
            Comenzar mi pedido
          </a>
        </div>
      </div>
    </section>
  );
}
