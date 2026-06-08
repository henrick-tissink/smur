import { about } from "@/content/home";
import { contactFAQ } from "@/content/contact";
import { FigmaImage } from "../figma-image";
import { Reveal } from "../reveal";
import { TitleMask } from "../title-mask";

/*
  Mobile About (Frame 91 268:34817): bg #906553 warm brown, 393 × 1021.
  Heading (268:34829) at left=45 top=95, 307 wide: Myanmar MN 48px leading-[0.97]
    text-cream uppercase text-center, content "ABOUT \n SMA & \n SMUR."
  Body (268:34819) at left=45 top=279, 308 wide: 15px DM Sans center text-cream
  Portrait (268:34832) at bottom=122 right=75, 243×243 (with same crop as desktop)
  Socials (268:34833) at bottom=49, centered: 15px DM Sans Italic text-white
*/
export function MobileAbout() {
  return (
    <section
      id="m-about"
      aria-labelledby="m-about-title"
      data-nav-scheme="light"
      className="bg-about"
      /* Figma height is 1021 with the socials 49px above the section end.
         On real iPhones, Safari's collapsed bottom toolbar + home indicator
         float over the last ~80px of the page, hiding the socials (June 2026
         client bug report). The section is 60px taller so the socials keep
         their designed position but have clearance below the page end. */
      style={{ height: "1081px" }}
    >
      <div
        className="relative mx-auto h-full"
        style={{ maxWidth: "393px" }}
      >
        <Reveal>
          {/* Heading (268:34829) — brand-font SVG. Mobile Figma centers the 3
              lines ("ABOUT / SMA & / SMUR."), so we use about-centered.svg (the
              shared desktop about.svg letterforms with each line re-centered
              within the viewBox); desktop keeps the left-aligned about.svg.
              Same viewBox, so the TitleMask dimensions are unchanged. */}
          <div
            id="m-about-title"
            className="absolute flex justify-center text-cream"
            style={{ left: "45px", right: "41px", top: "95px" }}
          >
            <TitleMask
              src="/figma-assets/titles/about-centered.svg"
              width={174.3}
              height={140.3}
              alt="About Sma & Smur."
              as={2}
            />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div
            className="absolute text-center text-cream"
            style={{
              left: "45px",
              right: "40px",
              top: "279px",
              fontSize: "15px",
              lineHeight: 1.33,
              width: "308px",
            }}
          >
            <p>
              Over the years, my work has grown beyond branding into web design,
              UI/UX, creative direction, and set &amp; event styling, always
              focused on building cohesive, emotionally grounded visual worlds
              across both digital and physical spaces.
            </p>
            <p className="mt-[1em]">
              I value collaboration, thoughtful listening, and real human
              connection, which continue to shape how I work and the kinds of
              people and projects I&rsquo;m naturally drawn to.
            </p>
            <p className="mt-[1em]">
              While branding remains central to what I do, I&rsquo;m most
              fulfilled when creating work that feels both beautiful and deeply
              aligned with the people behind it.
            </p>
          </div>
        </Reveal>

        {/* Absolute wrapper is OUTSIDE the Reveal. The Reveal's motion transform
            would otherwise become the containing block for this bottom-anchored
            child AND collapse to a zero-height box at the section top — making
            `bottom` resolve against the top of the section, so the portrait
            briefly rendered over the photo strip above and "popped down" when
            the reveal transform cleared. */}
        {/* 122px in Figma + 60px toolbar clearance (see section comment). */}
        <div className="absolute" style={{ right: "75px", bottom: "182px" }}>
          <Reveal delay={0.15}>
            <FigmaImage
              src={about.portrait.image.src}
              alt={about.portrait.image.alt}
              intrinsicWidth={about.portrait.image.intrinsicWidth}
              intrinsicHeight={about.portrait.image.intrinsicHeight}
              width={243}
              height={243}
              crop={about.portrait.crop}
            />
          </Reveal>
        </div>

        <div
          className="absolute"
          /* 49px in Figma + 60px toolbar clearance (see section comment) —
             keeps the socials at the same y as the design while the extra
             section height sits below them. */
          style={{ left: "16px", right: "16px", bottom: "109px" }}
        >
          <Reveal delay={0.2}>
            <p
              className="font-sans text-center italic text-white"
              style={{ fontSize: "15px", lineHeight: "normal" }}
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
