"use client";

import { Suspense, useCallback, useMemo, useRef, useState, useSyncExternalStore } from "react";
import type { ComponentRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bounds, Html, OrbitControls, useGLTF } from "@react-three/drei";
import { Pause, Play, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import type { Group } from "three";

/**
 * Model sources: separately exported STEP files provided by QHPC on 9 Nov 2026.
 * Each mesh retains its measured CAD position, converted from mm to metres-like
 * scene units at 1 unit = 100 mm. +Z points toward the front I/O connectors.
 * The switch's white enclosure is exact CAD; the internal TP-Link hardware,
 * its port details and the illustrative fastener movement are not supplied CAD.
 */
const MODEL = {
  frame: "/models/qhpc-cad-frame-v1.glb",
  tray: "/models/qhpc-cad-tray-v1.glb",
  pi: "/models/qhpc-cad-pi-v1.glb",
};
const PITCH = 0.28; // 28 mm between the five trays, inferred from assembled rack spacing
const FEATURED = 2; // animate the middle tray to keep the other four visible
const DURATION = 13.6;

function ease(value: number): number {
  const t = Math.max(0, Math.min(1, value));
  return t * t * (3 - 2 * t);
}
function move(t: number, a: number, b: number): number {
  return ease((t - a) / (b - a));
}

function SwitchHardware() {
  // Housing and mounting plate are present in the supplied switch-case STEP.
  // This darker internal insert approximates the missing TP-Link TL-SG108E body.
  // Its 8 port faces lie in the real housing's narrow front-right opening.
  return (
    <group>
      <mesh position={[0.398, -0.135, 0.205]}>
        <boxGeometry args={[0.224, 1.55, 0.945]} />
        <meshStandardMaterial color="#26313c" metalness={0.22} roughness={0.68} />
      </mesh>
      <mesh position={[0.359, -0.126, 0.715]}>
        <boxGeometry args={[0.188, 1.478, 0.017]} />
        <meshStandardMaterial color="#151d28" metalness={0.16} roughness={0.73} />
      </mesh>
      {Array.from({ length: 8 }, (_, i) => (
        <group key={i} position={[0.346, 0.505 - i * 0.181, 0.728]}>
          <mesh>
            <boxGeometry args={[0.139, 0.118, 0.009]} />
            <meshStandardMaterial color="#9aa9b7" metalness={0.62} roughness={0.34} />
          </mesh>
          <mesh position={[0, 0, 0.007]}>
            <boxGeometry args={[0.119, 0.095, 0.008]} />
            <meshStandardMaterial color="#050c14" roughness={0.92} />
          </mesh>
          <mesh position={[0, -0.033, 0.012]}>
            <boxGeometry args={[0.071, 0.009, 0.004]} />
            <meshStandardMaterial color="#a7b7c4" metalness={0.7} roughness={0.27} />
          </mesh>
          <mesh position={[0.087, 0.026, 0.003]}>
            <sphereGeometry args={[0.008, 9, 8]} />
            <meshStandardMaterial color="#7bc797" emissive="#205b39" emissiveIntensity={0.45} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// The 2 mm-radius, front-facing fastening holes were measured from the
// cylindrical surfaces in the supplied "r pi case.step" file:
//   hole A: (X=9.653, Z=169.841) mm; hole B: (X=82.503, Z=169.841) mm
//   tray front: Y=9.939 mm (CAD coordinates)
// STEP-to-web transformation: x=(X-68.2)/100, y=(Z-132.5)/100,
// z=(76.5-Y)/100. All screws therefore use the *exact same* local
// hole centres for every tray, with PITCH providing each tray's vertical shift.
const FRONT_MOUNT_HOLES: ReadonlyArray<readonly [number, number]> = [
  [-0.58547, 0.37341],
  [0.14303, 0.37341],
];
const FRONT_TRAY_FACE = 0.66561;

function Fastener({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Screw shaft follows the hole axis (+Z) instead of sitting in front of it. */}
      <mesh position={[0, 0, -0.016]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.0155, 0.0155, 0.046, 16]} />
        <meshStandardMaterial color="#253041" metalness={0.52} roughness={0.48} />
      </mesh>
      {/* Shallow black button head and hex socket, as on the physical rack. */}
      <mesh position={[0, 0, 0.001]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.030, 0.028, 0.012, 28]} />
        <meshStandardMaterial color="#1c2532" metalness={0.50} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0, 0.0076]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.009, 0.009, 0.001, 6]} />
        <meshStandardMaterial color="#080e17" metalness={0.25} roughness={0.8} />
      </mesh>
    </group>
  );
}

