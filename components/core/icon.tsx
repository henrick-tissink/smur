export type IconName =
  | "arrow-right"
  | "arrow-left"
  | "chevron-down"
  | "hamburger"
  | "close";

/* Minimal hairline line-glyphs on a 24×24 grid (spec: ~1px, no fill). */
const PATHS: Record<IconName, React.ReactNode> = {
  "arrow-right": (
    <>
      <line x1="3" y1="12" x2="21" y2="12" />
      <polyline points="14 5 21 12 14 19" />
    </>
  ),
  "arrow-left": (
    <>
      <line x1="21" y1="12" x2="3" y2="12" />
      <polyline points="10 5 3 12 10 19" />
    </>
  ),
  "chevron-down": <polyline points="5 9 12 16 19 9" />,
  hamburger: (
    <>
      <line x1="3" y1="7" x2="21" y2="7" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="17" x2="21" y2="17" />
    </>
  ),
  close: (
    <>
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </>
  ),
};

type Props = {
  name: IconName;
  size?: number;
  title?: string;
  className?: string;
};

export function Icon({ name, size = 24, title, className }: Props) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      {PATHS[name]}
    </svg>
  );
}
