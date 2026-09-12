import { useScrollReveal } from "../animations/useScrollReveal";
import { BRAND_STORY } from "../data/content";
import "./BrandStory.css";

export default function BrandStory() {
  const scopeRef = useScrollReveal();

  return (
    <section id="nuestra-historia" className="brand-story" ref={scopeRef}>
      <div className="container brand-story__inner" data-reveal-group>
        <p className="eyebrow" data-reveal>
          {BRAND_STORY.eyebrow}
        </p>
        <h2 className="section-title center" data-reveal>
          {BRAND_STORY.title}
        </h2>

        <div className="brand-story__body">
          {BRAND_STORY.paragraphs.map((paragraph, i) => (
            <p key={i} data-reveal>
              {paragraph}
            </p>
          ))}
        </div>

        <span className="brand-story__signature" data-reveal>
          — {BRAND_STORY.signature}
        </span>
        {BRAND_STORY.signatureNote && (
          <span className="brand-story__signature-note" data-reveal>
            {BRAND_STORY.signatureNote}
          </span>
        )}
      </div>
    </section>
  );
}
