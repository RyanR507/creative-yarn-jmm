import sharp from "sharp";
import { stat, unlink, rename } from "node:fs/promises";
import path from "node:path";

const MAX_DIMENSION = 1600;
const QUALITY = 78;

const files = process.argv.slice(2);
if (!files.length) {
  console.error("Usage: node compress-list.mjs <file1> <file2> ...");
  process.exit(1);
}

for (const file of files) {
  const filePath = path.resolve(file);
  const before = (await stat(filePath)).size;
  const buffer = await sharp(filePath)
    .rotate()
    .resize({ width: MAX_DIMENSION, height: MAX_DIMENSION, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toBuffer();
  await sharp(buffer).toFile(filePath + ".tmp");
  await unlink(filePath);
  await rename(filePath + ".tmp", filePath);
  const after = (await stat(filePath)).size;
  console.log(
    `${file}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB (${Math.round((1 - after / before) * 100)}% smaller)`
  );
}
