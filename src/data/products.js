// ---------------------------------------------------------------------------
// Per-product data for the individual product pages (/productos/:slug).
// CATEGORIES (content.js) stays the single source of truth for each
// product's id, photo and short blurb — everything here only adds the extra
// detail an individual product page needs (full description, customization
// fields, related products, etc.) without duplicating that base data.
//
// NO PRICES OF ANY KIND live in this file, or anywhere in this repository —
// Creative Yarn JM works primarily with personalized pieces, so the public
// site is a catalog + configurator + quote request, never a fixed-price
// store. Internal base costs live only in Creative Yarn Business (a
// separate, private project) and must never be copied here, even as a
// comment "for reference": anything in this file ships inside the public
// JS bundle and is readable by anyone via the browser's dev tools, whether
// or not the UI ever renders it.
//
// Two independent choices exist per product, each optional on its own:
//   - `variants`   the PRIMARY choice (e.g. Set x4 / Set x6, Mini / Grande).
//   - `styles`     a SECONDARY, independent choice (e.g. Básico/Personalizado,
//                  Pequeño/Grande, a theme). Can be restricted to certain
//                  variants via `forVariants`; otherwise available for all.
// A product can have either, both, or neither (e.g. Separadores has no
// selector at all — straight to its personalization fields).
//
// `fields` are shown/required conditionally via `showWhen` /
// `requiredWhen`, each shaped as { variant?: [ids], style?: [ids] } — a
// field only shows when EVERY axis present in `showWhen` matches the
// current selection. A field can instead use `dependsOn: { key, value }` to
// depend on another field's own value (e.g. "Dedicatoria" only when the
// "Enviar como regalo" toggle is checked) rather than on variant/style.
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
  // Shown near the top of the product page instead of a price.
  quoteNote: "Cada pieza se personaliza y se cotiza según tu solicitud — sin precio fijo publicado.",
  // Optional, brand-level presentation mention (e.g. "The Creative Yarn
  // Box") — kept out of SHARED's default text since it only applies to a
  // couple of products; null here means "don't render anything".
  presentationNote: null,
  variantLegend: "Elige tu opción",
  styleNoun: "Estilo",
  variants: [],
  styles: [],
  packagingTier: "signature", // "mini" | "signature" | "premium" — internal categorization, not shown to customers as a promise of specific contents.
  displayEligible: false,
};

