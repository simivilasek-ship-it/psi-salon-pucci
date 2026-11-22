/** GitHub Pages project path; empty for local dev and a future custom domain. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Prefix a root-absolute public path with the site basePath.
 * Collapses an accidental duplicate prefix.
 */
export function withBase(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;

  let rest = path;
  if (basePath) {
    while (rest === basePath || rest.startsWith(`${basePath}/`)) {
      rest = rest === basePath ? "/" : rest.slice(basePath.length) || "/";
    }
  }
  if (!rest.startsWith("/")) rest = `/${rest}`;
  return basePath ? `${basePath}${rest}` : rest;
}
