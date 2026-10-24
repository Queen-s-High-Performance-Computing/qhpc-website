import type { ReactNode } from "react";

export function SectionLabel({
  children,
  onDark = false,
  className = "",
}: {
  children: ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <p className={`qhpc-label${onDark ? " qhpc-label--on-dark" : ""} ${className}`}>
      {children}
    </p>
  );
}
