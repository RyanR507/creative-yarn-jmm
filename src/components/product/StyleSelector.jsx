// Shared pill selector — used for "Escoge tu estilo" (personalization style)
// and "Elige tu opción" (price variant). Real radio inputs underneath.
export default function StyleSelector({
  options,
  value,
  onChange,
  legend = "Escoge tu estilo",
  name = "estilo",
}) {
  if (!options.length) return null;

  return (
    <fieldset className="style-selector">
      <legend>{legend}</legend>
      <div className="style-selector__grid" role="radiogroup" aria-label={legend}>
        {options.map((option) => (
          <label
            key={option.id}
            className={`style-selector__option ${value === option.id ? "is-selected" : ""}`}
          >
            <input
              type="radio"
              name={name}
              value={option.id}
              checked={value === option.id}
              onChange={() => onChange(option.id)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
