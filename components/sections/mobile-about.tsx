import { about } from "@/content/home";
import { contactFAQ } from "@/content/contact";
import { FigmaImage } from "@/components/figma-image";
import { Reveal } from "@/components/reveal";
import { TitleMask } from "@/components/title-mask";

/*
  Faithful-fluid MobileAbout. Ported from legacy components/mobile/about.tsx.

  Stage = aspect-ratio 393/1081 container-query box (mx-auto, max-w-[393px]),
  `data-mobile-about-stage`, containerType: inline-size; the legacy fixed
  393×1081 composition (bg #906553 warm brown; title/body/portrait/socials
  absolutely placed) is expressed in % (positions, of the 393×1081 stage) and
  cqw (type + TitleMask size) so it scales with viewport width — no zoom.

  The 1081 stage height (vs. the Figma-native 1021) preserves the legacy's
  +60px toolbar-clearance pad below the socials (see legacy comment) — the
  fluid conversion keeps that same relative spacing.

  CRITICAL structural detail preserved unchanged from legacy: the portrait is
  bottom-anchored (`right`/`bottom`, not `top`/`left`) and its absolute
  wrapper sits OUTSIDE the `Reveal` — putting it inside would make the
  Reveal's motion transform the containing block for a bottom-anchored child
  AND collapse to a zero-height box at the section top, so `bottom` would
  resolve against the top of the section instead of the actual bottom edge
  (portrait pops in over content above, then jumps down once the transform
  clears). Only the `Reveal` itself (title 0, body 0.08, portrait 0.15,
  socials 0.2) is nested inside each positioned wrapper.

  Native coords (393×1081 stage): title left=45 right=41 top=95, about-
  centered.svg 174.3×140.3; body left=45 right=40 top=279 width=308, 15px/
  1.33; portrait wrapper right=75 bottom=182 (243×243 square); socials
  wrapper left=16 right=16 bottom=109, 15px italic.
*/

/** Native mobile about stage the px coordinates below were measured against. */
const STAGE_W = 393;
const STAGE_H = 1081;

/** Converts a px value on the STAGE_W×STAGE_H stage to a CSS percentage string. */
function pctX(px: number) {
  return `${(px / STAGE_W) * 100}%`;
}
function pctY(px: number) {
  return `${(px / STAGE_H) * 100}%`;
}

export function MobileAbout() {
  return (
    <section
      id="m-about"
      aria-labelledby="m-about-title"
      data-nav-scheme="light"
      className="w-full"
      style={{ backgroundColor: "var(--color-about)" }}
    >
      <div
        data-mobile-about-stage
        className="relative mx-auto w-full max-w-[393px]"
        style={{ aspectRatio: "393 / 1081", containerType: "inline-size" }}
      >
        <Reveal>
          {/* Heading (268:34829) — brand-font SVG. Mobile Figma centers the 3
              lines ("ABOUT / SMA & / SMUR."), so we use about-centered.svg
              (the shared desktop about.svg letterforms re-centered within the
              viewBox); desktop keeps the left-aligned about.svg. Same
              viewBox, so the TitleMask dimensions are unchanged. */}
          <div
            id="m-about-title"
            className="absolute flex justify-center text-cream"
            style={{ left: pctX(45), right: pctX(41), top: pctY(95) }}
          >
            <TitleMask
              src="/figma-assets/titles/about-centered.svg"
              width="44.35cqw" /* 174.3/393 */
              height="35.70cqw" /* 140.3/393 */
              alt="About Sma & Smur."
              as={2}
            />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div
            className="absolute text-center text-cream"
            style={{
              left: pctX(45),
              right: pctX(40),
              top: pctY(279),
              width: pctX(308),
            }}
          >
            <p style={{ fontSize: "3.82cqw" /* 15/393 */, lineHeight: 1.33 }}>
              Over the years, my work has grown beyond branding into web
              design, UI/UX, creative direction, and set &amp; event styling,
              always focused on building cohesive, emotionally grounded
              visual worlds across both digital and physical spaces.
            </p>
            <p
              className="mt-[1em]"
              style={{ fontSize: "3.82cqw" /* 15/393 */, lineHeight: 1.33 }}
            >
              I value collaboration, thoughtful listening, and real human
              connection, which continue to shape how I work and the kinds
              of people and projects I&rsquo;m naturally drawn to.
            </p>
            <p
              className="mt-[1em]"
              style={{ fontSize: "3.82cqw" /* 15/393 */, lineHeight: 1.33 }}
            >
              While branding remains central to what I do, I&rsquo;m most
              fulfilled when creating work that feels both beautiful and
              deeply aligned with the people behind it.
            </p>
          </div>
        </Reveal>

        {/* Absolute wrapper is OUTSIDE the Reveal. The Reveal's motion
            transform would otherwise become the containing block for this
            bottom-anchored child AND collapse to a zero-height box at the
            section top — making `bottom` resolve against the top of the
            section, so the portrait briefly rendered over the photo strip
            above and "popped down" when the reveal transform cleared. */}
        <div
          className="absolute"
          style={{ right: pctX(75), bottom: pctY(182) }}
        >
          <Reveal delay={0.15}>
            <FigmaImage
              src={about.portrait.image.src}
              alt={about.portrait.image.alt}
              intrinsicWidth={about.portrait.image.intrinsicWidth}
              intrinsicHeight={about.portrait.image.intrinsicHeight}
              width={243}
              height={243}
              crop={about.portrait.crop}
              fluid
            />
          </Reveal>
        </div>

        <div
          className="absolute"
          style={{ left: pctX(16), right: pctX(16), bottom: pctY(109) }}
        >
          <Reveal delay={0.2}>
            <p
              className="font-sans text-center italic text-white"
              style={{ fontSize: "3.82cqw" /* 15/393 */, lineHeight: "normal" }}
            >
              <a
                href={contactFAQ.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-70"
              >
                INSTAGRAM
              </a>
              &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
              <a
                href={contactFAQ.pinterestUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-70"
              >
                PINTEREST
              </a>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
