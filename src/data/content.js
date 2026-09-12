// ---------------------------------------------------------------------------
// All copy + structured content for the page. Keeping it here means prices,
// categories, testimonials, etc. can be edited without touching components.
// ---------------------------------------------------------------------------

// "/#section" (not a bare "#section") so these still work when clicked from
// a non-home route like a policy page — the browser does a normal
// navigation to "/" and App's hash-scroll effect takes it from there.
export const NAV_LINKS = [
  { href: "/#inicio", label: "Inicio" },
  { href: "/#personalizados", label: "Personalizados" },
  { href: "/#creaciones", label: "Creaciones" },
  { href: "/#como-funciona", label: "Cómo funciona" },
  { href: "/#ocasiones", label: "Ocasiones" },
  { href: "/#formulario-pedido", label: "Crear mi idea" },
  { href: "/#faq", label: "Preguntas frecuentes" },
  { href: "/#contacto", label: "Contacto" },
];

export const ABOUT_CARDS = [
  {
    title: "Personalizado",
    text: "Tu idea, tus colores, tu historia.",
  },
  {
    title: "Hecho a mano",
    text: "Cada pieza es elaborada cuidadosamente a mano.",
  },
  {
    title: "Hecho con significado",
    text: "Creamos piezas para las personas y momentos que realmente importan.",
  },
];

export const DIFFERENTIATORS = [
  {
    title: "Plastic canvas + hilo real",
    text: "Cada pieza se cose a mano, agujero por agujero, sobre plastic canvas rígido — no es una impresión ni una ilustración digital.",
  },
  {
    title: "Diseño 100% personalizado",
    text: "Nombres, fechas, colores y frases pensados para tu historia, no para un catálogo genérico.",
  },
  {
    title: "Hecho pieza por pieza",
    text: "Sin producción en masa: cada creación se arma a mano, una a la vez.",
  },
  {
    title: "Pensado para regalar",
    text: "Desde el diseño hasta el empaque, cada detalle está pensado para el momento en que la entregas.",
  },
];

// Real product catalog — each piece is made on rigid plastic canvas, hand-
// stitched with yarn/thread through the mesh (not embroidered on fabric).
// Photos live in public/assets/images/products/. `image: null` means the
// photo is still pending — see CATEGORIES[11] (cartoon characters) below.
const PRODUCTS_BASE = "/assets/images/products";

export const CATEGORIES = [
  {
    id: "portavasos",
    image: `${PRODUCTS_BASE}/portavasos.jpeg`,
    title: "Portavasos",
    text: "Protege tu taza y sumale un detalle tejido a tu mesa.",
  },
  {
    id: "llaveros",
    image: `${PRODUCTS_BASE}/llaveros.jpeg`,
    title: "Llaveros",
    text: "Iniciales, figuras y detalles pequeños para llevar contigo.",
  },
  {
    id: "separadores",
    image: `${PRODUCTS_BASE}/separadores-de-libros.jpeg`,
    title: "Separadores de libros",
    text: "Marca tu página favorita con un diseño tejido a mano.",
  },
  {
    id: "portadas-cuadernos",
    image: `${PRODUCTS_BASE}/portadas-de-cuadernos.jpeg`,
    title: "Portadas de cuadernos",
    text: "Una tapa tejida y personalizada para tu cuaderno de siempre.",
  },
  {
    id: "adornos-mesa",
    image: `${PRODUCTS_BASE}/adornos-de-mesa.jpeg`,
    title: "Adornos de mesa",
    text: "Detalles que le dan un toque especial a cualquier mesa.",
  },
  {
    id: "gift-boxes",
    image: `${PRODUCTS_BASE}/gift-box-personalizados.jpeg`,
    title: "Gift Boxes personalizados",
    text: "Un set completo, armado con cariño y listo para regalar.",
  },
  {
    id: "set-banos",
    image: `${PRODUCTS_BASE}/set-de-banos.jpeg`,
    title: "Set de baños",
    text: "Accesorios a juego para darle personalidad a tu baño.",
  },
  {
    id: "bolsos",
    image: `${PRODUCTS_BASE}/bolsos.jpeg`,
    title: "Bolsos",
    text: "Bolsos con diseños propios y patrones originales, tejidos a mano.",
  },
  {
    id: "wallets",
    image: `${PRODUCTS_BASE}/wallets.jpeg`,
    title: "Wallets",
    text: "Billeteras compactas para tarjetas y lo esencial del día a día.",
  },
  {
    id: "porta-tarjetas",
    image: `${PRODUCTS_BASE}/porta-tarjetas.jpeg`,
    title: "Porta tarjetas",
    text: "Guarda tus tarjetas en un diseño hecho especialmente para ti.",
  },
  {
    id: "porta-servilletas",
    image: `${PRODUCTS_BASE}/porta-servilletas.jpeg`,
    title: "Porta servilletas",
    text: "Suma un detalle tejido a tu mesa servida.",
  },
  {
    id: "personajes",
    image: `${PRODUCTS_BASE}/personajes-de-caricatura.jpeg`,
    title: "Personajes de caricatura",
    text: "Convierte tu personaje o estilo favorito en una pieza tejida, con un diseño propio inspirado en lo que más te gusta.",
  },
];

