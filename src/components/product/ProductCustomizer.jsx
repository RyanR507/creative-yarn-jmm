import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../../animations/gsapSetup";
import { trackEvent } from "../../utils/analytics";
import { buildProductOrderMessage, openWhatsAppOrder } from "../../utils/whatsappOrder";
import StyleSelector from "./StyleSelector";
import ProductOptions from "./ProductOptions";
import QuantitySelector from "./QuantitySelector";
import "./ProductCustomizer.css";

const initialStatus = { state: "idle" };
const TRUST_POINTS = ["Hecho a mano", "Personalizable", "Creado especialmente para ti"];

export default function ProductCustomizer({ product, onStyleChange }) {
  const [selectedStyle, setSelectedStyleState] = useState(product.styles[0]?.id || "");

  // Mirrors the selected style up to ProductPage so the gallery can swap to
  // that variant's own photos once per-variant images exist (see
  // products.js) — purely additive, no behavior change while they don't.
  function setSelectedStyle(id) {
    setSelectedStyleState(id);
    onStyleChange?.(id);
  }
  const [values, setValues] = useState({});
  const [quantity, setQuantity] = useState("1");
  const [hasImage, setHasImage] = useState(false);
  const [notes, setNotes] = useState("");
  const [nombre, setNombre] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState(initialStatus);
  const startedRef = useRef(false);
  const successRef = useRef(null);

  useEffect(() => {
    if (status.state !== "success") return;
    successRef.current?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
  }, [status.state]);

  function markStarted() {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent("create_idea_start", { product: product.id });
  }

  function setFieldValue(key, value) {
    markStarted();
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function visibleFields() {
    return product.fields.filter((f) => !f.showWhen || f.showWhen.includes(selectedStyle));
  }

  function missingRequiredField() {
    return visibleFields().find((f) => {
      const isRequired = f.required || f.requiredWhen?.includes(selectedStyle);
      return isRequired && !values[f.key]?.trim();
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (product.styles.length && !selectedStyle) {
      setError("Elige un estilo antes de continuar.");
      return;
    }
    const missing = missingRequiredField();
    if (missing) {
      setError(`Contanos "${missing.label}" antes de enviar.`);
      return;
    }
    if (!nombre.trim() || !whatsapp.trim()) {
      setError("Contanos tu nombre y tu WhatsApp antes de enviar.");
      return;
    }

    setError("");

    const styleLabel = product.styles.find((s) => s.id === selectedStyle)?.label;
    const entries = visibleFields().map((f) => ({ label: f.label, value: values[f.key]?.trim() }));

    const message = buildProductOrderMessage({
      productName: product.title,
      styleLabel,
      quantity,
      entries,
      notes: notes.trim(),
      contact: { nombre: nombre.trim(), whatsapp: whatsapp.trim(), email: email.trim() },
      hasImage,
    });

    const { opened, url } = openWhatsAppOrder(message);
    if (!opened) {
      setStatus({
        state: "error",
        message:
          "No pudimos abrir WhatsApp automáticamente (puede que tu navegador haya bloqueado la ventana). Usa el botón de abajo para enviarnos tu idea por WhatsApp.",
        whatsappUrl: url,
      });
      return;
    }

    setStatus({ state: "success", whatsappUrl: url });
    trackEvent("create_idea_submit", { product: product.id });
  }

  function startOver() {
    setStatus(initialStatus);
    setValues({});
    setNotes("");
    setHasImage(false);
    setQuantity("1");
  }

  if (status.state === "success") {
    return (
      <div className="product-customizer__success" ref={successRef}>
        <span className="product-customizer__success-icon" aria-hidden="true">
          🧶
        </span>
        <h3>¡Tu idea está lista para enviar!</h3>
        <p>
          WhatsApp se abrió con los detalles de tu solicitud. Envíanos el mensaje y, si tienes
          una imagen de referencia, adjúntala directamente en el chat.
        </p>
        <div className="product-customizer__success-actions">
          <a
            className="btn btn-primary"
            href={status.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("whatsapp_click", { source: "product_customizer_success" })}
          >
            Hablar por WhatsApp
          </a>
          <button type="button" className="btn btn-outline" onClick={startOver}>
            Crear otra idea
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="product-customizer" onSubmit={handleSubmit} noValidate>
      <StyleSelector styles={product.styles} value={selectedStyle} onChange={setSelectedStyle} />

      <ProductOptions
        fields={product.fields}
        selectedStyle={selectedStyle}
        values={values}
        onChange={setFieldValue}
      />

      <QuantitySelector value={quantity} onChange={setQuantity} />

      <label className={`product-customizer__image-toggle ${hasImage ? "is-selected" : ""}`}>
        <input
          type="checkbox"
          checked={hasImage}
          onChange={(e) => setHasImage(e.target.checked)}
        />
        <span>¿Tienes una imagen de referencia?</span>
        <em>Sí, la enviaré por WhatsApp</em>
      </label>

      <label className="product-field product-field--wide">
        <span>Notas adicionales</span>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="¿Hay algo más que quieras contarnos sobre tu idea?"
        />
      </label>

      <div className="product-customizer__contact">
        <p className="product-customizer__contact-heading">Tus datos de contacto</p>
        <label className="product-field">
          <span>Nombre *</span>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} autoComplete="name" />
        </label>
        <label className="product-field">
          <span>WhatsApp *</span>
          <input type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} autoComplete="tel" />
        </label>
        <label className="product-field product-field--wide">
          <span>Email</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        </label>
      </div>

      <div className="product-customizer__submit">
        <button className="btn product-customizer__cta" type="submit">
          Crear mi idea
        </button>
        <p className="product-customizer__note">
          Te contactaremos para confirmar precio, disponibilidad y tiempo de elaboración.
        </p>
        {error && (
          <p className="product-customizer__status product-customizer__status--error" role="alert">
            {error}
          </p>
        )}
        {status.state === "error" && (
          <div className="product-customizer__status product-customizer__status--error" role="alert">
            <p>{status.message}</p>
            <a
              className="btn btn-outline"
              href={status.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { source: "product_customizer_error" })}
            >
              Hablar por WhatsApp
            </a>
          </div>
        )}
      </div>

      <ul className="product-customizer__trust">
        {TRUST_POINTS.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </form>
  );
}
