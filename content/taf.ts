// TAF (UAE cleaning brand) case study content.
// Figma frame 73:29056 (1440 × 4942), desktop only.
// Title + body lifted verbatim from get_design_context on Group 79
// (297:57920). Body has 2 paragraphs.

export const taf = {
  eyebrow: "TAF",
  body: [
    "TAF is a modern cleaning brand based in the UAE, built on inclusivity, clarity, and a contemporary visual language. The identity was designed to challenge traditional perceptions of the cleaning industry by moving away from expected color codes and visual stereotypes, instead introducing a bold, unexpected palette and a confident, gender-neutral tone.",
    "The result is a fresh, energetic brand that feels approachable yet professional, positioning TAF as a modern service that brings equality, style, and attitude into a traditionally overlooked category.",
  ],
  /* Bottom section letterforms (Group 113) — 7 vectors positioned as
     "TAF" wordmark + decorative marks on the bottom photo composition.
     Insets are relative to the Layer_2 wrapper at frame (273, 4202.03)
     size 899×600. */
  bottomVectors: [
    { src: "v0.svg", inset: "46.36% 66.92% 41.59% 20.75%" },
    { src: "v1.svg", inset: "41.35% 57.42% 41.59% 34.26%" },
    { src: "v2.svg", inset: "42.23% 57.19% 54.05% 38.28%" },
    { src: "v3.svg", inset: "41.8% 68.68% 54.02% 28.55%" },
    { src: "v4.svg", inset: "48.13% 47.3% 41.46% 43.56%" },
    { src: "v5.svg", inset: "48.13% 20.75% 41.48% 70.72%" },
    { src: "v6.svg", inset: "48.13% 29.83% 41.35% 51.92%" },
  ],
} as const;

export const tafFrame = {
  desktop: { width: 1440, height: 4942 },
} as const;
