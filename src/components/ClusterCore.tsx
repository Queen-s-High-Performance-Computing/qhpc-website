"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

function Core() {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Group>(null);
  const { theme } = useTheme();

  const color = theme === "dark" ? "#4A90D9" : "#3570B0";
  const glowColor = theme === "dark" ? "#8B7FB8" : "#6B5B9E";

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
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

        {/* Floating Data Bits - Reduced count */}
        {useMemo(() => [...Array(10)].map((_, i) => {
          const angle = Math.random() * Math.PI * 2;
          const radius = 2.4 + Math.random() * 1.2;
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * radius,
                (Math.random() - 0.5) * 3,
                Math.sin(angle) * radius
              ]}
            >
              <boxGeometry args={[0.04, 0.04, 0.04]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? color : glowColor}
                emissive={i % 2 === 0 ? color : glowColor}
                emissiveIntensity={1}
              />
            </mesh>
          );
        }), [color, glowColor])}
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

