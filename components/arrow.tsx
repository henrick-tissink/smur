/*
  Renders the exported SMUR arrow SVG (thin vertical line + chevron tip)
  rotated to the requested direction. Same CSS-mask trick as TitleMask so
  the color is configurable — both exports are simple single-path SVGs, but
  with hardcoded fills (cream + brown) and we want one asset to work in any
  context.

  The native artwork points down (19.55 × 56.27 viewBox). For other
  directions we rotate the container.
*/

type Direction = "up" | "down" | "left" | "right";

const ROTATIONS: Record<Direction, number> = {
  down: 0,
  up: 180,
  left: 90,
  right: -90,
};

type Props = {
  direction: Direction;
  /** Height in CSS length (number for px, or string like "5cqw"). Width auto-derived from aspect ratio. */
  size?: number | string;
  /** Override color (any CSS color). Default = currentColor. */
  color?: string;
  className?: string;
  ariaLabel?: string;
};

export function Arrow({
  direction,
  size = 56,
  color,
  className = "",
  ariaLabel,
}: Props) {
  const len = (v: number | string) => typeof v === "number" ? `${v}px` : v;
  const aspect = 19.55 / 56.27;
  const widthValue = typeof size === "number"
    ? `${size * aspect}px`
    : `calc(${size} * ${aspect})`;
  const rotation = ROTATIONS[direction];

  return (
    <span
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
      className={`inline-block ${className}`}
      style={{
        width: widthValue,
        height: len(size),
        transform: `rotate(${rotation}deg)`,
        WebkitMaskImage: "url(/figma-assets/arrows/arrow-white.svg)",
        maskImage: "url(/figma-assets/arrows/arrow-white.svg)",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        backgroundColor: color ?? "currentColor",
      }}
    />
  );
}
