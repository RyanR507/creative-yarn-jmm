// No fixed yarn/thread color palette exists in the project yet, so this
// renders as a labeled text input rather than a fixed set of swatches that
// would imply specific colors are guaranteed available. Once a real color
// list (name + hex) is added to the data layer, this is the only place that
// needs to change to render actual swatch buttons instead.
export default function ColorSelector({ label, value, onChange, placeholder }) {
  return (
    <label className="product-field">
      <span>{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Ej.: rosa pastel, crema, dorado..."}
      />
    </label>
  );
}
