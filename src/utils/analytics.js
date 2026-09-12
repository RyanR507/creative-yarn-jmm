// ---------------------------------------------------------------------------
// Lightweight, dependency-free event-tracking hook point.
//
// No analytics service (GA4, GTM, Meta Pixel, TikTok Pixel...) is configured
// yet, so this intentionally sends data nowhere on its own. It only forwards
// events to window.dataLayer — the array GTM/GA4 define themselves — and
// only if that array already exists. Until a real snippet with a real
// container/measurement ID is added to index.html, dataLayer never exists,
// so every call below is a silent no-op.
//
// To go live later: add the official GTM/GA4 snippet (with its real ID) to
// index.html — that snippet creates window.dataLayer itself — and these
// calls will start flowing through it immediately, with no changes needed
// here or at any call site.
export function trackEvent(name, params = {}) {
  if (typeof window === "undefined") return;
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: name, ...params });
  }
}
