import type { NextConfig } from "next";

// GitHub Pages (project site): /psi-salon-pucci.
// Vlastní doména v kořeni: CUSTOM_DOMAIN=true a SITE_URL=https://example.cz
const repo = "psi-salon-pucci";
const onPages = process.env.GITHUB_ACTIONS === "true";
const customDomain = process.env.CUSTOM_DOMAIN === "true";
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
