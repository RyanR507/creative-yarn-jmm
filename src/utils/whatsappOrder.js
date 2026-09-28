// ---------------------------------------------------------------------------
// Shared WhatsApp quote-request logic for the product pages. "Solicitar
// cotización por WhatsApp" builds this message and opens WhatsApp. Rules:
// only ever include fields the customer actually filled in, never send
// blanks, never include a price (Creative Yarn JM quotes personally), and
// always keep a direct WhatsApp link available in case the new tab did not
// open.
// ---------------------------------------------------------------------------

import { getWhatsAppLink } from "../data/config";

// `entries` is an ordered list of { label, value } — already filtered down
// to the fields that are relevant to the current variant/style and actually
// filled in by the customer. `styleNoun` picks the right label/emoji for the
// secondary axis: a size-shaped one ("Tamaño") gets 📏, anything else
// (Diseño, Tema, Temática...) gets 🎨.
export function buildProductOrderMessage({
  productName,
  variantLabel,
  styleLabel,
  styleNoun = "Estilo",
  setInfo,
  setContents,
  quantity,
  entries,
  notes,
  contact,
  hasImage,
  hasDisplay,
}) {
  const lines = ["SOLICITUD DE COTIZACIÓN — CREATIVE YARN JM 🧶", "", "🛍️ Producto:", productName, ""];

  if (variantLabel) lines.push("🏷️ Variante:", variantLabel, "");
  if (styleLabel) {
    const isSize = styleNoun.toLowerCase() === "tamaño";
    lines.push(`${isSize ? "📏" : "🎨"} ${styleNoun}:`, styleLabel, "");
  }

  const personalization = entries.filter(({ value }) => value).map(({ label, value }) => `• ${label}: ${value}`);
  if (personalization.length) {
    lines.push("🧵 Personalización:", ...personalization, "");
  }

  if (setContents?.length) {
    lines.push("📦 Contenido incluido:", ...setContents.map((item) => `• ${item}`), "");
  }

  const qty = Math.max(1, Number(quantity) || 1);
  if (setInfo) {
    lines.push("📦 Cantidad:", `${qty} set${qty > 1 ? "s" : ""} (${setInfo.totalPieces} piezas en total)`, "");
  } else {
    lines.push("📦 Cantidad:", String(qty), "");
  }

  if (hasDisplay) {
    lines.push("🎁 Presentación especial:", "Display (sujeta a disponibilidad y cotización)", "");
  }

  if (notes) {
    lines.push("📝 Detalles adicionales:", notes, "");
  }

  if (hasImage) {
    lines.push("📎 Referencia:", "Tengo una imagen de referencia para enviar por este chat.", "");
  }

  lines.push(
    "👤 Datos de contacto:",
    `Nombre: ${contact.nombre}`,
    `WhatsApp: ${contact.whatsapp}`
  );
  if (contact.email) lines.push(`Email: ${contact.email}`);
  lines.push("", "Quisiera recibir mi cotización. ✨");

  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

// Opens WhatsApp in a new tab and hands back the link.
//
// The "noopener" window feature is deliberately NOT used here: by spec it
// makes window.open() return null even when the tab opened fine, so the
// return value could no longer tell "opened" from "blocked". Without it, a
// window object means the tab opened; we then cut the opener link ourselves.
//
// A null return is still NOT proof of a block (some in-app browsers and
// webviews return null after opening), so callers must never present it as
// an error — it only decides how much emphasis the "open WhatsApp" fallback
// button gets. Always show that button.
export function openWhatsAppOrder(message) {
  const url = getWhatsAppLink(message);
  let opened = null;
  try {
    opened = window.open(url, "_blank");
    if (opened) opened.opener = null;
  } catch {
    opened = null;
  }
  return { opened: Boolean(opened), url };
}
