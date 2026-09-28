import "./ReferenceBadge.css";

// Small, consistent visual marker for conceptual/reference photography —
// used wherever an image could be mistaken for a photo of a specific
// customer's finished order (catalog, product galleries, Creaciones,
// The Creative Yarn Box). Real text (not just a color or icon), so it
// reaches assistive tech too — never a decorative-only cue.
export default function ReferenceBadge({ className = "" }) {
  return <span className={`reference-badge ${className}`.trim()}>Imagen de referencia</span>;
}
