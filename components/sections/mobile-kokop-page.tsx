import Image from "next/image";
import { useTranslations } from "next-intl";
import { kokop } from "@/content/kokop";
import { Reveal } from "@/components/reveal";

/*
  Faithful-fluid mobile KOKO.P case study — full desktop parity (June
  2026). Ported from components/mobile/kokop-page.tsx
  (MobileKokopCaseStudy) to Recipe B (container-query flow): the legacy
  root was a fixed `width: "393px"` canvas scaled by the route's `zoom`
  wrapper; here the root is a fluid `w-full` box with
  `containerType: "inline-size"` and every fixed px value (paddingTop,
  grid gap, section padding/margin, font sizes) expressed as `mcqw(N)` on
  the 393-wide legacy basis, so `1cqw` == 1% of the root's rendered
  width — reproducing the old zoom's proportional scaling without a
  transform.

  content/kokop.ts has no `kokopFrame.mobile`, so M_W = 393 (the legacy
  mobile canvas width) per the task brief.

  Desktop section order: hero brand grid (artboards 148_1/149/150/151 as
  the 2×2 quadrants) → intro → sec1 (salmon logo tile SVG + packaging
  photo) → café mockup → sec3 (dark logo tile SVG + storefront photo) →
  brand-book interior (artboard 158) → instagram phone. The final
  folded-menu composition (desktop section 8, kokop-extras/section8.tsx)
  has no flat export — it remains desktop-only, same as legacy.

  kokop.body is a 2-element array, mapped to one <p> per paragraph
  (matching the desktop tree). The legacy mobile jammed both into a single
  <p> so they concatenated with no separator — a legibility defect fixed
  in the Phase 6 whole-branch pass.

  Panel/aspectRatio/%-insets/Reveal/images are unchanged from the legacy
  component.
*/

const M_W = 393; // legacy mobile canvas width

function mcqw(px: number) {
  return `${(px / M_W) * 100}cqw`;
}

const HERO_GRID = [
  { src: "/figma-assets/work/kokop/hero-q1.png", alt: "KOKO.P logo — dark ground" },
  { src: "/figma-assets/work/kokop/hero-q2.png", alt: "KOKO.P logo — cream ground" },
  { src: "/figma-assets/work/kokop/hero-q3.png", alt: "KOKO.P logo — terracotta ground" },
  { src: "/figma-assets/work/kokop/hero-q4.png", alt: "KOKO.P logo — brown ground" },
];

export function MobileKokopCaseStudy() {
  const t = useTranslations("CaseStudies.kokop");
  return (
    <div
      data-nav-scheme="dark"
      className="mx-auto w-full"
      style={{
        containerType: "inline-size",
        backgroundColor: "#fff7f4",
        paddingTop: mcqw(100), // was 100px
      }}
    >
      {/* 2×2 hero brand-mark grid — projects open on an image. */}
      <Reveal eager>
        <div className="grid grid-cols-2" style={{ gap: mcqw(2) }}>
          {HERO_GRID.map((q) => (
            <Image
              key={q.src}
              src={q.src}
              alt={q.alt}
              width={870}
              height={626}
              unoptimized
              priority
              className="block h-auto w-full"
            />
          ))}
        </div>
      </Reveal>

      {/* Readable intro. */}
      <Reveal eager>
        <div
          className="text-center"
          style={{ paddingLeft: mcqw(43), paddingRight: mcqw(43), paddingTop: mcqw(36), paddingBottom: mcqw(36) }}
        >
          <p
            className="font-sans uppercase text-ink"
            style={{ fontSize: mcqw(40), lineHeight: 1, letterSpacing: "0.01em" }}
          >
            {t("eyebrow")}
          </p>
          <div
            className="text-ink"
            style={{ marginTop: mcqw(20), fontSize: mcqw(15), lineHeight: 1.45 }}
          >
            {t("body").split("\n\n").map((p, i) => (
              <p key={i} style={{ margin: 0, marginTop: i === 0 ? 0 : "1em" }}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Full-bleed visual sections in desktop order. */}
      <div className="flex flex-col" style={{ gap: mcqw(12), paddingBottom: mcqw(24) }}>
        {/* Sec 1 — salmon logo tile (logotype + stacked KOKO.P accent baked in). */}
        <Reveal eager>
          <Image
            src="/figma-assets/work/kokop/sec1-right.png"
            alt="KOKO.P — coffee and snacks logotype on salmon"
            width={875}
            height={1045}
            unoptimized
            className="block h-auto w-full"
          />
        </Reveal>
        <Reveal eager>
          <Image
            src="/figma-assets/work/kokop/sec1-photo.jpg"
            alt="KOKO.P branded packaging"
            width={869}
            height={1048}
            unoptimized
            className="block h-auto w-full"
          />
        </Reveal>

        <Reveal eager>
          <Image
            src="/figma-assets/work/kokop/cafe-storefront.png"
            alt="KOKO.P café branding mockup"
            width={1787}
            height={1193}
            unoptimized
            className="block h-auto w-full"
          />
        </Reveal>

        {/* Sec 3 — dark kokopelli tile (business card composition baked in). */}
        <Reveal eager>
          <Image
            src="/figma-assets/work/kokop/sec3-left.png"
            alt="KOKO.P kokopelli mark business card on dark ground"
            width={875}
            height={1045}
            unoptimized
            className="block h-auto w-full"
          />
        </Reveal>
        <Reveal eager>
          <Image
            src="/figma-assets/work/kokop/sec3-photo.jpg"
            alt="KOKO.P storefront / brand application"
            width={874}
            height={1045}
            unoptimized
            className="block h-auto w-full"
          />
        </Reveal>

        <Reveal eager>
          <Image
            src="/figma-assets/work/kokop/brand-interior.png"
            alt="KOKO.P café interior with brand applications"
            width={1794}
            height={1010}
            unoptimized
            className="block h-auto w-full"
          />
        </Reveal>

        <Reveal eager>
          <Image
            src="/figma-assets/work/kokop/insta-phone.png"
            alt="KOKO.P Instagram feed mockup"
            width={1748}
            height={2089}
            unoptimized
            className="block h-auto w-full"
          />
        </Reveal>
      </div>
    </div>
  );
}
