/**
 * Single source of truth for SMUR design tokens.
 * Values are verbatim from the spec
 * (docs/superpowers/specs/2026-07-20-faithful-fluid-rearchitecture-design.md).
 * The CSS layers in app/styles/*.css mirror these exact values.
 * Editorial reds are intentionally absent — extracted during the Work phase.
 */
export const colors = {
  page: "#FFF7F4", // Warm Neutrals — default page surface (spec §5)
  ink: "#35221A", // primary text — espresso
  inkMuted: "#6A6660",
  cream: "#FFF7F4", // text on dark grounds
  line: "#D9D2C8",
  hero: "#CBB3A6", // Rose & Clay — hero ground
  accent: "#A98A8A", // mauve — eyebrows, hairlines, hover
  about: "#906553", // clay — About band
  band: "#BBC2B5", // sage — testimonial band
} as const;

export const space = [6, 15, 25, 30, 35, 55, 61] as const;

export const radii = { pill: 18, card: 5, media: 0 } as const;

export const hairline = { button: 1.44, underline: 2 } as const;

export const motion = {
  ease: "cubic-bezier(0.22, 0.61, 0.36, 1)",
  durationMs: { cardHover: 520 },
  workCardScale: 1.035,
  buttonPressScale: 0.985,
  linkDimOpacity: 0.55,
} as const;
