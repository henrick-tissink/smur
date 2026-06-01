// SWS (Sassy Woman Society) case study content.
// Figma frame 73:40179 (1440 × 4053), desktop only.
// Title + body lifted verbatim from get_metadata on Group 79
// (297:57931).

export const sws = {
  eyebrow: "SASSY WOMAN SOCIETY",
  // Two paragraphs per Figma (Group 297:57931 splits the body in two).
  body: [
    "Sassy Woman Society is a digital platform designed to celebrate confidence, sophistication, and community among women. The website uses bold serif typography and refined visual hierarchy to balance strength with elegance, while large-scale imagery creates an immediate sense of presence and style.",
    "The experience is intentionally immersive yet easy to navigate, allowing events and initiatives to feel both accessible and elevated. The overall design language blends luxury with personality, creating a space where women can connect, engage, and feel inspired.",
  ],
} as const;

export const swsFrame = {
  desktop: { width: 1440, height: 4053 },
} as const;
