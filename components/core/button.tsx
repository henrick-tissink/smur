import type { ReactNode } from "react";
import { Icon } from "./icon";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "outline" | "solid";
  trailingArrow?: boolean;
  className?: string;
};

const base =
  "group inline-flex items-center gap-[10px] px-[26px] py-[13px] " +
  "font-[family-name:var(--font-ui)] text-[14px] uppercase tracking-[0.06em] " +
  "transition-[background-color,color,transform] duration-200 " +
  "ease-[var(--ease-brand)] active:scale-[var(--scale-press)] " +
  "hover:bg-[var(--color-accent)] hover:text-[var(--color-cream)]";

export function Button({
  children,
  href,
  onClick,
  variant = "outline",
  trailingArrow = false,
  className = "",
}: Props) {
  const style = {
    borderRadius: "var(--radius-pill)",
    border:
      variant === "outline"
        ? "var(--hairline-button) solid var(--color-ink)"
        : "var(--hairline-button) solid transparent",
    backgroundColor: variant === "solid" ? "var(--color-accent)" : "transparent",
    color: variant === "solid" ? "var(--color-cream)" : "var(--color-ink)",
  } as const;

  const content = (
    <>
      {children}
      {trailingArrow ? <Icon name="arrow-right" size={16} /> : null}
    </>
  );

  if (href) {
    return (
      <a href={href} className={`${base} ${className}`} style={style}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={`${base} ${className}`} style={style}>
      {content}
    </button>
  );
}
