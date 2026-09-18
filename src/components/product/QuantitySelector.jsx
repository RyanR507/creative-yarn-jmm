export default function QuantitySelector({ value, onChange }) {
  return (
    <label className="product-field product-field--quantity">
      <span>Cantidad</span>
      <input
        type="number"
        min="1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
