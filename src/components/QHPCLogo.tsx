"use client";

import React from "react";
import Image from "next/image";

export function QHPCLogo({ className = "", size = 40 }: { className?: string; size?: number }) {
  // Using an aspect ratio of roughly 1400x500 (2.8:1) for the new logo.
  const width = size * 2.8;
  const height = size;

  return (
    <div className={`relative flex items-center justify-center transition-all ${className} dark:bg-[#E8EDF5] dark:rounded-xl dark:px-2 dark:py-1 dark:shadow-[0_0_15px_rgba(255,255,255,0.1)]`}>
      <Image
        src="/logo.png"
        alt="QHPC Logo"
        width={width}
        height={height}
        className="object-contain"
        priority
      />
    </div>
  );
}
