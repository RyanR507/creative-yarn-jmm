import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "../animations/useScrollReveal";
import { CATEGORIES, OCCASION_OPTIONS, ORDER_FLOW_STAGES } from "../data/content";
import { getWhatsAppLink } from "../data/config";
import { trackEvent } from "../utils/analytics";
import "./CreateYourIdea.css";

const initialStatus = { state: "idle", message: "" };
const OTHER_IDEA_ID = "otro";
const FORM_NAME = "creative-yarn-order-request";

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

export default function CreateYourIdea({ presetProduct }) {
  const scopeRef = useScrollReveal();
  const [product, setProduct] = useState("");
  const [status, setStatus] = useState(initialStatus);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [lastSubmission, setLastSubmission] = useState(null);
  const startedRef = useRef(false);

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

  async function handleSubmit(e) {
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
      // Netlify Forms: any POST whose body includes "form-name" matching a
      // form Netlify detected at build time (see the hidden static form in
      // index.html) is captured, stored, and can trigger an email
      // notification — no external endpoint or backend of our own needed.
      // FormData is sent as-is (including the file, if any) so the browser
      // sets the correct multipart Content-Type/boundary itself; setting it
      // manually here would break the upload.
      const res = await fetch("/", { method: "POST", body: data });
      if (!res.ok) throw new Error("submit-failed");

      setLastSubmission({
        nombre,
        producto: (data.get("producto") || "").toString(),
        ocasion: (data.get("ocasion") || "").toString().trim(),
        descripcion,
      });
      setStatus({ state: "success", message: "" });
      trackEvent("create_idea_submit", { product });
      form.reset();
      setProduct("");
    } catch {
      setStatus({
        state: "error",
        message:
          "No pudimos enviar tu idea. Por favor, intentá de nuevo en un momento o escribinos directamente por WhatsApp.",
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
          <div className="create-idea__success" data-reveal>
            <span className="create-idea__success-icon" aria-hidden="true">
              🧶
            </span>
            <h3>¡Recibimos tu idea!</h3>
            <p>
              Gracias por compartir tu creación con Creative Yarn. Revisaremos los
              detalles y nos pondremos en contacto contigo para confirmar tu
              propuesta, precio, producción y entrega.
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
            name={FORM_NAME}
            method="POST"
            data-netlify="true"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            data-reveal
            noValidate
          >
            <input type="hidden" name="form-name" value={FORM_NAME} />
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
                <SelectField label="Ocasión" name="ocasion" options={OCCASION_OPTIONS} />
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
                    href={getWhatsAppLink()}
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
