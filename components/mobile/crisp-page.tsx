"use client";

import Image from "next/image";
import { crisp } from "@/content/crisp";
import { Reveal } from "../reveal";

/*
  Mobile CRISP case study. CRISP has no dedicated mobile Figma design, so this
  is a mobile-native reflow (Lavabo-style): a readable native-size intro, then
  the desktop flat-image sections re-stacked full-bleed at the 393 mobile width.
  Rendered inside the route's 393 zoom wrapper. (The desktop vector brand-mark
  hero has no flat export and can't be cleanly reused, so the case study opens
  on the intro + the café shot, which already carries the CRISP logotype.)
*/
const SECTIONS = [
  { src: "/figma-assets/work/crisp/row1-cafe.jpg", w: 851, h: 1044, alt: "CRISP café interior with logotype" },
  { src: "/figma-assets/work/crisp/band-pattern.png", w: 1771, h: 1208, alt: "CRISP pattern — wordmark, croissant marks and ‘artisanal patisserie’ stamps" },
  { src: "/figma-assets/work/crisp/row1-badges.png", w: 848, h: 1045, alt: "CRISP — artisanal patisserie marks" },
  { src: "/figma-assets/work/crisp/instagram-mockup.png", w: 867, h: 1045, alt: "CRISP Instagram feed on a phone" },
  { src: "/figma-assets/work/crisp/business-cards.png", w: 847, h: 1045, alt: "CRISP business cards on a sage background" },
  { src: "/figma-assets/work/crisp/band-bg.jpg", w: 2404, h: 1633, alt: "CRISP brand showcase" },
  { src: "/figma-assets/work/crisp/now-open-poster.png", w: 1796, h: 2228, alt: "CRISP ‘We are now open!’ folded poster" },
];

export function MobileCrispCaseStudy() {
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
            style={{ fontSize: "40px", lineHeight: 1, letterSpacing: "0.01em" }}
          >
            {crisp.eyebrow}
          </p>
          <p
            className="mt-[20px] text-ink"
            style={{ fontSize: "15px", lineHeight: 1.45 }}
          >
            {crisp.body}
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
