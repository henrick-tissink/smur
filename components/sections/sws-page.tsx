import Image from "next/image";
import { useTranslations } from "next-intl";
import { sws, swsFrame } from "@/content/sws";
import { Reveal } from "@/components/reveal";

/*
  Faithful-fluid desktop SWS (Sassy Woman Society) case study.
  Ported from components/work/sws-page.tsx (SwsCaseStudy) to the
  aspect-ratio stage pattern used by the home hero/about sections and
  components/sections/work-page.tsx: stage = aspect-ratio 1440/4053
  container-query box, the legacy 1440×4053 composition (Figma 73:40179,
  bg #fff7f4) is expressed in % (positions) and cqw (font sizes) so it
  scales with viewport width — no zoom.

  Three sections, each composed of a background vector frame + a
  rounded-rectangle image fill. Hero image is a GIF (animated screen
  recording of the live site). Middle image is a tall PNG (scrolling
  capture). No deferred sections — small + cleanly consolidated.

  Every element below was a direct child of the legacy fixed canvas, so
  each stays a direct child of the aspect-stage div here (containing-block
  rule) — none are nested inside another absolutely-positioned box.
*/

const STAGE_W = swsFrame.desktop.width;
const STAGE_H = swsFrame.desktop.height;

function pctX(px: number) {
  return `${(px / STAGE_W) * 100}%`;
}
function pctY(px: number) {
  return `${(px / STAGE_H) * 100}%`;
}
function cqw(px: number) {
  return `${(px / STAGE_W) * 100}cqw`;
}

export function SwsCaseStudy() {
  const t = useTranslations("CaseStudies.sws");
  const titleInk = "#35221a";

  return (
    <section
      data-nav-scheme="dark"
      className="w-full"
      style={{ backgroundColor: "#fff7f4" }}
    >
      <div
        className="relative mx-auto w-full max-w-[1440px] overflow-hidden"
        style={{ aspectRatio: `${STAGE_W} / ${STAGE_H}`, containerType: "inline-size" }}
      >
        {/* ============================================================
            Section 1 — Hero (Group 61, 73:40824)
            Frame (271.38, 140), 898.58×616.41.
            Bg vector + image rect (animated GIF of the SWS site).
            ============================================================ */}
        <Reveal>
          <img
            src="/figma-assets/work/sws/hero-bg.svg"
            alt=""
            className="absolute"
            style={{
              left: pctX(271.38),
              top: pctY(140),
              width: pctX(898.58),
              height: pctY(616.41),
            }}
          />
        </Reveal>
        <Reveal delay={0.05}>
          <div
            className="absolute overflow-hidden"
            style={{
              left: pctX(303.63), // from Figma metadata 73:40820
              top: pctY(211.05),
              width: pctX(844.8),
              height: pctY(476.08),
            }}
          >
            <Image
              src="/figma-assets/work/sws/hero-image.gif"
              alt="Sassy Woman Society site"
              width={1920}
              height={1082}
              unoptimized
              priority
              className="block h-full w-full object-cover"
            />
          </div>
        </Reveal>

        {/* ============================================================
            Section 2 — Title + body (Group 79, 297:57931)
            Frame (482, 841.41), 430×295.
            ============================================================ */}
        <div
          className="absolute text-center"
          style={{ left: pctX(482), top: pctY(841.41), width: pctX(430), color: titleInk }}
        >
          <Reveal>
            <p
              className="italic"
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontWeight: 400,
                fontSize: cqw(20),
                lineHeight: 1, // Figma H3: DM Sans Italic 20 / lh normal
                margin: 0,
              }}
            >
              {t("eyebrow")}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div
              style={{
                marginTop: cqw(22), // top 883-841 = 42, minus eyebrow line ~20
                fontSize: cqw(17),
                lineHeight: 1.33,
                fontFamily: "var(--font-dm-sans), sans-serif",
              }}
            >
              {t("body").split("\n\n").map((p, i) => (
                <p key={i} style={{ margin: 0, marginTop: i === 0 ? 0 : "1em" }}>
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>

        {/* ============================================================
            Section 3 — Middle large (Group 59, 73:40822)
            Frame (277, 1221.41), 898.58×2010.67.
            Bg vector + tall image (mobile-style scrolling capture).
            ============================================================ */}
        <Reveal>
          <img
            src="/figma-assets/work/sws/middle-bg.svg"
            alt=""
            className="absolute"
            style={{
              left: pctX(271.38),
              top: pctY(1221.41),
              width: pctX(898.58),
              height: pctY(2010.67),
            }}
          />
        </Reveal>
        <Reveal delay={0.05}>
          <div
            className="absolute overflow-hidden"
            style={{
              left: pctX(503.63), // from Figma metadata 73:40818
              top: pctY(1342.84),
              width: pctX(441.6),
              height: pctY(1800.44),
            }}
          >
            <Image
              src="/figma-assets/work/sws/middle-image.png"
              alt="Sassy Woman Society mobile layout"
              width={960}
              height={3914}
              unoptimized
              className="block h-full w-full object-cover"
            />
          </div>
        </Reveal>

        {/* ============================================================
            Section 4 — Bottom (Group 60, 73:40823)
            Frame (277, 3257.08), 898.58×656.36.
            Bg vector + bottom image (events / community photo).
            ============================================================ */}
        <Reveal>
          <img
            src="/figma-assets/work/sws/bottom-bg.svg"
            alt=""
            className="absolute"
            style={{
              left: pctX(271.38),
              top: pctY(3257.08),
              width: pctX(898.58),
              height: pctY(656.36),
            }}
          />
        </Reveal>
        <Reveal delay={0.05}>
          <div
            className="absolute overflow-hidden"
            style={{
              left: pctX(342), // from Figma metadata 73:40819
              top: pctY(3303.08),
              width: pctX(768.4),
              height: pctY(563.6),
            }}
          >
            <Image
              src="/figma-assets/work/sws/bottom-image.png"
              alt="Sassy Woman Society event"
              width={1921}
              height={1409}
              unoptimized
              className="block h-full w-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
