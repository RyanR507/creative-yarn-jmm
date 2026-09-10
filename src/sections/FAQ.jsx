import { useState } from "react";
import { useScrollReveal } from "../animations/useScrollReveal";
import { FAQ_ITEMS } from "../data/content";
import "./FAQ.css";

export default function FAQ() {
  const scopeRef = useScrollReveal();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="faq" ref={scopeRef}>
      <div className="container" data-reveal-group>
        <div className="section-head center">
          <p className="eyebrow" data-reveal>
            Preguntas frecuentes
          </p>
          <h2 className="section-title center" data-reveal>
            Todo lo que quieres saber.
          </h2>
        </div>

        <div className="faq__list" data-reveal>
          {FAQ_ITEMS.map((item, i) => {
            const open = openIndex === i;
            return (
              <div className={`faq__item ${open ? "is-open" : ""}`} key={item.q}>
                <button
                  type="button"
                  className="faq__question"
                  aria-expanded={open}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpenIndex(open ? -1 : i)}
                >
                  {item.q}
                  <span className="faq__icon" aria-hidden="true">
                    {open ? "−" : "+"}
                  </span>
                </button>
                <div
                  id={`faq-panel-${i}`}
                  className="faq__answer"
                  style={{ maxHeight: open ? "260px" : "0px" }}
                  role="region"
                >
                  <p>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
