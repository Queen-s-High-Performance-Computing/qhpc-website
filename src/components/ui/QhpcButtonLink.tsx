import Link from "next/link";
import type { ReactNode } from "react";

type QhpcButtonLinkProps = {
  href: string;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  children: ReactNode;
};

export function QhpcButtonLink({
  href,
  variant = "primary",
  className = "",
  children,
}: QhpcButtonLinkProps) {
  return (
    <Link className={`qhpc-button qhpc-button--${variant} ${className}`} href={href}>
      {children}
    </Link>
  );
}
