// CRISP case study content. Figma frame 71:3160 (1440 × 5340), desktop only.
// Title + body text lifted verbatim from get_design_context on Group 79
// (297:57117). Hero brand mark + curve text from Group 41 (71:4364).

export const crisp = {
  eyebrow: "CRISP",
  body: "CRISP is a branding project centered around refined simplicity and contemporary artisanal pastry culture. Chosen for its clarity, memorability, and international feel, the name also references the subtle sound and texture of a perfectly baked golden crust. The visual identity follows the same sensibility, warm, minimal, tactile, and quietly refined.",
  /* "ARTISANALPATISSERIE" curved around the hero brand mark — one letter per
     position. Rotation + inset percentages copied verbatim from Figma
     (get_design_context on 71:4364). Insets are root-frame relative
     (1440 × 5340) per the frame-relative-insets memory. */
  heroCurveLetters: [
    { ch: "A", inset: "8.25%_53.11%_91.33%_44.57%", h: "hypot(87.7666cqw,-39.0257cqh)", w: "hypot(-12.2334cqw,-60.9743cqh)", rotate: -106.63 },
    { ch: "R", inset: "7.93%_53.42%_91.76%_44.39%", h: "hypot(96.8552cqw,-12.9747cqh)", w: "hypot(-3.14477cqw,-87.0253cqh)", rotate: -93.98 },
    { ch: "T", inset: "7.56%_53.35%_92.12%_44.42%", h: "hypot(94.2664cqw,24.4664cqh)", w: "hypot(5.73365cqw,-75.5336cqh)", rotate: -82.01 },
    { ch: "I", inset: "7.29%_53.14%_92.41%_44.69%", h: "hypot(93.1472cqw,57.47cqh)", w: "hypot(6.85281cqw,-42.53cqh)", rotate: -72.5 },
    { ch: "S", inset: "6.93%_52.66%_92.59%_45.03%", h: "hypot(81.9203cqw,54.0298cqh)", w: "hypot(18.0797cqw,-45.9702cqh)", rotate: -63.01 },
    { ch: "A", inset: "6.59%_51.95%_92.84%_45.77%", h: "hypot(72.4961cqw,63.5313cqh)", w: "hypot(27.5039cqw,-36.4687cqh)", rotate: -50.89 },
    { ch: "N", inset: "6.26%_50.87%_93.09%_46.88%", h: "hypot(57.3265cqw,69.863cqh)", w: "hypot(42.6735cqw,-30.137cqh)", rotate: -37.28 },
    { ch: "A", inset: "6.06%_49.81%_93.3%_48.42%", h: "hypot(48.6717cqw,82.884cqh)", w: "hypot(51.3283cqw,-17.116cqh)", rotate: -23.87 },
    { ch: "L", inset: "5.97%_48.78%_93.43%_49.95%", h: "hypot(34.5635cqw,92.2074cqh)", w: "hypot(65.4365cqw,-7.79263cqh)", rotate: -11.93 },
    { ch: "P", inset: "5.95%_46.68%_93.45%_52.08%", h: "hypot(-20.9016cqw,94.5584cqh)", w: "hypot(79.0984cqw,5.4416cqh)", rotate: 7.03 },
    { ch: "A", inset: "6.02%_45.14%_93.35%_53.21%", h: "hypot(-43.0349cqw,85.8721cqh)", w: "hypot(56.9651cqw,14.1279cqh)", rotate: 19.42 },
    { ch: "T", inset: "6.19%_43.77%_93.2%_54.33%", h: "hypot(-58.5967cqw,79.0042cqh)", w: "hypot(41.4033cqw,20.9958cqh)", rotate: 31.52 },
    { ch: "I", inset: "6.41%_42.97%_93.07%_55.26%", h: "hypot(-78.9146cqw,83.0727cqh)", w: "hypot(21.0854cqw,16.9273cqh)", rotate: 41.13 },
    { ch: "S", inset: "6.6%_42%_92.85%_55.77%", h: "hypot(-73.8113cqw,65.3919cqh)", w: "hypot(26.1887cqw,34.6081cqh)", rotate: 50.69 },
    { ch: "S", inset: "6.92%_41.26%_92.59%_56.43%", h: "hypot(-81.2995cqw,55.0553cqh)", w: "hypot(18.7005cqw,44.9447cqh)", rotate: 62.04 },
    { ch: "E", inset: "7.28%_40.78%_92.32%_56.92%", h: "hypot(-88.6695cqw,40.494cqh)", w: "hypot(11.3305cqw,59.506cqh)", rotate: 73.57 },
    { ch: "R", inset: "7.68%_40.6%_92.01%_57.2%", h: "hypot(-96.5871cqw,13.96cqh)", w: "hypot(3.41287cqw,86.04cqh)", rotate: 85.67 },
    { ch: "I", inset: "8.05%_40.63%_91.76%_57.2%", h: "hypot(-97.7319cqw,-29.8866cqh)", w: "hypot(-2.26811cqw,70.1134cqh)", rotate: 95.68 },
    { ch: "E", inset: "8.23%_40.77%_91.38%_56.94%", h: "hypot(-89.4602cqw,-38.553cqh)", w: "hypot(-10.5398cqw,61.447cqh)", rotate: 105.21 },
  ],
} as const;

export const crispFrame = {
  desktop: { width: 1440, height: 5340 },
} as const;
