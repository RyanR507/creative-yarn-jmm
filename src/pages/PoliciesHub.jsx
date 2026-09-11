import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useScrollReveal } from "../animations/useScrollReveal";
import { POLICIES } from "../data/content";
import "./Policies.css";

export default function PoliciesHub() {
  useDocumentTitle("Creative Yarn | Políticas");
  const scopeRef = useScrollReveal();

  return (
    <main id="main-content" className="policies-page">
      <section className="policies-hub" ref={scopeRef}>
        <div className="container" data-reveal-group>
          <div className="section-head center">
            <p className="eyebrow" data-reveal>
              Políticas
            </p>
            <h1 className="section-title center" data-reveal>
              Políticas de Creative Yarn
            </h1>
            <p className="section-subtitle center" data-reveal>
              Todo lo que necesitás saber antes de crear tu pieza con nosotros.
            </p>
          </div>

          <div className="policies-hub__grid">
            {POLICIES.map((policy) => (
              <Link key={policy.slug} to={`/politicas/${policy.slug}`} className="policy-card" data-reveal>
                <h2>{policy.navLabel}</h2>
                <p>{policy.hubSummary}</p>
                <span className="policy-card__cta">Leer más →</span>
              </Link>
            ))}
          </div>

          <p className="policies-disclaimer">
            La información de este sitio es general. Las condiciones específicas de tu
            pedido se confirman directamente con vos antes de finalizarlo.
          </p>
        </div>
      </section>
    </main>
  );
}
