import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsapSetup";

/**
 * Reveals every [data-reveal] descendant of the returned ref as it enters
 * the viewport: fade + soft rise, staggered, triggered once.
 */
export function useScrollReveal(deps = []) {
  const scopeRef = useRef(null);

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return undefined;

    if (prefersReducedMotion()) {
      gsap.set(scope.querySelectorAll("[data-reveal]"), { opacity: 1, y: 0 });
      return undefined;
    }

    const ctx = gsap.context(() => {
      const groups = scope.querySelectorAll("[data-reveal-group]");
      const targets = groups.length
        ? groups
        : [scope.querySelectorAll("[data-reveal]")];

      const items = groups.length
        ? Array.from(groups).map((g) => g.querySelectorAll("[data-reveal]"))
        : targets;

      items.forEach((els) => {
        if (!els.length) return;
        gsap.fromTo(
          els,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: els[0].closest("[data-reveal-group]") || scope,
              start: "top 82%",
              once: true,
            },
          }
        );
      });
    }, scope);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scopeRef;
}

export { ScrollTrigger, gsap };
