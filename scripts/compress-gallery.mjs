import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const DIR = path.resolve("public/assets/images/gallery");
const MAX_DIMENSION = 1600;
const QUALITY = 78;

const files = (await readdir(DIR)).filter((f) => /\.jpe?g$/i.test(f));

for (const file of files) {
  const filePath = path.join(DIR, file);
  const before = (await stat(filePath)).size;
  const buffer = await sharp(filePath)
    .rotate()
    .resize({ width: MAX_DIMENSION, height: MAX_DIMENSION, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toBuffer();
  await sharp(buffer).toFile(filePath + ".tmp");
  const { rename, unlink } = await import("node:fs/promises");
  await unlink(filePath);
  await rename(filePath + ".tmp", filePath);
  const after = (await stat(filePath)).size;
  console.log(
    `${file}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB (${Math.round((1 - after / before) * 100)}% smaller)`
  );
}
