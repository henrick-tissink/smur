import { about } from "@/content/home";
import { FigmaImage } from "./figma-image";
import { Reveal } from "./reveal";
import { TitleMask } from "./title-mask";

/*
  about smuriiii (6:1051): bg-[#906553] warm brown, 1440 × 971
  about smuri wrapper (6:1349): x=218 y=133 width=981 height=728
  Heading (6:1076): font-Myanmar_MN size=75.407 uppercase text-[#fff7f4]
  Body (6:1079): 17px DM Sans Regular text-[#fff7f4]
  Portrait (6:1342): 294×294 (with crop)
  Socials (45:6427): 20px DM Sans Italic text-white
*/
export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      data-nav-scheme="light"
      className="bg-about"
      style={{ height: "971px" }}
    >
      <div
        className="relative mx-auto max-w-[1440px]"
        style={{ height: "971px" }}
      >
        <div
          className="absolute"
          style={{
            left: "218px",
            top: "133px",
            width: "981px",
            height: "728px",
          }}
        >
          <Reveal>
            <div
              id="about-title"
              className="absolute left-0 top-0 text-cream"
            >
              <TitleMask
                src="/figma-assets/titles/about.svg"
                width={273.84}
                height={220.43}
                leftBearing={6}
                alt="ABOUT SMA & SMUR."
                as={2}
              />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div
              className="absolute text-[17px] leading-[1.33] text-cream"
              style={{ left: "557px", top: "0px", width: "424px" }}
            >
              <p>
                Over the years, my work has grown beyond branding into web
                design, UI/UX, creative direction, and set &amp; event styling,
                always focused on building cohesive, emotionally grounded visual
                worlds across both digital and physical spaces.
              </p>
              <p className="mt-[1em]">
                I value collaboration, thoughtful listening, and real human
                connection, which continue to shape how I work and the kinds of
                people and projects I&rsquo;m naturally drawn to.
              </p>
              <p className="mt-[1em]">
                While branding remains central to what I do, I&rsquo;m most
                fulfilled when creating work that feels both beautiful and
                deeply aligned with the people behind it.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div
              className="absolute"
              style={{ left: "557px", top: "359px" }}
            >
              <FigmaImage
                src={about.portrait.image.src}
                alt={about.portrait.image.alt}
                intrinsicWidth={about.portrait.image.intrinsicWidth}
                intrinsicHeight={about.portrait.image.intrinsicHeight}
                width={about.portrait.frameWidth}
                height={about.portrait.frameHeight}
                crop={about.portrait.crop}
              />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p
              className="absolute font-sans text-[20px] italic leading-normal text-white"
              style={{ left: "557px", top: "714px", width: "361px" }}
            >
              <a
                href="https://www.instagram.com/smurstudio/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-70"
              >
                INSTAGRAM
              </a>
              &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
              <a
                href="https://ro.pinterest.com/smurstudio/_saved/"
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
