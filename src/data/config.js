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

// PLACEHOLDER social links — replace with real profile URLs.
export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/creativeyarn",
  tiktok: "https://tiktok.com/@creativeyarn",
  facebook: "https://facebook.com/creativeyarn",
  whatsapp: null, // resolved via getWhatsAppLink()
};

// PLACEHOLDER contact info — replace with real details.
export const CONTACT = {
  email: "hola@creativeyarn.example",
};

// Form endpoint placeholder. Swap for a real Formspree / Netlify Forms / backend
// endpoint when ready. See src/sections/CreateYourIdea.jsx for the submit handler.
export const ORDER_FORM_ENDPOINT = null;

export const BRAND = {
  name: "Creative Yarn",
  tagline: "Create it. Yarn it. Love it.",
};
