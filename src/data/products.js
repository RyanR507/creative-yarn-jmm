// ---------------------------------------------------------------------------
// Per-product data for the individual product pages (/productos/:slug).
// CATEGORIES (content.js) stays the single source of truth for each
// product's id, photo and short blurb — everything here only adds the extra
// detail an individual product page needs (full description, customization
// fields, related products, etc.) without duplicating that base data.
//
// Nothing here invents information Creative Yarn hasn't confirmed yet:
// - No prices. `price.priceLabel` uses the same "confirmed personally" idea
//   already used across the site (see OrderProcess/POLICIES) — real numbers
//   plug into `price.basePrice` / `price.extras` later without touching the
//   UI.
// - No fixed color palette, size chart, or bag/wallet model catalog exists
//   yet, so those show up as free-text fields ("cuéntanos qué color...")
//   rather than a fixed list of options that would imply real availability.
// - `materials`, `careNote` and `variationsNote` reuse copy that already
//   exists elsewhere on the site (DIFFERENTIATORS, POLICIES "cuidado" /
//   "terminos") instead of inventing new per-product claims.
// ---------------------------------------------------------------------------

import { CATEGORIES, OCCASIONS } from "./content";

// URL slugs the client asked for explicitly. Where a slug matches the
// existing CATEGORIES id it's omitted below (falls back to the id itself).
const SLUG_OVERRIDES = {
  separadores: "separadores-de-libros",
  "portadas-cuadernos": "portadas-de-cuadernos",
  "adornos-mesa": "adornos-de-mesa",
  "set-banos": "sets-de-bano",
};

const SHARED = {
  category: "Hecho a mano · Plastic canvas y yarn",
  materials: "Yarn/hilo tejido a mano, puntada por puntada, sobre plastic canvas rígido.",
  productionTimeLabel:
    "El tiempo de elaboración se confirma según la complejidad de tu pedido, al aprobar el diseño.",
  careNote:
    "Evita humedad y calor excesivo, y guarda tu pieza en su bolsa protectora cuando corresponda — el detalle completo está en nuestra página de cuidado.",
  careHref: "/politicas/cuidado",
  shippingNote:
    "El costo y método de entrega se confirman según tu pedido y destino — no publicamos tarifas fijas.",
  shippingHref: "/politicas/envios",
  variationsNote:
    "Cada pieza es hecha a mano, por lo que pueden existir pequeñas variaciones naturales entre una creación y otra.",
  priceNote: "El precio puede variar según el tamaño, diseño y nivel de personalización.",
  // What the `styles` selector is called (legend + WhatsApp line).
  styleNoun: "Estilo",
};

