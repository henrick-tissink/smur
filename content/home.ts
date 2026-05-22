// All text strings copied verbatim from Figma file UGvU1B8yP5Pa7vQmneV0Cz,
// frame HOME (1:2). All image assets are originals downloaded from Figma
// (NOT screenshot renders) — see CLAUDE.md "Use ORIGINAL image assets".
// Image crop values are lifted from get_design_context generated code.

export type FigmaCrop = {
  w: number;
  h: number;
  left: number;
  top: number;
  rotate?: number;
};

export type FigmaAsset = {
  src: string;
  alt: string;
  intrinsicWidth: number;
  intrinsicHeight: number;
};

export type DropdownItem = { label: string };

export type Overlay = {
  src: string;
  left: number;
  top: number;
  width: number;
  height: number;
};

export type TitleSvg = {
  src: string;
  width: number;
  height: number;
};

export type Service = {
  id: string;
  eyebrow: string;
  title: string;
  titleSvg?: TitleSvg;
  body: string;
  image: FigmaAsset;
  crop: FigmaCrop;
  frameWidth: number;
  frameHeight: number;
  dropdowns: DropdownItem[];
  reversed?: boolean;
  overlay?: Overlay;
};

// Nav Component (Figma 6:1282) — instance is 1440×64, positioned at y=30 in HOME.
// Inner content: left=86 right=85 top=20 height=24, flex row with logo + links.
export const nav = {
  logo: {
    src: "/figma-assets/smur-logo.svg",
    alt: "SMUR.",
    width: 108,
    height: 24,
  },
  links: [
    { label: "Services", href: "/#brand-identity", width: 84 },
    { label: "WORK", href: "/work", width: 55 },
    { label: "ABOUT", href: "/#about", width: 62 },
    { label: "LET’s WORK TOGETHER", href: "/contact", width: 204 },
  ],
  // Figma spec: gap-[61px] between links, text-[17px], color #fff7f4
  linkGap: 61,
  fontSize: 17,
  textColor: "#fff7f4",
} as const;

export const hero = {
  headline: "NAMING, Branding & design BUILD GOOD stories",
  body:
    "Branding is not just aesthetics, it's a reflection of who you are, what you value, and how you want to be experienced. Drawn to genuine human connection and the subtle ways people express themselves, I approach naming, branding, and design as a way of creating identities that feel honest, grounded, and deeply aligned with the humans behind them.",
  // Status real-estate building photo from the hero mockup (Figma 165:24662)
  // — full-resolution Figma asset (1788×2679 JPEG), positioned per the
  // Status mockup's hero crop. The surrounding website chrome (nav, cards,
  // type) is a vector composition pending structural rebuild.
  building: {
    src: "/figma-assets/hero-building.jpg",
    alt: "Featured project — Status (real estate brand)",
    intrinsicWidth: 1788,
    intrinsicHeight: 2679,
  },
} as const;

export const services: Service[] = [
  {
    id: "brand-identity",
    eyebrow: "full service",
    title: "Brand identity",
    titleSvg: {
      src: "/figma-assets/titles/brand-identity.svg",
      width: 410.82,
      height: 69.43,
    },
    body:
      "This process is designed to uncover the heart of your brand through thoughtful conversation, intuition, and personal exploration, resulting in a visual identity that feels aligned, distinctive, and built to evolve with you over time.",
    image: {
      src: "/figma-assets/kokop.png",
      alt: "KOKOP — Coffee and snacks branding",
      intrinsicWidth: 4096,
      intrinsicHeight: 2733,
    },
    // Figma node 156:9704: w=429 h=561, image crop from generated code
    crop: { w: 207.98, h: 106.17, left: -75.11, top: -0.01 },
    frameWidth: 429,
    frameHeight: 561,
    dropdowns: [{ label: "Details" }, { label: "Timeline" }],
  },
  {
    id: "naming-positioning",
    eyebrow: "strategy focused",
    title: "Naming & Positioning",
    titleSvg: {
      src: "/figma-assets/titles/naming-positioning.svg",
      width: 310.1,
      height: 131.36,
    },
    body:
      "Together, we'll shape a name and brand direction that feels intentional, memorable, and deeply connected to the essence of your business and the people it's meant to reach.",
    image: {
      src: "/figma-assets/crisp.png",
      alt: "CRISP — Bakery brand identity",
      intrinsicWidth: 2404,
      intrinsicHeight: 1633,
    },
    // Figma node 1:811 rectangle inside Group 4: w=431.55 h=560
    crop: { w: 191.07, h: 100.02, left: -45.35, top: 0.02 },
    frameWidth: 432,
    frameHeight: 560,
    reversed: true,
    // CRISP type is an SVG overlay (Figma node 1:812 Group 3)
    // positioned at x=281-219.45=61.55 y=1217.99-997=220.99 w=308.83 h=84.64
    overlay: {
      src: "/figma-assets/crisp-logo.svg",
      left: 62,
      top: 221,
      width: 309,
      height: 85,
    },
    dropdowns: [{ label: "Details" }, { label: "Timeline" }],
  },
  {
    id: "webdesign-print",
    eyebrow: "more.more.more.",
    title: "Webdesign, Print & More",
    titleSvg: {
      src: "/figma-assets/titles/webdesign-print.svg",
      width: 362.1,
      height: 134.29,
    },
    body:
      "Beyond brand identity design, I offer a range of additional creative services, either as part of a larger project or as standalone collaborations:",
    image: {
      // Replaces the heavy vector-composed LAVABO brand-book mockup with the
      // client's exported photograph (May 2026 feedback round).
      src: "/figma-assets/services/lavabo-web-print.png",
      alt: "LAVABO — Webdesign and print case study",
      intrinsicWidth: 856,
      intrinsicHeight: 1114,
    },
    crop: { w: 100, h: 100, left: 0, top: 0 },
    frameWidth: 428,
    frameHeight: 557,
    dropdowns: [],
  },
];

