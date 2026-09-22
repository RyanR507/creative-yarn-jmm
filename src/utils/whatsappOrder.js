// ---------------------------------------------------------------------------
// Shared WhatsApp order-message logic for the product pages ("Crear mi idea"
// builds this message and opens WhatsApp). Rules: only ever include fields
// the customer actually filled in, never send blanks, and always keep a
// direct WhatsApp link available in case the new tab did not open.
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