// ---------------------------------------------------------------------------
// Official starting prices (USD). This table is the ONLY place prices live —
// edit a number here and the catalog card, the product page, the related
// cards and the WhatsApp message all follow.
//
// Each product lists its price variants in display order; the first one is
// preselected on the product page. `isStartingPrice: true` marks a variant
// whose amount is a floor ("desde $250.00") rather than a fixed price. The
// catalog's "Desde $XX.XX" is derived from the cheapest variant, so it can
// never drift from the variants below.
//
// For products whose variant ids match their `styles` ids (Llaveros), the
// style pills ARE the price variants — no second selector is shown (see
// `variantsLinkedToStyles` below). Everywhere else the variants get their own
// "Elige tu opción" selector.
//
// No surcharges exist for names, letters, colors, images, accessories,
// designs, characters or personalizations — none have been confirmed. When
// they are, add them to `price.extras` (shape reserved below) and extend
// getPriceInfo(); the components already read every price through it.
// ---------------------------------------------------------------------------
const PRICING = {
  portavasos: [
    { id: "individual", label: "Individual", price: 18 },
    { id: "personalizado", label: "Personalizado", price: 22 },
    // `pieces` marks a variant that is a SET: its price is for the whole set,
    // and the general quantity counts sets (never multiply price by pieces).
    { id: "set-x4", label: "Set x4", price: 60, pieces: 4 },
    { id: "set-x6", label: "Set x6", price: 85, pieces: 6 },
  ],
  llaveros: [
    { id: "letra", label: "Letra", price: 18 },
    { id: "nombre", label: "Nombre", price: 20 },
    { id: "otro", label: "Diseño personalizado", price: 24 },
  ],
  separadores: [
    { id: "sencillo", label: "Sencillo", price: 18 },
    { id: "personalizado", label: "Personalizado", price: 20 },
    { id: "diseno-especial", label: "Diseño especial", price: 24 },
  ],
  "portadas-cuadernos": [
    { id: "sencilla", label: "Sencilla", price: 60 },
    { id: "personalizada", label: "Personalizada", price: 75 },
    { id: "especial", label: "Diseño especial / personaje", price: 90 },
  ],
  "adornos-mesa": [
    { id: "pequeno", label: "Pequeño", price: 40 },
    { id: "mediano", label: "Mediano", price: 60 },
    { id: "grande", label: "Grande", price: 85 },
  ],
  "gift-boxes": [
    { id: "small", label: "Small", price: 45 },
    { id: "medium", label: "Medium", price: 70 },
    { id: "premium", label: "Premium", price: 100 },
  ],
  "set-banos": [
    { id: "basico", label: "Básico", price: 95 },
    { id: "mediano", label: "Mediano", price: 125 },
    { id: "premium", label: "Premium", price: 155 },
  ],
  bolsos: [
    { id: "mini", label: "Mini", price: 110 },
    { id: "mediano", label: "Mediano", price: 175 },
    { id: "grande", label: "Grande", price: 220 },
    { id: "premium", label: "Premium", price: 250, isStartingPrice: true },
  ],
  wallets: [
    { id: "sencillo", label: "Sencillo", price: 50 },
    { id: "personalizado", label: "Personalizado", price: 65 },
    { id: "premium", label: "Premium", price: 80 },
  ],
  "porta-tarjetas": [
    { id: "sencillo", label: "Sencillo", price: 30 },
    { id: "personalizado", label: "Personalizado", price: 38 },
    { id: "premium", label: "Premium", price: 45 },
  ],
  "porta-servilletas": [
    { id: "sencillo", label: "Sencillo", price: 45 },
    { id: "personalizado", label: "Personalizado", price: 60 },
    { id: "premium", label: "Premium", price: 75 },
  ],
  personajes: [
    { id: "pequeno", label: "Pequeño", price: 50 },
    { id: "mediano", label: "Mediano", price: 90 },
    { id: "grande", label: "Grande", price: 135 },
    { id: "complejo-3d", label: "Complejo / 3D", price: 175, isStartingPrice: true },
  ],
};

