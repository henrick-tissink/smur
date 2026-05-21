// kabinett (Kabinett Wine & Spirits) case study content.
// Figma frame 73:36625 (1440 × 4985), desktop only.
// Title + body lifted verbatim from get_design_context on Group 79
// (297:57927).

export const kabinett = {
  eyebrow: "KABINETT WINE & SPIRITS",
  body: [
    "Kabinett is a hospitality concept where the identity draws inspiration from furniture and wine culture, reflected in the German word “Kabinett”. The logo is designed as a visual cabinet, containing elements such as a wine glass, a bottle, and a subtle “K” embedded within the structure, creating a compact symbolic system.",
    "The result is a refined yet playful mark that blends craftsmanship, wine tradition, and spatial thinking into a single cohesive identity.",
  ],
  /* Row 1 band brand-mark vectors (Layer_2 73:39323) — 11 vectors forming
     the cabinet/wine/glass composition on the RIGHT half of the band.
     Insets are root-frame (1440 × 4985) relative. */
  row1Vectors: [
    { src: "v0.svg", inset: "25.07% 19.06% 63.19% 50.8%" },
    { src: "v1.svg", inset: "27.39% 32.66% 69.91% 64.74%" },
    { src: "v2.svg", inset: "30.87% 32.57% 67.77% 64.65%" },
    { src: "v3.svg", inset: "32.23% 32.66% 67.7% 64.74%" },
    { src: "v4.svg", inset: "33.07% 34.58% 65.53% 64.31%" },
    { src: "v5.svg", inset: "33.08% 33.08% 66.39% 65.21%" },
    { src: "v6.svg", inset: "33.1% 32.13% 66.05% 65.2%" },
    { src: "v7.svg", inset: "33.09% 32.13% 66.84% 66.73%" },
    { src: "v8.svg", inset: "33.85% 32.63% 65.51% 65.29%" },
    { src: "v9.svg", inset: "33.69% 31.68% 65.52% 65.82%" },
    { src: "v10.svg", inset: "34.42% 31.68% 65.51% 67.18%" },
  ],
  /* Bottom card real text (Quicksand 11.76px, color #5d5d5d). */
  address: ["Str Libertatii, Nr. 25, 540031", "Targu Mures, Romania"],
} as const;

export const kabinettFrame = {
  desktop: { width: 1440, height: 4985 },
} as const;
