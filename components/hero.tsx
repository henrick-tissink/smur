import { hero } from "@/content/home";
import { Reveal } from "./reveal";
import { TitleMask } from "./title-mask";
import { HeroCarousel } from "./hero-extras/hero-carousel";

/*
  HERO frame: 1440 × 869 (Figma node 165:28117 instance + Frame 44 165:24495)
  Hero text frame (Frame 44): x=221 y=246 width=433 height=276

  Figma HERO bg: #cbb3a6 (applied via --color-hero).
  The full "Status" real-estate website mockup (745 vector primitives +
  building photo + brand chrome) is inlined via ./hero-extras/status-mockup
  and mounted as the absolute backdrop of the hero. Real HTML text (SMUR
  headline + tagline) is overlaid on top so it stays semantic and indexable.
*/

export function Hero() {
  return (
    <section
      id="home"
      aria-label="Hero"
      data-nav-scheme="light"
      className="relative overflow-hidden bg-hero"
      style={{ minHeight: "869px" }}
    >
      <div className="relative mx-auto h-[869px] w-[1440px] max-w-[1440px]">
        {/* Right-side brand carousel — cycles through Smaranda's hero
            artboards (CRISP / INTERSTELLAR / KOKOP / TAF). Replaces the
            placeholder "Status" real-estate mockup. */}
        <HeroCarousel />

        {/* Text overlay positioned per Figma Frame 44 */}
        <div
          className="absolute z-10"
          style={{ left: "221px", top: "246px", width: "583px" }}
        >
          <Reveal>
            <div className="text-cream">
              <TitleMask
                src="/figma-assets/titles/header.svg"
                width={586.82}
                height={288.99}
                leftBearing={21}
                alt={hero.headline}
                as={1}
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p
              className="mt-[49px] text-[17px] leading-[1.33] text-cream"
              style={{ maxWidth: "430px" }}
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
