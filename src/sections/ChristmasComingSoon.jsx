import { useScrollReveal } from "../animations/useScrollReveal";
import { CHRISTMAS_TEASER } from "../data/content";
import { getWhatsAppLink } from "../data/config";
import { trackEvent } from "../utils/analytics";
import "./ChristmasComingSoon.css";

export default function ChristmasComingSoon() {
  const scopeRef = useScrollReveal();

  return (
    <section id="navidad" className="christmas-teaser" ref={scopeRef}>
      <div className="container christmas-teaser__inner" data-reveal-group>
        <span className="christmas-teaser__badge" data-reveal>
          Próximamente
        </span>
        <p className="eyebrow" data-reveal>
          {CHRISTMAS_TEASER.eyebrow}
        </p>
        <h2 className="section-title center" data-reveal>
          {CHRISTMAS_TEASER.title}
        </h2>

        <div className="christmas-teaser__video-frame" data-reveal>
          <video
            className="christmas-teaser__video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={`${CHRISTMAS_TEASER.title} — video de la colección navideña de Creative Yarn`}
          >
            <source src="/assets/christmas-teaser.mp4" type="video/mp4" />
          </video>
        </div>

        <p className="section-subtitle center" data-reveal>
          {CHRISTMAS_TEASER.text}
        </p>

        <a
          className="btn btn-outline"
          href={getWhatsAppLink(
            "¡Hola Creative Yarn! Quiero que me avisen cuando lancen la colección de Navidad."
          )}
          target="_blank"
          rel="noopener noreferrer"
          data-reveal
          onClick={() => {
            trackEvent("whatsapp_click", { source: "christmas" });
            trackEvent("christmas_cta_click");
          }}
        >
          {CHRISTMAS_TEASER.cta}
        </a>
      </div>
    </section>
  );
}
