import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readCustomDomain } from "./read-custom-domain.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cnamePath = path.join(root, "out", "CNAME");
const domain = readCustomDomain();

if (!domain) {
  if (fs.existsSync(cnamePath)) fs.unlinkSync(cnamePath);
  console.log("CNAME: žádná vlastní doména");
} else {
  fs.writeFileSync(cnamePath, `${domain}\n`);
  console.log(`CNAME: ${domain}`);
}
