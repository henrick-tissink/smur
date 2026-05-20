import Image from "next/image";
import { Reveal } from "../reveal";

/*
  Mobile hero (Component 3 268:30787): 393 × 852, bg #cbb3a6 (lighter than desktop).
  Inner content (Group 63 268:34835):
    - Headline (268:34838) at left=14 right=27 top=181, 352 × 358, Myanmar MN 48px uppercase center, text-[#fff7f4]
    - Body (268:34839) at left=40 top=449, 310 × 221, 17px DM Sans center, text-[#fff7f4]
      with "who you are" underlined
  Plus a small "INTERSTELLAR" feature image at bottom-right (rendered via the
  static hero.png screenshot since rebuilding the mask+vector composition isn't
  worth it for this small accent).
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
        <Image
          src="/figma-assets/mobile/hero.png"
          alt="INTERSTELLAR feature project preview"
          fill
          priority
          unoptimized
          sizes="393px"
          className="object-cover"
        />

        <div
          className="absolute"
          style={{ left: "14px", right: "27px", top: "181px" }}
        >
          <Reveal>
            <h1
              className="font-heading text-center uppercase text-cream"
              style={{
                fontSize: "48px",
                lineHeight: "0.97",
                width: "352px",
              }}
            >
              NAMING,
              <br />
              Branding &amp;
              <br />
              design BUILD
              <br />
              GOOD stories
            </h1>
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