function TrayFasteners({ level }: { level: number }) {
  return (
    <group position={[0, -level * PITCH, 0]}>
      {FRONT_MOUNT_HOLES.map(([x, y]) => (
        <Fastener key={x} position={[x, y, FRONT_TRAY_FACE + 0.006]} />
      ))}
    </group>
  );
}

type Phase = "assembled" | "unscrew" | "slide" | "place" | "close" | "secure";
const phaseLabels: Record<Phase, string> = {
  assembled: "Complete five-node rack",
  unscrew: "1 · Release the tray fasteners",
  slide: "2 · Slide the middle tray forward",
  place: "3 · Lift and reseat the Raspberry Pi",
  close: "4 · Slide the tray into the frame",
  secure: "5 · Tighten the fasteners",
};

function CadAssembly({
  playing,
  onPhase,
}: {
  playing: boolean;
  onPhase: (phase: Phase) => void;
}) {
  const frameScene = useGLTF(MODEL.frame).scene;
  const trayScene = useGLTF(MODEL.tray).scene;
  const piScene = useGLTF(MODEL.pi).scene;
  const staticFrame = useMemo(() => frameScene.clone(true), [frameScene]);
  const trays = useMemo(() => Array.from({ length: 5 }, () => trayScene.clone(true)), [trayScene]);
  const boards = useMemo(() => Array.from({ length: 5 }, () => piScene.clone(true)), [piScene]);
  const trayRef = useRef<Group>(null);
  const boardRef = useRef<Group>(null);
  const boltsRef = useRef<Group>(null);
  const elapsed = useRef(0);
  const lastPhase = useRef<Phase>("assembled");

  useFrame((_, delta) => {
    if (playing) elapsed.current += Math.min(delta, 0.08);
    const t = elapsed.current % DURATION;
    const unfasten = move(t, 1.35, 2.35) * (1 - move(t, 10.4, 11.45));
    const extension = move(t, 2.65, 4.4) * (1 - move(t, 8.5, 10.15));
    const lift = move(t, 4.7, 5.85) * (1 - move(t, 7.0, 8.2));
    const trayTravel = 0.80 * extension;

    if (trayRef.current) trayRef.current.position.z = trayTravel;
    if (boardRef.current) {
      boardRef.current.position.z = trayTravel;
      boardRef.current.position.y = -FEATURED * PITCH + 0.25 * lift;
    }
    if (boltsRef.current) {
      boltsRef.current.position.z = 0.065 * unfasten;
      boltsRef.current.visible = extension < 0.24;
      boltsRef.current.children.forEach((levelGroup) => {
        levelGroup.children.forEach((fastener) => {
          fastener.rotation.z = unfasten * Math.PI * 3.5;
        });
      });
    }

    const phase: Phase = t < 1.35 || t >= 11.5 ? "assembled"
      : t < 2.65 ? "unscrew"
      : t < 4.7 ? "slide"
      : t < 8.4 ? "place"
      : t < 10.35 ? "close" : "secure";
    if (phase !== lastPhase.current) {
      lastPhase.current = phase;
      onPhase(phase);
    }
  });

  return (
    <Bounds fit clip margin={1.48} observe>
      <group>
        <primitive object={staticFrame} />
        <SwitchHardware />
        {trays.map((tray, i) => (
          <group
            key={`tray-${i}`}
            ref={i === FEATURED ? trayRef : undefined}
            position={[0, -PITCH * i, 0]}
          >
            <primitive object={tray} />
          </group>
        ))}
        {boards.map((board, i) => (
          <group
            key={`pi-${i}`}
            ref={i === FEATURED ? boardRef : undefined}
            position={[0, -PITCH * i, 0]}
          >
            <primitive object={board} />
          </group>
        ))}
        {Array.from({ length: 5 }, (_, i) => i === FEATURED ? (
          <group key={`bolts-${i}`} ref={boltsRef}>
            <TrayFasteners level={i} />
          </group>
        ) : <TrayFasteners key={`bolts-${i}`} level={i} />)}
      </group>
    </Bounds>
  );
}

useGLTF.preload(MODEL.frame);
useGLTF.preload(MODEL.tray);
useGLTF.preload(MODEL.pi);