// Data for the interactive product viewer (ProductShowcase). Derived from
// CATEGORIES so the 12-product catalog stays defined in exactly one place.
//
// Shape per product: { id, name, description, designs }
// Each design is { id, label, model, frames: [imageUrl, ...] }.
//   - model set (e.g. "/models/portavasos.glb") -> ProductViewer renders a
//     real interactive 3D viewer (Three.js / React Three Fiber): drag to
//     orbit, pinch/scroll to zoom. `frames[0]` is kept as the fallback image
//     shown if WebGL is unavailable or the model fails to load.
//   - model: null -> falls back to the existing 2D photo viewer:
//       - 1 frame  -> still image, no drag/rotate hint.
//       - 2+ frames -> drag/swipe 360-style photo sequence.
//   - 1 design -> the "explore other designs" thumbnail row is hidden.
//   - 2+ designs -> customers can switch between design variations, each
//     with its own model and/or frames.
//
// Today no product has been 3D-scanned/modeled yet, so every `model` is
// null and the viewer renders the real product photo — never a fabricated
// 3D shape. To bring a product to life in 3D: drop a real .glb/.gltf file
// in public/models/ (e.g. public/models/portavasos.glb) and set that
// product's `model` below to "/models/portavasos.glb". No component changes
// needed.
export const PRODUCT_SHOWCASE = CATEGORIES.map((cat) => ({
  id: cat.id,
  name: cat.title,
  description: cat.text,
  designs: [
    {
      id: `${cat.id}-01`,
      label: "Diseño 01",
      model: null,
      frames: [cat.image],
    },
  ],
}));

// Journey shown in the "Crea tu idea" form — the emotional arc, not the
// operational steps already covered by OrderProcess (STEPS/ORDER_PROCESS_STEPS).
export const ORDER_FLOW_STAGES = [
  "Idea",
  "Solicitud",
  "Conversación",
  "Confirmación",
  "Creación a mano",
  "Creative Yarn",
];

export const OCCASION_OPTIONS = [
  "Cumpleaños",
  "Graduación",
  "San Valentín",
  "Día de la Madre",
  "Día del Padre",
  "Aniversario",
  "Navidad",
  "Amistad",
  "Nueva casa",
  "Logro especial",
  "Porque sí",
  "Otro",
];

export const GALLERY_FILTERS = ["Todos", "Amor", "Mascotas", "Graduación", "Familia", "Personalizados"];

// Real photography lives in public/assets/images/gallery/. All current photos
// share the same native ratio (896x1200, 3:4 portrait), so every tile uses a
// matching 3:4 box — no cropping. `image: null` falls back to a placeholder.
const GALLERY_BASE = "/assets/images/gallery";

