import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../animations/gsapSetup";

const VARIANTS = {
  wave: "M0,40 C 200,90 340,-10 540,40 S 880,90 1080,40 S 1320,-10 1440,40",
  dip: "M0,20 C 240,20 260,110 480,110 S 720,20 960,20 S 1200,110 1440,110",
  rise: "M0,90 C 220,90 260,10 480,10 S 720,90 960,90 S 1200,10 1440,10",
};

/**
 * The recurring "hilo" motif: a single soft pink thread that stitches one
 * section to the next. Draws itself in as it scrolls into view.
 */
export default function ThreadDivider({ variant = "wave", flip = false, className = "" }) {
  const pathRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return undefined;
    const length = path.getTotalLength();

    if (prefersReducedMotion()) {
      path.style.strokeDasharray = "none";
      return undefined;
    }

    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const tween = gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: svgRef.current,
        start: "top 90%",
        end: "bottom 60%",
        scrub: 0.6,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className={`thread-divider ${className}`}
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      style={{ transform: flip ? "scaleY(-1)" : "none" }}
      aria-hidden="true"
      focusable="false"
    >
      <path
        ref={pathRef}
        d={VARIANTS[variant] || VARIANTS.wave}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