export function RaspberryPiRackViewer() {
  const [playing, setPlaying] = useState(true);
  const [autoRotate, setAutoRotate] = useState(false);
  const orbitControls = useRef<ComponentRef<typeof OrbitControls>>(null);

  // Do not capture the visitor's scroll wheel over the canvas.
  // Zoom is available using buttons, leaving normal page scrolling uninterrupted.
  const zoomBy = useCallback((factor: number) => {
    const controls = orbitControls.current;
    if (!controls) return;
    const offset = controls.object.position.clone().sub(controls.target);
    const distance = offset.length();
    if (distance <= 0) return;
    const nextDistance = Math.min(8.5, Math.max(2.3, distance * factor));
    controls.object.position.copy(controls.target).addScaledVector(offset, nextDistance / distance);
    controls.update();
  }, []);
  const [restartToken, setRestartToken] = useState(0);
  const [phase, setPhase] = useState<Phase>("assembled");
  const onPhase = useCallback((next: Phase) => setPhase(next), []);

  const reducedMotion = useSyncExternalStore(
    (notify) => {
      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      media.addEventListener("change", notify);
      return () => media.removeEventListener("change", notify);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
  const [allowMotion, setAllowMotion] = useState(false);
  const isPlaying = playing && (!reducedMotion || allowMotion);

  return (
    <div className="rack-viewer" aria-label="Interactive 3D assembly of QHPC's five-Raspberry-Pi rack using supplied STEP CAD geometry">
      <div className="rack-viewer__stage">
        <div className="rack-viewer__topline">
          <span>QHPC HARDWARE LAB</span>
          <span>RACK ASSEMBLY</span>
        </div>
        <Canvas
          camera={{ position: [2.65, 1.72, 3.45], fov: 39 }}
          dpr={[1, 1.7]}
          gl={{ antialias: true, alpha: true }}
          fallback={<p className="rack-viewer__fallback">This browser cannot display the 3D rack. Photographs of the real build appear below.</p>}
        >
          <color attach="background" args={["#0c1e3c"]} />
          <ambientLight intensity={1.5} />
          <hemisphereLight intensity={1.15} color="#f5f9ff" groundColor="#50647d" />
          <directionalLight position={[3, 7, 6]} intensity={2.0} />
          <directionalLight position={[-4, 3, -5]} intensity={0.72} color="#8eacd9" />
          <Suspense fallback={<Html center><span style={{ color: "#dfebff", whiteSpace: "nowrap", fontSize: 13 }}>Loading QHPC CAD model…</span></Html>}>
            <CadAssembly key={restartToken} playing={isPlaying} onPhase={onPhase} />
          </Suspense>
          <OrbitControls
            ref={orbitControls}
            makeDefault
            enablePan={false}
            enableZoom={false}
            minDistance={2.3}
            maxDistance={8.5}
            minPolarAngle={0.16}
            maxPolarAngle={Math.PI * 0.83}
            autoRotate={autoRotate}
            autoRotateSpeed={0.35}
          />
        </Canvas>
        <div className="rack-viewer__hint">DRAG TO ROTATE · USE BUTTONS TO ZOOM</div>
      </div>
      <div className="rack-viewer__toolbar">
        <div>
          <p className="font-semibold text-text-primary">{phaseLabels[phase]}</p>
          <p className="mt-1">Five Raspberry Pis · removable trays · integrated 8-port switch</p>
        </div>
        <div className="rack-viewer__actions">
          <button type="button" onClick={() => zoomBy(0.82)} aria-label="Zoom in on rack" title="Zoom in">
            <ZoomIn size={15} /> Zoom in
          </button>
          <button type="button" onClick={() => zoomBy(1.22)} aria-label="Zoom out from rack" title="Zoom out">
            <ZoomOut size={15} /> Zoom out
          </button>
          <button type="button" onClick={() => { if (reducedMotion && !allowMotion) { setAllowMotion(true); setPlaying(true); } else { setPlaying((v) => !v); } }} aria-label={isPlaying ? "Pause assembly demonstration" : "Resume assembly demonstration"}>
            {isPlaying ? <Pause size={15} /> : <Play size={15} />} {isPlaying ? "Pause assembly" : "Play assembly"}
          </button>
          <button type="button" onClick={() => setAutoRotate((v) => !v)} aria-label={autoRotate ? "Stop automatic rotation" : "Start automatic rotation"}>
            {autoRotate ? <Pause size={15} /> : <Play size={15} />} {autoRotate ? "Pause orbit" : "Auto-rotate"}
          </button>
          <button type="button" onClick={() => { setRestartToken((n) => n + 1); setPhase("assembled"); setPlaying(true); setAllowMotion(true); setAutoRotate(false); }}>
            <RotateCcw size={15} /> Replay
          </button>
        </div>
      </div>

    </div>
  );
}