const PRODUCT_DETAILS = {
  // -------------------------------------------------------------------
  portavasos: {
    description:
      "Portavasos tejidos a mano sobre plastic canvas, vendidos en sets. Elige el tamaño de set y si quieres un diseño básico o uno completamente personalizado.",
    variantLegend: "Elige tu set",
    variants: [
      { id: "set-x4", label: "Set x4", pieces: 4 },
      { id: "set-x6", label: "Set x6", pieces: 6 },
    ],
    styleNoun: "Diseño",
    styles: [
      { id: "basico", label: "Básico" },
      { id: "personalizado", label: "Personalizado" },
    ],
    fields: [
      { key: "disenoTema", label: "Diseño o tema", type: "text", placeholder: "Ej.: flores, mascotas, minimalista..." },
      { key: "colorPrincipal", label: "Color principal", type: "text" },
      { key: "colorSecundario", label: "Color secundario", type: "text", showWhen: { style: ["personalizado"] } },
      { key: "nombreIniciales", label: "Nombre o iniciales", type: "text", showWhen: { style: ["personalizado"] } },
    ],
    packagingTier: "signature",
  },

  // -------------------------------------------------------------------
  llaveros: {
    description:
      "Llaveros personalizados tejidos a mano: con letra, con nombre o con el diseño que tengas en mente, en el tamaño que prefieras.",
    variantLegend: "Elige tu opción",
    variants: [
      { id: "letra", label: "Letra" },
      { id: "nombre", label: "Nombre" },
      { id: "otro", label: "Otro diseño" },
    ],
    styleNoun: "Tamaño",
    styles: [
      { id: "pequeno", label: "Pequeño" },
      { id: "grande", label: "Grande" },
    ],
    fields: [
      { key: "letra", label: "¿Qué letra quieres?", type: "text", showWhen: { variant: ["letra"] }, requiredWhen: { variant: ["letra"] } },
      { key: "nombre_llavero", label: "¿Qué nombre quieres?", type: "text", showWhen: { variant: ["nombre"] }, requiredWhen: { variant: ["nombre"] } },
      { key: "otro_diseno", label: "Describe el diseño que tienes en mente", type: "textarea", showWhen: { variant: ["otro"] }, requiredWhen: { variant: ["otro"] } },
      { key: "colorPrincipal", label: "Color principal", type: "text" },
      { key: "colorSecundario", label: "Color secundario", type: "text" },
    ],
    packagingTier: "mini",
  },

  // -------------------------------------------------------------------
  separadores: {
    description:
      "Separadores de libros hechos a mano, con tu nombre, iniciales o una frase corta tejida en el diseño que elijas.",
    fields: [
      { key: "disenoTema", label: "Diseño o tema", type: "text" },
      { key: "nombre", label: "Nombre", type: "text" },
      { key: "iniciales", label: "Iniciales", type: "text" },
      { key: "frase", label: "Frase corta", type: "text" },
      { key: "colores", label: "Colores", type: "text" },
    ],
    packagingTier: "mini",
  },

  // -------------------------------------------------------------------
  "portadas-cuadernos": {
    description:
      "Portadas de cuaderno tejidas a mano y personalizadas con el tema que más te represente — desde flores o fútbol hasta tu propio nombre o un personaje favorito.",
    variantLegend: "Elige tu opción",
    variants: [
      { id: "sencilla", label: "Sencilla" },
      { id: "personalizada", label: "Personalizada" },
      { id: "especial", label: "Diseño especial / personaje" },
    ],
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
      { key: "nombre", label: "Nombre", type: "text", showWhen: { variant: ["personalizada"] } },
      { key: "iniciales", label: "Iniciales", type: "text", showWhen: { variant: ["personalizada"] } },
      { key: "texto", label: "Texto o frase", type: "text", showWhen: { variant: ["personalizada"] } },
      {
        key: "personaje_cuaderno",
        label: "¿Qué personaje quieres?",
        type: "text",
        showWhen: { variant: ["especial"], style: ["personaje"] },
        requiredWhen: { style: ["personaje"] },
        hint: "Las solicitudes basadas en personajes, marcas o diseños de terceros están sujetas a revisión.",
      },
      { key: "descripcion_cuaderno", label: "Describe el diseño que quieres", type: "textarea", showWhen: { variant: ["especial"] }, required: true },
      { key: "nombre_texto_especial", label: "Nombre o texto (si aplica)", type: "text", showWhen: { variant: ["especial"] } },
      { key: "colores", label: "Colores", type: "text" },
    ],
    packagingTier: "signature",
  },

  // -------------------------------------------------------------------
  "adornos-mesa": {
    description:
      "Piezas tejidas a mano pensadas para una presentación de mesa coordinada — portavasos, porta servilletas o tapetes decorativos, personalizados a tu gusto.",
    variantLegend: "Elige la pieza",
    variants: [
      { id: "portavasos", label: "Portavasos" },
      { id: "porta-servilletas", label: "Porta servilletas" },
      { id: "tapetes", label: "Tapetes" },
    ],
    fields: [
      { key: "disenoTema", label: "Diseño o tema", type: "text" },
      { key: "colores", label: "Colores", type: "text" },
      { key: "nombreTexto", label: "Nombre o texto (si aplica)", type: "text" },
      { key: "evento", label: "Evento u ocasión (si es relevante)", type: "text" },
    ],
    packagingTier: "signature",
    displayEligible: true,
  },

  // -------------------------------------------------------------------
  "gift-boxes": {
    description:
      "Creative Yarn Gift Box: una caja de regalo artesanal y personalizable, pensada para presentar tu obsequio — y que después puede seguir usándose para guardar objetos.",
    quoteNote:
      "El contenido final de tu Gift Box está sujeto a cotización y viabilidad — cuéntanos tu idea y la revisamos contigo.",
    presentationNote:
      "Tu pedido puede prepararse con The Creative Yarn Box, nuestra presentación de regalo de marca — sujeta a disponibilidad y cotización.",
    variantLegend: "Elige el tamaño",
    variants: [
      { id: "pequena", label: "Pequeña" },
      { id: "grande", label: "Grande" },
    ],
    fields: [
      { key: "ocasion", label: "Ocasión", type: "select", options: OCCASIONS },
      { key: "destinatario", label: "Persona / destinatario", type: "text" },
      { key: "disenoTema", label: "Diseño o tema", type: "text" },
      { key: "colores", label: "Colores", type: "text" },
      { key: "nombre", label: "Nombre", type: "text" },
      { key: "mensaje", label: "Mensaje o dedicatoria", type: "textarea" },
      {
        key: "contenido",
        label: "¿Qué te gustaría incluir dentro de la caja?",
        type: "textarea",
        hint: "Cuéntanos tu idea — el contenido final se confirma según disponibilidad y cotización.",
      },
    ],
    packagingTier: "premium",
  },

  // -------------------------------------------------------------------
  "set-banos": {
    description:
      "Set de baño completo, tejido a mano: una colección coordinada de 6 piezas para darle personalidad a tu baño.",
    setContents: [
      "Canasta grande / organizador de baño",
      "Caja rectangular para pañuelos (tissue box)",
      "Portavaso / dispensador para vasos desechables",
      "Portacepillos de dientes",
      "Jabonera o bandeja pequeña",
      "Caja redonda con tapa",
    ],
    fields: [
      { key: "disenoTema", label: "Diseño o tema", type: "text" },
      { key: "colorPrincipal", label: "Color principal", type: "text" },
      { key: "coloresSecundarios", label: "Colores secundarios", type: "text" },
      { key: "nombreIniciales", label: "Nombre o iniciales (si aplica)", type: "text" },
    ],
    packagingTier: "premium",
  },

  // -------------------------------------------------------------------
  bolsos: {
    description:
      "Bolsos tejidos a mano con diseño y patrones propios, en el tamaño que prefieras. Elige un diseño básico o uno completamente personalizado.",
    variantLegend: "Elige el tamaño",
    variants: [
      { id: "mini", label: "Mini" },
      { id: "mediano", label: "Mediano" },
      { id: "grande", label: "Grande" },
    ],
    styleNoun: "Diseño",
    styles: [
      { id: "basico", label: "Básico" },
      { id: "personalizado", label: "Personalizado" },
    ],
    fields: [
      { key: "colorPrincipal", label: "Color principal", type: "text" },
      { key: "modelo", label: "Modelo o referencia que te gustaría", type: "text", showWhen: { style: ["personalizado"] } },
      { key: "disenoTema", label: "Diseño o tema", type: "textarea", showWhen: { style: ["personalizado"] } },
      { key: "colorSecundario", label: "Color secundario", type: "text", showWhen: { style: ["personalizado"] } },
      { key: "asaCorrea", label: "Tipo de asa, correa o cadena (si aplica)", type: "text", showWhen: { style: ["personalizado"] } },
      { key: "cierre", label: "Cierre (si aplica)", type: "text", showWhen: { style: ["personalizado"] } },
      { key: "herrajes", label: "Herrajes o acabados que prefieres", type: "text", showWhen: { style: ["personalizado"] } },
      { key: "nombreIniciales", label: "Nombre o iniciales", type: "text", showWhen: { style: ["personalizado"] } },
    ],
    packagingTier: "premium",
  },

  // -------------------------------------------------------------------
  wallets: {
    description:
      "Wallets compactas hechas a mano para tarjetas y lo esencial del día a día, en el tamaño que prefieras.",
    variantLegend: "Elige el tamaño",
    variants: [
      { id: "pequena", label: "Pequeña" },
      { id: "grande", label: "Grande" },
    ],
    fields: [
      { key: "disenoTema", label: "Diseño o tema", type: "text" },
      { key: "colores", label: "Colores", type: "text" },
      { key: "inicialesNombre", label: "Iniciales o nombre (si aplica)", type: "text" },
      { key: "cierre", label: "Tipo de cierre (si aplica)", type: "text" },
    ],
    packagingTier: "signature",
  },

  // -------------------------------------------------------------------
  "porta-tarjetas": {
    description: "Porta tarjetas hecho a mano, diseñado especialmente para ti.",
    variantLegend: "Elige tu opción",
    variants: [
      { id: "basico", label: "Básico" },
      { id: "personalizado", label: "Personalizado" },
    ],
    fields: [
      { key: "colores", label: "Colores", type: "text" },
      { key: "diseno", label: "Diseño", type: "text", showWhen: { variant: ["personalizado"] } },
      { key: "inicialesNombre", label: "Iniciales o nombre", type: "text", showWhen: { variant: ["personalizado"] } },
    ],
    packagingTier: "mini",
  },

  // -------------------------------------------------------------------
  "porta-servilletas": {
    description: "Porta servilletas tejido a mano para sumar un detalle especial a tu mesa servida.",
    variantLegend: "Elige el tamaño",
    variants: [
      { id: "pequeno", label: "Pequeño" },
      { id: "grande", label: "Grande" },
    ],
    fields: [
      { key: "disenoTema", label: "Diseño o tema", type: "text" },
      { key: "colores", label: "Colores", type: "text" },
      { key: "inicialesTexto", label: "Iniciales o texto (si aplica)", type: "text" },
    ],
    packagingTier: "signature",
  },

  // -------------------------------------------------------------------
  personajes: {
    description:
      "Convierte tu personaje o estilo favorito en una pieza tejida a mano, con o sin llavero. Actualmente elaboramos esta pieza en tamaño pequeño.",
    variantLegend: "Elige tu opción",
    variants: [
      { id: "sin-llavero", label: "Sin llavero" },
      { id: "con-llavero", label: "Con llavero" },
    ],
    fields: [
      {
        key: "personaje",
        label: "¿Qué personaje quieres?",
        type: "text",
        required: true,
        hint: "Las solicitudes basadas en personajes, marcas o diseños de terceros están sujetas a revisión.",
      },
      { key: "colores", label: "Colores (si corresponde)", type: "text" },
    ],
    packagingTier: "mini",
    displayEligible: true,
  },

  // -------------------------------------------------------------------
  "set-de-bebe": {
    description:
      "Piezas decorativas y de recuerdo tejidas a mano sobre plastic canvas, pensadas para acompañar la llegada de un bebé: portarretratos, placas, letreros y detalles de organización con una temática coordinada. No incluye artículos de contacto directo con la boca del bebé, chupetes, mordedera ni juguetes.",
    presentationNote:
      "Ideal para regalar: tu pedido puede prepararse con The Creative Yarn Box, la presentación de regalo de Creative Yarn JM — sujeta a disponibilidad y cotización.",
    variantLegend: "Elige tu nivel",
    variants: [
      {
        id: "baby-basic",
        label: "Baby Basic",
        includes: ["Portarretrato", "Placa decorativa con inicial/nombre", "Adorno temático"],
      },
      {
        id: "baby-personalized",
        label: "Baby Personalized",
        includes: ["Portarretrato", "Placa de nacimiento", "Letrero con nombre", "Organizador pequeño"],
      },
      {
        id: "baby-premium",
        label: "Baby Premium",
        includes: [
          "Portarretrato",
          "Placa de nacimiento",
          "Letrero con nombre",
          "Organizador",
          "Portada de álbum/libreta",
          "Llavero para mamá/papá",
        ],
      },
    ],
    styleNoun: "Temática",
    styles: [
      { id: "osito", label: "Osito" },
      { id: "safari", label: "Safari" },
      { id: "cielo-estrellas", label: "Cielo y estrellas" },
      { id: "arcoiris", label: "Arcoíris" },
      { id: "flores", label: "Flores" },
      { id: "bosque", label: "Bosque" },
      { id: "animales-marinos", label: "Animales marinos" },
      { id: "dinosaurios", label: "Dinosaurios" },
      { id: "principe-princesa", label: "Princesa / Príncipe" },
      { id: "otra", label: "Otra temática" },
    ],
    fields: [
      { key: "otraTematica", label: "Describe la temática que deseas", type: "textarea", showWhen: { style: ["otra"] }, requiredWhen: { style: ["otra"] } },
      { key: "nombreInicial", label: "Nombre o inicial", type: "text" },
      { key: "fechaNacimiento", label: "Fecha de nacimiento", type: "text", showWhen: { variant: ["baby-personalized", "baby-premium"] } },
      { key: "colores", label: "Colores", type: "text" },
      {
        key: "enviarRegalo",
        label: "🎁 Enviar como regalo",
        type: "toggle",
        hint: "Tu pedido puede prepararse como obsequio con la presentación The Creative Yarn Box.",
      },
      {
        key: "dedicatoria",
        label: "Dedicatoria o mensaje para la familia",
        type: "textarea",
        dependsOn: { key: "enviarRegalo", value: true },
      },
    ],
    packagingTier: "premium",
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

export function getRelatedProducts(slug, count = 4) {
  const index = PRODUCTS.findIndex((p) => p.slug === slug);
  if (index === -1) return [];
  const related = [];
  for (let i = 1; i <= count; i += 1) {
    related.push(PRODUCTS[(index + i) % PRODUCTS.length]);
  }
  return related;
}

export function getDefaultVariantId(product) {
  return product.variants[0]?.id || "";
}

// A style option with `forVariants` only exists for those variants; without
// it, it's available regardless of which variant is selected.
export function getAvailableStyles(product, variantId) {
  return product.styles.filter((s) => !s.forVariants || s.forVariants.includes(variantId));
}

export function getDefaultStyleId(product, variantId) {
  return getAvailableStyles(product, variantId)[0]?.id || "";
}

function axisMatches(condition, variantId, styleId) {
  if (!condition) return true;
  if (condition.variant && !condition.variant.includes(variantId)) return false;
  if (condition.style && !condition.style.includes(styleId)) return false;
  return true;
}

// The fields to show for the current variant + style + form values. Three
// independent gates, all optional: `showWhen` (variant/style), `dependsOn`
// (another field's current value) — a field with neither is always shown.
export function getVisibleFields(product, variantId, styleId, values = {}) {
  return product.fields.filter((f) => {
    if (!axisMatches(f.showWhen, variantId, styleId)) return false;
    if (f.dependsOn && values[f.dependsOn.key] !== f.dependsOn.value) return false;
    return true;
  });
}

export function isFieldRequired(field, variantId, styleId) {
  if (field.required) return true;
  if (field.requiredWhen) return axisMatches(field.requiredWhen, variantId, styleId);
  return false;
}

// Sets (variant.pieces > 1): quantity counts SETS, e.g. Portavasos Set x4.
// Not to be confused with `getSetContents` below (a fixed list of distinct
// piece TYPES, e.g. the 6 pieces in Set de baño) — a product never has both.
export function getSetInfo(variant, quantity) {
  if (!variant?.pieces || variant.pieces < 2) return null;
  const sets = Math.max(1, Number(quantity) || 1);
  return { pieces: variant.pieces, sets, totalPieces: variant.pieces * sets };
}

// The fixed, already-confirmed content list for a product/variant, if any —
// purely informational (shown in the accordion and echoed in the WhatsApp
// message), never a customer choice and never priced.
export function getSetContents(product, variant) {
  return variant?.includes || product.setContents || null;
}