export const GALLERY_ITEMS = [
  { id: 1, category: "Amor", image: `${GALLERY_BASE}/iniciales-entrelazadas.jpeg`, title: "Iniciales entrelazadas" },
  { id: 2, category: "Mascotas", image: `${GALLERY_BASE}/retrato-mascota.jpeg`, title: "Retrato de mascota" },
  { id: 4, category: "Graduación", image: `${GALLERY_BASE}/fecha-graduacion.jpeg`, title: "Fecha de graduación" },
  { id: 5, category: "Personalizados", image: `${GALLERY_BASE}/frase-medida.jpeg`, title: "Frase a medida" },
  { id: 6, category: "Amor", image: `${GALLERY_BASE}/corazon-hilo.jpeg`, title: "Corazón de hilo" },
  { id: 7, category: "Familia", image: `${GALLERY_BASE}/nombres-familia.jpeg`, title: "Nombres de familia" },
  { id: 8, category: "Mascotas", image: `${GALLERY_BASE}/huella-bordada.jpeg`, title: "Huella bordada" },
  { id: 9, category: "Personalizados", image: `${GALLERY_BASE}/diseno-medida.jpeg`, title: "Diseño a medida" },
  { id: 10, category: "Graduación", image: `${GALLERY_BASE}/recuerdo-logro.jpeg`, title: "Recuerdo de logro" },
  { id: 11, category: "Amor", image: `${GALLERY_BASE}/fecha-especial.jpeg`, title: "Fecha especial" },
  { id: 12, category: "Personalizados", image: `${GALLERY_BASE}/decoracion-hogar.jpeg`, title: "Decoración del hogar" },
];

// Real packaging photography lives in public/assets/images/packaging/.
const PACKAGING_BASE = "/assets/images/packaging";

export const PACKAGING_IMAGES = [
  {
    id: 1,
    image: `${PACKAGING_BASE}/gift-box-keepsake.jpeg`,
    alt: "Caja de regalo Creative Yarn cerrada y abierta, con sello de cera y tarjetas",
  },
  {
    id: 2,
    image: `${PACKAGING_BASE}/gift-box-open.jpeg`,
    alt: "Caja Creative Yarn abierta mostrando una pieza envuelta en papel de seda",
  },
  {
    id: 3,
    image: `${PACKAGING_BASE}/gift-box-small.jpeg`,
    alt: "Caja pequeña Creative Yarn con una pieza tejida y tarjetas de cuidado",
  },
  {
    id: 4,
    image: `${PACKAGING_BASE}/shopping-bag-pouch.jpeg`,
    alt: "Bolsa de regalo y bolsa de tela Creative Yarn",
  },
];

export const PACKAGING_HIGHLIGHTS = [
  {
    title: "Tarjeta de agradecimiento",
    text: "Un mensaje escrito para quien la recibe.",
  },
  {
    title: "Ficha de cuidado",
    text: "Para que tu pieza se mantenga como el primer día.",
  },
  {
    title: "Bolsa de tela incluida",
    text: "Para guardar o regalar tu creación con estilo.",
  },
  {
    title: "Sello y detalles hechos a mano",
    text: "Cada caja se cierra con el mismo cuidado con el que se hizo la pieza.",
  },
];

export const BRAND_STORY = {
  eyebrow: "La historia detrás del hilo",
  title: "Cada hilo cuenta algo.",
  paragraphs: [
    "Creative Yarn nació de una idea simple: convertir un nombre, una fecha o un recuerdo en algo que se pueda sostener con las manos.",
    "Cada pieza se cose a mano, hilo por hilo, sobre plastic canvas — sin atajos ni producción en masa. Es un proceso lento, a propósito, porque las cosas hechas con cariño no se apuran.",
    "Detrás de cada pedido hay una persona leyendo tu idea, pensando en los colores, y armando algo que no existía antes de que lo pidieras.",
  ],
  signature: "JM",
  // One brief, subtle mention is enough — do not repeat this explanation
  // elsewhere on the site. JM stays a quiet signature, not a second brand.
  signatureNote: "Un homenaje a quien nos enseñó a tejer — donde empezó todo esto.",
};

export const CHRISTMAS_TEASER = {
  eyebrow: "Navidad",
  title: "Algo especial está en camino.",
  text: "Estamos preparando una colección navideña hecha a mano, pensada para regalar y para decorar. Muy pronto vas a poder verla completa.",
  cta: "Avísame cuando esté disponible",
};

export const PERSONALIZATION_OPTIONS = [
  "Nombres", "Iniciales", "Fechas", "Colores", "Frases", "Diseños",
  "Temáticas", "Fotografías de referencia", "Tamaño", "Detalles especiales",
];

