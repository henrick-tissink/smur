/*
  Collapsible toggle chevron — the downward "⌄" used on every collapsible
  section in the Figma (DROP DOWN instances 183:1371 / 268:34466 and the FAQ
  accordions). NOT the full SMUR arrow (that has a shaft + head and is used for
  scroll cues / CTAs / the "my work" link).

  Exported asset is a single stroked V-path (dropdown-chevron.svg, viewBox
  19.629×11.355, stroke ~2.1px). Recolored via the same CSS-mask trick as
  <Arrow> so one asset works on light and dark sections. Rotates 180° (points
  up) when the section is expanded.

  Native Figma toggle box is 18.135 × 9.117 (≈2:1), so width defaults to 18.135
  and height is derived from that ratio.
*/

type Props = {
  /** Expanded state — rotates the chevron 180° to point up. */
  open?: boolean;
  /** Width in CSS pixels. Height derived from the Figma 18.135×9.117 ratio. */
  width?: number;
  /** Override color (any CSS color). Default = currentColor. */
  color?: string;
  className?: string;
};

export function Chevron({
  open = false,
  width = 18.135,
  color,
  className = "",
}: Props) {
  const height = width * (9.117 / 18.135);

  return (
    <span
      aria-hidden
      className={`inline-block shrink-0 transition-transform duration-300 ${
        open ? "rotate-180" : ""
      } ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        WebkitMaskImage: "url(/figma-assets/mobile/dropdown-chevron.svg)",
        maskImage: "url(/figma-assets/mobile/dropdown-chevron.svg)",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
        backgroundColor: color ?? "currentColor",
      }}
    />
  );
}
