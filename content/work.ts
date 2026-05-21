// WORK page content (Figma frames 1:243 desktop / 268:37131 mobile).
// Positions, sizes, and text are lifted verbatim from get_metadata +
// get_design_context. Per CLAUDE.md rule #8 the sections render with
// fixed-height containers and absolutely positioned tiles.

export type TilePos = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export type WorkProject = {
  slug: string;
  name: string;
  image: string;
  desktop: TilePos;
  mobile: TilePos;
};

/* -------------------------------------------------------------------------- */
/* Frame dimensions + colors                                                  */
/* -------------------------------------------------------------------------- */

export const workFrame = {
  desktop: { width: 1440, height: 5187, bg: "#fff7f4" },
  mobile: { width: 393, height: 2309, bg: "#fff7f4" },
} as const;

/* -------------------------------------------------------------------------- */
/* Hero (eyebrow + "This is My Work")                                         */
/* -------------------------------------------------------------------------- */

export const workHero = {
  eyebrow: "scroll through & click on it",
  title: ["This is", "My Work"], // rendered on two lines
  desktop: {
    container: { x: 435, y: 141, w: 569, h: 184 },
    titleSize: 58,
    eyebrowSize: 20,
  },
  mobile: {
    container: { x: 79, y: 101, w: 239, h: 126 },
    titleSize: 45,
    eyebrowSize: 15,
  },
} as const;

/* -------------------------------------------------------------------------- */
/* Footer "Thanks :)"                                                         */
/* -------------------------------------------------------------------------- */

export const workFooter = {
  text: "Thanks :)",
  desktop: { x: 476, y: 5056, w: 488, fontSize: 27 },
  mobile: { x: 94, y: 2263, w: 205, fontSize: 11 },
} as const;

/* -------------------------------------------------------------------------- */
/* Project tiles                                                              */
/* Slugs that have a built case study route — others stay as anchors.         */
/* -------------------------------------------------------------------------- */
export const workCaseStudies: ReadonlySet<string> = new Set([
  "lavabo",
  "kokop",
  "crisp",
  "iwl",
  "interstellar",
  "taf",
  "kabinett",
  "sws",
  "mnf",
  "architrave",
]);

export function workTileHref(slug: string): string {
  return workCaseStudies.has(slug) ? `/work/${slug}` : `/work#${slug}`;
}



export const workProjects: WorkProject[] = [
  {
    slug: "crisp",
    name: "CRISP",
    image: "/figma-assets/work/crisp.jpg",
    desktop: { x: 0, y: 126, w: 428, h: 522 },
    mobile: { x: 0, y: 334, w: 155, h: 189 },
  },
  {
    slug: "interstellar",
    name: "INTERSTELLAR",
    image: "/figma-assets/work/interstellar.jpg",
    desktop: { x: 893, y: 532, w: 547, h: 499 },
    mobile: { x: 196, y: 409, w: 198, h: 180 },
  },
  {
    slug: "sws",
    name: "Sassy Women Society",
    image: "/figma-assets/work/sws.gif",
    /* Note: SWS bleeds past the left edge per Figma (x = -12 desktop, -33 mobile). */
    desktop: { x: -12, y: 945, w: 731, h: 411 },
    mobile: { x: -33, y: 625, w: 264, h: 149 },
  },
  {
    slug: "mnf",
    name: "MNF",
    image: "/figma-assets/work/mnf-phone.jpg",
    desktop: { x: 871, y: 1421, w: 569, h: 647 },
    mobile: { x: 187, y: 809, w: 206, h: 234 },
  },
  {
    slug: "taf",
    name: "TAF",
    image: "/figma-assets/work/taf.jpg",
    desktop: { x: 0, y: 1708, w: 435, h: 588 },
    mobile: { x: 0, y: 918, w: 157, h: 212 },
  },
  {
    slug: "iwl",
    name: "Institute for World Literature",
    image: "/figma-assets/work/iwl.svg",
    desktop: { x: 961, y: 2455, w: 479, h: 576 },
    mobile: { x: 220, y: 1078, w: 173, h: 208 },
  },
  {
    slug: "kokop",
    name: "KOKOP",
    image: "/figma-assets/work/kokop.jpg",
    desktop: { x: -1, y: 2647, w: 761, h: 508 },
    mobile: { x: 0, y: 1321, w: 275, h: 183 },
  },
  {
    slug: "lavabo",
    name: "LAVABO",
    image: "/figma-assets/work/lavabo.png",
    desktop: { x: 679, y: 3418, w: 761, h: 507 },
    mobile: { x: 118, y: 1540, w: 275, h: 183 },
  },
  {
    slug: "kabinett",
    name: "kabinett",
    image: "/figma-assets/work/kabinett.png",
    desktop: { x: -1, y: 3505, w: 513, h: 633 },
    mobile: { x: 0, y: 1759, w: 185, h: 228 },
  },
  {
    slug: "architrave",
    name: "ARCHITRAVE",
    image: "/figma-assets/work/architrave.png",
    desktop: { x: 0, y: 4402, w: 795, h: 529 },
    mobile: { x: 106, y: 2022, w: 287, h: 191 },
  },
];
