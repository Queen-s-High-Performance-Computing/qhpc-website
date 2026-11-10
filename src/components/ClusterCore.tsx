"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";
import { useThreeTimer } from "@/hooks/useThreeTimer";

// Stable particle positions prevent hydration drift and satisfy React's render-purity rules.
// The golden angle spreads particles around the core without using Math.random().
const dataBitPositions: [number, number, number][] = Array.from({ length: 10 }, (_, i) => {
  const angle = i * Math.PI * (3 - Math.sqrt(5));
  const radius = 2.4 + (((i * 7) % 13) / 12) * 1.2;
  const height = ((((i * 5) % 13) / 12) - 0.5) * 3;
  return [Math.cos(angle) * radius, height, Math.sin(angle) * radius];
});

function Core() {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Group>(null);
  const { theme } = useTheme();
  const timer = useThreeTimer();

  const color = theme === "dark" ? "#4A90D9" : "#3570B0";
  const glowColor = theme === "dark" ? "#8B7FB8" : "#6B5B9E";

  useFrame(() => {
    if (!timer.current) return;
    timer.current.update();
    const time = timer.current.getElapsed();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.2;
      meshRef.current.rotation.y = time * 0.25;
    }
    if (outerRef.current) {
      outerRef.current.rotation.y = -time * 0.15;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} color={color} />
      
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Inner core - Standard sphere instead of distort */}
        <Sphere ref={meshRef} args={[1, 16, 16]}>
          <meshStandardMaterial
            color={color}
            roughness={0.1}
            emissive={color}
            emissiveIntensity={0.3}
          />
        </Sphere>

        {/* Outer Rotating Frame - Only 2 rings */}
        <group ref={outerRef}>
          {[...Array(2)].map((_, i) => (
            <mesh key={i} rotation={[Math.PI / 2 * i, i, 0]}>
              <torusGeometry args={[2.2, 0.015, 8, 48]} />
              <meshStandardMaterial
                color={glowColor}
                emissive={glowColor}
                emissiveIntensity={0.5}
                transparent
                opacity={0.4}
              />
            </mesh>
          ))}
        </group>

        {/* Floating data bits at deterministic positions */}
        {dataBitPositions.map((position, i) => (
          <mesh key={i} position={position}>
            <boxGeometry args={[0.04, 0.04, 0.04]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? color : glowColor}
              emissive={i % 2 === 0 ? color : glowColor}
              emissiveIntensity={1}
            />
          </mesh>
        ))}
      </Float>
    </>
  );
}

export function ClusterCore({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full h-[400px] ${className}`}>
      <Canvas shadows={false} dpr={[1, 1.5]}>
        <PerspectiveCamera makeDefault position={[0, 0, 7]} />
        <Core />
      </Canvas>
    </div>
  );
}

