// kabinett (Kabinett Wine & Spirits) case study content.
// Figma frame 73:36625 (1440 × 4985), desktop only.
// Title + body lifted verbatim from get_design_context on Group 79
// (297:57927).

// A row-1 brand-mark vector. Most are axis-aligned and simply fill their
// frame-relative `inset` box. Two (the diagonal legs of the "K") are ROTATED
// in Figma — for those, `inset` is only the bounding box; `rot` carries the
// stroke's native size (as cqw of the 1440 stage) plus the rotation, and the
// stroke is centred inside the bounding box. See the `rot` note below.
export type KabinettRow1Vector = {
  src: string;
  inset: string;
  rot?: { w: string; h: string; transform: string };
};

/* Row 1 band brand-mark vectors (Layer_2 73:39323) — 11 vectors forming the
   bottle / wine-glass / "K" composition on the RIGHT half of the band. Insets
   are root-frame (1440 × 4985) relative.

   v5 and v8 are the two diagonal legs of the "K". In Figma they are rotated
   strokes: their `inset` is the axis-aligned BOUNDING box, and a nested,
   native-sized element sits inside it rotated (Figma emits
   `flex … containerType:size` + `hypot(…cqw,…cqh)` + `rotate(…)`). Our earlier
   port dropped the rotation and stretched the thin-bar SVG to fill the bounding
   box, which distorted both legs into blobs (the "broken" third icon). We now
   reproduce the rotation: `rot.w`/`rot.h` are the stroke's native px expressed
   as cqw of the stage (so they scale with it), centred in the bounding box. */
const row1Vectors: KabinettRow1Vector[] = [
  { src: "v0.svg", inset: "25.07% 19.06% 63.19% 50.8%" },
  { src: "v1.svg", inset: "27.39% 32.66% 69.91% 64.74%" },
  { src: "v2.svg", inset: "30.87% 32.57% 67.77% 64.65%" },
  { src: "v3.svg", inset: "32.23% 32.66% 67.7% 64.74%" },
  { src: "v4.svg", inset: "33.07% 34.58% 65.53% 64.31%" },
  {
    src: "v5.svg",
    inset: "33.08% 33.08% 66.39% 65.21%",
    rot: {
      w: "2.243576cqw", // 32.3075px native / 1440 stage
      h: "0.254199cqw", // 3.66047px native / 1440 stage
      transform: "rotate(-47.42deg) skewX(0.18deg)",
    },
  },
  { src: "v6.svg", inset: "33.1% 32.13% 66.05% 65.2%" },
  { src: "v7.svg", inset: "33.09% 32.13% 66.84% 66.73%" },
  {
    src: "v8.svg",
    inset: "33.85% 32.63% 65.51% 65.29%",
    rot: {
      w: "0.254203cqw", // 3.66053px native / 1440 stage
      h: "2.789236cqw", // 40.165px native / 1440 stage
      transform: "rotate(-42.4deg) skewX(0.18deg)",
    },
  },
  { src: "v9.svg", inset: "33.69% 31.68% 65.52% 65.82%" },
  { src: "v10.svg", inset: "34.42% 31.68% 65.51% 67.18%" },
];

export const kabinett = {
  eyebrow: "KABINETT WINE & SPIRITS",
  body: [
    "Kabinett is a hospitality concept where the identity draws inspiration from furniture and wine culture, reflected in the German word “Kabinett”. The logo is designed as a visual cabinet, containing elements such as a wine glass, a bottle, and a subtle “K” embedded within the structure, creating a compact symbolic system.",
    "The result is a refined yet playful mark that blends craftsmanship, wine tradition, and spatial thinking into a single cohesive identity.",
  ],
  row1Vectors,
  /* Bottom card real text (Quicksand 11.76px, color #5d5d5d). */
  address: ["Str Libertatii, Nr. 25, 540031", "Targu Mures, Romania"],
} as const;

export const kabinettFrame = {
  desktop: { width: 1440, height: 4985 },
} as const;
