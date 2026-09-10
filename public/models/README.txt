Drop real 3D models for Creative Yarn products here as .glb (preferred) or
.gltf files, for example:

  public/models/portavasos.glb
  public/models/llaveros.glb
  public/models/bolsos.glb

Then open src/data/content.js, find that product inside PRODUCT_SHOWCASE,
and set its design's `model` field to the matching path, e.g.:

  model: "/models/portavasos.glb"

That's the only change needed — ProductViewer automatically renders the
real interactive 3D viewer (drag to orbit, pinch/scroll to zoom) for any
design that has a `model` set, and keeps showing the product photo for any
design that doesn't.

Tips for exporting a model that keeps the handmade texture visible:
- Keep the real photographed textures (yarn color, stitches, plastic mesh)
  baked into the model's materials — don't let an export pipeline flatten
  or smooth them away.
- Export at a reasonable resolution/poly count for the web — a compressed
  .glb (e.g. via gltf-transform or Blender's glTF exporter with Draco
  compression) keeps mobile performance good.
- Center the model reasonably near the origin; the viewer auto-centers it,
  but a wildly off-center pivot can make the initial framing look odd.
