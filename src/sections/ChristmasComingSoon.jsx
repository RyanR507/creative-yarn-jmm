import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "../animations/useScrollReveal";
import { CHRISTMAS_TEASER } from "../data/content";
import { getWhatsAppLink } from "../data/config";
import { trackEvent } from "../utils/analytics";
import "./ChristmasComingSoon.css";

const VIDEO_SRC = "/assets/christmas-teaser.mp4";

export default function ChristmasComingSoon() {
  const scopeRef = useScrollReveal();
  const frameRef = useRef(null);
  // No IntersectionObserver support — fall back to loading normally (decided
  // once, up front) rather than never loading the video at all.
  const [shouldLoadVideo, setShouldLoadVideo] = useState(
    () => typeof IntersectionObserver === "undefined"
  );

  // Lazy-load the video itself (not just decorative motion): this section
  // sits far below the fold, and the <video>+autoPlay was previously
  // fetching the file immediately on page load regardless of scroll
  // position. The fixed aspect-ratio box below already reserves the exact
  // space either way, so gating on visibility costs nothing visually.
  useEffect(() => {
    if (shouldLoadVideo) return undefined;
    const frame = frameRef.current;
    if (!frame) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );

    observer.observe(frame);
    return () => observer.disconnect();
  }, [shouldLoadVideo]);

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

        <div className="christmas-teaser__video-frame" data-reveal ref={frameRef}>
          {shouldLoadVideo && (
            <video
              className="christmas-teaser__video"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={`${CHRISTMAS_TEASER.title} — video de la colección navideña de Creative Yarn`}
            >
              <source src={VIDEO_SRC} type="video/mp4" />
            </video>
          )}
        </div>

        <p className="section-subtitle center" data-reveal>
          {CHRISTMAS_TEASER.text}
        </p>

        <a
          className="btn btn-outline christmas-teaser__cta"
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
