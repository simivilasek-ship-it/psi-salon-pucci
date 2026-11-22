type Tone = "bg" | "alt" | "brand" | "dark";

const toneClass: Record<Tone, string> = {
  bg: "tone-bg",
  alt: "tone-alt",
  brand: "tone-brand",
  dark: "tone-dark",
};

const paths = {
  wave: "M0 40 C240 8 480 8 720 32 S1200 64 1440 24 V72 H0 Z",
  curve: "M0 48 Q720 0 1440 48 V72 H0 Z",
} as const;

/** Soft SVG wave between section backgrounds — same path as Sarya Head Spa. */
export function SectionDivider({
  from,
  to,
  variant = "wave",
  flip = false,
}: {
  from: Tone;
  to: Tone;
  variant?: keyof typeof paths;
  flip?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      role="presentation"
      className={`section-divider ${toneClass[from]} fill-${to}${flip ? " is-flip" : ""}`}
    >
      <svg viewBox="0 0 1440 72" preserveAspectRatio="none">
        <path d={paths[variant]} fill="currentColor" />
      </svg>
    </div>
  );
}
