// One-off generator for the OG share image and the hero video poster.
// Run with: node scripts/generate-social-assets.mjs
// Requires `sharp` (installed with --no-save; not a committed dependency —
// same pattern as scripts/compress-gallery.mjs).
import sharp from "sharp";
import { readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");

// ---------------------------------------------------------------------------
// 1. OG / social share image — 1200x630, built from real brand assets
//    (logo + an actual product photo showing yarn stitched on plastic canvas).
// ---------------------------------------------------------------------------
async function buildOgImage() {
  const logoPath = path.join(ROOT, "public/assets/logo/logo.png");
  const photoPath = path.join(ROOT, "public/assets/images/products/portavasos.jpeg");

  const logoB64 = (await readFile(logoPath)).toString("base64");
  const photoB64 = (await readFile(photoPath)).toString("base64");

  const W = 1200;
  const H = 630;

  const svg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF9F5" />
      <stop offset="100%" stop-color="#FCECEF" />
    </linearGradient>
    <clipPath id="photoClip">
      <rect x="660" y="69" width="492" height="492" rx="28" />
    </clipPath>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#3F3035" flood-opacity="0.22" />
    </filter>
    <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="14" stdDeviation="18" flood-color="#3F3035" flood-opacity="0.16" />
    </filter>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)" />

  <!-- subtle decorative rings, echoing the product-card thread motif -->
  <circle cx="120" cy="560" r="90" fill="none" stroke="#E8A0B0" stroke-width="1.5" opacity="0.35" />
  <circle cx="60" cy="60" r="60" fill="none" stroke="#C9A27E" stroke-width="1.5" opacity="0.3" />

  <!-- brand card -->
  <g filter="url(#cardShadow)">
    <rect x="48" y="115" width="564" height="400" rx="28" fill="#FFFFFF" />
  </g>
  <image x="255" y="170" width="150" height="150" href="data:image/png;base64,${logoB64}" />
  <text x="330" y="378" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="38" fill="#3F3035">Create it. Yarn it. Love it.</text>
  <text x="330" y="428" text-anchor="middle" font-family="'Segoe UI', Arial, sans-serif" font-size="23" fill="#7A6A6E">Piezas personalizadas hechas a mano</text>

  <!-- real product photo: yarn hand-stitched on plastic canvas -->
  <g filter="url(#softShadow)">
    <rect x="660" y="69" width="492" height="492" rx="28" fill="#FFFFFF" />
  </g>
  <g clip-path="url(#photoClip)">
    <image x="660" y="69" width="492" height="492" preserveAspectRatio="xMidYMid slice" href="data:image/jpeg;base64,${photoB64}" />
  </g>
</svg>`;

  const outPath = path.join(ROOT, "public/assets/images/og-cover.jpg");
  await sharp(Buffer.from(svg))
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(outPath);

  console.log(`OG image written to ${path.relative(ROOT, outPath)}`);
}

// ---------------------------------------------------------------------------
// 2. Hero video poster — a real frame captured from yarn-hero.mp4 itself
//    (via an in-browser canvas grab, since no ffmpeg is available here),
//    compressed as a fast-loading fallback/placeholder image.
// ---------------------------------------------------------------------------
async function buildHeroPoster() {
  // Captured once via an in-browser canvas grab of the real yarn-hero.mp4
  // (no ffmpeg available in this environment) — see PHASE_6 notes in the
  // final report for how this source frame was produced.
  const framePath = process.env.HERO_FRAME_SOURCE || path.join(ROOT, "scripts/hero-frame-source.jpg");
  const outPath = path.join(ROOT, "public/assets/yarn-hero-poster.jpg");

  await sharp(framePath)
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(outPath);

  console.log(`Hero poster written to ${path.relative(ROOT, outPath)}`);
}

await buildOgImage();
await buildHeroPoster();
