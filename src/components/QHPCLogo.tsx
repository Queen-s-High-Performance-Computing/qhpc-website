"use client";

import React from "react";
import Image from "next/image";

export function QHPCLogo({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <div className={`qhpc-brand-logo flex items-center gap-2 transition-all ${className}`}>
      <Image
        src="/logo.png"
        alt=""
        width={size}
        height={size}
        className="qhpc-brand-logo__image qhpc-brand-logo__image--light object-contain"
        aria-hidden="true"
        priority
      />
      <Image
        src="/logo-inverse.png"
        alt=""
        width={size}
        height={size}
        className="qhpc-brand-logo__image qhpc-brand-logo__image--dark object-contain"
        aria-hidden="true"
        priority
      />
      <span className="font-heading text-text-primary font-bold tracking-tight">QHPC</span>
    </div>
  );
}
