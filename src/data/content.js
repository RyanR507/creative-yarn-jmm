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
  { href: "/#faq", label: "Preguntas frecuentes" },
  { href: "/#contacto", label: "Contacto" },
];

// The main Navbar shows a trimmed subset of the site's full section list
// (NAV_LINKS above, still used as-is by the Footer) — "Cómo funciona" and
// "Preguntas frecuentes" stay reachable via the Footer, in-page CTAs, and
// normal scrolling, just not as Navbar items.
// "#navidad" is the real id of the existing Christmas Coming Soon section.
export const NAVBAR_LINKS = [
  { href: "/#inicio", label: "Inicio" },
  { href: "/#personalizados", label: "Personalizados" },
  { href: "/#creaciones", label: "Creaciones" },
  { href: "/#navidad", label: "Christmas Yarn: Coming Soon", isChristmas: true },
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
    title: "Personalizado para ti",
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
    image: `${PRODUCTS_BASE}/portavasos.webp`,
    title: "Portavasos",
    text: "Protege tu taza y sumale un detalle tejido a tu mesa.",
  },
  {
    id: "llaveros",
    image: `${PRODUCTS_BASE}/llaveros.webp`,
    title: "Llaveros",
    text: "Iniciales, figuras y detalles pequeños para llevar contigo.",
  },
  {
    id: "separadores",
    image: `${PRODUCTS_BASE}/separadores-de-libros.webp`,
    title: "Separadores de libros",
    text: "Marca tu página favorita con un diseño tejido a mano.",
  },
  {
    id: "portadas-cuadernos",
    image: `${PRODUCTS_BASE}/portadas-de-cuadernos.webp`,
    title: "Portadas de cuadernos",
    text: "Una tapa tejida y personalizada para tu cuaderno de siempre.",
  },
  {
    id: "adornos-mesa",
    image: `${PRODUCTS_BASE}/adornos-de-mesa.webp`,
    title: "Adornos de mesa",
    text: "Detalles que le dan un toque especial a cualquier mesa.",
  },
  {
    id: "gift-boxes",
    image: `${PRODUCTS_BASE}/gift-box-personalizados.webp`,
    title: "Gift Boxes personalizados",
    text: "Un set completo, armado con cariño y listo para regalar.",
  },
  {
    id: "set-banos",
    image: `${PRODUCTS_BASE}/set-de-banos.webp`,
    title: "Set de baño",
    text: "Accesorios a juego para darle personalidad a tu baño.",
  },
  {
    id: "bolsos",
    image: `${PRODUCTS_BASE}/bolsos.webp`,
    title: "Bolsos",
    text: "Bolsos con diseños propios y patrones originales, tejidos a mano.",
  },
  {
    id: "wallets",
    image: `${PRODUCTS_BASE}/wallets.webp`,
    title: "Wallets",
    text: "Billeteras compactas para tarjetas y lo esencial del día a día.",
  },
  {
    id: "porta-tarjetas",
    image: `${PRODUCTS_BASE}/porta-tarjetas.webp`,
    title: "Porta tarjetas",
    text: "Guarda tus tarjetas en un diseño hecho especialmente para ti.",
  },
  {
    id: "porta-servilletas",
    image: `${PRODUCTS_BASE}/porta-servilletas.webp`,
    title: "Porta servilletas",
    text: "Suma un detalle tejido a tu mesa servida.",
  },
  {
    id: "personajes",
    image: `${PRODUCTS_BASE}/personajes-de-caricatura.webp`,
    title: "Personajes de caricatura",
    text: "Convierte tu personaje o estilo favorito en una pieza tejida, con un diseño propio inspirado en lo que más te gusta.",
  },
  {
    id: "set-de-bebe",
    image: `${PRODUCTS_BASE}/set-de-bebe.webp`,
    title: "Set de Bebé personalizado",
    text: "Piezas decorativas y de recuerdo tejidas a mano para acompañar la llegada de un bebé.",
  },
];

// Shown as a discreet note near any section that displays conceptual/
// reference photography (catalog, product galleries, Creaciones, The
// Creative Yarn Box) rather than a photo of a specific customer's order.
export const REFERENCE_IMAGE_NOTE = "Imagen de referencia — cada pieza se realiza de manera personalizada.";

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
    title: "Una presentación cuidada",
    text: "Cada pieza se prepara con una presentación acorde a Creative Yarn JM.",
  },
  {
    title: "Detalles que pueden variar",
    text: "Según el producto, tu pedido puede incluir una tarjeta, una ficha de cuidado u otros detalles de presentación.",
  },
  {
    title: "Pensada para regalar",
    text: "Buscamos que abrir tu pedido se sienta parte de la experiencia, cuando el producto lo permite.",
  },
  {
    title: "Sujeta a disponibilidad",
    text: "Los componentes exactos de la presentación se confirman según tu pedido.",
  },
];

