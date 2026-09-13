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

        <p className="brand-story__intro" data-reveal>
          {BRAND_STORY.intro}
        </p>

        <div className="brand-story__body">
          {BRAND_STORY.paragraphs.map((paragraph, i) => (
            <p key={`story-${i}`} data-reveal>
              {paragraph}
            </p>
          ))}
        </div>

        <h3 className="brand-story__subheading" data-reveal>
          {BRAND_STORY.visionHeading}
        </h3>
        <div className="brand-story__body">
          {BRAND_STORY.visionParagraphs.map((paragraph, i) => (
            <p key={`vision-${i}`} data-reveal>
              {paragraph}
            </p>
          ))}
        </div>

        <blockquote className="brand-story__quote" data-reveal>
          “{BRAND_STORY.featuredQuote}”
        </blockquote>

        <div className="brand-story__body brand-story__closing">
          {BRAND_STORY.closingParagraphs.map((paragraph, i) => (
            <p key={`closing-${i}`} data-reveal>
              {paragraph}
            </p>
          ))}
        </div>

        <span className="brand-story__signature" data-reveal>
          — {BRAND_STORY.signature}
        </span>
      </div>
    </section>
  );
}
