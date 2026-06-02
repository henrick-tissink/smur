"use client";

import Image from "next/image";
import { iwl } from "@/content/iwl";
import { Reveal } from "../reveal";

/*
  Mobile IWL (Harvard Institute for World Literature) case study. IWL has no
  dedicated mobile Figma design, so this is a mobile-native reflow
  (Lavabo/CRISP-style): a readable native-size intro, then the desktop
  flat-image showcase sections re-stacked full-bleed at the 393 mobile width.
  Rendered inside the route's 393 zoom wrapper. (The vector/typographic hero
  composition, the Möbius panel marks and the Row 2 vector overlay have no
  clean flat export, so the case study opens on the intro + the Row 1 photo.)
*/
const SECTIONS = [
  { src: "/figma-assets/work/iwl/row1-photo.jpg", w: 1964, h: 2946, alt: "IWL editorial photograph" },
  { src: "/figma-assets/work/iwl/banner.png", w: 1798, h: 1195, alt: "Welcome to the Institute for World Literature banner" },
  { src: "/figma-assets/work/iwl/pattern.png", w: 1789, h: 1216, alt: "IWL repeating logotype pattern" },
  { src: "/figma-assets/work/iwl/row4-left.png", w: 871, h: 1046, alt: "IWL programme brochure spread" },
  { src: "/figma-assets/work/iwl/row4-right.png", w: 871, h: 1042, alt: "IWL — a participant reading, with the Möbius logo overlay" },
  { src: "/figma-assets/work/iwl/poster.png", w: 1790, h: 2159, alt: "IWL Harvard University 2023 session poster" },
];

export function MobileIwlCaseStudy() {
  return (
    <div
      data-nav-scheme="dark"
      className="mx-auto"
      style={{ width: "393px", backgroundColor: "#fff7f4", paddingTop: "100px" }}
    >
      {/* Readable intro. */}
      <Reveal eager>
        <div className="px-[43px] pb-[36px] text-center">
          <p
            className="font-heading uppercase text-ink"
            style={{ fontSize: "22px", lineHeight: 1.1, letterSpacing: "0.01em" }}
          >
            {iwl.eyebrow}
          </p>
          <p
            className="mt-[20px] text-ink"
            style={{ fontSize: "15px", lineHeight: 1.45 }}
          >
            {iwl.body}
          </p>
        </div>
      </Reveal>

      {/* Full-bleed visual sections. */}
      <div className="flex flex-col gap-[12px] pb-[24px]">
        {SECTIONS.map((s, i) => (
          <Reveal key={s.src} eager delay={0.03 * i}>
            <Image
              src={s.src}
              alt={s.alt}
              width={s.w}
              height={s.h}
              unoptimized
              className="block h-auto w-full"
            />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
