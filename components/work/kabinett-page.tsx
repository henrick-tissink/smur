"use client";

import Image from "next/image";
import { kabinett, kabinettFrame } from "@/content/kabinett";
import { Reveal } from "../reveal";
import { KabinettBottomContent } from "./kabinett-extras/bottom";
import { KabinettRow3RightContent } from "./kabinett-extras/row3-right";

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
            className="italic"
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontWeight: 400,
              fontSize: 20,
              lineHeight: 1, // Figma H3: DM Sans Italic 20 / lh normal
              margin: 0,
            }}
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
          Section 4 — Row 2 (Group 117, artboard 143). Flat export of the
          "Cheese & Wine Evenings" poster; replaces the inlined masked
          photo + 70-vector composition. Frame (271, 1859.68), 894×1100
          (artboard 1801×2227, ratio 0.808 — object-cover).
          ============================================================ */}
      <Reveal>
        <div
          className="absolute overflow-hidden"
          style={{ left: 271, top: 1859.68, width: 894, height: 1100 }}
        >
          <Image
            src="/figma-assets/work/kabinett/row2-poster.png"
            alt="Kabinett ‘Cheese & Wine Evenings’ poster"
            width={1801}
            height={2227}
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
          Section 6 — Row 3 RIGHT (Group 116, Layer_2 73:39506)
          Frame (729.52, 2985.37), 434.62×585.49. Inlined 20+ vectors
          + masked photo + mix-blend overlay via
          ./kabinett-extras/row3-right.
          ============================================================ */}
      <KabinettRow3RightContent />

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
          Section 8 — Bottom (Group 114, Layer_2 73:40115)
          Frame (272, 4242.76), 896×604. Fully inlined via
          ./kabinett-extras/bottom: bg photo + main cabinet vector +
          inset photo + address text (real HTML, Quicksand) + 20 letter
          rows below. Mounted inside a wrapper at the section bounds so
          the JSX's section-local % insets resolve correctly.
          ============================================================ */}
      <Reveal>
        <div
          className="absolute"
          style={{ left: 272, top: 4242.76, width: 896, height: 604 }}
        >
          <KabinettBottomContent />
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
