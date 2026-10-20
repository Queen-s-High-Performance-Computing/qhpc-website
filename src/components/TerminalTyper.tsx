"use client";

import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

interface TerminalTyperProps {
  lines: string[];
  speed?: number;
  className?: string;
  promptChar?: string;
}

export function TerminalTyper({
  lines,
  speed = 40,
  className = "",
  promptChar = "$",
}: TerminalTyperProps) {
  const el = useRef<HTMLSpanElement>(null);
  const typed = useRef<Typed | null>(null);

  useEffect(() => {
    // Format lines with prompt and delays
    const formattedLines = lines.map(line => `${promptChar} ${line}`);

    if (el.current) {
      typed.current = new Typed(el.current, {
        strings: formattedLines,
        typeSpeed: speed,
        backSpeed: speed / 2,
        backDelay: 1500,
        startDelay: 500,
        loop: true,
        showCursor: true,
        cursorChar: "\u2588", // Solid block cursor
        smartBackspace: true,
      });
    }

    return () => {
      if (typed.current) {
        typed.current.destroy();
      }
    };
  }, [lines, speed, promptChar]);

  return (
    <div className={`terminal ${className}`}>
      <div className="terminal-header">
        <span className="terminal-dot bg-terminal-red" />
        <span className="terminal-dot bg-terminal-amber" />
        <span className="terminal-dot bg-terminal-green" />
        <span className="ml-3 text-xs text-text-muted font-mono">
          qhpc@cluster ~ 
        </span>
      </div>
      <div className="terminal-body min-h-[120px]">
        <div className="text-terminal-green font-mono">
          <span ref={el} />
        </div>
      </div>
    </div>
  );
}

