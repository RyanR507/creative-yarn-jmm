import ColorSelector from "./ColorSelector";

// Renders the fields it is given — the parent has already narrowed them to
// the current variant + style (see getVisibleFields in products.js), e.g.
// "¿Qué letra quieres?" only for the Llaveros "letra" style. `selectedStyle`
// is only used to mark which of them are required.
export default function ProductOptions({ fields, selectedStyle, values, onChange }) {
  if (!fields.length) return null;

  return (
    <div className="product-options">
      {fields.map((field) => {
        const isRequired = field.required || field.requiredWhen?.includes(selectedStyle);
        const value = values[field.key] || "";
        const setValue = (v) => onChange(field.key, v);

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
          </label>
        );
      })}
    </div>
  );
}

function fieldLabel(label, required) {
  return required ? `${label} *` : label;
}
