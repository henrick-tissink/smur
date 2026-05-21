"use client";

import Image from "next/image";
import { kabinett, kabinettFrame } from "@/content/kabinett";
import { Reveal } from "../reveal";

/*
  Desktop kabinett (Kabinett Wine & Spirits) case study.
  Figma 73:36625, 1440 × 4985, cream #fff7f4. Desktop only.

  Deferred per CLAUDE.md rule #2:
    - Row 2 (Group 117, 894×1100) — vector-dense composition with 70+
      inline vectors + 2 masked photos. No useful Layer_1 consolidation
      (just the bg). Largest deferred area on this page.
    - Row 3 RIGHT (Group 116) — 20+ vectors + masked photo. Deferred.
    - Bottom (Group 114) inner wordmark letter rows (~20 vectors).
      Bg photo + main cabinet vector + address text + small inset photo
      render.
*/
export function KabinettCaseStudy() {
  const { width, height } = kabinettFrame.desktop;
  const titleInk = "#35221a";

  return (
    <div
      data-nav-scheme="dark"
      className="relative mx-auto overflow-hidden"
      style={{ width, height, backgroundColor: "#fff7f4" }}
    >
      {/* ============================================================
          Section 1 — Hero (Layer_1, 73:39242)
          Frame (273, 139.55), 894.44×645.38. Consolidated SVG.
          ============================================================ */}
      <Reveal>
        <img
          src="/figma-assets/work/kabinett/hero.svg"
          alt="Kabinett hero"
          className="absolute"
          style={{
            left: 273,
            top: 139.55,
            width: 894.44,
            height: 645.38,
          }}
        />
      </Reveal>

      {/* ============================================================
          Section 2 — Title + body (Group 79, 297:57927)
          Frame (489, 869.93), 430×295. Title says "KABINETT WINE & SPIRITS".
          ============================================================ */}
      <div
        className="absolute text-center"
        style={{ left: 489, top: 869.93, width: 430, color: titleInk }}
      >
        <Reveal>
          <p
            className="font-heading italic"
            style={{ fontSize: 20, lineHeight: 1, margin: 0 }}
          >
            {kabinett.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <div
            style={{
              marginTop: 22, // 42 (top 912-870) − 20 (eyebrow)
              fontSize: 17,
              lineHeight: 1.33,
              fontFamily: "var(--font-dm-sans), sans-serif",
            }}
          >
            {kabinett.body.map((p, i) => (
              <p key={i} style={{ margin: 0, marginTop: i === 0 ? 0 : "1em" }}>
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      </div>

      {/* ============================================================
          Section 3 — Row 1 band (Layer_2, 73:39323)
          Frame (271, 1249.93), 894.49×584.84. LEFT masked photo +
          RIGHT brand-mark composition (11 vectors).
          ============================================================ */}
      <Reveal>
        <div
          className="absolute overflow-hidden"
          style={{ left: 271, top: 1249.93, width: 434, height: 585 }}
        >
          <Image
            src="/figma-assets/work/kabinett/row1/photo.jpg"
            alt="Kabinett brand photograph"
            width={2080}
            height={3000}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>
      {/* 11 brand-mark vectors on the right half. Insets relative to
         the root frame 1440×4985, wrapped in positioned divs so size
         resolves from inset (the `img alone with inset` bug from CRISP). */}
      {kabinett.row1Vectors.map((v) => (
        <div key={v.src} className="absolute" style={{ inset: v.inset }}>
          <img
            src={`/figma-assets/work/kabinett/row1/${v.src}`}
            alt=""
            className="absolute inset-0 block h-full w-full"
            style={{ maxWidth: "none" }}
          />
        </div>
      ))}

      {/* ============================================================
          Section 4 — Row 2 (Group 117)
          Frame (271, 1859.68), 894×1100. Bg photo + inner masked photo
          (the cabinet door "wine cellar" inset). Original section is
          composed of: a -rotate-90'd big bg photo + mix-blend overlays +
          70+ typography vectors forming the brand wordmark. We render
          the 2 main photos here; typography is still TODO.
          ============================================================ */}
      {/* Background photo (1254×1254 square, sized into the section
          bounds with object-cover — original is rotated -90 in Figma but
          a flat object-cover crop here reads visually similar for a
          textured bg). */}
      <Reveal>
        <div
          className="absolute overflow-hidden"
          style={{ left: 271, top: 1859.68, width: 894, height: 1100 }}
        >
          <Image
            src="/figma-assets/work/kabinett/row2/bg.png"
            alt="Kabinett brand photograph"
            width={1254}
            height={1254}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>
      {/* Inner inset photo — the cabinet door composition. Inset
          [45.84% 43.95% 43.14% 30.55%] relative to the root frame
          (1440 × 4985) → frame (439.92, 2285.13) size 367×549. */}
      <Reveal delay={0.05}>
        <div
          className="absolute overflow-hidden"
          style={{
            left: 439.92,
            top: 2285.13,
            width: 367.20,
            height: 549.34,
          }}
        >
          <Image
            src="/figma-assets/work/kabinett/row2/inner.jpg"
            alt="Kabinett interior detail"
            width={1424}
            height={2136}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>

      {/* ============================================================
          Section 5 — Row 3 LEFT (Group 115, Layer_2 73:39436)
          Frame (272, 2985), 433.51×586. Consolidated SVG.
          ============================================================ */}
      <Reveal>
        <img
          src="/figma-assets/work/kabinett/row3-left.svg"
          alt="Kabinett brand composition"
          className="absolute"
          style={{ left: 272, top: 2985, width: 433.51, height: 586 }}
        />
      </Reveal>

      {/* ============================================================
          Section 6 — Row 3 RIGHT (Group 116) — DEFERRED
          Frame (729.52, 2985.37), 434.62×585.49. Vector-dense.
          TODO: inline.
          ============================================================ */}
      <div
        className="absolute"
        style={{ left: 729.52, top: 2985.37, width: 434.62, height: 585.49 }}
        aria-hidden
      />

      {/* ============================================================
          Section 7 — Row 4 (Clip path group 73:39825)
          Frame (272, 3595.78), 893×608. Masked photo composition.
          ============================================================ */}
      <Reveal>
        <div
          className="absolute overflow-hidden"
          style={{ left: 272, top: 3595.78, width: 893, height: 608 }}
        >
          <img
            src="/figma-assets/work/kabinett/row4-photo.svg"
            alt="Kabinett editorial"
            className="absolute max-w-none"
            /* Image extends beyond section bounds per Figma inset
               [72.03% 19.1% 14.17% 17.58%] = (253, 3590) 912×688.
               Wrapper-relative: left = 253-272 = -19, top = 3590-3596 = -5 */
            style={{
              left: -19,
              top: -5,
              width: 912,
              height: 688,
            }}
          />
        </div>
      </Reveal>

      {/* ============================================================
          Section 8 — Bottom (Group 114, 297:57923)
          Frame (272, 4242.76), 896×604. Bg photo + main cabinet vector +
          address text + small masked inset photo.
          Real text rendered as <p> with Quicksand font.
          DEFERRED: 2 rows of small letter vectors (~20). Main brand
          elements + text render.
          ============================================================ */}
      <Reveal>
        <div
          className="absolute"
          style={{ left: 272, top: 4242.76, width: 896, height: 604 }}
        >
          {/* Background photo */}
          <img
            src="/figma-assets/work/kabinett/bottom/photo.png"
            alt="Kabinett card backdrop"
            className="absolute inset-0 block h-full w-full"
            style={{ objectFit: "cover", maxWidth: "none" }}
          />
          {/* Main "cabinet" vector wordmark. Inset within bottom section
             from Figma `[38.7% 37.97% 17.14% 16.07%]` (relative to root):
              top: 0.387×4985 = 1929.20 → bottom-section relative = 1929-4242.76 = -2313 ??
             Hmm — the root-frame insets give absolute frame coords. The
             vector is at frame top=1929 — that's UP in Row 2 region.
             Wait — this is Group 114's INNER structure where insets are
             relative to the section's own bounds (896×604), not root.
             Section-local: top 0.387×604 = 233.75, left 0.1607×896 = 144.
             Right 0.3797×896 = 340.21, right edge = 555.79, width = 411.79.
             Bottom 0.1714×604 = 103.53, bottom edge = 500.47, height = 266.72. */}
          <img
            src="/figma-assets/work/kabinett/bottom/main-vector.svg"
            alt="Kabinett wordmark"
            className="absolute max-w-none"
            style={{
              left: 144,
              top: 233.75,
              width: 411.79,
              height: 266.72,
            }}
          />
          {/* Small masked inset photo (cabinet doors photo).
             Inset `[48.18% 53.33% 26.78% 30.67%]` relative to 896×604:
              top: 0.4818×604 = 291.01, left: 0.3067×896 = 274.80
              right: 0.5333×896 = 477.84, right edge = 418.16, width = 143.36
              bottom: 0.2678×604 = 161.75, bottom edge = 442.25, height = 151.24 */}
          <div
            className="absolute overflow-hidden"
            style={{
              left: 274.80,
              top: 291.01,
              width: 143.36,
              height: 151.24,
            }}
          >
            <img
              src="/figma-assets/work/kabinett/bottom/inset-photo.svg"
              alt=""
              className="absolute inset-0 block h-full w-full"
              style={{ maxWidth: "none" }}
            />
          </div>
          {/* Address text (real HTML, Quicksand 11.76px #5d5d5d).
             Inset `[40.89% 29.39% 56.8% 52.53%]` relative to 896×604:
              top: 0.4089×604 = 246.98, left: 0.5253×896 = 470.67
             Second line `[43.22% 31.43% 54.46% 54.18%]`:
              top: 0.4322×604 = 261.05, left: 0.5418×896 = 485.45 */}
          <p
            className="absolute m-0 whitespace-nowrap"
            style={{
              left: 470.67,
              top: 246.98,
              fontFamily: "var(--font-quicksand), Quicksand, sans-serif",
              fontSize: 11.76,
              color: "#5d5d5d",
              lineHeight: "normal",
            }}
          >
            {kabinett.address[0]}
          </p>
          <p
            className="absolute m-0 whitespace-nowrap"
            style={{
              left: 485.45,
              top: 261.05,
              fontFamily: "var(--font-quicksand), Quicksand, sans-serif",
              fontSize: 11.76,
              color: "#5d5d5d",
              lineHeight: "normal",
            }}
          >
            {kabinett.address[1]}
          </p>
        </div>
      </Reveal>

      {/* Floating brand vector (73:36629) at frame (717.26, 4236.88), 275×87 */}
      <Reveal>
        <img
          src="/figma-assets/work/kabinett/floating.svg"
          alt=""
          className="absolute"
          style={{
            left: 717.26,
            top: 4236.88,
            width: 275.25,
            height: 87.32,
          }}
        />
      </Reveal>
    </div>
  );
}
