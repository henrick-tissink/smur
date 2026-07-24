import { useTranslations } from "next-intl";
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
  const t = useTranslations("Hero");
  // Body copy underlines "who you are" mid-sentence (Figma emphasis); the
  // message is one plain string, so split around that marker in code. The
  // straight apostrophe from the extracted message is swapped for the
  // typographic ’ the design uses (matches the pre-i18n hardcoded JSX).
  const body = t("body").replace(/'/g, "’");
  const marker = "who you are";
  const markerIndex = body.indexOf(marker);
  const bodyBefore = markerIndex >= 0 ? body.slice(0, markerIndex) : body;
  const bodyAfter =
    markerIndex >= 0 ? body.slice(markerIndex + marker.length) : "";

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
                alt={t("headline")}
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
