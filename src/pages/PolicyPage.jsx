import { Link, Navigate, useParams } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useScrollReveal } from "../animations/useScrollReveal";
import { POLICIES } from "../data/content";
import "./Policies.css";

export default function PolicyPage() {
  const { slug } = useParams();
  const policy = POLICIES.find((p) => p.slug === slug);
  const scopeRef = useScrollReveal([slug]);

  useDocumentTitle(policy ? policy.pageTitle : "Creative Yarn | Políticas");

  if (!policy) {
    return <Navigate to="/politicas" replace />;
  }

  return (
    <main id="main-content" className="policies-page">
      <section className="policy-detail" ref={scopeRef}>
        <div className="container container--narrow" data-reveal-group>
          <Link to="/politicas" className="policy-detail__back" data-reveal>
            ← Todas las políticas
          </Link>

          <div className="section-head" data-reveal>
            <p className="eyebrow">Políticas</p>
            <h1 className="section-title">{policy.navLabel}</h1>
            {policy.intro && <p className="section-subtitle">{policy.intro}</p>}
          </div>

          {policy.sections.map((section) => (
            <article className="policy-detail__section" key={section.heading} data-reveal>
              <h2>{section.heading}</h2>
              {section.body?.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
              {section.list && (
                <ul className="policy-detail__list">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}

          <p className="policies-disclaimer" data-reveal>
            La información de esta página es general. Las condiciones específicas de tu
            pedido se confirman directamente con vos antes de finalizarlo.
          </p>
        </div>
      </section>
    </main>
  );
}
