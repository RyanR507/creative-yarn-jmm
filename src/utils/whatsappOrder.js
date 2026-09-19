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
// `quantity` always counts units of the selected VARIANT; `subtotal` is
// price × quantity. `setInfo` (from getSetInfo) is set only for set variants,
// where quantity counts sets and the piece total is informational.
export function buildProductOrderMessage({
  productName,
  variantLabel,
  styleLabel,
  styleNoun = "Estilo",
  priceDisplay,
  subtotal,
  setInfo,
  priceNote,
  quantity,
  entries,
  notes,
  contact,
  hasImage,
}) {
  const lines = ["✨ NUEVA IDEA — CREATIVE YARN JM", "", "🧶 Producto:", productName, ""];

  if (variantLabel) lines.push("🏷️ Variante:", variantLabel, "");
  if (styleLabel) lines.push(`🎨 ${styleNoun} elegido:`, styleLabel, "");

  const qty = Math.max(1, Number(quantity) || 1);
  const showSubtotal = qty > 1 && Boolean(subtotal);

  if (setInfo) {
    // A set variant always spells out what the set contains, even at qty 1;
    // only the subtotal waits for qty > 1.
    lines.push(
      "📦 Detalle del set",
      `• Cantidad de sets: ${qty}`,
      `• Total de piezas: ${setInfo.totalPieces}`,
      `• Precio por set: ${priceDisplay}`,
      ...(showSubtotal ? [`• Subtotal estimado: ${subtotal}`] : []),
      ""
    );
  } else if (showSubtotal) {
    // Spell out the math only when it says more than the single price does.
    lines.push(
      "🧮 Estimado",
      `• Precio unitario: ${priceDisplay}`,
      `• Cantidad: ${qty}`,
      `• Subtotal estimado: ${subtotal}`,
      ""
    );
  } else {
    if (priceDisplay) lines.push("💲 Precio mostrado:", priceDisplay, "");
    lines.push("🔢 Cantidad:", String(qty), "");
  }

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

  lines.push("");
  if (priceDisplay && priceNote) {
    lines.push(`⚠️ Precio estimado, sujeto a confirmación. ${priceNote}`, "");
  }
  lines.push(
    "Quisiera confirmar disponibilidad, precio y tiempo de elaboración. Entiendo que esto es una solicitud, no un pedido confirmado."
  );

  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

// Opens the WhatsApp link and reports whether it actually worked — a blocked
// popup returns a falsy window, in which case the caller should fall back to
// showing the same link directly instead of assuming the message went out.
export function openWhatsAppOrder(message) {
  const url = getWhatsAppLink(message);
  const opened = window.open(url, "_blank", "noopener,noreferrer");
  return { opened: Boolean(opened), url };
}
