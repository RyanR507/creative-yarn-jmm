import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../../animations/gsapSetup";
import { trackEvent } from "../../utils/analytics";
import { buildProductOrderMessage, openWhatsAppOrder } from "../../utils/whatsappOrder";
import {
  getAvailableStyles,
  getDefaultStyleId,
  getDefaultVariantId,
  getSetContents,
  getSetInfo,
  getVisibleFields,
  isFieldRequired,
} from "../../data/products";
import StyleSelector from "./StyleSelector";
import ProductOptions from "./ProductOptions";
import QuantitySelector from "./QuantitySelector";
import "./ProductCustomizer.css";

const initialStatus = { state: "idle" };
const TRUST_POINTS = ["Hecho a mano", "Personalizable", "Creado especialmente para ti"];

export default function ProductCustomizer({ product, onStyleChange, onVariantChange }) {
  const [selectedVariantId, setSelectedVariantIdState] = useState(() => getDefaultVariantId(product));
  const [selectedStyle, setSelectedStyleState] = useState(() => getDefaultStyleId(product, getDefaultVariantId(product)));
  const [values, setValues] = useState({});
  const [quantity, setQuantity] = useState("1");
  const [hasImage, setHasImage] = useState(false);
  const [notes, setNotes] = useState("");
  const [nombre, setNombre] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [hasDisplay, setHasDisplay] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState(initialStatus);
  const startedRef = useRef(false);
  const successRef = useRef(null);

  // Both selections are mirrored up to ProductPage: the style so the gallery
  // can swap to that variant's own photos once they exist, the variant so
  // the accordion can show the right variant's content list. Purely
  // additive callbacks.
  function setSelectedStyle(id) {
    setSelectedStyleState(id);
    onStyleChange?.(id);
  }

  // Variant = the primary choice; style = a secondary, independent choice
  // that can be restricted to certain variants (see forVariants in
  // products.js — e.g. Portadas' "Personaje" theme only exists for its
  // "Diseño especial" variant). When the new variant doesn't offer the
  // current style, fall back to its first valid one so a contradictory
  // combination can never be submitted.
  function setSelectedVariantId(id) {
    setSelectedVariantIdState(id);
    onVariantChange?.(id);
    const allowed = getAvailableStyles(product, id);
    if (!allowed.some((s) => s.id === selectedStyle)) {
      setSelectedStyle(allowed[0]?.id || "");
    }
  }

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

  const variant = product.variants.find((v) => v.id === selectedVariantId) ?? null;
  const availableStyles = getAvailableStyles(product, selectedVariantId);
  const visibleFields = getVisibleFields(product, selectedVariantId, selectedStyle, values);
  const setInfo = getSetInfo(variant, quantity);
  const setContents = getSetContents(product, variant);

  function missingRequiredField() {
    return visibleFields.find((f) => isFieldRequired(f, selectedVariantId, selectedStyle) && !values[f.key]?.trim());
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (availableStyles.length && !selectedStyle) {
      setError(`Elige un ${product.styleNoun.toLowerCase()} antes de continuar.`);
      return;
    }
    const missing = missingRequiredField();
    if (missing) {
      setError(`Cuéntanos "${missing.label}" antes de enviar.`);
      return;
    }
    if (!nombre.trim() || !whatsapp.trim()) {
      setError("Cuéntanos tu nombre y tu WhatsApp antes de enviar.");
      return;
    }

    setError("");

    const styleLabel = availableStyles.find((s) => s.id === selectedStyle)?.label;
    const entries = visibleFields
      .filter((f) => f.type !== "toggle")
      .map((f) => ({ label: f.label, value: values[f.key]?.trim?.() ?? values[f.key] }));

    const message = buildProductOrderMessage({
      productName: product.title,
      variantLabel: variant?.label,
      styleLabel,
      styleNoun: product.styleNoun,
      setInfo,
      setContents,
      quantity,
      entries,
      notes: notes.trim(),
      contact: { nombre: nombre.trim(), whatsapp: whatsapp.trim(), email: email.trim() },
      hasImage,
      hasDisplay,
    });

    // A null window from window.open is not reliable proof that WhatsApp was
    // blocked (see openWhatsAppOrder), so there is no error branch: we always
    // land on the "ready to send" panel, which keeps a visible button to open
    // WhatsApp again. `opened` only adds a gentle hint when we got no window.
    const { opened, url } = openWhatsAppOrder(message);
    setStatus({ state: "success", whatsappUrl: url, opened });
    trackEvent("create_idea_submit", { product: product.id });
  }

  function startOver() {
    setStatus(initialStatus);
    setValues({});
    setNotes("");
    setHasImage(false);
    setHasDisplay(false);
    setQuantity("1");
  }

  if (status.state === "success") {
    return (
      <div className="product-customizer__success" ref={successRef}>
        <span className="product-customizer__success-icon" aria-hidden="true">
          🧶
        </span>
        <h3>¡Tu solicitud está lista para enviar!</h3>
        <p>
          Preparamos tu solicitud de cotización en WhatsApp con todos los detalles. Envíanos el
          mensaje y, si tienes una imagen de referencia, adjúntala directamente en el chat.
        </p>
        <p className="product-customizer__success-hint">
          {status.opened
            ? "¿No se abrió WhatsApp? Usa el botón de abajo para continuar."
            : "Si WhatsApp no se abrió automáticamente, usa el botón de abajo para continuar."}
        </p>
        <div className="product-customizer__success-actions">
          <a
            className="btn btn-primary"
            href={status.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("whatsapp_click", { source: "product_customizer_success" })}
          >
            Abrir WhatsApp
          </a>
          <button type="button" className="btn btn-outline" onClick={startOver}>
            Crear otra solicitud
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="product-customizer" onSubmit={handleSubmit} noValidate>
      {product.variants.length > 0 && (
        <StyleSelector
          options={product.variants}
          value={selectedVariantId}
          onChange={setSelectedVariantId}
          legend={product.variantLegend}
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
        variantId={selectedVariantId}
        styleId={selectedStyle}
        values={values}
        onChange={setFieldValue}
      />

      <QuantitySelector
        value={quantity}
        onChange={setQuantity}
        label={setInfo ? "Cantidad de sets" : "Cantidad"}
        hint={setInfo ? `${setInfo.totalPieces} piezas en total (${setInfo.pieces} por set)` : undefined}
      />

      {product.displayEligible && (
        <label className={`product-customizer__image-toggle ${hasDisplay ? "is-selected" : ""}`}>
          <input type="checkbox" checked={hasDisplay} onChange={(e) => setHasDisplay(e.target.checked)} />
          <span>¿Deseas presentación Display especial?</span>
          <em>Sujeta a disponibilidad y cotización</em>
        </label>
      )}

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
          Solicitar cotización por WhatsApp
        </button>
        <p className="product-customizer__note">
          Te contactaremos por WhatsApp para preparar tu cotización, disponibilidad y tiempo de elaboración.
        </p>
        {error && (
          <p className="product-customizer__status product-customizer__status--error" role="alert">
            {error}
          </p>
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