export const STEPS = [
  { number: "01", title: "Tú lo imaginas", text: "Cuéntanos qué tienes en mente." },
  { number: "02", title: "Lo diseñamos", text: "Definimos colores, tamaño, estilo y personalización." },
  { number: "03", title: "Lo creamos", text: "Tu pieza es elaborada cuidadosamente a mano." },
  { number: "04", title: "Lo preparamos", text: "Empacamos tu pieza con mucho cuidado." },
  { number: "05", title: "Se convierte en tuyo", text: "Recibes tu pieza personalizada, lista para disfrutar o regalar." },
];

export const OCCASIONS = [
  "San Valentín", "Cumpleaños", "Graduaciones", "Aniversarios", "Día de la Madre",
  "Día del Padre", "Navidad", "Amantes de las mascotas", "Nuevo hogar", "Porque sí",
];

export const ORDER_PROCESS_STEPS = [
  "Envíanos tu idea.",
  "Cuéntanos qué quieres personalizar.",
  "Recibe tu cotización.",
  "Aprueba el diseño.",
  "Realiza el pago.",
  "Creamos tu pieza.",
  "La preparamos y enviamos.",
];

// Placeholder testimonials — replace with real customer reviews when available.
// No real testimonials yet — keep this empty rather than inventing reviews.
// Testimonials.jsx shows a neutral "collecting first experiences" message
// while this is empty. Add real { name, stars, text } entries when available.
export const TESTIMONIALS = [];

export const FAQ_ITEMS = [
  {
    q: "¿Cómo puedo realizar un pedido?",
    a: "Escríbenos por WhatsApp o completa el formulario de pedido personalizado con los detalles de tu idea. Te responderemos con una cotización y los siguientes pasos.",
  },
  {
    q: "¿Puedo solicitar un diseño completamente personalizado?",
    a: "Sí. La mayoría de nuestras piezas nacen de una idea propia: cuéntanos qué tienes en mente y trabajamos contigo para diseñarla.",
  },
  {
    q: "¿Puedo elegir los colores?",
    a: "Sí, puedes elegir los colores de hilo/lana dentro de las opciones disponibles al momento de tu pedido.",
  },
  {
    q: "¿Puedo enviar una fotografía como referencia?",
    a: "Sí, puedes enviarnos una fotografía de referencia para inspirar el diseño de tu pieza.",
  },
  {
    q: "¿Cuánto tarda un pedido personalizado?",
    a: "El tiempo de producción varía según la complejidad de la pieza y la cantidad de pedidos en curso. Te confirmaremos un tiempo estimado al aprobar tu diseño.",
  },
  {
    q: "¿Realizan envíos?",
    a: "Sí, realizamos envíos. Consulta la sección de Envíos para conocer las opciones disponibles según tu ubicación.",
  },
  {
    q: "¿Cuánto cuesta el envío?",
    a: "El costo de envío se calcula según el destino y el tamaño de la pieza. Te confirmaremos el costo exacto antes de procesar tu pedido.",
  },
  {
    q: "¿Qué métodos de pago aceptan?",
    a: "Los métodos de pago disponibles se confirman directamente al momento de coordinar tu pedido.",
  },
  {
    q: "¿Puedo cancelar mi pedido?",
    a: "Puedes cancelar tu pedido antes de que comience la producción. Una vez iniciada la elaboración de una pieza personalizada, la cancelación puede no ser posible.",
  },
  {
    q: "¿Puedo devolver un producto personalizado?",
    a: "Por tratarse de piezas hechas a medida, las devoluciones se evalúan caso por caso. Contáctanos si tienes algún inconveniente con tu pedido.",
  },
  {
    q: "¿Qué ocurre si mi paquete llega dañado?",
    a: "Contáctanos con fotografías del daño apenas lo recibas y buscaremos la mejor solución posible para tu caso.",
  },
];

