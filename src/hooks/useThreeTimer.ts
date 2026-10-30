"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function useThreeTimer() {
  const timerRef = useRef<THREE.Timer | null>(null);

  useEffect(() => {
    const timer = new THREE.Timer();
    timer.connect(document);
    timerRef.current = timer;

    return () => {
      timer.dispose();
      timerRef.current = null;
    };
  }, []);

  // Call update() once per frame before reading elapsed time or delta.
  return timerRef;
}