// Each entry's `fields` only covers what's genuinely specific to that
// product — quantity, the reference-image note, contact details and general
// notes are handled once by <ProductCustomizer> for every product.
//
// Each `styles` entry can later carry its own `image` (or `images: []`) once
// per-variant photography exists — ProductPage already reads
// `style.images || (style.image ? [style.image] : null)` and falls back to
// the product's own `images` when a style has none, so the gallery will
// start swapping per variant the moment real URLs are added here. No
// placeholder/fake images are set today.
const PRODUCT_DETAILS = {
  portavasos: {
    description:
      "Portavasos tejidos a mano sobre plastic canvas, pensados para proteger tu mesa y sumar un detalle personalizado a tu día a día. Cuéntanos la forma, el tema y los colores que imaginas, y lo conversamos contigo.",
    styles: [],
    fields: [
      { key: "forma", label: "Forma preferida (si tienes una en mente)", type: "text", placeholder: "Ej.: redondo, cuadrado, con figura..." },
      { key: "diseno", label: "Diseño o estilo que imaginas", type: "text" },
      { key: "tema", label: "Tema", type: "text", placeholder: "Ej.: flores, mascotas, minimalista..." },
      { key: "colorPrincipal", label: "Color principal", type: "text" },
      { key: "coloresSecundarios", label: "Colores secundarios", type: "text" },
      { key: "inicialesNombre", label: "Iniciales o nombre (si aplica)", type: "text" },
    ],
  },
  llaveros: {
    description:
      "Llaveros personalizados tejidos a mano: con letra, con nombre o con el diseño que tengas en mente, para llevar un detalle propio a todas partes.",
    styles: [
      { id: "letra", label: "Llavero de letra" },
      { id: "nombre", label: "Llavero con nombre" },
      { id: "otro", label: "Otro diseño" },
    ],
    fields: [
      { key: "letra", label: "¿Qué letra o iniciales quieres?", type: "text", showWhen: ["letra"], requiredWhen: ["letra"] },
      { key: "nombre_llavero", label: "¿Qué nombre quieres?", type: "text", showWhen: ["nombre"], requiredWhen: ["nombre"] },
      { key: "otro_diseno", label: "Describe el diseño que tienes en mente", type: "textarea", showWhen: ["otro"], requiredWhen: ["otro"] },
      { key: "colorPrincipal", label: "Color principal", type: "text" },
      { key: "colorSecundario", label: "Color secundario", type: "text" },
    ],
  },
  separadores: {
    description:
      "Separadores de libros hechos a mano, con tu nombre, iniciales o una frase corta tejida en el diseño que elijas.",
    styles: [],
    fields: [
      { key: "diseno", label: "Diseño", type: "text" },
      { key: "nombre", label: "Nombre", type: "text" },
      { key: "iniciales", label: "Iniciales", type: "text" },
      { key: "frase", label: "Frase corta", type: "text" },
      { key: "colores", label: "Colores", type: "text" },
      { key: "tema", label: "Tema", type: "text" },
    ],
  },
  "portadas-cuadernos": {
    description:
      "Portadas de cuaderno tejidas a mano y personalizadas con el tema que más te represente — desde flores o fútbol hasta tu propio nombre o un personaje favorito.",
    // Variant (price level) → Tema (look within that level). `forVariants`
    // on a style option or a field limits it to those price variants, so
    // contradictory combinations ("Sencilla" + "Personaje") can't be picked.
    styleNoun: "Tema",
    styles: [
      { id: "flores", label: "Flores", forVariants: ["sencilla", "personalizada"] },
      { id: "futbol", label: "Fútbol", forVariants: ["sencilla", "personalizada"] },
      { id: "escolar", label: "Diseño escolar", forVariants: ["sencilla", "personalizada"] },
      { id: "personaje", label: "Personaje", forVariants: ["especial"] },
      { id: "tema-especial", label: "Tema especial", forVariants: ["especial"] },
    ],
    fields: [
      { key: "tipoCuaderno", label: "Tipo de cuaderno", type: "text" },
      { key: "tamano", label: "Tamaño", type: "text" },
      // Personalizada
      { key: "nombre", label: "Nombre", type: "text", forVariants: ["personalizada"] },
      { key: "iniciales", label: "Iniciales", type: "text", forVariants: ["personalizada"] },
      { key: "texto", label: "Texto o frase", type: "text", forVariants: ["personalizada"] },
      // Diseño especial / personaje
      { key: "personaje_cuaderno", label: "¿Qué personaje quieres?", type: "text", forVariants: ["especial"], showWhen: ["personaje"], requiredWhen: ["personaje"] },
      { key: "descripcion_cuaderno", label: "Describe el diseño que quieres", type: "textarea", forVariants: ["especial"], required: true },
      { key: "nombre_texto_especial", label: "Nombre o texto (si aplica)", type: "text", forVariants: ["especial"] },
      { key: "colores", label: "Colores", type: "text" },
    ],
  },
  "adornos-mesa": {
    description:
      "Adornos de mesa hechos a mano para darle un toque especial a cualquier ocasión, con el nombre, texto o tema que quieras incluir.",
    styles: [],
    fields: [
      { key: "tipoEstilo", label: "Tipo o estilo", type: "text" },
      { key: "tema", label: "Tema", type: "text" },
      { key: "nombre", label: "Nombre", type: "text" },
      { key: "texto", label: "Texto", type: "text" },
      { key: "colores", label: "Colores", type: "text" },
      { key: "tamano", label: "Tamaño (si corresponde)", type: "text" },
      { key: "evento", label: "Evento o propósito (si es relevante)", type: "text" },
    ],
  },
  "gift-boxes": {
    description:
      "Gift boxes personalizados, armados a mano con las piezas y el mensaje que elijas — pensados para regalar en la ocasión que estés celebrando.",
    priceNote:
      "El precio final puede variar según el tamaño, el diseño y los productos y personalizaciones que incluyas en tu Gift Box.",
    styles: [],
    fields: [
      { key: "ocasion", label: "Tipo de ocasión", type: "select", options: OCCASIONS },
      { key: "destinatario", label: "Persona / destinatario", type: "text" },
      { key: "tema", label: "Tema", type: "text" },
      { key: "colores", label: "Colores", type: "text" },
      { key: "nombre", label: "Nombre", type: "text" },
      { key: "mensaje", label: "Mensaje", type: "textarea" },
      { key: "elementos", label: "¿Qué elementos quieres incluir en la caja?", type: "textarea" },
      { key: "tamanoOpcion", label: "Tamaño u opción disponible", type: "text" },
    ],
  },
  "set-banos": {
    description:
      "Sets de baño personalizados, con las piezas y colores que elijas para darle personalidad a tu baño.",
    styles: [],
    fields: [
      { key: "tipoSet", label: "Tipo de set", type: "text" },
      { key: "piezas", label: "Piezas incluidas u opciones disponibles", type: "textarea" },
      { key: "diseno", label: "Diseño", type: "text" },
      { key: "colores", label: "Colores", type: "text" },
      { key: "tema", label: "Tema", type: "text" },
      { key: "nombreIniciales", label: "Nombre o iniciales (si aplica)", type: "text" },
    ],
  },
  bolsos: {
    description:
      "Bolsos tejidos a mano con diseño y patrones propios. Cuéntanos el modelo, tamaño, colores y detalles que tienes en mente y lo revisamos contigo antes de confirmar tu pedido.",
    styles: [],
    fields: [
      { key: "modelo", label: "Modelo o estilo de bolso que te gustaría", type: "text" },
      { key: "tamano", label: "Tamaño", type: "text" },
      { key: "diseno", label: "Diseño", type: "textarea" },
      { key: "colorPrincipal", label: "Color principal", type: "text" },
      { key: "colorSecundario", label: "Color secundario", type: "text" },
      { key: "asaCorrea", label: "Tipo de asa, correa o cadena (si aplica)", type: "text" },
      { key: "cierre", label: "Cierre (si aplica)", type: "text" },
      { key: "herrajes", label: "Herrajes o acabados que prefieres (si conoces alguno)", type: "text" },
      { key: "nombreIniciales", label: "Nombre o iniciales (si el modelo lo permite)", type: "text" },
    ],
  },
  wallets: {
    description:
      "Wallets compactas hechas a mano para tarjetas y lo esencial del día a día, personalizadas a tu gusto.",
    styles: [],
    fields: [
      { key: "modelo", label: "Modelo", type: "text" },
      { key: "diseno", label: "Diseño", type: "text" },
      { key: "colores", label: "Colores", type: "text" },
      { key: "inicialesNombre", label: "Iniciales o nombre (si aplica)", type: "text" },
      { key: "cierre", label: "Tipo de cierre disponible", type: "text" },
    ],
  },
  "porta-tarjetas": {
    description:
      "Porta tarjetas hecho a mano, diseñado especialmente para ti.",
    styles: [],
    fields: [
      { key: "modelo", label: "Modelo", type: "text" },
      { key: "colores", label: "Colores", type: "text" },
      { key: "inicialesNombre", label: "Iniciales o nombre", type: "text" },
      { key: "diseno", label: "Diseño", type: "text" },
    ],
  },
  "porta-servilletas": {
    description:
      "Porta servilletas tejido a mano para sumar un detalle especial a tu mesa servida.",
    styles: [],
    fields: [
      { key: "diseno", label: "Diseño", type: "text" },
      { key: "tema", label: "Tema", type: "text" },
      { key: "colores", label: "Colores", type: "text" },
      { key: "inicialesTexto", label: "Iniciales o texto (si aplica)", type: "text" },
    ],
  },
  personajes: {
    description:
      "Convierte tu personaje o estilo favorito en una pieza tejida a mano, con un diseño propio inspirado en lo que más te gusta. Cuéntanos qué personaje quieres y en qué tipo de pieza — nosotros diseñamos la versión Creative Yarn.",
    styles: [],
    fields: [
      { key: "personaje", label: "¿Qué personaje quieres?", type: "text", required: true },
      { key: "tipoPieza", label: "¿En qué tipo de pieza lo quieres?", type: "text", placeholder: "Ej.: llavero, portavasos, adorno de mesa..." },
      { key: "colores", label: "Colores (si corresponde)", type: "text" },
      { key: "tamano", label: "Tamaño (si existen opciones)", type: "text" },
    ],
  },
};

