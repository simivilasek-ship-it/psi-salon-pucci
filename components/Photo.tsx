import manifest from "@/lib/image-manifest.json";
import { withBase } from "@/lib/paths";

export type PhotoName = keyof typeof manifest;

const HERO_SIZES = "(max-width: 800px) calc(100vw - 40px), 1120px";

function srcSet(name: PhotoName) {
  return manifest[name].variants
    .map((variant) => `${withBase(variant.src)} ${variant.width}w`)
    .join(", ");
}

export function Photo({
  name,
  alt,
  sizes,
  className,
  priority = false,
}: {
  name: PhotoName;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  const variants = manifest[name].variants;
  const fallback = variants.find((variant) => variant.width >= 720) ?? variants[variants.length - 1];

  return (
    <img
      src={withBase(fallback.src)}
      srcSet={srcSet(name)}
      sizes={sizes}
      width={fallback.width}
      height={fallback.height}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "low"}
      decoding="async"
    />
  );
}

export { HERO_SIZES };
