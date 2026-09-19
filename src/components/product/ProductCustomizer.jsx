import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../../animations/gsapSetup";
import { trackEvent } from "../../utils/analytics";
import { buildProductOrderMessage, openWhatsAppOrder } from "../../utils/whatsappOrder";
import {
  estimateSubtotal,
  getAvailableStyles,
  getDefaultStyleId,
  getPriceInfo,
  getSetInfo,
  getVisibleFields,
  resolveVariant,
} from "../../data/products";
import StyleSelector from "./StyleSelector";
import ProductOptions from "./ProductOptions";
import QuantitySelector from "./QuantitySelector";
import "./ProductCustomizer.css";

const initialStatus = { state: "idle" };
const TRUST_POINTS = ["Hecho a mano", "Personalizable", "Creado especialmente para ti"];

export default function ProductCustomizer({ product, onStyleChange, onVariantChange }) {
  const [selectedStyle, setSelectedStyleState] = useState(() => getDefaultStyleId(product));
  const [selectedVariantId, setSelectedVariantIdState] = useState(product.variants[0].id);

  // Both selections are mirrored up to ProductPage: the style so the gallery
  // can swap to that variant's own photos once they exist, the variant so
  // the price area above updates. Purely additive callbacks.
  function setSelectedStyle(id) {
    setSelectedStyleState(id);
    onStyleChange?.(id);
  }

  // Variant = what changes the price; style/theme = the look within it. When
  // the new variant doesn't offer the current theme (e.g. Portadas: switching
  // from "Personaje" back to "Sencilla"), fall back to its first valid theme
  // so a contradictory combination can never be submitted.
  function setSelectedVariantId(id) {
    setSelectedVariantIdState(id);
    onVariantChange?.(id);
    const nextVariant = product.variants.find((v) => v.id === id);
    const allowed = getAvailableStyles(product, nextVariant);
    if (!allowed.some((s) => s.id === selectedStyle)) {
      setSelectedStyle(allowed[0]?.id || "");
    }
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

  const variant = resolveVariant(product, selectedStyle, selectedVariantId);
  const availableStyles = getAvailableStyles(product, variant);
  const visibleFields = getVisibleFields(product, selectedStyle, variant);
  const setInfo = getSetInfo(variant, quantity);

  function missingRequiredField() {
    return visibleFields.find((f) => {
      const isRequired = f.required || f.requiredWhen?.includes(selectedStyle);
      return isRequired && !values[f.key]?.trim();
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (availableStyles.length && !selectedStyle) {
      setError(`Elige un ${product.styleNoun.toLowerCase()} antes de continuar.`);
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

    const priceInfo = getPriceInfo(product, variant);
    // When the style pills double as price variants (Llaveros) the variant
    // line already says it — don't repeat it as a separate "estilo".
    const styleLabel = product.variantsLinkedToStyles
      ? undefined
      : availableStyles.find((s) => s.id === selectedStyle)?.label;
    const entries = visibleFields.map((f) => ({ label: f.label, value: values[f.key]?.trim() }));

    const message = buildProductOrderMessage({
      productName: product.title,
      variantLabel: variant.label,
      styleLabel,
      styleNoun: product.styleNoun,
      priceDisplay: priceInfo.display,
      subtotal: estimateSubtotal(priceInfo, quantity),
      setInfo,
      priceNote: product.priceNote,
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
      {!product.variantsLinkedToStyles && (
        <StyleSelector
          options={product.variants}
          value={selectedVariantId}
          onChange={setSelectedVariantId}
          legend="Elige tu opción"
          name="variante"
        />
      )}

      <StyleSelector
        options={availableStyles}
        value={selectedStyle}
        onChange={setSelectedStyle}
        legend={`Escoge tu ${product.styleNoun.toLowerCase()}`}
        name="estilo"
      />

      <ProductOptions
        fields={visibleFields}
        selectedStyle={selectedStyle}
        values={values}
        onChange={setFieldValue}
      />

      <QuantitySelector
        value={quantity}
        onChange={setQuantity}
        label={setInfo ? "Cantidad de sets" : "Cantidad"}
        hint={setInfo ? `${setInfo.totalPieces} piezas en total (${setInfo.pieces} por set)` : undefined}
      />

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
