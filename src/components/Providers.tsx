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
            background: "var(--code-surface)",
            color: "var(--code-ink)",
            border: "1px solid var(--line)",
          },
        }}
      />
    </ReactLenis>
  );
}
