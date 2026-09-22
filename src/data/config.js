// ---------------------------------------------------------------------------
// Site-wide configuration. Edit these values — nothing else in the codebase
// should hardcode a phone number, handle, or link.
// ---------------------------------------------------------------------------

// WhatsApp number, digits only (no +, spaces or dashes).
// +507 6328-2859 (Panamá).
export const WHATSAPP_NUMBER = "50763282859";

export const WHATSAPP_DEFAULT_MESSAGE =
  "¡Hola Creative Yarn! Me gustaría crear una pieza personalizada. Tengo una idea que quisiera compartir con ustedes.";

export const getWhatsAppLink = (message = WHATSAPP_DEFAULT_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

// Social profiles. Paste each REAL profile URL here to show it in the footer.
// A network left as null is not rendered at all — never put a guessed URL.
// (WhatsApp is not listed here: it always uses getWhatsAppLink().)
export const SOCIAL_LINKS = {
  instagram: null,
  tiktok: null,
  facebook: null,
};

export const SOCIAL_LABELS = {
  instagram: "Instagram",
  tiktok: "TikTok",
  facebook: "Facebook",
};

// PLACEHOLDER contact info — replace with real details.
export const CONTACT = {
  email: "hola@creativeyarn.example",
};

export const BRAND = {
  // Full brand identity — shown in the Navbar, Hero, and Footer. The short
  // form "Creative Yarn" (used everywhere else: WhatsApp messages, SEO
  // metadata, policy pages) is intentionally a separate, hardcoded string in
  // each of those spots, not derived from this constant — see BRAND_STORY in
  // content.js for the "JM" homage woven into the brand story.
  name: "Creative Yarn JM",
  tagline: "Create it. Yarn it. Love it.",
};
// Cloudflare auto-deploy test
