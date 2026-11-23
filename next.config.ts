import type { NextConfig } from "next";
import { readCustomDomain } from "./scripts/read-custom-domain.mjs";

// GitHub Pages (project site): /psi-salon-pucci.
// Vlastní doména: vyplňte customDomain v lib/salon.ts (CNAME + kanonická URL + bez basePath).
const repo = "psi-salon-pucci";
const onPages = process.env.GITHUB_ACTIONS === "true";
const customDomain = readCustomDomain().length > 0;
const basePath = onPages && !customDomain ? `/${repo}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  ...(basePath
    ? {
        basePath,
        assetPrefix: basePath,
      }
    : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
