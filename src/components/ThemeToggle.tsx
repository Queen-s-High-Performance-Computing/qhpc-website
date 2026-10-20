"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10 rounded-full bg-surface/50 animate-pulse border border-border" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-card/80 glass-strong border border-border text-text-secondary shadow-lg hover:text-primary transition-all duration-300 hover:scale-105"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun size={22} className="text-terminal-amber" />
      ) : (
        <Moon size={22} className="text-secondary" />
      )}
    </button>
  );
}