export const PRODUCTS = CATEGORIES.map((cat) => {
  const details = PRODUCT_DETAILS[cat.id];
  const variants = PRICING[cat.id];

  return {
    id: cat.id,
    slug: SLUG_OVERRIDES[cat.id] || cat.id,
    title: cat.title,
    shortDescription: cat.text,
    image: cat.image,
    // Only one real photo exists per product today — ProductGallery renders it
    // without thumbnails in that case. Add more real URLs here (in order) as
    // photography becomes available; no placeholder/fake images are included.
    images: cat.image ? [cat.image] : [],
    ...SHARED,
    ...details,
    variants,
    // True when every price variant shares an id with a style (Llaveros): the
    // style pills then drive the price and no separate selector is rendered.
    variantsLinkedToStyles:
      details.styles.length > 0 && variants.every((v) => details.styles.some((s) => s.id === v.id)),
    // Catalog-level price: "Desde" the cheapest variant. `extras` is reserved
    // for future surcharges (see PRICING note); empty today.
    price: {
      basePrice: Math.min(...variants.map((v) => v.price)),
      compareAtPrice: null,
      isStartingPrice: true,
      extras: [],
      priceLabel: "Precio según personalización",
    },
  };
});

// A style/theme option (or field) with `forVariants` only exists for those
// price variants; without it, it applies to every variant. Products whose
// variants ARE their styles (Llaveros) simply don't use `forVariants`.
export function getAvailableStyles(product, variant) {
  return product.styles.filter(
    (s) => !s.forVariants || (variant && s.forVariants.includes(variant.id))
  );
}

