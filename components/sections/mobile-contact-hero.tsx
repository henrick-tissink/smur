"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { BouncingArrow } from "@/components/bouncing-arrow";
import { Reveal } from "@/components/reveal";
import { TitleMask } from "@/components/title-mask";

/*
  Faithful-fluid mobile ContactHero. Ported from the Hero() block in legacy
  components/mobile/contact-page.tsx (Figma 282:39442, sage section
  y=0 h=866) to the aspect-ratio stage pattern used by desktop ContactHero /
  MobileHero: stage = aspect-ratio 393/866 container-query box, the legacy
  393×866 composition expressed in % (positions) and cqw (type + arrow size)
  so it scales with viewport width — no zoom.

  Unlike the desktop hero, mobile has NO LAVABO carousel — only the
  MANUFAKTURA left thumb (per Figma + legacy).

  `overflow: visible` on the stage matches the desktop stage convention even
  though nothing currently overlaps the 866 bottom edge on mobile.

  Reveal delays (UNCHANGED from legacy): title 0, body 0.08, left image 0.12.

  Native coords (393×866 stage):
  title left=42 top=100 w=310; body left=42 top=290 w=310; MANUFAKTURA
  hero-left.png left=0 top=645 w=154 h=221; down arrow box centered
  (left=0 right=0) top=545.

  Arrow is a DIRECT child of the stage (containing-block rule, Phase 4 /
  CLAUDE.md #8), matching the desktop scroll-cue treatment.
*/

const STAGE_W = 393;
const STAGE_H = 866;

function pctX(px: number) {
  return `${(px / STAGE_W) * 100}%`;
}
function pctY(px: number) {
  return `${(px / STAGE_H) * 100}%`;
}
function cqw(px: number) {
  return `${(px / STAGE_W) * 100}cqw`;
}

export function MobileContactHero() {
  const t = useTranslations("Contact");
  return (
    <section
      data-nav-scheme="light"
      className="relative w-full"
      style={{ backgroundColor: "var(--color-band)" }}
    >
      <div
        data-mobile-contact-hero-stage
        className="relative mx-auto w-full max-w-[393px]"
        style={{
          aspectRatio: "393 / 866",
          containerType: "inline-size",
          overflow: "visible",
        }}
      >
        {/* Title centered at y=100, w=310 (Figma 282:55197) */}
        <div
          className="absolute flex justify-center text-cream"
          style={{ left: pctX(42), top: pctY(100), width: pctX(310) }}
        >
          <Reveal>
            <TitleMask
              src="/figma-assets/titles/tell-me-about.svg"
              width={cqw(302)}
              height={cqw(107.1)}
              alt={t("title")}
              as={1}
            />
          </Reveal>
        </div>

        {/* Body at y=290, w=310 */}
        <div
          className="absolute text-center text-cream"
          style={{ left: pctX(42), top: pctY(290), width: pctX(310) }}
        >
          <Reveal delay={0.08}>
            <p style={{ fontSize: cqw(15), lineHeight: 1.33 }}>
              {t("intro")}
            </p>
          </Reveal>
        </div>

        {/* MANUFAKTURA editorial decorative thumbnail bottom-left (no
            LAVABO carousel on mobile — only this left thumb). */}
        <Reveal delay={0.12}>
          <div
            className="absolute"
            style={{ left: pctX(0), top: pctY(645), width: pctX(154), height: pctY(221) }}
          >
            <Image
              src="/figma-assets/contact/hero-left.png"
              alt="MANUFAKTURA Studio brand collateral"
              fill
              sizes="154px"
              unoptimized
              className="object-cover"
            />
          </div>
        </Reveal>

        {/* Down arrow scroll cue, frame-centered at top=545. Direct child of
            the stage — same containing-block reasoning as the desktop
            scroll cue. */}
        <div
          data-scroll-cue
          className="absolute flex justify-center text-cream"
          style={{ left: 0, right: 0, top: pctY(545) }}
          aria-hidden
        >
          <BouncingArrow direction="down" size={cqw(72)} />
        </div>
      </div>
    </section>
  );
}
