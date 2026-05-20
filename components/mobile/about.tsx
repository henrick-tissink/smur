import { about } from "@/content/home";
import { FigmaImage } from "../figma-image";
import { Reveal } from "../reveal";

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
      style={{ height: "1021px" }}
    >
      <div
        className="relative mx-auto h-full"
        style={{ maxWidth: "393px" }}
      >
        <Reveal>
          <h2
            id="m-about-title"
            className="absolute font-heading text-center uppercase text-cream"
            style={{
              left: "45px",
              right: "41px",
              top: "95px",
              fontSize: "48px",
              lineHeight: "0.97",
              width: "307px",
            }}
          >
            ABOUT
            <br />
            SMA &amp;
            <br />
            SMUR.
          </h2>
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

        <Reveal delay={0.15}>
          <div
            className="absolute"
            style={{ right: "75px", bottom: "122px" }}
          >
            <FigmaImage
              src={about.portrait.image.src}
              alt={about.portrait.image.alt}
              intrinsicWidth={about.portrait.image.intrinsicWidth}
              intrinsicHeight={about.portrait.image.intrinsicHeight}
              width={243}
              height={243}
              crop={about.portrait.crop}
            />
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p
            className="absolute font-sans text-center italic text-white"
            style={{
              left: "16px",
              right: "16px",
              bottom: "49px",
              fontSize: "15px",
              lineHeight: "normal",
            }}
          >
            INSTAGRAM&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;PINTEREST
          </p>
        </Reveal>
      </div>
    </section>
  );
}
