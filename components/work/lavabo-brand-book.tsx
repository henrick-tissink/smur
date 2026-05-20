"use client";

import Image from "next/image";

/*
  Structural rebuild of LAVABO brand book mockup (Figma Frame 54 71:342,
  also reused in home services Group 73 163:429). Replaces a screenshot of
  Figma's vector composition with real HTML/CSS + the underlying product
  photos at full Figma asset resolution.

  Base size is 898×1246 (desktop case study). For mobile (393×545) and home
  services (428×557), pass smaller width/height and we scale uniformly via
  CSS transform so the inner layout stays canonical.

  Original Figma composition is ~60 vector primitives layered on top of 5
  image rectangles. Per CLAUDE.md rule #2 we don't screenshot it; we rebuild
  it. The exact LAVABO custom logotype (vector-traced letterforms) is
  approximated here as text styled with DM Serif Display + letter spacing —
  visibly close at small sizes, not pixel-exact at large.
*/

const BASE_W = 898;
const BASE_H = 1246;

export function LavaboBrandBook({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  const scale = Math.min(width / BASE_W, height / BASE_H);
  return (
    <div
      className="overflow-hidden"
      style={{ width, height, backgroundColor: "#f5f1ec" }}
    >
      <div
        className="relative"
        style={{
          width: BASE_W,
          height: BASE_H,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {/* Outer card frame (cream bg) */}
        <div
          className="absolute"
          style={{
            left: 0,
            top: 0,
            width: BASE_W,
            height: BASE_H,
            backgroundColor: "#fff",
          }}
        />

        {/* Top nav: LAVABO logo on left, links on right */}
        <div
          className="absolute font-heading"
          style={{
            left: 60,
            top: 30,
            fontSize: 30,
            letterSpacing: "0.04em",
            color: "#231f20",
          }}
        >
          LAVABO
        </div>
        <div
          className="absolute flex"
          style={{
            right: 60,
            top: 42,
            gap: 28,
            fontSize: 12,
            color: "#231f20",
          }}
        >
          <span>Our Products</span>
          <span>About Us</span>
          <span>Contact Us</span>
        </div>

        {/* Hero photo row: 4 colored sinks shot from above */}
        <div
          className="absolute overflow-hidden"
          style={{ left: 60, top: 100, width: 778, height: 280 }}
        >
          <Image
            src="/figma-assets/work/lavabo/brand-book/sinks-hero.png"
            alt=""
            width={1193}
            height={1211}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>

        {/* "The art of sink." section */}
        <div
          className="absolute"
          style={{ left: 60, top: 430, width: 360 }}
        >
          <h2
            className="font-heading"
            style={{
              fontSize: 50,
              lineHeight: 1.05,
              color: "#231f20",
              fontStyle: "normal",
            }}
          >
            The art
            <br />
            of sink.
          </h2>
          <p
            style={{
              marginTop: 30,
              fontSize: 14,
              lineHeight: 1.5,
              color: "#231f20",
            }}
          >
            Sleek products crafted with precision and purpose.
          </p>
          <button
            type="button"
            className="font-bold"
            style={{
              marginTop: 28,
              padding: "10px 22px",
              backgroundColor: "#231f20",
              color: "#fff",
              fontSize: 11,
              letterSpacing: "0.05em",
              borderRadius: 0,
            }}
          >
            order yours now
          </button>
        </div>

        {/* Featured product photo right */}
        <div
          className="absolute overflow-hidden"
          style={{ left: 478, top: 430, width: 360, height: 420 }}
        >
          <Image
            src="/figma-assets/work/lavabo/brand-book/product-feature.png"
            alt=""
            width={1199}
            height={1381}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>

        {/* "Check out our products." */}
        <div
          className="absolute"
          style={{
            left: 60,
            top: 920,
            fontSize: 24,
            color: "#231f20",
          }}
        >
          Check out our products.
          <div
            aria-hidden
            style={{
              marginTop: 6,
              fontSize: 16,
              color: "#231f20",
            }}
          >
            →
          </div>
        </div>

        {/* Three product cards */}
        <div
          className="absolute flex"
          style={{ left: 60, top: 1000, gap: 14 }}
        >
          <div
            className="overflow-hidden"
            style={{ width: 254, height: 230 }}
          >
            <Image
              src="/figma-assets/work/lavabo/brand-book/product-card-1.png"
              alt=""
              width={1192}
              height={1083}
              unoptimized
              className="block h-full w-full object-cover"
            />
          </div>
          <div
            className="overflow-hidden"
            style={{ width: 254, height: 230 }}
          >
            <Image
              src="/figma-assets/work/lavabo/brand-book/product-card-2.png"
              alt=""
              width={1412}
              height={1136}
              unoptimized
              className="block h-full w-full object-cover"
            />
          </div>
          <div
            className="overflow-hidden"
            style={{ width: 254, height: 230 }}
          >
            <Image
              src="/figma-assets/work/lavabo/brand-book/corner-icon.png"
              alt=""
              width={1238}
              height={1302}
              unoptimized
              className="block h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Footer */}
        <div
          className="absolute font-heading"
          style={{
            left: 60,
            top: 1180,
            fontSize: 24,
            letterSpacing: "0.04em",
            color: "#231f20",
          }}
        >
          LAVABO
        </div>
        <div
          className="absolute flex"
          style={{
            left: 488,
            top: 1180,
            gap: 70,
            fontSize: 10,
            color: "#231f20",
          }}
        >
          <div className="flex flex-col" style={{ gap: 4 }}>
            <span style={{ fontWeight: 600 }}>Support</span>
            <span>Track Order</span>
            <span>Legal Page</span>
            <span>Terms &amp; Conditions</span>
            <span>Company</span>
          </div>
          <div className="flex flex-col" style={{ gap: 4 }}>
            <span style={{ fontWeight: 600 }}>Our Products</span>
            <span>About Us</span>
            <span>Contact Us</span>
          </div>
        </div>
      </div>
    </div>
  );
}
