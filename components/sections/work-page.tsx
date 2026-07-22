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
  Faithful-fluid desktop WORK page. Ported from components/work/page.tsx
  (DesktopWorkPage) to the aspect-ratio stage pattern used by the home
  hero/about sections: stage = aspect-ratio 1440/5187 container-query box,
  the legacy 1440×5187 composition (Figma 1:243, bg #fff7f4) is expressed in
  % (positions) and cqw (type + TitleMask + arrow size) so it scales with
  viewport width — no zoom.

  Reveal wrappers/delays, the `eager` flag on the tile Reveals (REQUIRED —
  see the comment above the tiles map), workTileHref, and the
  Architrave/Lavabo/MNF *Tile branch are all preserved unchanged from the
  legacy component; only px→%/cqw units differ.

  Native coords (1440×5187 stage):
  hero container left=435 top=141 w=569; eyebrow 20px; TitleMask
  this-is-my-work.svg 254.66×145.21; arrow box left=684 top=345 72×94 (frame-
  relative to the hero container: left 249/top 204); footer left=476
  top=5056 w=488, 27px.
*/

const STAGE_W = 1440;
const STAGE_H = 5187;

function pctX(px: number) {
  return `${(px / STAGE_W) * 100}%`;
}
function pctY(px: number) {
  return `${(px / STAGE_H) * 100}%`;
}
function cqw(px: number) {
  return `${(px / STAGE_W) * 100}cqw`;
}

export function WorkPage() {
  const { container, eyebrowSize } = workHero.desktop;

  return (
    <section
      data-nav-scheme="dark"
      className="w-full"
      style={{ backgroundColor: "var(--color-page)" }}
    >
      <div
        data-work-stage
        className="relative mx-auto w-full max-w-[1440px]"
        style={{ aspectRatio: "1440 / 5187", containerType: "inline-size" }}
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
            <div className="mt-[12px] flex justify-center text-ink">
              <TitleMask
                src="/figma-assets/titles/this-is-my-work.svg"
                width={cqw(254.66)}
                height={cqw(145.21)}
                alt={`${workHero.title[0]} ${workHero.title[1]}`}
                as={1}
              />
            </div>
          </Reveal>
        </div>

        {/* Scroll-down arrow indicator (Figma "Component 2" at x=684 y=345 —
            72×94). Positioned as a direct child of the stage (NOT nested
            inside the hero-intro box above) because percentage left/top
            resolve against the element's own containing block — nesting it
            inside hero-intro (which has no explicit height) caused the
            percentages to be computed against that box instead of the full
            1440×5187 stage, shifting the arrow right and overlapping the
            title. As a stage sibling, pctX/pctY(684, 345) are the correct
            Figma-absolute coordinates with no container offset needed. */}
        <Reveal delay={0.12}>
          <div
            data-scroll-cue
            className="absolute flex items-center justify-center text-ink"
            style={{
              left: pctX(684),
              top: pctY(345),
              width: cqw(72),
              height: cqw(94),
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
                left: `${(p.desktop.x / STAGE_W) * 100}%`,
                top: `${(p.desktop.y / STAGE_H) * 100}%`,
                width: `${(p.desktop.w / STAGE_W) * 100}%`,
                height: `${(p.desktop.h / STAGE_H) * 100}%`,
              }}
            >
              {p.slug === "mnf" ? (
                <NnfTile width={p.desktop.w} />
              ) : p.slug === "lavabo" ? (
                <LavaboTile width={p.desktop.w} />
              ) : p.slug === "architrave" ? (
                <ArchitraveTile width={p.desktop.w} />
              ) : (
                <Image
                  src={p.image}
                  alt={p.name}
                  width={p.desktop.w}
                  height={p.desktop.h}
                  unoptimized
                  className="block h-full w-full object-cover"
                />
              )}
            </Link>
          </Reveal>
        ))}

        {/* Thanks :) footer */}
        <div
          className="absolute text-center"
          style={{
            left: pctX(workFooter.desktop.x),
            top: pctY(workFooter.desktop.y),
            width: pctX(workFooter.desktop.w),
          }}
        >
          <Reveal>
            <p
              className="font-sans italic lowercase text-accent"
              style={{
                fontSize: cqw(workFooter.desktop.fontSize),
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
