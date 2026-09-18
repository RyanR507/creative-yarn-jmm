// ---------------------------------------------------------------------------
// Shared WhatsApp order-message logic for the product pages. Adapted from
// the message builder that used to live in the general "Crea tu idea" form
// (now replaced by one page per product) — same rules: only ever include
// fields the customer actually filled in, never send blanks, and hand back a
// direct WhatsApp link if the popup gets blocked instead of failing silently.
// ---------------------------------------------------------------------------

import { getWhatsAppLink } from "../data/config";

// `entries` is an ordered list of { label, value } — already filtered down
// to the fields that are relevant to the selected style and actually filled
// in by the customer.
export function buildProductOrderMessage({
  productName,
  styleLabel,
  quantity,
  entries,
  notes,
  contact,
  hasImage,
}) {
  const lines = ["✨ NUEVA IDEA — CREATIVE YARN JM", "", "🧶 Producto:", productName, ""];

  if (styleLabel) lines.push("🎨 Estilo elegido:", styleLabel, "");

  lines.push("🔢 Cantidad:", quantity || "1", "");

  const personalization = entries.filter(({ value }) => value).map(({ label, value }) => `• ${label}: ${value}`);
  if (personalization.length) {
    lines.push("🧵 Personalización", ...personalization, "");
  }

  if (notes) {
    lines.push("📝 Detalles adicionales:", notes, "");
  }

  lines.push(
    "👤 Datos de contacto",
    `• Nombre: ${contact.nombre}`,
    `• WhatsApp: ${contact.whatsapp}`
  );
  if (contact.email) lines.push(`• Email: ${contact.email}`);
  lines.push("");

  if (hasImage) {
    lines.push("📎 Referencia:", "📎 Tengo una imagen de referencia para enviar por este chat.");
  }

  lines.push(
    "",
    "Quisiera confirmar disponibilidad, precio y tiempo de elaboración. Entiendo que esto es una solicitud, no un pedido confirmado."
  );

  return lines.join("\n").trim();
}

// Opens the WhatsApp link and reports whether it actually worked — a blocked
// popup returns a falsy window, in which case the caller should fall back to
// showing the same link directly instead of assuming the message went out.
export function openWhatsAppOrder(message) {
  const url = getWhatsAppLink(message);
  const opened = window.open(url, "_blank", "noopener,noreferrer");
  return { opened: Boolean(opened), url };
}
