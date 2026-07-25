import Image from "next/image";
import Link from "next/link";
import {
  workFooter,
  workHero,
  workProjects,
  workTileHref,
} from "@/content/work";
import { ArchitraveTile } from "@/components/work/architrave-tile";
import { LavaboTile } from "@/components/work/lavabo-tile";
import { NnfTile } from "@/components/work/nnf-tile";
import { BouncingArrow } from "@/components/bouncing-arrow";
import { Reveal } from "@/components/reveal";
import { TitleMask } from "@/components/title-mask";

/*
  Faithful-fluid mobile WORK page. Ported from components/mobile/work-page.tsx
  (MobileWorkPage) to the aspect-ratio stage pattern used by the desktop
  WorkPage (components/sections/work-page.tsx): stage = aspect-ratio
  393/2309 container-query box, the legacy 393×2309 composition (Figma
  268:37131, bg #fff7f4) is expressed in % (positions) and cqw (type +
  TitleMask + arrow size) so it scales with viewport width — no zoom.

  Reveal wrappers/delays, the `eager` flag on the tile AND footer Reveals
  (REQUIRED — see the comments above each), workTileHref, and the
  Architrave/Lavabo/MNF *Tile branch are all preserved unchanged from the
  legacy component; only px→%/cqw units differ.

  Native coords (393×2309 stage):
  hero container left=79 top=101 w=239; eyebrow 15px; TitleMask
  this-is-my-work.svg 197.6×112.7; arrow box left=169 top=245 55×71.806
  (Figma-absolute — positioned against the stage, not the hero container);
  footer left=94 top=2263 w=205, 15px.
*/

const STAGE_W = 393;
const STAGE_H = 2309;

function pctX(px: number) {
  return `${(px / STAGE_W) * 100}%`;
}
function pctY(px: number) {
  return `${(px / STAGE_H) * 100}%`;
}
function cqw(px: number) {
  return `${(px / STAGE_W) * 100}cqw`;
}

export function MobileWorkPage() {
  const { container, eyebrowSize } = workHero.mobile;

  return (
    <section
      data-nav-scheme="dark"
      className="w-full"
      style={{ backgroundColor: "var(--color-page)" }}
    >
      <div
        data-work-stage
        className="relative mx-auto w-full max-w-[393px]"
        style={{ aspectRatio: "393 / 2309", containerType: "inline-size" }}
      >
        {/* Hero intro */}
        <div
          className="absolute text-center"
          style={{
            left: pctX(container.x),
            top: pctY(container.y),
            width: pctX(container.w),
          }}
        >
          <Reveal>
            <p
              className="font-sans italic text-accent"
              style={{ fontSize: cqw(eyebrowSize), lineHeight: 1 }}
            >
              {workHero.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="mt-[8px] flex justify-center text-ink">
              <TitleMask
                src="/figma-assets/titles/this-is-my-work.svg"
                width={cqw(197.6)}
                height={cqw(112.7)}
                alt={`${workHero.title[0]} ${workHero.title[1]}`}
                as={1}
              />
            </div>
          </Reveal>
        </div>

        {/* Scroll-down arrow indicator (Figma "Component 2" at x=169 y=245 —
            55×71.806). Positioned as a direct child of the stage (NOT nested
            inside the hero-intro box above) because percentage left/top
            resolve against the element's own containing block — nesting it
            inside hero-intro (which has no explicit height) would compute
            the percentages against that box instead of the full 393×2309
            stage. As a stage sibling, pctX/pctY(169, 245) are the correct
            Figma-absolute coordinates with no container offset needed. */}
        <Reveal delay={0.12}>
          <div
            data-scroll-cue
            className="absolute flex items-center justify-center text-ink"
            style={{
              left: pctX(169),
              top: pctY(245),
              width: cqw(55),
              height: `${(71.806 / STAGE_H) * 100}%`,
            }}
            aria-hidden
          >
            <BouncingArrow direction="down" size={cqw(72)} />
          </div>
        </Reveal>

        {/* Project tiles. `eager` (reveal-on-mount) is REQUIRED here: each
            Reveal wraps an absolutely-positioned Link, so its motion wrapper is
            a zero-height box pinned to the top of the section. With scroll-based
            whileInView that box is only "in view" at the very top of the page —
            so after navigating back to /work with a restored (non-top) scroll
            position, the tiles stayed hidden until you scrolled all the way up.
            Reveal-on-mount shows them regardless of scroll position. */}
        {workProjects.map((p, i) => (
          <Reveal key={p.slug} eager delay={0.05 + (i % 4) * 0.04}>
            <Link
              href={workTileHref(p.slug)}
              aria-label={p.name}
              className="absolute block cursor-pointer overflow-hidden"
              style={{
                left: `${(p.mobile.x / STAGE_W) * 100}%`,
                top: `${(p.mobile.y / STAGE_H) * 100}%`,
                width: `${(p.mobile.w / STAGE_W) * 100}%`,
                height: `${(p.mobile.h / STAGE_H) * 100}%`,
              }}
            >
              {p.slug === "mnf" ? (
                <NnfTile width={p.mobile.w} />
              ) : p.slug === "lavabo" ? (
                <LavaboTile width={p.mobile.w} />
              ) : p.slug === "architrave" ? (
                <ArchitraveTile width={p.mobile.w} />
              ) : (
                <Image
                  src={p.image}
                  alt={p.name}
                  width={p.mobile.w}
                  height={p.mobile.h}
                  unoptimized
                  className="block h-full w-full object-cover"
                />
              )}
            </Link>
          </Reveal>
        ))}

        {/* thanks :) footer. `eager` (reveal-on-mount) is required: the footer
            sits at the very bottom of the frame, permanently inside the Reveal's
            bottom -5% viewport-exclusion margin, so scroll-based whileInView
            never fires and it stayed hidden (opacity 0, translateY 24). */}
        <div
          className="absolute text-center"
          style={{
            left: pctX(workFooter.mobile.x),
            top: pctY(workFooter.mobile.y),
            width: pctX(workFooter.mobile.w),
          }}
        >
          <Reveal eager>
            <p
              className="font-sans italic lowercase text-accent"
              style={{
                fontSize: cqw(workFooter.mobile.fontSize),
                lineHeight: 1,
              }}
            >
              {workFooter.text}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
