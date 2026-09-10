import { useState } from "react";
import { useScrollReveal } from "../animations/useScrollReveal";
import { ORDER_FORM_ENDPOINT, getWhatsAppLink } from "../data/config";
import "./OrderForm.css";

const initialStatus = { state: "idle", message: "" };

export default function OrderForm() {
  const scopeRef = useScrollReveal();
  const [status, setStatus] = useState(initialStatus);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatus(initialStatus);

    const form = e.target;
    const data = new FormData(form);

    try {
      if (ORDER_FORM_ENDPOINT) {
        // Real integration path — point ORDER_FORM_ENDPOINT (src/data/config.js)
        // at a Formspree / Netlify Forms / custom backend URL to go live.
        const res = await fetch(ORDER_FORM_ENDPOINT, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error("submit-failed");
      } else {
        // Test mode: no endpoint configured yet, simulate a successful send.
        await new Promise((resolve) => setTimeout(resolve, 700));
      }

      setStatus({
        state: "success",
        message: "¡Gracias! Recibimos tu idea y te contactaremos muy pronto.",
      });
      form.reset();
    } catch {
      setStatus({
        state: "error",
        message: "No pudimos enviar tu idea. Intenta de nuevo o escríbenos por WhatsApp.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="formulario-pedido" className="order-form" ref={scopeRef}>
      <div className="container" data-reveal-group>
        <div className="section-head center">
          <p className="eyebrow" data-reveal>
            Pedido personalizado
          </p>
          <h2 className="section-title center" data-reveal>
            Cuéntanos tu idea.
          </h2>
          <p className="section-subtitle center" data-reveal>
            Completa el formulario con el mayor detalle posible — mientras más nos
            cuentes, mejor podremos diseñar tu pieza.
          </p>
        </div>

        <div className="order-form__quick" data-reveal>
          <p className="order-form__quick-title">¿Prefieres algo rápido?</p>
          <p className="order-form__quick-text">
            Escríbenos por WhatsApp y cuéntanos qué tienes en mente.
          </p>
          <a
            className="btn btn-primary"
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
          >
            Hablar por WhatsApp
          </a>
        </div>

        <form className="order-form__grid" onSubmit={handleSubmit} data-reveal noValidate>
          <Field label="Nombre" name="nombre" required autoComplete="name" />
          <Field label="Correo electrónico" name="email" type="email" required autoComplete="email" />
          <Field label="WhatsApp" name="whatsapp" type="tel" required autoComplete="tel" />
          <Field label="Tipo de pieza" name="tipo_pieza" />
          <Field label="Ocasión" name="ocasion" />
          <Field label="Tamaño aproximado" name="tamano" />
          <Field label="Colores preferidos" name="colores" />
          <Field label="Nombre(s) a incluir" name="nombres_incluir" />
          <Field label="Fecha(s) a incluir" name="fechas" />
          <Field label="Presupuesto aproximado" name="presupuesto" />
          <SelectField
            label="Método de entrega preferido"
            name="entrega"
            options={["Retiro / pickup", "Envío estándar", "Envío express", "Envío internacional"]}
          />

          <TextAreaField label="Frase o mensaje" name="frase" className="span-2" />
          <TextAreaField
            label="Describe tu idea"
            name="descripcion"
            required
            className="span-2"
            rows={5}
          />

          <label className="order-form__checkbox span-2">
            <input type="checkbox" name="acepta_terminos" required />
            <span>
              Entiendo que los pedidos personalizados requieren aprobación antes de
              comenzar la producción.
            </span>
          </label>

          <div className="span-2 order-form__submit">
            <button className="btn btn-primary" type="submit" disabled={submitting}>
              {submitting ? "Enviando..." : "Enviar mi idea"}
            </button>
            {status.state !== "idle" && (
              <p className={`order-form__status order-form__status--${status.state}`} role="status">
                {status.message}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", required, autoComplete, className = "" }) {
  return (
    <label className={`order-form__field ${className}`}>
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
    <label className="order-form__field">
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

function TextAreaField({ label, name, required, className = "", rows = 3 }) {
  return (
    <label className={`order-form__field ${className}`}>
      <span>
        {label}
        {required && <em aria-hidden="true"> *</em>}
      </span>
      <textarea name={name} required={required} rows={rows} />
    </label>
  );
}
