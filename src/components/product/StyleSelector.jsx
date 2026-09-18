export default function StyleSelector({ styles, value, onChange }) {
  if (!styles.length) return null;

  return (
    <fieldset className="style-selector">
      <legend>Escoge tu estilo</legend>
      <div className="style-selector__grid" role="radiogroup" aria-label="Escoge tu estilo">
        {styles.map((style) => (
          <label
            key={style.id}
            className={`style-selector__option ${value === style.id ? "is-selected" : ""}`}
          >
            <input
              type="radio"
              name="estilo"
              value={style.id}
              checked={value === style.id}
              onChange={() => onChange(style.id)}
            />
            <span>{style.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
