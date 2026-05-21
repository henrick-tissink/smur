"use client";

import Image from "next/image";
import { architrave, architraveFrame } from "@/content/architrave";
import { Reveal } from "../reveal";
import { ArchitraveBigMiddleContent } from "./architrave-extras/big-middle";
import { ArchitraveGroup80Content } from "./architrave-extras/group80";
import { ArchitraveRow2LeftContent } from "./architrave-extras/row2-left";
import { ArchitraveRow2RightContent } from "./architrave-extras/row2-right";

/*
  Desktop ARCHITRAVE (Architrave Studio) case study.
  Figma 71:982, 1440 × 4593, cream #fff7f4. Desktop only.

  Substantial deferrals — this is a vector-dense Figma frame:
    - Group 80 (895×647): masked photo + 60+ inline vectors. DEFERRED.
    - Row 2 LEFT (Layer_1, 423×521): 60+ inline vectors. DEFERRED.
    - Row 2 RIGHT (Group 82, 435×522): 67+ inline vectors + 2 masked
      photos + small text labels. DEFERRED.
    - Big middle (Layer_1, 898×1111): too dense to inline. DEFERRED.
  Hero (4 quadrant badges + top-left), title, Row 1 (consolidated) and
  Bottom (masked photo) render.
*/
export function ArchitraveCaseStudy() {
  const { width, height } = architraveFrame.desktop;
  const titleInk = "#35221a";

  return (
    <div
      data-nav-scheme="dark"
      className="relative mx-auto overflow-hidden"
      style={{ width, height, backgroundColor: "#fff7f4" }}
    >
      {/* ============================================================
          Section 1 — Hero (Group 33 + 4 badges)
          Group 33 at frame (268, 140) 434×313 is the top-left quadrant.
          Group 28/29/30/31 are the 4 small badges placed at the
          corner of each quadrant region.
          ============================================================ */}
      <Reveal>
        <img
          src="/figma-assets/work/architrave/hero-tl.svg"
          alt="Architrave hero quadrant"
          className="absolute"
          style={{ left: 268, top: 140.37, width: 434.52, height: 313.33 }}
        />
      </Reveal>
      {/* 4 brand badges, one per quadrant of the 2×2 hero grid */}
      <Reveal delay={0.04}>
        <img
          src="/figma-assets/work/architrave/hero-badge-tl.svg"
          alt=""
          className="absolute"
          style={{ left: 413.72, top: 257.42, width: 151.50, height: 70.26 }}
        />
      </Reveal>
      <Reveal delay={0.06}>
        <img
          src="/figma-assets/work/architrave/hero-badge-tr.svg"
          alt=""
          className="absolute"
          style={{ left: 869.65, top: 264.16, width: 151.50, height: 70.26 }}
        />
      </Reveal>
      <Reveal delay={0.08}>
        <img
          src="/figma-assets/work/architrave/hero-badge-bl.svg"
          alt=""
          className="absolute"
          style={{ left: 413.87, top: 609.02, width: 151.49, height: 70.25 }}
        />
      </Reveal>
      <Reveal delay={0.10}>
        <img
          src="/figma-assets/work/architrave/hero-badge-br.svg"
          alt=""
          className="absolute"
          style={{ left: 864.57, top: 604.92, width: 151.49, height: 70.26 }}
        />
      </Reveal>

      {/* ============================================================
          Section 2 — Title + body (Group 79, 297:57110)
          Frame (498, 877), 430×222.
          ============================================================ */}
      <div
        className="absolute text-center"
        style={{ left: 498, top: 877, width: 430, color: titleInk }}
      >
        <Reveal>
          <p
            className="font-heading italic"
            style={{ fontSize: 20, lineHeight: 1, margin: 0 }}
          >
            {architrave.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <p
            style={{
              marginTop: 19, // 39 (top 916-877) − 20 (eyebrow)
              fontSize: 17,
              lineHeight: 1.33,
              fontFamily: "var(--font-dm-sans), sans-serif",
            }}
          >
            {architrave.body}
          </p>
        </Reveal>
      </div>

      {/* ============================================================
          Section 3 — Group 80 (first content section, 297:57104)
          Frame (265, 1184), 895×647. Fully inlined via
          ./architrave-extras/group80: bg photo + inner inset photo +
          57 typography/wordmark vectors + mix-blend overlays. Insets
          are root-frame-relative percent so children mount cleanly.
          ============================================================ */}
      <Reveal>
        <ArchitraveGroup80Content />
      </Reveal>

      {/* ============================================================
          Section 4 — Row 1 (Layer_1 73:1699)
          Frame (263, 1854.70), 895×312. Consolidated SVG.
          ============================================================ */}
      <Reveal>
        <img
          src="/figma-assets/work/architrave/row1.svg"
          alt="Architrave Studio brand application"
          className="absolute"
          style={{ left: 263, top: 1854.70, width: 895, height: 312 }}
        />
      </Reveal>

      {/* ============================================================
          Section 5 — Row 2 (Group 84)
          Frame (265, 2190.70), 894×529.
          LEFT (Layer_1 71:1707) — consolidated SVG (the masked bg
            composition that's the foundation of the typography overlay).
          RIGHT (Group 82) — masked photo + inset photo (typography
            vectors still TODO).
          ============================================================ */}
      <Reveal>
        <ArchitraveRow2LeftContent />
      </Reveal>
      {/* Row 2 RIGHT (Group 82, 297:57107) — full inlined composition
          via ./architrave-extras/row2-right: masked photo bg + 66
          typography/wordmark vectors + "35 SQM" and "WE LOVE" text
          labels + inset image (175×175 square). */}
      <Reveal delay={0.05}>
        <ArchitraveRow2RightContent />
      </Reveal>

      {/* ============================================================
          Section 6 — Big middle (Layer_1 71:2406, 466 assets)
          Frame (265, 2747.06), 898×1111. Full composition inlined via
          ./architrave-extras/big-middle: 2 masked interior photos +
          ~460 typography vectors forming the brand-book layout.
          Root-frame-relative insets so mounts as direct child.
          ============================================================ */}
      <Reveal>
        <ArchitraveBigMiddleContent />
      </Reveal>

      {/* ============================================================
          Section 7 — Bottom (Clip path group, 71:2971)
          Inset within root frame [81.13% 8.45% 0.41% 8.44%] — a masked
          photo that occupies the bottom 18% of the frame.
            top = 0.8113 × 4593 = 3725.69
            left = 0.0844 × 1440 = 121.54
            right gap = 0.0845 × 1440 = 121.68 → width = 1196.78
            bottom gap = 0.0041 × 4593 = 18.83 → height = 848.48
          Section overflow-hidden clips to root frame.
          ============================================================ */}
      <Reveal>
        <div
          className="absolute overflow-hidden"
          style={{
            left: 121.54,
            top: 3725.69,
            width: 1196.78,
            height: 848.48,
          }}
        >
          <img
            src="/figma-assets/work/architrave/bottom-photo.svg"
            alt="Architrave Studio interior"
            className="absolute inset-0 block h-full w-full"
            style={{ maxWidth: "none" }}
          />
        </div>
      </Reveal>

      {/* Floating brand vector (71:987) at frame (717.26, 4261.62), 275×88 */}
      <Reveal>
        <img
          src="/figma-assets/work/architrave/floating.svg"
          alt=""
          className="absolute"
          style={{
            left: 717.26,
            top: 4261.62,
            width: 275.25,
            height: 87.83,
          }}
        />
      </Reveal>
    </div>
  );
}
