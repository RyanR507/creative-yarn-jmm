import { lazy, Suspense, useMemo, useRef, useState } from "react";
import "./ProductViewer.css";

// Three.js / React Three Fiber are heavy — only fetch that bundle when a
// design actually has a 3D model to show. No product has one yet, so today
// this import is never triggered for real visitors.
const Product3DViewer = lazy(() => import("./Product3DViewer"));

const PX_PER_FRAME = 26;

/**
 * Generic product viewer: renders a still image when a design has one frame,
 * or becomes a drag/swipe frame-sequence ("360-style") viewer when a design
 * has multiple frames. Never simulates depth on a single flat image — with
 * one frame there is simply nothing to drag.
 */
export default function ProductViewer({ designs, productName }) {
  const hasMultipleDesigns = designs.length > 1;
  const [designIndex, setDesignIndex] = useState(0);
  const [frameIndex, setFrameIndex] = useState(0);
  const [hintDismissed, setHintDismissed] = useState(false);

  const design = designs[designIndex] ?? designs[0];
  const frames = design.frames;
  const hasMultipleFrames = frames.length > 1;

  const dragRef = useRef({ dragging: false, startX: 0, startFrame: 0 });

  const wrap = (n, len) => ((n % len) + len) % len;

  const onPointerDown = (e) => {
    if (!hasMultipleFrames) return;
    dragRef.current = { dragging: true, startX: e.clientX, startFrame: frameIndex };
    e.currentTarget.setPointerCapture(e.pointerId);
    setHintDismissed(true);
  };

  const onPointerMove = (e) => {
    if (!dragRef.current.dragging) return;
    const delta = e.clientX - dragRef.current.startX;
    const steps = Math.round(delta / PX_PER_FRAME);
    setFrameIndex(wrap(dragRef.current.startFrame + steps, frames.length));
  };

  const endDrag = (e) => {
    if (!dragRef.current.dragging) return;
    dragRef.current.dragging = false;
    if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const currentFrame = useMemo(() => frames[frameIndex] ?? frames[0], [frames, frameIndex]);

  function selectDesign(i) {
    setDesignIndex(i);
    setFrameIndex(0);
  }

  return (
    <div className="product-viewer">
      {design.model ? (
        <Suspense
          fallback={
            <div className="product-viewer__stage">
              <img
                className="product-viewer__image"
                src={frames[0]}
                alt={`${productName} — ${design.label}`}
                decoding="async"
              />
            </div>
          }
        >
          <Product3DViewer
            src={design.model}
            fallbackImage={frames[0]}
            productName={`${productName} — ${design.label}`}
          />
        </Suspense>
      ) : (
        <div
          className={`product-viewer__stage ${hasMultipleFrames ? "is-draggable" : ""}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <img
            key={currentFrame}
            className="product-viewer__image"
            src={currentFrame}
            alt={`${productName} — ${design.label}`}
            loading="lazy"
            decoding="async"
            draggable="false"
          />

          {hasMultipleFrames && (
            <span className="product-viewer__badge" aria-hidden="true">
              360°
            </span>
          )}

          {hasMultipleFrames && !hintDismissed && (
            <span className="product-viewer__hint" aria-hidden="true">
              Arrastra para explorar ↔
            </span>
          )}
        </div>
      )}

      {hasMultipleDesigns && (
        <div className="product-viewer__designs" role="group" aria-label="Diseños disponibles">
          {designs.map((d, i) => (
            <button
              key={d.id}
              type="button"
              className={`product-viewer__design-thumb ${i === designIndex ? "is-active" : ""}`}
              onClick={() => selectDesign(i)}
              aria-pressed={i === designIndex}
              aria-label={`${productName} — ${d.label}`}
            >
              <img src={d.frames[0]} alt="" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
