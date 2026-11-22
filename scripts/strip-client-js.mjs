/**
 * The page has no client behaviour. Drop the Next.js hydration runtime
 * from the static export so the hero is not competing with unused JS.
 * JSON-LD stays.
 */
import fs from "node:fs";
import path from "node:path";

const outDir = path.resolve("out");

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else acc.push(full);
  }
  return acc;
}

const htmlFiles = walk(outDir).filter((file) => file.endsWith(".html"));

for (const file of htmlFiles) {
  let html = fs.readFileSync(file, "utf8");
  html = html.replace(/<link rel="preconnect" href="\/"[^>]*>/g, "");
  html = html.replace(/<link rel="preload" as="script"[^>]*>/g, "");
  html = html.replace(/<script(?![^>]*type="application\/ld\+json")[\s\S]*?<\/script>/g, "");

  html = html.replace(
    /<link rel="stylesheet" href="([^"]+)"[^>]*>/,
    (_match, href) => {
      const diskHref = href.replace(/^.*?\/_next\//, "_next/");
      const cssPath = path.join(outDir, diskHref);
      let css = fs.readFileSync(cssPath, "utf8");
      const prefix = href.slice(0, href.indexOf("/_next/"));
      css = css.replace(/url\(\.\.\/media\//g, `url(${prefix}/_next/static/media/`);
      return `<style>${css}</style>`;
    },
  );

  fs.writeFileSync(file, html);
}

const html = htmlFiles.map((file) => fs.readFileSync(file, "utf8")).join("\n");
let removed = 0;
for (const file of walk(outDir)) {
  if (!file.endsWith(".js")) continue;
  const rel = "/" + path.relative(outDir, file).split(path.sep).join("/");
  if (!html.includes(rel)) {
    fs.unlinkSync(file);
    removed += 1;
  }
}

const index = fs.readFileSync(path.join(outDir, "index.html"));
console.log(`stripped client JS from ${htmlFiles.length} html files, removed ${removed} scripts`);
console.log(`index.html ${index.length} bytes`);