// ---------------------------------------------------------------------------
// Policies (Phase 4). No fixed prices, production times, shipping rates or
// payment methods are published anywhere here — those are confirmed with
// each customer personally, per the order flow already built in Phase 3.
// Each policy's `sections` is generic { heading, body?: string[], list?:
// string[] } so PolicyPage.jsx can render all five without special-casing.
// ---------------------------------------------------------------------------
export const POLICIES = [
  {
    slug: "privacidad",
    navLabel: "Política de privacidad",
    pageTitle: "Creative Yarn | Política de privacidad",
    metaDescription: "Cómo Creative Yarn usa la información que compartís a través de este sitio.",
    hubSummary: "Cómo usamos la información que nos compartís.",
    intro: "Esta página explica qué información podés compartirnos a través de este sitio y cómo la usamos.",
    sections: [
      {
        heading: "Qué información podés compartirnos",
        body: [
          "Cuando escribís por WhatsApp o completás el formulario \"Crea tu idea\", podés compartirnos información como:",
        ],
        list: [
          "Nombre",
          "WhatsApp u otro dato de contacto",
          "Correo electrónico (opcional)",
          "Detalles de tu pedido o idea",
          "Detalles de personalización — nombres, fechas, frases, colores",
          "Una imagen de referencia, si elegís compartir una",
          "Cualquier otra información que decidas escribirnos voluntariamente",
        ],
      },
      {
        heading: "Para qué usamos esa información",
        body: ["Usamos la información que nos compartís únicamente para:"],
        list: [
          "Responder tus consultas",
          "Conversar sobre tu creación personalizada",
          "Comunicarnos sobre los productos que solicitaste",
          "Coordinar tu pedido, cuando corresponda",
          "Brindarte atención al cliente",
        ],
      },
      {
        heading: "Cómo protegemos tu información",
        body: [
          "Tomamos medidas razonables para proteger la información que nos compartís, y no la usamos para fines distintos a los descritos en esta página.",
        ],
      },
      {
        heading: "Servicios de terceros",
        body: [
          "Este sitio carga las tipografías de su diseño desde Google Fonts, un servicio externo. Fuera de eso, este sitio no utiliza cookies de seguimiento ni herramientas de análisis de terceros.",
        ],
      },
      {
        heading: "Contacto",
        body: ["Si tenés preguntas sobre esta política, podés escribirnos por WhatsApp desde cualquier página del sitio."],
      },
    ],
  },
  {
    slug: "terminos",
    navLabel: "Términos y condiciones",
    pageTitle: "Creative Yarn | Términos y condiciones",
    metaDescription: "Cómo funcionan las creaciones personalizadas y los pedidos en Creative Yarn.",
    hubSummary: "Cómo funcionan nuestras creaciones personalizadas y tus pedidos.",
    intro: "Estos términos explican cómo funciona Creative Yarn: desde una idea hasta una pieza hecha a mano.",
    sections: [
      {
        heading: "Nuestras creaciones",
        body: [
          "Las imágenes y ejemplos de este sitio son inspiración — muestran lo que es posible, no un catálogo cerrado de piezas idénticas.",
          "Cada pieza es hecha a mano, por lo que pueden existir pequeñas variaciones naturales entre una creación y otra.",
          "Una creación personalizada puede diferir levemente de la imagen de referencia que compartiste — es parte de que cada pieza se haga a mano, una por una.",
          "Los colores pueden variar según el material disponible y la pantalla en la que estés viendo este sitio.",
        ],
      },
      {
        heading: "Tu pedido: una solicitud, no una compra confirmada",
        body: [
          "Completar el formulario \"Crea tu idea\" o escribirnos por WhatsApp es una solicitud — no una compra ni un pedido confirmado de forma automática.",
          "Un pedido se considera confirmado recién después de que conversamos con vos y acordamos juntos los detalles correspondientes (precio, tiempo de producción, entrega y pago).",
        ],
      },
      {
        heading: "Creaciones personalizadas",
        body: [
          "Sos responsable de la información que nos proporciones para personalizar tu pieza, como nombres, iniciales, fechas, frases, colores y otros detalles de referencia.",
          "Hacemos nuestro mejor esfuerzo para reflejar exactamente lo que nos compartiste. Si un error en la pieza final se debe a información incorrecta que recibimos de tu parte, te pedimos que lo tengas en cuenta — por eso te recomendamos revisar bien los detalles antes de confirmar tu pedido.",
        ],
      },
    ],
  },
  {
    slug: "envios",
    navLabel: "Envíos y entregas",
    pageTitle: "Creative Yarn | Envíos y entregas",
    metaDescription: "Cómo se coordina la entrega de tu pieza personalizada de Creative Yarn.",
    hubSummary: "Cómo se coordina la entrega de tu pieza.",
    intro: "Como cada creación es distinta, los detalles de entrega se confirman de forma individual según tu pedido.",
    sections: [
      {
        heading: "Entregas personalizadas para cada pedido",
        body: [
          "No publicamos tarifas ni tiempos de envío fijos en este sitio, porque el costo y el método de entrega dependen de tu pedido en particular.",
        ],
      },
      {
        heading: "Qué puede influir en tu entrega",
        body: ["Varios factores pueden influir en los detalles de tu entrega, entre ellos:"],
        list: [
          "El producto que elegiste",
          "Las características de tu pedido",
          "El destino de la entrega",
          "El método de entrega disponible",
        ],
      },
      {
        heading: "Antes de confirmar tu pedido",
        body: [
          "Antes de que tu pedido quede confirmado, te compartiremos los detalles de entrega que apliquen a tu caso, incluyendo el método y cualquier costo asociado.",
        ],
      },
    ],
  },
  {
    slug: "devoluciones",
    navLabel: "Cambios y devoluciones",
    pageTitle: "Creative Yarn | Cambios y devoluciones",
    metaDescription: "Cómo abordamos cambios, devoluciones y piezas dañadas en Creative Yarn.",
    hubSummary: "Cómo abordamos cambios, devoluciones y piezas dañadas.",
    // NOTE for Creative Yarn (not shown publicly): once specific windows,
    // percentages or conditions are decided, they can be added as extra
    // bullet points or a dedicated subsection in each block below. Until
    // then this stays intentionally neutral rather than inventing numbers.
    sections: [
      {
        heading: "Piezas personalizadas",
        body: [
          "Como cada pieza personalizada se crea especialmente para vos, según los detalles que nos compartiste, este tipo de creaciones se trata de forma distinta a un producto genérico.",
        ],
      },
      {
        heading: "Piezas no personalizadas",
        body: [
          "Para piezas que no incluyen personalización, las condiciones de cambio se evalúan según el tipo de producto y la situación de cada pedido.",
        ],
      },
      {
        heading: "Piezas dañadas o incorrectas",
        body: [
          "Si tu pieza llega dañada o no corresponde con lo acordado, escribinos — cada situación se revisa de forma individual para encontrar la mejor solución.",
        ],
      },
      {
        heading: "Cómo se definen las condiciones",
        body: [
          "Las condiciones de cambios y devoluciones se comunican y confirman según el tipo de producto y las circunstancias de cada pedido. Si tenés dudas antes de confirmar tu compra, podés consultarnos por WhatsApp.",
        ],
      },
    ],
  },
  {
    slug: "cuidado",
    navLabel: "Cuidado de tu pieza",
    pageTitle: "Creative Yarn | Cuidado de tu pieza",
    metaDescription: "Cómo cuidar tu creación hecha a mano de Creative Yarn.",
    hubSummary: "Cómo cuidar tu creación hecha a mano para que dure.",
    intro: "Una pieza hecha a mano merece ser cuidada.",
    sections: [
      {
        heading: "Recomendaciones de cuidado",
        list: [
          "Manejá tu pieza hecha a mano con cuidado.",
          "Evitá tirar o cortar los hilos.",
          "Mantenela alejada de humedad excesiva.",
          "Mantenela alejada de fuentes de calor excesivo.",
          "Evitá apoyar peso excesivo sobre piezas delicadas.",
          "Guardala en su bolsa protectora cuando corresponda.",
          "Limpiala con métodos suaves, apropiados para el tipo de producto.",
          "No la laves de forma agresiva ni en lavarropas, a menos que te indiquemos específicamente que ese producto lo permite.",
        ],
      },
    ],
  },
];

// Footer's "Políticas" column — derived from POLICIES so there's one list
// of the five policies, not two.
export const FOOTER_POLICIES = POLICIES.map((p) => ({
  label: p.navLabel,
  href: `/politicas/${p.slug}`,
}));
