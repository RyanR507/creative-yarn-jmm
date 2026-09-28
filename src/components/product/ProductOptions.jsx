import { isFieldRequired } from "../../data/products";
import ColorSelector from "./ColorSelector";

// Renders the fields it is given — the parent has already narrowed them to
// the current variant + style + form values (see getVisibleFields in
// products.js), e.g. "¿Qué letra quieres?" only for the Llaveros "letra"
// variant. `variantId`/`styleId` are only used here to mark which fields are
// required right now.
export default function ProductOptions({ fields, variantId, styleId, values, onChange }) {
  if (!fields.length) return null;

  return (
    <div className="product-options">
      {fields.map((field) => {
        const isRequired = isFieldRequired(field, variantId, styleId);
        const value = values[field.key] ?? (field.type === "toggle" ? false : "");
        const setValue = (v) => onChange(field.key, v);

        if (field.type === "toggle") {
          return (
            <label
              key={field.key}
              className={`product-field--toggle ${value ? "is-selected" : ""}`}
            >
              <input type="checkbox" checked={Boolean(value)} onChange={(e) => setValue(e.target.checked)} />
              <span className="product-field--toggle__text">
                <span>{field.label}</span>
                {field.hint && <small className="product-field__hint">{field.hint}</small>}
              </span>
            </label>
          );
        }

        if (field.key.toLowerCase().includes("color")) {
          return (
            <ColorSelector
              key={field.key}
              label={fieldLabel(field.label, isRequired)}
              value={value}
              onChange={setValue}
              placeholder={field.placeholder}
            />
          );
        }

        if (field.type === "select") {
          return (
            <label className="product-field" key={field.key}>
              <span>{fieldLabel(field.label, isRequired)}</span>
              <select value={value} onChange={(e) => setValue(e.target.value)}>
                <option value="" disabled>
                  Selecciona una opción
                </option>
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {field.hint && <small className="product-field__hint">{field.hint}</small>}
            </label>
          );
        }

        if (field.type === "textarea") {
          return (
            <label className="product-field product-field--wide" key={field.key}>
              <span>{fieldLabel(field.label, isRequired)}</span>
              <textarea
                rows={3}
                value={value}
                placeholder={field.placeholder}
                onChange={(e) => setValue(e.target.value)}
              />
              {field.hint && <small className="product-field__hint">{field.hint}</small>}
            </label>
          );
        }

        return (
          <label className="product-field" key={field.key}>
            <span>{fieldLabel(field.label, isRequired)}</span>
            <input
              type="text"
              value={value}
              placeholder={field.placeholder}
              onChange={(e) => setValue(e.target.value)}
            />
            {field.hint && <small className="product-field__hint">{field.hint}</small>}
          </label>
        );
      })}
    </div>
  );
}

function fieldLabel(label, required) {
  return required ? `${label} *` : label;
}
