"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Reveal } from "../reveal";
import { TitleMask } from "../title-mask";

/*
  Mobile hero (Component 3 268:30787): 393 × 852, bg #cbb3a6.
  Headline (268:34838) at left=14 right=27 top=181, Myanmar MN 48px uppercase.
  Body (268:34839) at left=40 top=449, 17px DM Sans, "who you are" underlined.
  INTERSTELLAR feature image button at bottom-right (297:56928):
    - photo (imgRectangle1) at left=173 top=560 w=220 h=293
    - vector overlay (imgVector mix-blend-color) at left=173 top=652 w=220 h=200
    - INTERSTELLAR mark (imgGroup5) at left=204 top=727 w=158 h=39

  Animation — Component 3's variant set (verified against the designer's
  variant exports, June 2026): six 393×852 frames, each placing ONE small
  showcase at its own position (or nothing at all), cycled in variant order:
    Variant6 — INTERSTELLAR composition at (173, 652) 220×200 (the resting
               frame placed on the HOME instance)
    Frame 89 — empty beige beat
    Frame 90 — empty beige beat
    Frame 91 — KOKO.P instagram phone at (232, 70) 161×193
    Frame 92 — CRISP "now open" poster at (0, 625) 161×198
    Frame 93 — TAF fabric logo at (0, 117) 225×152
  Positions/sizes pixel-measured from the 393×852 variant exports
  (~/…/mobile-hero/Property 1=*.png). Each visible tile links to its
  project; inactive tiles are non-interactive.
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

export function MobileHero() {
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
      id="home"
      aria-label="Hero"
      data-nav-scheme="dark"
      className="relative overflow-hidden"
      style={{
        height: "852px",
        backgroundColor: "#cbb3a6",
      }}
    >
      <div
        className="relative mx-auto h-full overflow-hidden"
        style={{ maxWidth: "393px", height: "852px" }}
      >
        {/* Component 3 showcase frames — one positioned tile per variant
            (frames 89/90 are intentionally empty beats). Each tile is its
            own link, interactive only while visible. */}
        {HERO_FRAMES.map((f, i) => {
          if ("empty" in f) return null;
          const active = index === i;
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
              style={{ left: f.rect.left, top: f.rect.top, width: f.rect.w, height: f.rect.h }}
            >
              {f.composition ? (
                <>
                  {/* INTERSTELLAR composition (297:56928): the 293-tall photo
                      sits in the 200-tall clip window shifted up 92px, plus
                      the color overlay + wordmark. */}
                  <Image
                    src="/figma-assets/mobile/hero-interstellar.jpg"
                    alt={f.alt}
                    width={1728}
                    height={2304}
                    priority
                    unoptimized
                    className="absolute object-cover"
                    style={{ left: 0, top: -92, width: 220, height: 293, maxWidth: "none" }}
                  />
                  <Image
                    src="/figma-assets/mobile/hero-overlay.svg"
                    alt=""
                    width={220}
                    height={200}
                    unoptimized
                    className="pointer-events-none absolute"
                    style={{ left: 0, top: 0, width: 220, height: 200, mixBlendMode: "color" }}
                  />
                  <Image
                    src="/figma-assets/mobile/hero-mark.svg"
                    alt="INTERSTELLAR"
                    width={158}
                    height={39}
                    unoptimized
                    className="absolute"
                    style={{ left: 31, top: 75, width: 158, height: 39 }}
                  />
                </>
              ) : (
                <Image
                  src={f.src!}
                  alt={f.alt}
                  width={f.imgW}
                  height={f.imgH}
                  unoptimized
                  loading="eager"
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
            GOOD / STORIES") per the June 2026 client request. Per-line
            translate measured via getBBox; viewBox grown to 586.82×360.7.
            Box-anchored to the 351px title width (aspect 586.82/360.7). */}
        <div
          className="absolute flex justify-center text-cream"
          style={{ left: "14px", right: "27px", top: "181px" }}
        >
          <Reveal>
            <TitleMask
              src="/figma-assets/titles/header-centered.svg"
              width={351}
              height={215.75}
              alt="Naming, branding & design build good stories"
              as={1}
            />
          </Reveal>
        </div>

        <div
          className="absolute"
          style={{ left: "41px", top: "449px", width: "310px" }}
        >
          <Reveal delay={0.1}>
            <p
              className="text-center text-cream"
              style={{ fontSize: "17px", lineHeight: 1.33 }}
            >
              Branding is not just aesthetics, it&rsquo;s a reflection of{" "}
              <span className="underline decoration-from-font">who you are</span>
              , what you value, and how you want to be experienced. Drawn to
              genuine human connection and the subtle ways people express
              themselves, I approach naming, branding, and design as a way of
              creating identities that feel honest, grounded, and deeply aligned
              with the humans behind them.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
