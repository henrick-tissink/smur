import Image from "next/image";
import Link from "next/link";
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
*/
export function MobileHero() {
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
        {/* INTERSTELLAR feature button (297:56928). In Figma the 293-tall photo
            (Rectangle, y=560) sits inside a 200-tall clip group (Group 10,
            y=652), so only its bottom 200px is visible. We reproduce that: the
            Link IS the 220×200 clip window (y=652); the photo keeps its full
            220×293 size shifted up 92px so the same bottom crop shows. */}
        <Link
          href="/work#interstellar"
          aria-label="INTERSTELLAR feature"
          className="absolute block overflow-hidden"
          style={{ left: 173, top: 652, width: 220, height: 200 }}
        >
          <Image
            src="/figma-assets/mobile/hero-interstellar.jpg"
            alt="INTERSTELLAR feature project preview"
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
            style={{
              left: 0,
              top: 0,
              width: 220,
              height: 200,
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
            style={{ left: 31, top: 75, width: 158, height: 39 }}
          />
        </Link>

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
