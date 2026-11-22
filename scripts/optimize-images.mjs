/**
 * Maintainer script. Reads originals in fotky/ and writes WebP + favicons.
 * Run: npx --yes sharp@0.34.4 node scripts/optimize-images.mjs
 * (or `npm install --no-save sharp` in this repo, then `node scripts/optimize-images.mjs`)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

let sharp;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.error("Chybí balíček sharp. Nainstalujte ho a spusťte skript znovu.");
  process.exit(1);
}

const srcDir = path.join(root, "fotky");
const outDir = path.join(root, "public", "images");
fs.mkdirSync(outDir, { recursive: true });
for (const old of fs.readdirSync(outDir)) {
  if (old.endsWith(".webp")) fs.unlinkSync(path.join(outDir, old));
}

const jobs = [
  { name: "hero", file: "hero.jpg", widths: [480, 768, 1120, 1600], quality: 74 },
  { name: "portrait", file: "o-nas.jpg", widths: [480, 800, 1200], quality: 74 },
  { name: "cert1", file: "cert1.jpg", widths: [280, 480], quality: 68 },
  { name: "cert2", file: "cert2.jpg", widths: [280, 480], quality: 68 },
  { name: "cert3", file: "cert3.jpg", widths: [280, 480], quality: 68 },
  ...Array.from({ length: 12 }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return { name: `g${n}`, file: `g${n}.jpg`, widths: [400, 800], quality: 72 };
  }),
];

const manifest = {};

for (const job of jobs) {
  const input = path.join(srcDir, job.file);
  const variants = [];
  for (const width of job.widths) {
    const pipeline = sharp(input).rotate().resize({ width, withoutEnlargement: true }).webp({
      quality: job.quality,
      effort: 6,
    });
    const dest = path.join(outDir, `${job.name}-${width}.webp`);
    const info = await pipeline.toFile(dest);
    variants.push({
      src: `/images/${job.name}-${width}.webp`,
      width: info.width,
      height: info.height,
    });
  }
  manifest[job.name] = { variants };
  console.log(job.name, variants.map((v) => `${v.width}x${v.height}`).join(", "));
}

for (const cert of ["cert1", "cert2", "cert3"]) {
  const info = await sharp(path.join(srcDir, `${cert}.jpg`))
    .rotate()
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 78, effort: 6 })
    .toFile(path.join(outDir, `${cert}-full.webp`));
  console.log(`${cert}-full`, info.width, info.height, info.size);
}

const og = await sharp(path.join(srcDir, "hero.jpg"))
  .rotate()
  .resize(1200, 630, { fit: "cover", position: "attention" })
  .jpeg({ quality: 80, mozjpeg: true })
  .toFile(path.join(root, "public", "og.jpg"));
console.log("og", og.width, og.height, og.size);

const mark = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="#171717"/>
  <path fill="#ffffff" d="M18 12h18.2c8.6 0 14.8 5.6 14.8 14.2S44.8 40.4 36.2 40.4H28v12h-10V12zm10 8.2v12h7.6c3.9 0 6.4-2.2 6.4-6s-2.5-6-6.4-6H28z"/>
</svg>`);

const publicDir = path.join(root, "public");
const sizes = [
  ["favicon-16.png", 16],
  ["favicon-32.png", 32],
  ["favicon-48.png", 48],
  ["apple-touch-icon.png", 180],
  ["icon-192.png", 192],
  ["icon-512.png", 512],
];
for (const [filename, size] of sizes) {
  await sharp(mark).resize(size, size).png().toFile(path.join(publicDir, filename));
}

const icoPng = await sharp(mark).resize(32, 32).png().toBuffer();
const icoHeader = Buffer.alloc(6);
icoHeader.writeUInt16LE(0, 0);
icoHeader.writeUInt16LE(1, 2);
icoHeader.writeUInt16LE(1, 4);
const icoEntry = Buffer.alloc(16);
icoEntry.writeUInt8(32, 0);
icoEntry.writeUInt8(32, 1);
icoEntry.writeUInt16LE(1, 4);
icoEntry.writeUInt16LE(32, 6);
icoEntry.writeUInt32LE(icoPng.length, 8);
icoEntry.writeUInt32LE(22, 12);
fs.writeFileSync(path.join(publicDir, "favicon.ico"), Buffer.concat([icoHeader, icoEntry, icoPng]));
console.log("favicon.ico", icoPng.length);

fs.writeFileSync(
  path.join(root, "lib", "image-manifest.json"),
  JSON.stringify(manifest, null, 2) + "\n",
);
console.log("wrote lib/image-manifest.json");
