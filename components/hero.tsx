import Image from "next/image";
import { hero } from "@/content/home";
import { Reveal } from "./reveal";

/*
  HERO frame: 1440 × 869 (Figma node 165:28117 instance + Frame 44 165:24495)
  Hero text frame (Frame 44): x=221 y=246 width=433 height=276
  Headline (165:24497): x=0 y=0 width=583 height=277
  Body (165:24498): x=0 y=326 width=430 height=201

  Figma HERO bg: #cbb3a6 (applied via --color-hero).
  Figma also contains a vector-composed "Status" real-estate website mockup
  in the right portion (~50 SVG primitives + photo fills). We don't inline
  that yet — see TODO. The building photo (165:24662 Rectangle) is the
  largest hero visual at inset[34.77%_3.44%_29.3%_82.09%].
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
      <div className="relative mx-auto h-[869px] max-w-[1440px]">
        {/* Hero building photo (165:24662) — single image fill from the
           Status mockup. Other mockup chrome (nav, cards, vector type) is
           a vector composition pending structural rebuild — see TODO. */}
        <div
          className="absolute"
          style={{ left: 1182, top: 302, width: 209, height: 312 }}
        >
          <Image
            src="/figma-assets/hero-building.jpg"
            alt="Featured project — Status (real estate brand)"
            width={1788}
            height={2679}
            priority
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>

        {/* Text overlay positioned per Figma Frame 44 */}
        <div
          className="absolute"
          style={{ left: "221px", top: "246px", width: "583px" }}
        >
          <Reveal>
            <h1 className="font-heading text-[75px] uppercase leading-[0.97] tracking-[-0.005em] text-cream">
              {hero.headline}
            </h1>
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
