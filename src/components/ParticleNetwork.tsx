"use client";

import React, { useEffect, useState, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";
import { useTheme } from "next-themes";

export function ParticleNetwork({ className = "" }: { className?: string }) {
  const [init, setInit] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: { enable: true, mode: "push" },
          onHover: {
            enable: true,
            mode: "grab",
            parallax: { enable: true, force: 60, smooth: 10 },
          },
          resize: { enable: true },
        },
        modes: {
          grab: { distance: 180, links: { opacity: 0.35 } },
          push: { quantity: 4 },
        },
      },
      particles: {
        color: { value: theme === "dark" ? "#4A90D9" : "#3570B0" },
        links: {
          color: theme === "dark" ? "#4A90D9" : "#3570B0",
          distance: 150,
          enable: true,
          opacity: 0.2,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: { default: "bounce" },
          random: true,
          speed: 0.8,
          straight: false,
        },
        number: { density: { enable: true, area: 800 }, value: 40 },
        opacity: {
          value: { min: 0.1, max: 0.3 },
          animation: { enable: false },
        },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 2 } },
      },
      detectRetina: false,
      fullScreen: { enable: false },
    }),
    [theme]
  );

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      options={options}
      className={`absolute inset-0 w-full h-full ${className}`}
    />
  );
}
