export default function QuantitySelector({ value, onChange, label = "Cantidad", hint }) {
  const numeric = Number(value) || 1;

  function step(delta) {
    onChange(String(Math.max(1, numeric + delta)));
  }

  function handleInput(raw) {
    const digits = raw.replace(/[^\d]/g, "");
    onChange(digits === "" ? "" : String(Math.max(1, Number(digits))));
  }

  return (
    <div className="quantity-selector">
      <span className="quantity-selector__label">{label}</span>
      <div className="quantity-selector__control">
        <button
          type="button"
          className="quantity-selector__step"
          onClick={() => step(-1)}
          disabled={numeric <= 1}
          aria-label={`Disminuir ${label.toLowerCase()}`}
        >
          −
        </button>
        <input
          type="text"
          inputMode="numeric"
          className="quantity-selector__value"
          value={value}
          onChange={(e) => handleInput(e.target.value)}
          aria-label={label}
        />
        <button
          type="button"
          className="quantity-selector__step"
          onClick={() => step(1)}
          aria-label={`Aumentar ${label.toLowerCase()}`}
        >
          +
        </button>
      </div>
      {hint && <span className="quantity-selector__hint">{hint}</span>}
    </div>
  );
}