export const BRAND_STORY = {
  eyebrow: "📖 La historia detrás del hilo",
  title: "Cada hilo cuenta algo.",
  intro: "Antes de ser una marca, Creative Yarn JM es un recuerdo.",
  paragraphs: [
    "Todo comenzó junto a mi tía Jean Marie, con lanas, una aguja y plastic canvas.",
    "Desde pequeña aprendí de ella el arte de crear con las manos — verla convertir materiales simples en piezas llenas de color, paciencia y creatividad.",
    "Ese aprendizaje se quedó conmigo: un espacio donde podía crear, concentrarme y disfrutar, sin sentir cómo pasaba el tiempo.",
  ],
  visionHeading: "De un recuerdo a una visión",
  visionParagraphs: [
    "Con los años, esas primeras puntadas se convirtieron en inspiración.",
    "Así nació Creative Yarn JM: con el deseo de llevar ese arte a un nuevo nivel, transformando una tradición hecha a mano en piezas modernas, personalizadas y pensadas para formar parte de la vida de otras personas.",
  ],
  featuredQuote: "Un hilo que conecta una idea con un recuerdo.",
  closingParagraphs: [
    "Creative Yarn JM lleva su nombre en honor a ella, Jean Marie — una forma de honrar lo que me enseñó.",
    "Hoy, aquel aprendizaje continúa en cada diseño, cada color y cada puntada hecha a mano.",
  ],
  signature: "JM",
};

export const CHRISTMAS_TEASER = {
  eyebrow: "Navidad",
  title: "Algo especial está en camino.",
  text: "Estamos preparando una colección navideña hecha a mano, pensada para regalar y para decorar. Muy pronto vas a poder verla completa.",
  cta: "Avísame cuando esté disponible",
};

export const STEPS = [
  { number: "01", title: "Elige tu pieza", text: "Explora el catálogo y encuentra el producto que quieres personalizar." },
  { number: "02", title: "Personalízala", text: "Elige variante, colores, nombres y todo lo que quieras agregar a tu idea." },
  { number: "03", title: "Solicita tu cotización", text: "Envíanos tu solicitud por WhatsApp con todos los detalles." },
  { number: "04", title: "Confirma y realiza el pago", text: "Revisamos tu solicitud, confirmamos los detalles y realizas el pago completo." },
  { number: "05", title: "Creamos tu pieza", text: "Tu pieza es elaborada cuidadosamente a mano, una vez confirmado el pago." },
  { number: "06", title: "Coordinamos la entrega", text: "Preparamos tu pieza y coordinamos contigo el método de entrega." },
];

// Single source of truth for every occasion selectable anywhere on the site —
// currently the "Tipo de ocasión" field on the Gift Boxes product page (see
// products.js). Names are normalized to one canonical spelling each
// (singular, consistent accents) so the same occasion never reads
// differently in two places.
export const OCCASIONS = [
  "Cumpleaños",
  "Graduación",
  "San Valentín",
  "Día de la Madre",
  "Día del Padre",
  "Aniversario",
  "Navidad",
  "Amistad",
  "Amantes de las mascotas",
  "Nuevo hogar",
  "Logro especial",
];

export const ORDER_PROCESS_STEPS = [
  "Elige tu pieza",
  "Personalízala",
  "Solicita tu cotización por WhatsApp",
  "Confirma y realiza el pago completo",
  "Creamos tu pieza",
  "Coordinamos la entrega",
];

// Placeholder testimonials — replace with real customer reviews when available.
// No real testimonials yet — keep this empty rather than inventing reviews.
// Testimonials.jsx shows a neutral "collecting first experiences" message
// while this is empty. Add real { name, stars, text } entries when available.
export const TESTIMONIALS = [];

