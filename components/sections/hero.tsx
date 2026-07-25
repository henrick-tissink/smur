import { hero } from "@/content/home";
import { Reveal } from "@/components/reveal";
import { TitleMask } from "@/components/title-mask";
import { HeroCarousel } from "./hero-carousel";

/*
  Faithful-fluid Hero. Stage = aspect-ratio 1440/869 container-query box; the
  legacy 1440-px composition is expressed in % (positions) and cqw (type) so it
  scales with viewport — no zoom. HeroCarousel + Reveal preserved unchanged.
  Native coords: text overlay left 221 / top 246 / width 583; headline
  header.svg 586.82×288.99; body 17px maxWidth 430, 49px under headline.
*/
export function Hero() {
  return (
    <section
      id="home"
      aria-label="Hero"
      data-nav-scheme="light"
      className="w-full"
      style={{ backgroundColor: "var(--color-hero)" }}
    >
      <div
        data-hero-stage
        className="relative mx-auto w-full max-w-[1440px] overflow-hidden"
        style={{ aspectRatio: "1440 / 869", containerType: "inline-size" }}
      >
        <HeroCarousel />
        {/* Text overlay — native left 221 (15.35%) / top 246 (28.31%) / width 583 (40.49%) */}
        <div
          className="absolute z-10"
          style={{ left: "15.35%", top: "28.31%", width: "40.49%" }}
        >
          <Reveal>
            <div style={{ color: "var(--color-cream)" }}>
              <TitleMask
                src="/figma-assets/titles/header.svg"
                width="40.75cqw"   /* 586.82/1440 */
                height="20.07cqw"  /* 288.99/1440 */
                leftBearing={21}
                alt={hero.headline}
                as={1}
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p
              style={{
                marginTop: "3.4cqw", /* 49/1440 */
                maxWidth: "29.86cqw", /* 430/1440 */
                fontFamily: "var(--font-body)",
                fontSize: "1.18cqw", /* 17/1440 */
                lineHeight: 1.33,
                color: "var(--color-cream)",
              }}
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
