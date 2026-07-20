import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "p" | "span";
};

export function Eyebrow({ children, className = "", as = "p" }: Props) {
  const Tag = as;
  return (
    <Tag
      className={className}
      style={{
        fontFamily: "var(--font-body)",
        fontStyle: "italic",
        fontWeight: 400,
        fontSize: "var(--text-eyebrow)",
        lineHeight: 1,
        color: "var(--color-accent)",
      }}
    >
      {children}
    </Tag>
  );
}