export const servicesList = [
  "Web design",
  "Digital design deliverables",
  "Print design deliverables",
  "Social media visuals",
  "etc.",
] as const;

export const ctaButton = "LET'S WORK TOGETHER";

export const testimonial = {
  quote:
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consbcjdbjsnnxsjknknknzknzknknxk klalkxlax",
  attribution: "Name Name Insitute from where the person is",
} as const;

// Photo strip — Figma's generated code rotates several frames 90°,
// crops the source image, then displays the rotated portion.
export const photos: Array<{ image: FigmaAsset; crop: FigmaCrop }> = [
  {
    image: {
      src: "/figma-assets/photo-1.png",
      alt: "Studio moment — woodlands",
      intrinsicWidth: 2856,
      intrinsicHeight: 2142,
    },
    // Figma 6:1069: -rotate-90, h=361 w=357, image w=146.46% h=108.61% left=-41.81%
    crop: { w: 146.46, h: 108.61, left: -41.81, top: 0, rotate: -90 },
  },
  {
    image: {
      src: "/figma-assets/photo-2.png",
      alt: "Studio moment — sunset highway",
      intrinsicWidth: 2856,
      intrinsicHeight: 2142,
    },
    // Figma 6:1061: rotate-90, h=360 w=357, image w=195.28% h=138.94% left=-27.44% top=-9.79%
    crop: { w: 195.28, h: 138.94, left: -27.44, top: -9.79, rotate: 90 },
  },
  {
    image: {
      src: "/figma-assets/photo-3.png",
      alt: "Studio moment — cactus",
      intrinsicWidth: 2856,
      intrinsicHeight: 2140,
    },
    // Figma 6:1063: no rotation, h=357 w=359, image w=226.54% h=170.87% left=-0.04% top=-30.54%
    crop: { w: 226.54, h: 170.87, left: -0.04, top: -30.54 },
  },
  {
    image: {
      src: "/figma-assets/photo-4.png",
      alt: "Studio moment — red rocks",
      intrinsicWidth: 2856,
      intrinsicHeight: 2142,
    },
    // Figma 6:1067: rotate-90, h=360 w=357, image w=162.74% h=121.02% left=-1.99% top=-21.02%
    crop: { w: 162.74, h: 121.02, left: -1.99, top: -21.02, rotate: 90 },
  },
];

export const about = {
  heading: "ABOUT SMA & SMUR.",
  body:
    "Over the years, my work has grown beyond branding into web design, UI/UX, creative direction, and set & event styling, always focused on building cohesive, emotionally grounded visual worlds across both digital and physical spaces.  I value collaboration, thoughtful listening, and real human connection, which continue to shape how I work and the kinds of people and projects I'm naturally drawn to.  While branding remains central to what I do, I'm most fulfilled when creating work that feels both beautiful and deeply aligned with the people behind it.",
  portrait: {
    image: {
      src: "/figma-assets/about-portrait.png",
      alt: "Portrait of Sma",
      intrinsicWidth: 796,
      intrinsicHeight: 783,
    },
    // Figma 6:1342: w=294 h=294, image w=151.62% h=149.14% left=-25.83% top=-20.66%
    crop: { w: 151.62, h: 149.14, left: -25.83, top: -20.66 },
    frameWidth: 294,
    frameHeight: 294,
  },
  socials: "INSTAGRAM / PINTEREST",
} as const;
