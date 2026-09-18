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
  variationsNote:
    "Cada pieza es hecha a mano, por lo que pueden existir pequeñas variaciones naturales entre una creación y otra.",
  price: { basePrice: null, extras: [], priceLabel: "Precio según personalización" },
};

// Each entry's `fields` only covers what's genuinely specific to that
// product — quantity, the reference-image note, contact details and general
// notes are handled once by <ProductCustomizer> for every product.
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
      { key: "setOIndividual", label: "¿Lo quieres individual o en set?", type: "select", options: ["Individual", "Set"] },
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
    styles: [
      { id: "flores", label: "Flores" },
      { id: "futbol", label: "Fútbol" },
      { id: "personaje", label: "Personaje" },
      { id: "nombre", label: "Nombre personalizado" },
      { id: "escolar", label: "Diseño escolar" },
      { id: "otro", label: "Otro" },
    ],
    fields: [
      { key: "personaje_cuaderno", label: "¿Qué personaje quieres?", type: "text", showWhen: ["personaje"], requiredWhen: ["personaje"] },
      { key: "nombre_cuaderno", label: "¿Qué nombre quieres?", type: "text", showWhen: ["nombre"], requiredWhen: ["nombre"] },
      { key: "otro_cuaderno", label: "Describe tu idea", type: "textarea", showWhen: ["otro"], requiredWhen: ["otro"] },
      { key: "tipoCuaderno", label: "Tipo de cuaderno", type: "text" },
      { key: "tamano", label: "Tamaño", type: "text" },
      { key: "iniciales", label: "Iniciales", type: "text" },
      { key: "texto", label: "Texto o frase", type: "text" },
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

export const PRODUCTS = CATEGORIES.map((cat) => ({
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
  ...PRODUCT_DETAILS[cat.id],
}));

export function getProductBySlug(slug) {
  return PRODUCTS.find((p) => p.slug === slug) || null;
}

export function getSlugById(id) {
  return PRODUCTS.find((p) => p.id === id)?.slug;
}

export function getRelatedProducts(slug, count = 3) {
  const index = PRODUCTS.findIndex((p) => p.slug === slug);
  if (index === -1) return [];
  const related = [];
  for (let i = 1; i <= count; i += 1) {
    related.push(PRODUCTS[(index + i) % PRODUCTS.length]);
  }
  return related;
}
