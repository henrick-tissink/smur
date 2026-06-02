import type { ReactNode } from "react";

/*
  Mobile wrapper for case-study pages that have no dedicated mobile design.
  Those pages shrink the 1440 desktop frame to fit (~0.27×), which renders the
  body copy at ~4.6px — illegible. This keeps the IMAGERY as a scaled visual
  showcase but lifts the intro out as native-size, readable mobile text,
  inserted between the scaled hero and the scaled visuals (matching the desktop
  order hero → intro → visuals, with no duplicated/illegible text).

  The frame is rendered twice, each time clipped to a different vertical band:
    - hero slice:    [0 .. introY]
    - (readable intro inserted here)
    - visuals slice: [visualsY .. frameHeight]
  Off-band images stay lazy (clipped out of view), so each loads in its slice.

    introY      — frame-Y where the intro text begins (end of the hero slice)
    visualsY    — frame-Y where the first visual section begins
    frameHeight — total frame height
*/
function Slice({
  fromY,
  toY,
  children,
}: {
  fromY: number;
  toY: number;
  children: ReactNode;
}) {
  return (
    <div
      className="overflow-hidden"
      style={{ height: `calc(100vw * ${(toY - fromY) / 1440})` }}
    >
      <div style={{ zoom: "calc(100vw / 1440px)", marginTop: `${-fromY}px` }}>
        {children}
      </div>
    </div>
  );
}

export function MobileScaledCaseStudy({
  children,
  eyebrow,
  body,
  introY,
  visualsY,
  frameHeight,
}: {
  children: ReactNode;
  eyebrow: string;
  body: string;
  introY: number;
  visualsY: number;
  frameHeight: number;
}) {
  return (
    <div style={{ backgroundColor: "#fff7f4" }}>
      <Slice fromY={0} toY={introY}>
        {children}
      </Slice>

      {/* Readable, native-size intro (replaces the illegible scaled one). */}
      <div
        className="mx-auto px-[43px] pb-[40px] pt-[6px] text-center"
        style={{ maxWidth: "393px" }}
      >
        <p
          className="font-sans italic text-accent"
          style={{ fontSize: "16px", lineHeight: 1 }}
        >
          {eyebrow}
        </p>
        <p
          className="mt-[16px] text-ink"
          style={{ fontSize: "15px", lineHeight: 1.45 }}
        >
          {body}
        </p>
      </div>

      <Slice fromY={visualsY} toY={frameHeight}>
        {children}
      </Slice>
    </div>
  );
}
