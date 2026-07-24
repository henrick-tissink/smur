"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/reveal";
import { TitleMask } from "@/components/title-mask";

/*
  Faithful-fluid MobileHero. Ported from components/mobile/hero.tsx.

  Stage = aspect-ratio 393/852 container-query box (mx-auto, max-w-[393px]);
  the legacy 393×852 mobile composition is expressed in % (positions, relative
  to this stage) and cqw (type) so it scales with viewport width — no zoom.

  HERO_FRAMES data, the 1s auto-advance interval, the crossfade, the
  INTERSTELLAR composition (photo + mix-blend-color overlay + wordmark), and
  the Reveal-wrapped headline/body are preserved unchanged from the legacy
  component — only px→%/cqw units differ.

  Native coords (393×852 stage): headline overlay left=14 right=27 top=181;
  body overlay left=41 top=449 width=310; header-centered.svg 351×215.75.
*/

type HeroFrame =
  | { frame: string; empty: true }
  | {
      frame: string;
      slug: string;
      rect: { left: number; top: number; w: number; h: number };
      src?: string;
      imgW?: number;
      imgH?: number;
      alt: string;
      composition?: boolean;
    };

const HERO_FRAMES: HeroFrame[] = [
  { frame: "Variant6", slug: "interstellar", rect: { left: 173, top: 652, w: 220, h: 200 }, alt: "INTERSTELLAR feature project preview", composition: true },
  { frame: "Frame 89", empty: true },
  { frame: "Frame 90", empty: true },
  { frame: "Frame 91", slug: "kokop", rect: { left: 232, top: 70, w: 161, h: 193 }, src: "/figma-assets/work/kokop/insta-phone.png", imgW: 1748, imgH: 2089, alt: "KOKO.P Instagram feed mockup" },
  { frame: "Frame 92", slug: "crisp", rect: { left: 0, top: 625, w: 161, h: 198 }, src: "/figma-assets/work/crisp/now-open-poster.png", imgW: 1796, imgH: 2228, alt: "CRISP ‘We are now open!’ poster" },
  { frame: "Frame 93", slug: "taf", rect: { left: 0, top: 117, w: 225, h: 152 }, src: "/figma-assets/work/taf/band-fabric.png", imgW: 1783, imgH: 1206, alt: "TAF logo printed on fabric" },
];
const FEATURE_INTERVAL_MS = 1000; // prototype auto-advance cadence

/* Both the mobile and desktop trees are server-rendered into one document and
   toggled with CSS (`md:hidden` / `hidden md:block`). Eager/`preload` images
   load even when their tree is `display:none`, so on desktop this mobile hero's
   full-res `unoptimized` photos (~8.8 MB) used to download for a hero the user
   never sees. Fix: the frame images are `loading="lazy"` (a lazy image inside a
   `display:none` subtree is not fetched), and the frames the 1s carousel cycles
   through are preloaded ONLY when the mobile media query matches — so mobile
   still fetches them early (unchanged UX) while desktop fetches none of them. */
const MOBILE_MEDIA = "(max-width: 767px)";
const HERO_PRELOAD_SRCS = [
  "/figma-assets/mobile/hero-interstellar.jpg",
  ...HERO_FRAMES.flatMap((f) => ("empty" in f ? [] : f.src ? [f.src] : [])),
];

/** Native mobile hero stage the px coordinates below were measured against. */
const STAGE_W = 393;
const STAGE_H = 852;

/** Converts a px value on the STAGE_W×STAGE_H stage to a CSS percentage string. */
function pctX(px: number) {
  return `${(px / STAGE_W) * 100}%`;
}
function pctY(px: number) {
  return `${(px / STAGE_H) * 100}%`;
}

/** Converts a px offset local to a WxH box (e.g. the INTERSTELLAR tile) to a
 *  CSS percentage of that box — the correct resolution context for children
 *  of an already-fluid, percentage-sized ancestor. */
function pctOfW(px: number, w: number) {
  return `${(px / w) * 100}%`;
}
function pctOfH(px: number, h: number) {
  return `${(px / h) * 100}%`;
}

