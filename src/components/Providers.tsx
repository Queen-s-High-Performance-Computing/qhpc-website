"use client";

import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
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
    </>
  );
}
