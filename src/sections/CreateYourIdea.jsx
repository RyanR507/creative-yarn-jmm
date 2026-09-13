import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "../animations/useScrollReveal";
import { prefersReducedMotion } from "../animations/gsapSetup";
import { CATEGORIES, OCCASIONS, ORDER_FLOW_STAGES } from "../data/content";
import { getWhatsAppLink } from "../data/config";
import { trackEvent } from "../utils/analytics";
import "./CreateYourIdea.css";

const initialStatus = { state: "idle", message: "" };
const OTHER_IDEA_ID = "otro";

// Builds a contextual WhatsApp follow-up message from what the customer just
// submitted — only ever includes fields they actually filled in.
function buildFollowUpMessage(submission) {
  if (!submission) return undefined;
  const { nombre, producto, ocasion, descripcion } = submission;
  const ideaSnippet =
    descripcion.length > 160 ? `${descripcion.slice(0, 160).trim()}…` : descripcion;
  let message = `¡Hola Creative Yarn! Soy ${nombre}. Acabo de enviar una solicitud para "${producto}"`;
  if (ocasion) message += ` (${ocasion})`;
  message += `. Mi idea: "${ideaSnippet}". Me gustaría confirmar los detalles con ustedes.`;
  return message;
}

// The full order request, formatted as the WhatsApp message itself — this is
// the actual "submission" now that there's no backend: every field the
// customer filled in travels in the message text. Empty optional fields (and
// their section headers) are left out entirely rather than shown blank.
function buildWhatsAppOrderMessage(fields) {
  const lines = ["✨ NUEVA IDEA — CREATIVE YARN JM", "", "🧶 Producto:", fields.producto, ""];

  lines.push("🔢 Cantidad:", fields.cantidad || "1", "");

  const personalization = [
    fields.nombre_iniciales && `• Nombre / iniciales: ${fields.nombre_iniciales}`,
    fields.frase && `• Frase / texto: ${fields.frase}`,
    fields.colores && `• Colores: ${fields.colores}`,
    fields.ocasion && `• Ocasión: ${fields.ocasion}`,
    fields.personalizacion_adicional && `• Personalización adicional: ${fields.personalizacion_adicional}`,
  ].filter(Boolean);
  if (personalization.length) {
    lines.push("🎨 Personalización", ...personalization, "");
  }

  lines.push("💡 Mi idea:", fields.descripcion, "");

  lines.push("👤 Datos de contacto", `• Nombre: ${fields.nombre}`, `• WhatsApp: ${fields.whatsapp}`);
  if (fields.email) lines.push(`• Email: ${fields.email}`);
  lines.push("");

  if (fields.info_adicional) {
    lines.push("📝 Información adicional:", fields.info_adicional, "");
  }

  if (fields.hasImage) {
    lines.push("📎 Referencia:", "📎 Tengo una imagen de referencia para enviar por este chat.");
  }

  return lines.join("\n").trim();
}

