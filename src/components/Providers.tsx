"use client";

import { ReactLenis } from "lenis/react";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ autoRaf: true }}>
      {children as any}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#1E293B", // match bg-surface
            color: "#f8fafc",
            border: "1px solid #334155", // match border-border
          },
        }}
      />
    </ReactLenis>
  );
}
