// INTERSTELLAR (Interstellar Real Estate) case study content.
// Figma frame 73:19115 (1440 × 5075), desktop only.
// Title + body lifted verbatim from get_design_context on Group 79
// (297:57912).

export const interstellar = {
  eyebrow: "INTERSTELLAR",
  body: "Interstellar Real Estate is a premium real estate brand focused on the acquisition, sale, and curation of interwar architecture, with a particular emphasis on buildings from the period between the two World Wars. The identity bridges historical elegance with a contemporary, refined sensibility, positioning these spaces within a modern luxury context. The visual language reflects this duality, balancing classical grandeur with a sleek, understated editorial approach.",
  /* Hero wordmark letterforms (Group 106) — 11 individual SVGs forming
     the "INTERSTELLAR" wordmark across the top of the hero image.
     Insets are root-frame relative (1440 × 5075). */
  heroLetters: [
    { src: "v0.svg", inset: "6.63% 65.88% 91.71% 33.56%" },
    { src: "v1.svg", inset: "6.63% 56.93% 91.71% 35.01%" },
    { src: "v2.svg", inset: "6.63% 53.88% 91.71% 43.74%" },
    { src: "v3.svg", inset: "6.62% 50.84% 91.7% 46.81%" },
    { src: "v4.svg", inset: "6.63% 45.21% 91.71% 49.44%" },
    { src: "v5.svg", inset: "6.63% 36.16% 91.71% 61%" },
    { src: "v6.svg", inset: "6.63% 33.12% 91.71% 64.49%" },
    { src: "v7.svg", inset: "6.63% 40.01% 91.71% 55.43%" },
    { src: "v8.svg", inset: "6.64% 40.01% 92.17% 56.79%" },
    { src: "v9.svg", inset: "7.78% 42.6% 92.21% 57.38%" },
    { src: "v10.svg", inset: "5.95% 38.07% 92.59% 57.84%" },
  ],
} as const;

export const interstellarFrame = {
  desktop: { width: 1440, height: 5075 },
} as const;