export const FAQ_ITEMS = [
  {
    q: "¿Cómo puedo realizar un pedido?",
    a: "Elige un producto en la sección Personalizados, elige su variante, personalízalo y presiona “Solicitar cotización por WhatsApp”: se abrirá WhatsApp con los detalles de tu solicitud para que nos la envíes. También puedes escribirnos directamente por WhatsApp. Revisamos tu solicitud y te confirmamos la cotización, disponibilidad y los siguientes pasos.",
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
    a: "Puedes solicitar la cancelación de tu pedido. Si ya realizaste el pago y todavía no comenzamos la producción, podemos devolverte el monto pagado, descontando los gastos que ya se hayan generado específicamente para tu pedido. Una vez que comenzamos a elaborar una pieza personalizada, la cancelación por cambio de opinión ya no procede y el pago realizado no es reembolsable por esa cancelación.",
  },
  {
    q: "¿Puedo devolver un producto personalizado?",
    a: "Si el error o defecto es atribuible a Creative Yarn JM, reemplazamos tu pieza sin costo adicional. Si el problema se debe a información que tú nos proporcionaste (nombres, colores, fechas u otros datos), no se considera un error nuestro, pero puedes escribirnos para que revisemos tu caso. Las pequeñas variaciones propias de un trabajo hecho a mano no se consideran defectos.",
  },
  {
    q: "¿Qué ocurre si mi paquete llega dañado?",
    a: "Creative Yarn JM es responsable del estado de tu pieza hasta que la recibes. Si el daño ya estaba presente al momento de la entrega, contáctanos con fotografías apenas lo recibas: evaluaremos tu caso y aplicaremos la solución correspondiente. No somos responsables por daños ocurridos después de que recibiste y manipulaste tu pedido.",
  },
  {
    q: "¿Por qué no aparecen precios en la página?",
    a: "Porque cada pieza se cotiza según el producto, el tamaño o variante, el diseño, el nivel de personalización, la cantidad y otros detalles de tu solicitud. Al enviarnos tu idea por WhatsApp, te confirmamos la cotización correspondiente.",
  },
  {
    q: "¿Qué es The Creative Yarn Box?",
    a: "Es el concepto de presentación de Creative Yarn JM, distinto del producto Gift Boxes personalizados. Según el producto, tu pedido puede prepararse con una presentación especial — los detalles exactos se confirman al momento de tu cotización.",
  },
  {
    q: "¿Cuándo debo realizar el pago?",
    a: "El pago completo se realiza después de que aceptas la cotización y antes de que comience la producción de tu pieza. Enviar tu solicitud por WhatsApp no inicia la producción por sí solo.",
  },
  {
    q: "¿Qué ocurre si cancelo después de iniciada la producción?",
    a: "Una vez que comenzamos a elaborar tu pieza personalizada, la cancelación por cambio de opinión ya no procede y el pago realizado no es reembolsable por esa cancelación.",
  },
  {
    q: "¿Mi pieza será idéntica a la imagen de referencia?",
    a: "No necesariamente. Cada pieza es hecha a mano, por lo que puede presentar variaciones razonables en puntadas, tonalidad, posición de detalles o acabado respecto a la imagen de referencia.",
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
    metaDescription: "Cómo Creative Yarn usa la información que compartes a través de este sitio.",
    hubSummary: "Cómo usamos la información que nos compartes.",
    intro: "Esta página explica qué información puedes compartirnos a través de este sitio y cómo la usamos.",
    sections: [
      {
        heading: "Qué información puedes compartirnos",
        body: [
          "Al escribirnos por WhatsApp, o al solicitar una cotización desde la página de un producto (lo que abre WhatsApp con los detalles de tu solicitud), puedes compartirnos información como:",
        ],
        list: [
          "Nombre",
          "WhatsApp u otro dato de contacto",
          "Correo electrónico (opcional)",
          "Detalles de tu pedido o idea",
          "Detalles de personalización — nombres, fechas, frases, colores",
          "Una imagen de referencia, si eliges compartir una — incluidas imágenes que envíes más adelante dentro de la conversación de WhatsApp",
          "Información necesaria para coordinar tu entrega, cuando corresponda",
          "Cualquier otra información que decidas escribirnos voluntariamente",
        ],
      },
      {
        heading: "Para qué usamos esa información",
        body: ["Usamos la información que nos compartes únicamente para:"],
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
          "Tomamos medidas razonables para proteger la información que nos compartes, y no la usamos para fines distintos a los descritos en esta página.",
        ],
      },
      {
        heading: "Conservación de la información",
        body: [
          "La información que gestionamos directamente la conservamos durante el tiempo razonablemente necesario para atender tu solicitud o pedido, brindarte seguimiento relacionado y cumplir obligaciones aplicables cuando corresponda.",
        ],
      },
      {
        heading: "Cuándo compartimos información con terceros",
        body: [
          "Si para coordinar la entrega de tu pedido fuera necesario compartir información con un proveedor externo, compartiríamos únicamente la información razonablemente necesaria para gestionar esa entrega.",
        ],
      },
      {
        heading: "Continuar por WhatsApp",
        body: [
          "Este sitio te permite continuar tu solicitud a través de WhatsApp. Cuando decides continuar por ese medio, la información que envíes queda sujeta también al funcionamiento y las políticas de privacidad del proveedor de WhatsApp.",
        ],
      },
      {
        heading: "Servicios de terceros",
        body: [
          "Este sitio carga las tipografías de su diseño desde Google Fonts, un servicio externo.",
          "Creative Yarn JM puede utilizar Cloudflare Web Analytics para obtener métricas generales sobre el uso y rendimiento del sitio. Según la configuración actualmente utilizada, esta medición no requiere cookies de seguimiento en tu navegador.",
        ],
      },
      {
        heading: "Contacto",
        body: ["Si tienes preguntas sobre esta política, puedes escribirnos por WhatsApp desde cualquier página del sitio."],
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
          "Las imágenes y ejemplos de este sitio son de referencia — muestran lo que es posible, no un catálogo cerrado de piezas idénticas.",
          "Cada pieza es hecha a mano, por lo que puede presentar pequeñas variaciones razonables respecto a la imagen de referencia y respecto a otras creaciones — en puntadas, posición de detalles, tonalidad, dimensiones o acabado. No prometemos una reproducción idéntica, punto por punto, de una imagen de referencia.",
          "Los colores pueden variar también según el material disponible y la pantalla en la que estés viendo este sitio.",
          "Estas variaciones son propias del trabajo artesanal y no se consideran, por sí mismas, un defecto.",
        ],
      },
      {
        heading: "Tu pedido: una solicitud, no una compra confirmada",
        body: [
          "Solicitar una cotización desde la página de un producto, o escribirnos por WhatsApp, es una solicitud — no una compra ni un pedido confirmado de forma automática.",
          "Revisamos tu solicitud y te comunicamos la cotización correspondiente. Tú decides si la aceptas.",
        ],
      },
      {
        heading: "Cotización, pago y producción",
        body: [
          "Creative Yarn JM requiere el pago completo de tu pedido antes de comenzar la producción de tu pieza.",
          "Tu pedido se considera confirmado una vez que: acordamos los detalles relevantes, aceptaste la cotización, y confirmamos la recepción de tu pago completo.",
          "La producción no comienza únicamente porque hayas enviado una solicitud — comienza después de que el pago completo fue confirmado.",
        ],
      },
      {
        heading: "Cancelaciones",
        body: [
          "Si solicitas cancelar tu pedido antes de que comencemos la producción, y ya realizaste el pago, podemos devolverte el monto pagado, descontando los gastos que ya se hayan generado específicamente para tu pedido. El monto a devolver dependerá de los gastos efectivamente incurridos hasta ese momento.",
          "Una vez que comenzamos la producción de tu pieza personalizada, la cancelación por cambio de opinión ya no procede. El pago realizado no es reembolsable por esa cancelación — al iniciar la producción ya reservamos tiempo de elaboración y, en muchos casos, utilizamos materiales específicamente para tu pedido.",
          "Esta regla aplica a cancelaciones por decisión del cliente. No aplica a errores o defectos atribuibles a Creative Yarn JM, que se manejan según se explica más abajo.",
        ],
      },
      {
        heading: "Creaciones personalizadas",
        body: [
          "Eres responsable de la información que nos proporciones para personalizar tu pieza, como nombres, iniciales, fechas, frases, colores y otros detalles de referencia — te recomendamos revisarla bien antes de aprobar tu pedido.",
          "Hacemos nuestro mejor esfuerzo para reflejar exactamente lo que nos compartiste y aprobaste.",
        ],
      },
      {
        heading: "Errores y defectos",
        body: [
          "Si tu pieza presenta un error o defecto atribuible a Creative Yarn JM (por ejemplo, un dato elaborado incorrectamente pese a que tú nos proporcionaste y aprobaste el dato correcto, o un color o diseño equivocado por error de producción), la reemplazamos sin costo adicional para ti.",
          "Si el error se origina en información que tú nos proporcionaste, no se trata como un error de Creative Yarn JM — igual puedes escribirnos para que evaluemos tu caso.",
          "Las variaciones razonables propias del trabajo artesanal, descritas más arriba, no se consideran un error ni un defecto.",
        ],
      },
      {
        heading: "Personajes, marcas y contenido de terceros",
        body: [
          "Algunas solicitudes pueden incluir personajes, logotipos, marcas u otro contenido de terceros. Estas solicitudes están sujetas a revisión por parte de Creative Yarn JM, que podrá solicitar ajustes, limitar o rechazar una solicitud cuando corresponda.",
        ],
      },
      {
        heading: "Fotografías de nuestras creaciones",
        body: [
          "Creative Yarn JM puede fotografiar y documentar las piezas que elabora para fines de portafolio, sitio web y contenido de marca, incluyendo redes sociales.",
          "Cuando una pieza contenga información personal identificable del cliente (por ejemplo, un nombre completo u otro dato privado), dicha información no será publicada de forma identificable sin autorización del cliente.",
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
      {
        heading: "Retiro de tu pedido",
        body: [
          "Cuando tu pedido esté listo para retiro, te avisaremos. Conservaremos tu pedido durante 14 días a partir de ese aviso.",
          "Si no puedes retirarlo dentro de ese plazo, escríbenos para coordinar la situación de tu pedido.",
        ],
      },
      {
        heading: "Dirección y datos de entrega",
        body: [
          "Eres responsable de proporcionarnos correctamente la información necesaria para coordinar tu entrega, como tu dirección y datos de contacto.",
        ],
      },
      {
        heading: "Daño durante el transporte",
        body: [
          "Creative Yarn JM es responsable del estado de tu pieza hasta que tú o la persona destinataria la recibe, incluso cuando la entrega involucra a un tercero.",
          "Si tu pedido presenta daños que ya estaban presentes al momento de la entrega, escríbenos lo antes posible: evaluaremos tu caso y aplicaremos la solución correspondiente según nuestras políticas vigentes.",
          "Creative Yarn JM no es responsable por daños ocurridos después de que recibiste tu pedido, originados por el uso, la manipulación, un accidente o un almacenamiento inadecuado de tu parte.",
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
    intro: "Como cada pieza personalizada se crea especialmente para ti, la tratamos distinto a un producto genérico. Así abordamos cada situación:",
    sections: [
      {
        heading: "Cambio de opinión antes de iniciar producción",
        body: [
          "Si solicitas cancelar tu pedido antes de que comencemos la producción, y ya realizaste el pago, podemos devolverte el monto pagado, descontando los gastos que ya se hayan generado específicamente para tu pedido.",
        ],
      },
      {
        heading: "Cambio de opinión después de iniciada la producción",
        body: [
          "Una vez que comenzamos la producción de tu pieza personalizada, la cancelación por cambio de opinión ya no procede, y el pago realizado no es reembolsable por esa cancelación.",
        ],
      },
      {
        heading: "Error o pieza incorrecta atribuible a Creative Yarn JM",
        body: [
          "Si tu pieza presenta un error o defecto de elaboración, o no corresponde con lo que acordamos, atribuible a Creative Yarn JM, la reemplazamos sin costo adicional para ti.",
        ],
      },
      {
        heading: "Error en la información que tú nos proporcionaste",
        body: [
          "Si el error se origina en nombres, colores, fechas u otros datos que tú nos proporcionaste y aprobaste, no se considera un error de Creative Yarn JM. Igual puedes escribirnos para que evaluemos tu caso.",
        ],
      },
      {
        heading: "Variaciones razonables del trabajo artesanal",
        body: [
          "Cada pieza es hecha a mano, por lo que puede presentar pequeñas variaciones razonables en puntadas, tonalidad, posición de detalles o acabado. Estas variaciones no constituyen, por sí mismas, un defecto.",
        ],
      },
      {
        heading: "Daño durante el transporte",
        body: [
          "Creative Yarn JM es responsable del estado de tu pieza hasta que la recibes. Si el daño ya estaba presente al momento de la entrega, escríbenos lo antes posible: evaluaremos tu caso y aplicaremos la solución correspondiente.",
          "No somos responsables por daños ocurridos después de que recibiste y manipulaste tu pedido.",
        ],
      },
      {
        heading: "Otros casos",
        body: [
          "Cualquier situación no descrita arriba la evaluamos directamente contigo. Si tienes dudas antes de confirmar tu pedido, puedes consultarnos por WhatsApp.",
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
          "Maneja tu pieza hecha a mano con cuidado.",
          "Evita tirar o cortar los hilos.",
          "Mantenla alejada de humedad excesiva.",
          "Mantenla alejada de fuentes de calor excesivo.",
          "Evita apoyar peso excesivo sobre piezas delicadas.",
          "Guárdala en su bolsa protectora cuando corresponda.",
          "Límpiala con métodos suaves, apropiados para el tipo de producto.",
          "No la laves de forma agresiva ni en lavadora, a menos que te indiquemos específicamente que ese producto lo permite.",
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
