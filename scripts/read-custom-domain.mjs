import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** Stejné pravidlo jako customDomainHost() v lib/salon.ts. */
export function readCustomDomain() {
  const source = fs.readFileSync(path.join(root, "lib/salon.ts"), "utf8");
  const match = source.match(/customDomain:\s*"([^"]*)"/);
  return (match?.[1] ?? "")
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "")
    .replace(/\.$/, "");
}
