// MNF (Manufaktura Studio Architecture) case study content.
// Figma frame 71:343 (1440 × 4367), desktop only.
// Title + body lifted verbatim from get_design_context on Group 79
// (297:57100).

export const mnf = {
  eyebrow: "MANUFAKTURA STUDIO",
  body: "Designed for Manufaktura Studio Architecture, this minimalist portfolio website was created to let the work speak in its purest form. Guided by restraint, clarity, and strong visual rhythm, the platform centers large-scale imagery and understated interactions that allow each project’s atmosphere, materiality, and architectural detail to take focus.",
  /* Bottom section letterforms (Group 27) — 19 vectors forming the
     Manufaktura wordmark on the bottom photo. Each is positioned with
     explicit pixel coords relative to the bottom section (899×575). */
  bottomVectors: [
    { src: "v0.svg", left: 237, top: 241, width: 40, height: 38 },
    { src: "v1.svg", left: 283, top: 241, width: 37, height: 38 },
    { src: "v2.svg", left: 325, top: 241, width: 34, height: 38 },
    { src: "v3.svg", left: 369, top: 241, width: 34, height: 38 },
    { src: "v4.svg", left: 412, top: 241, width: 27, height: 38 },
    { src: "v5.svg", left: 437, top: 241, width: 37, height: 38 },
    { src: "v6.svg", left: 480, top: 241, width: 31, height: 38 },
    { src: "v7.svg", left: 512, top: 241, width: 33, height: 38 },
    { src: "v8.svg", left: 551, top: 241, width: 34, height: 38 },
    { src: "v9.svg", left: 594, top: 241, width: 30, height: 38 },
    { src: "v10.svg", left: 627, top: 241, width: 37, height: 38 },
    { src: "v11.svg", left: 234, top: 294, width: 31, height: 39 },
    { src: "v12.svg", left: 267, top: 294, width: 33, height: 39 },
    { src: "v13.svg", left: 306, top: 294, width: 34, height: 39 },
    { src: "v14.svg", left: 349, top: 294, width: 33, height: 39 },
    { src: "v15.svg", left: 390, top: 295, width: 4, height: 38 },
    { src: "v16.svg", left: 401, top: 294, width: 38, height: 39 },
    { src: "v17.svg", left: 439, top: 332, width: 71, height: 2 },
  ],
} as const;

export const mnfFrame = {
  desktop: { width: 1440, height: 4367 },
} as const;