export function MobileHero() {
  const t = useTranslations("Hero");
  // Body copy underlines "who you are" mid-sentence (Figma emphasis); the
  // message is one plain string, so split around that marker in code. The
  // straight apostrophe from the extracted message is swapped for the
  // typographic ’ the design uses (matches the pre-i18n hardcoded JSX).
  const body = t("body").replace(/'/g, "’");
  const marker = t("bodyEmphasis");
  const markerIndex = body.indexOf(marker);
  const bodyBefore = markerIndex >= 0 ? body.slice(0, markerIndex) : body;
  const bodyAfter =
    markerIndex >= 0 ? body.slice(markerIndex + marker.length) : "";

  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % HERO_FRAMES.length),
      FEATURE_INTERVAL_MS,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="m-home"
      aria-label="Hero"
      data-nav-scheme="dark"
      className="w-full"
      style={{ backgroundColor: "var(--color-hero)" }}
    >
      {/* Media-scoped preloads: the browser fetches these only when the mobile
          media query matches, so desktop (where this tree is display:none)
          never downloads them. React 19 hoists these <link>s into <head>. */}
      {HERO_PRELOAD_SRCS.map((src) => (
        <link
          key={src}
          rel="preload"
          as="image"
          href={src}
          media={MOBILE_MEDIA}
        />
      ))}
      <div
        data-hero-stage
        className="relative mx-auto w-full max-w-[393px] overflow-hidden"
        style={{ aspectRatio: "393 / 852", containerType: "inline-size" }}
      >
        {/* Component 3 showcase frames — one positioned tile per variant
            (frames 89/90 are intentionally empty beats). Each tile is its
            own link, interactive only while visible. */}
        {HERO_FRAMES.map((f, i) => {
          if ("empty" in f) return null;
          const active = index === i;
          const { left, top, w, h } = f.rect;
          return (
            <Link
              key={f.frame}
              href={`/work#${f.slug}`}
              aria-label={`${f.slug.toUpperCase()} feature`}
              aria-hidden={!active}
              tabIndex={active ? 0 : -1}
              className={`absolute block overflow-hidden transition-opacity duration-[180ms] ease-out ${
                active ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
              style={{ left: pctX(left), top: pctY(top), width: pctX(w), height: pctY(h) }}
            >
              {f.composition ? (
                <>
                  {/* INTERSTELLAR composition (297:56928): the 293-tall photo
                      sits in the 200-tall clip window shifted up 92px, plus
                      the color overlay + wordmark. Sub-image offsets are
                      percentages of the tile's own native box (220×200) —
                      the correct containing block for an already fluid,
                      percentage-sized ancestor. */}
                  <Image
                    src="/figma-assets/mobile/hero-interstellar.jpg"
                    alt={f.alt}
                    width={1728}
                    height={2304}
                    loading="lazy"
                    unoptimized
                    className="absolute object-cover"
                    style={{
                      left: pctOfW(0, w),
                      top: pctOfH(-92, h),
                      width: pctOfW(220, w),
                      height: pctOfH(293, h),
                      maxWidth: "none",
                    }}
                  />
                  <Image
                    src="/figma-assets/mobile/hero-overlay.svg"
                    alt=""
                    width={220}
                    height={200}
                    unoptimized
                    className="pointer-events-none absolute"
                    style={{
                      left: pctOfW(0, w),
                      top: pctOfH(0, h),
                      width: pctOfW(220, w),
                      height: pctOfH(200, h),
                      mixBlendMode: "color",
                    }}
                  />
                  <Image
                    src="/figma-assets/mobile/hero-mark.svg"
                    alt="INTERSTELLAR"
                    width={158}
                    height={39}
                    unoptimized
                    className="absolute"
                    style={{
                      left: pctOfW(31, w),
                      top: pctOfH(75, h),
                      width: pctOfW(158, w),
                      height: pctOfH(39, h),
                    }}
                  />
                </>
              ) : (
                <Image
                  src={f.src!}
                  alt={f.alt}
                  width={f.imgW}
                  height={f.imgH}
                  unoptimized
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
            </Link>
          );
        })}

        {/* Headline (268:34838) — brand-font SVG rendered via CSS mask.
            header-centered.svg is the shared desktop letterforms re-laid-out
            for mobile: each line centered AND "GOOD" / "STORIES" split onto
            their own lines (5 lines: "NAMING, / BRANDING & / DESIGN BUILD /
            GOOD / STORIES"). Box-anchored to the 351px title width (aspect
            586.82/360.7). */}
        <div
          className="absolute flex justify-center text-cream"
          style={{ left: pctX(14), right: pctX(27), top: pctY(181) }}
        >
          <Reveal>
            <TitleMask
              src="/figma-assets/titles/header-centered.svg"
              width="89.31cqw" /* 351/393 */
              height="54.9cqw" /* 215.75/393 */
              alt={t("headline")}
              as={1}
            />
          </Reveal>
        </div>

        <div
          className="absolute"
          style={{ left: pctX(41), top: pctY(449), width: pctX(310) }}
        >
          <Reveal delay={0.1}>
            <p
              className="text-center text-cream"
              style={{ fontSize: "4.33cqw" /* 17/393 */, lineHeight: 1.33 }}
            >
              {bodyBefore}
              <span className="underline decoration-from-font">{marker}</span>
              {bodyAfter}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