export default function CreateYourIdea({ presetProduct }) {
  const scopeRef = useScrollReveal();
  const [product, setProduct] = useState("");
  const [status, setStatus] = useState(initialStatus);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [lastSubmission, setLastSubmission] = useState(null);
  const startedRef = useRef(false);
  const successRef = useRef(null);

  // Bring the confirmation into view the moment it actually renders — not
  // before. A successful submit can land the customer well below the fold
  // (they've already scrolled through 3 form steps), so without this they'd
  // have to scroll back up manually to see the confirmation at all.
  useEffect(() => {
    if (status.state !== "success") return;
    successRef.current?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
  }, [status.state]);

  function markStarted(productId) {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent("create_idea_start", { product: productId });
  }

  function selectProduct(id) {
    setProduct(id);
    markStarted(id);
  }

  // "Quiero crear el mío" in ProductShowcase sends a product id here — follow
  // it, but only when it actually changes, so it never overwrites a choice
  // the customer makes afterward inside this form. This needs an effect
  // (rather than the render-time adjustment used elsewhere in this file) since
  // it also fires a one-time analytics event — a genuine external side effect.
  useEffect(() => {
    if (!presetProduct) return;
    setProduct(presetProduct);
    markStarted(presetProduct);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presetProduct]);

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    const nombre = (data.get("nombre") || "").toString().trim();
    const whatsapp = (data.get("whatsapp") || "").toString().trim();
    const descripcion = (data.get("descripcion") || "").toString().trim();

    if (!product) {
      setFormError("Elegí una creación (o \"Tengo otra idea\") antes de enviar.");
      return;
    }
    if (!nombre || !whatsapp || !descripcion) {
      setFormError("Contanos tu nombre, tu WhatsApp y tu idea principal antes de enviar.");
      return;
    }

    setFormError("");
    setSubmitting(true);
    setStatus(initialStatus);

    try {
      // No backend: the "submission" is the WhatsApp message itself. Every
      // field the customer filled in gets formatted into one message and
      // opened directly in WhatsApp — they press send from there. A
      // reference image can't travel automatically through this link, so we
      // only ever ask them to attach it manually once the chat is open.
      const producto = (data.get("producto") || "").toString();
      const ocasion = (data.get("ocasion") || "").toString().trim();
      const fileField = data.get("imagen_referencia");
      const hasImage = fileField instanceof File && fileField.size > 0;

      const message = buildWhatsAppOrderMessage({
        producto,
        cantidad: (data.get("cantidad") || "").toString().trim(),
        nombre_iniciales: (data.get("nombre_iniciales") || "").toString().trim(),
        frase: (data.get("frase") || "").toString().trim(),
        colores: (data.get("colores") || "").toString().trim(),
        ocasion,
        personalizacion_adicional: (data.get("personalizacion_adicional") || "").toString().trim(),
        descripcion,
        nombre,
        whatsapp,
        email: (data.get("email") || "").toString().trim(),
        info_adicional: (data.get("info_adicional") || "").toString().trim(),
        hasImage,
      });
      const whatsappUrl = getWhatsAppLink(message);

      const opened = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      if (!opened) {
        // Most likely a popup blocker — the customer's data isn't lost, so
        // hand them the same link as a direct fallback instead of failing
        // silently.
        setStatus({
          state: "error",
          message:
            "No pudimos abrir WhatsApp automáticamente (puede que tu navegador haya bloqueado la ventana). Usá el botón de abajo para enviarnos tu idea por WhatsApp.",
          whatsappUrl,
        });
        return;
      }

      setLastSubmission({ nombre, producto, ocasion, descripcion });
      setStatus({ state: "success", message: "" });
      trackEvent("create_idea_submit", { product });
      form.reset();
      setProduct("");
    } catch {
      setStatus({
        state: "error",
        message:
          "No pudimos preparar tu idea para WhatsApp. Por favor, intentá de nuevo o escribinos directamente.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  function startOver() {
    setStatus(initialStatus);
    setLastSubmission(null);
  }

  return (
    <section id="formulario-pedido" className="create-idea" ref={scopeRef}>
      <div className="container" data-reveal-group>
        <div className="section-head center">
          <p className="eyebrow" data-reveal>
            Crea tu idea
          </p>
          <h2 className="section-title center" data-reveal>
            Tu idea. Nuestro hilo. Una pieza única.
          </h2>
          <p className="section-subtitle center" data-reveal>
            Tú traes la idea. Nosotros la convertimos en una creación hecha a mano.
          </p>
          <p className="create-idea__explainer" data-reveal>
            Cuéntanos qué tienes en mente. Cada pieza de Creative Yarn se personaliza
            según tu idea, la ocasión y tus preferencias. Te contactaremos para
            conversar los detalles, el precio, el tiempo de producción, la entrega y
            el pago.
          </p>
        </div>

        <ol className="create-idea__flow" data-reveal aria-label="Cómo funciona tu pedido">
          {ORDER_FLOW_STAGES.map((stage) => (
            <li key={stage}>{stage}</li>
          ))}
        </ol>

        <div className="create-idea__quick" data-reveal>
          <p className="create-idea__quick-title">¿Prefieres algo rápido?</p>
          <p className="create-idea__quick-text">
            Escríbenos por WhatsApp y cuéntanos qué tienes en mente.
          </p>
          <a
            className="btn btn-primary"
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("whatsapp_click", { source: "create_idea_quick" })}
          >
            Hablar por WhatsApp
          </a>
        </div>

        {status.state === "success" ? (
          <div className="create-idea__success" data-reveal ref={successRef}>
            <span className="create-idea__success-icon" aria-hidden="true">
              🧶
            </span>
            <h3>¡Tu idea está lista para enviar!</h3>
            <p>
              WhatsApp se abrió con los detalles de tu solicitud. Envíanos el mensaje
              y, si tienes una imagen de referencia, adjúntala directamente en el
              chat.
            </p>
            <div className="create-idea__success-actions">
              <a
                className="btn btn-primary"
                href={getWhatsAppLink(buildFollowUpMessage(lastSubmission))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", { source: "create_idea_success" })}
              >
                Hablar por WhatsApp
              </a>
              <button type="button" className="btn btn-outline" onClick={startOver}>
                Crear otra idea
              </button>
            </div>
          </div>
        ) : (
          <form
            className="create-idea__form"
            onSubmit={handleSubmit}
            data-reveal
            noValidate
          >
            <fieldset className="create-idea__step">
              <legend>01 — Elige tu creación</legend>

              <div className="create-idea__products" role="radiogroup" aria-label="Elige tu creación">
                {CATEGORIES.map((cat) => (
                  <label
                    key={cat.id}
                    className={`create-idea__pick ${product === cat.id ? "is-selected" : ""}`}
                  >
                    <input
                      type="radio"
                      name="producto"
                      value={cat.title}
                      checked={product === cat.id}
                      onChange={() => selectProduct(cat.id)}
                    />
                    <img src={cat.image} alt="" loading="lazy" decoding="async" />
                    <span>{cat.title}</span>
                  </label>
                ))}

                <label
                  className={`create-idea__pick create-idea__pick--other ${
                    product === OTHER_IDEA_ID ? "is-selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="producto"
                    value="Otra idea"
                    checked={product === OTHER_IDEA_ID}
                    onChange={() => selectProduct(OTHER_IDEA_ID)}
                  />
                  <span className="create-idea__pick-other-icon" aria-hidden="true">
                    ✨
                  </span>
                  <span>Tengo otra idea</span>
                </label>
              </div>

              <label className="create-idea__field create-idea__quantity">
                <span>Cantidad</span>
                <input type="number" name="cantidad" min="1" defaultValue="1" />
              </label>
            </fieldset>

            <fieldset className="create-idea__step">
              <legend>02 — Hazlo tuyo</legend>
              <p className="create-idea__step-hint">
                ¿Qué te gustaría personalizar? Ningún campo aquí es obligatorio.
              </p>

              <div className="create-idea__grid">
                <Field label="Nombre o iniciales" name="nombre_iniciales" />
                <Field label="Frase o texto" name="frase" />
                <Field label="Colores preferidos" name="colores" />
                <SelectField label="Ocasión" name="ocasion" options={OCCASIONS} />
              </div>

              <Field
                label="Personalización adicional"
                name="personalizacion_adicional"
                className="span-2"
              />

              <TextAreaField
                label="Describe tu idea"
                name="descripcion"
                required
                className="span-2 create-idea__idea-field"
                rows={5}
                placeholder='Ej.: Me gustaría un bolso inspirado en..., con mis iniciales..., usando tonos...'
                hint="¿Hay algún color, personaje, mascota, frase, fecha o detalle que quieras incluir?"
              />

              <label className="create-idea__field span-2">
                <span>¿Tienes una imagen de referencia?</span>
                <input type="file" name="imagen_referencia" accept="image/*" />
                <em className="create-idea__file-hint">
                  Si tienes una foto, dibujo, inspiración o ejemplo, puedes compartirlo con
                  nosotros. Es solo una referencia — no es obligatorio.
                </em>
              </label>
            </fieldset>

            <fieldset className="create-idea__step">
              <legend>03 — Hagamos realidad tu idea</legend>

              <div className="create-idea__grid">
                <Field label="Nombre" name="nombre" required autoComplete="name" />
                <Field label="WhatsApp" name="whatsapp" type="tel" required autoComplete="tel" />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="span-2"
                />
              </div>

              <TextAreaField
                label="Información adicional"
                name="info_adicional"
                className="span-2"
                rows={3}
                placeholder="¿Hay algo más que quieras contarnos?"
              />
            </fieldset>

            <p className="create-idea__emotional">
              Tu idea no tiene que encajar en un catálogo.
              <br />
              Cuéntanos qué estás imaginando, y creemos algo especial.
            </p>

            <div className="create-idea__submit">
              <button className="btn btn-primary" type="submit" disabled={submitting}>
                {submitting ? "Enviando..." : "Enviar mi idea"}
              </button>
              {formError && (
                <p className="create-idea__status create-idea__status--error" role="alert">
                  {formError}
                </p>
              )}
              {status.state === "error" && (
                <div className="create-idea__status create-idea__status--error" role="alert">
                  <p>{status.message}</p>
                  <p>
                    ¿Tu solicitud no pudo enviarse? Puedes escribirnos tu idea directamente
                    por WhatsApp.
                  </p>
                  <a
                    className="btn btn-outline"
                    href={status.whatsappUrl || getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("whatsapp_click", { source: "create_idea_error" })}
                  >
                    Hablar por WhatsApp
                  </a>
                </div>
              )}
            </div>
          </form>
        )}

        <div className="create-idea__commercial-note">
          <h3>Cada creación es diferente.</h3>
          <p>
            Como cada pieza de Creative Yarn es personalizada, el precio, el tiempo de
            producción, la entrega y el pago se confirman personalmente según tu
            pedido.
          </p>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", required, autoComplete, className = "" }) {
  return (
    <label className={`create-idea__field ${className}`}>
      <span>
        {label}
        {required && <em aria-hidden="true"> *</em>}
      </span>
      <input type={type} name={name} required={required} autoComplete={autoComplete} />
    </label>
  );
}

function SelectField({ label, name, options }) {
  return (
    <label className="create-idea__field">
      <span>{label}</span>
      <select name={name} defaultValue="">
        <option value="" disabled>
          Selecciona una opción
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextAreaField({ label, name, required, className = "", rows = 3, placeholder, hint }) {
  return (
    <label className={`create-idea__field ${className}`}>
      <span>
        {label}
        {required && <em aria-hidden="true"> *</em>}
      </span>
      {hint && <small className="create-idea__field-hint">{hint}</small>}
      <textarea name={name} required={required} rows={rows} placeholder={placeholder} />
    </label>
  );
}