export function getDefaultStyleId(product) {
  return getAvailableStyles(product, product.variants[0])[0]?.id || "";
}

// The fields to show/send for the current variant + style. Both conditions
// must hold: `forVariants` (price level) and `showWhen` (selected style).
export function getVisibleFields(product, styleId, variant) {
  return product.fields.filter(
    (f) =>
      (!f.showWhen || f.showWhen.includes(styleId)) &&
      (!f.forVariants || (variant && f.forVariants.includes(variant.id)))
  );
}

// Sets (variant.pieces > 1): quantity counts SETS, the price is per set.
export function getSetInfo(variant, quantity) {
  if (!variant?.pieces || variant.pieces < 2) return null;
  const sets = Math.max(1, Number(quantity) || 1);
  return { pieces: variant.pieces, sets, totalPieces: variant.pieces * sets };
}

export function getProductBySlug(slug) {
  return PRODUCTS.find((p) => p.slug === slug) || null;
}

export function getSlugById(id) {
  return PRODUCTS.find((p) => p.id === id)?.slug;
}

export function formatMoney(amount) {
  return `$${amount.toFixed(2)}`;
}

// Turns a price object into what the UI shows — never invents a number: with
// no `basePrice` it falls back to the neutral `priceLabel`. `amount` /
// `isStarting` are also returned so callers (WhatsApp message) can do math
// without re-parsing the display string.
export function formatPrice(price) {
  if (price.basePrice == null) {
    return { display: price.priceLabel, compareAt: null, amount: null, isStarting: false };
  }
  const isStarting = Boolean(price.isStartingPrice);
  return {
    display: `${isStarting ? "Desde " : ""}${formatMoney(price.basePrice)}`,
    compareAt: price.compareAtPrice != null ? formatMoney(price.compareAtPrice) : null,
    amount: price.basePrice,
    isStarting,
  };
}

// The variant a product page currently prices against. Llaveros' variants
// follow the selected style; every other product has its own selector.
export function resolveVariant(product, styleId, variantId) {
  const id = product.variantsLinkedToStyles ? styleId : variantId;
  return product.variants.find((v) => v.id === id) ?? product.variants[0];
}

// Single entry point for "what does this product cost right now" — the future
// home of `basePrice + extras` (see PRICING note) once surcharges exist.
export function getPriceInfo(product, variant) {
  if (!variant) return formatPrice(product.price);
  return formatPrice({
    ...product.price,
    basePrice: variant.price,
    isStartingPrice: Boolean(variant.isStartingPrice),
  });
}

// unit × quantity, keeping the "Desde" floor semantics for starting prices.
export function estimateSubtotal(info, quantity) {
  if (info.amount == null) return null;
  const total = formatMoney(info.amount * Math.max(1, Number(quantity) || 1));
  return info.isStarting ? `Desde ${total}` : total;
}

export function getRelatedProducts(slug, count = 4) {
  const index = PRODUCTS.findIndex((p) => p.slug === slug);
  if (index === -1) return [];
  const related = [];
  for (let i = 1; i <= count; i += 1) {
    related.push(PRODUCTS[(index + i) % PRODUCTS.length]);
  }
  return related;
}
