"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Edges, Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";
import type { ReactNode } from "react";
import { useThreeTimer } from "@/hooks/useThreeTimer";

export type ClusterComponentId = "compute" | "interconnect" | "storage" | "services";

const BLUE = "#5278e2";
const ICE = "#dce8ff";
const DARK_METAL = "#101d3c";
const RACK_METAL = "#1a2c53";
const EDGE = "#7895e8";

function InteractiveRegion({
  id,
  children,
  onHover,
  onSelect,
}: {
  id: ClusterComponentId;
  children: ReactNode;
  onHover: (id: ClusterComponentId | null) => void;
  onSelect: (id: ClusterComponentId) => void;
}) {
  return (
    <group
      onPointerOver={(event) => {
        event.stopPropagation();
        onHover(id);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={(event) => {
        event.stopPropagation();
        onHover(null);
        document.body.style.cursor = "auto";
      }}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(id);
      }}
    >
      {children}
    </group>
  );
}

function ease(value: number) {
  const t = THREE.MathUtils.clamp(value, 0, 1);
  return t * t * (3 - 2 * t);
}

function Box({
  position,
  size,
  color = RACK_METAL,
  edge = EDGE,
  metalness = 0.65,
  roughness = 0.36,
}: {
  position: [number, number, number];
  size: [number, number, number];
  color?: string;
  edge?: string;
  metalness?: number;
  roughness?: number;
}) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      {edge && <Edges color={edge} threshold={18} />}
    </mesh>
  );
}

function ComputeNode({
  position,
  separation,
  index,
  progress,
}: {
  position: [number, number, number];
  separation: [number, number, number];
  index: number;
  progress: MotionValue<number>;
}) {
  const node = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!node.current) return;
    const p = ease(progress.get());
    node.current.position.x = THREE.MathUtils.damp(node.current.position.x, position[0] + separation[0] * p, 7, delta);
    node.current.position.y = THREE.MathUtils.damp(node.current.position.y, position[1] + separation[1] * p, 7, delta);
    node.current.position.z = THREE.MathUtils.damp(node.current.position.z, position[2] + separation[2] * p, 7, delta);
    node.current.rotation.y = THREE.MathUtils.damp(node.current.rotation.y, separation[0] * p * 0.035, 7, delta);
  });

  return (
    <group ref={node} position={position}>
      <Box position={[0, 0, 0]} size={[0.82, 0.48, 0.72]} color={DARK_METAL} />
      <Box position={[0, 0, 0.372]} size={[0.75, 0.4, 0.035]} color="#172a53" edge="#3e5d9f" />
      {[-0.28, -0.21, -0.14, -0.07, 0].map((y) => (
        <Box key={y} position={[-0.19, y, 0.395]} size={[0.29, 0.012, 0.008]} color="#5872a8" edge="" metalness={0.3} />
      ))}
      {[-0.06, 0.06, 0.18].map((x) => (
        <Box key={x} position={[x, 0.1, 0.397]} size={[0.055, 0.11, 0.016]} color="#0a1530" edge="#526b9e" metalness={0.25} />
      ))}
      <Box position={[0.29, -0.02, 0.397]} size={[0.11, 0.15, 0.02]} color="#0a1530" edge="#526b9e" metalness={0.25} />
      {[-0.29, -0.18, -0.07, 0.04, 0.15, 0.26].map((x, led) => (
        <mesh key={x} position={[x, -0.16, 0.405]}>
          <sphereGeometry args={[0.018, 8, 8]} />
          <meshStandardMaterial color={led === index % 6 ? ICE : BLUE} emissive={BLUE} emissiveIntensity={led === index % 6 ? 1.2 : 0.45} />
        </mesh>
      ))}
    </group>
  );
}

function RackShell({
  position,
  size,
  openFront = true,
  active = false,
}: {
  position: [number, number, number];
  size: [number, number, number];
  openFront?: boolean;
  active?: boolean;
}) {
  const [width, height, depth] = size;
  return (
    <group position={position}>
      <Box position={[-width / 2, 0, 0]} size={[0.13, height, depth]} edge={active ? ICE : EDGE} />
      <Box position={[width / 2, 0, 0]} size={[0.13, height, depth]} edge={active ? ICE : EDGE} />
      <Box position={[0, height / 2, 0]} size={[width, 0.14, depth]} edge={active ? ICE : EDGE} />
      <Box position={[0, -height / 2, 0]} size={[width, 0.14, depth]} edge={active ? ICE : EDGE} />
      <Box position={[0, 0, -depth / 2 + 0.04]} size={[width - 0.18, height - 0.26, 0.08]} color="#0c1936" edge="#526b9e" />
      {openFront && (
        <>
          {[-width / 2 + 0.19, width / 2 - 0.19].map((x) => (
            <Box key={x} position={[x, 0, depth / 2 - 0.025]} size={[0.025, height - 0.36, 0.028]} color="#6984c1" edge="" metalness={0.45} />
          ))}
          {[-height / 2 + 0.28, height / 2 - 0.28].map((y) => (
            <Box key={y} position={[0, y, depth / 2 - 0.02]} size={[width - 0.32, 0.025, 0.028]} color="#6984c1" edge="" metalness={0.45} />
          ))}
        </>
      )}
      <Box position={[-width / 2 + 0.08, -height / 2 - 0.09, 0]} size={[0.22, 0.18, depth - 0.1]} color="#17284b" edge="#516ca8" />
      <Box position={[width / 2 - 0.08, -height / 2 - 0.09, 0]} size={[0.22, 0.18, depth - 0.1]} color="#17284b" edge="#516ca8" />
    </group>
  );
}

function StorageDrawer({
  position,
  separation,
  index,
  progress,
}: {
  position: [number, number, number];
  separation: [number, number, number];
  index: number;
  progress: MotionValue<number>;
}) {
  const drawer = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!drawer.current) return;
    const p = ease(progress.get());
    drawer.current.position.x = THREE.MathUtils.damp(drawer.current.position.x, position[0] + separation[0] * p, 7, delta);
    drawer.current.position.y = THREE.MathUtils.damp(drawer.current.position.y, position[1] + separation[1] * p, 7, delta);
    drawer.current.position.z = THREE.MathUtils.damp(drawer.current.position.z, position[2] + separation[2] * p, 7, delta);
  });

  return (
    <group ref={drawer} position={position}>
      <Box position={[0, 0, 0]} size={[1.18, 0.72, 0.78]} color="#121f3d" />
      <Box position={[0, 0, 0.405]} size={[1.1, 0.61, 0.03]} color="#1b2b4c" edge="#5874b3" />
      {Array.from({ length: 8 }, (_, bay) => {
        const x = -0.46 + bay * 0.132;
        return (
          <group key={bay} position={[x, 0, 0.432]}>
            <Box position={[0, 0, 0]} size={[0.11, 0.38, 0.028]} color="#0a1530" edge="#526b9e" metalness={0.3} />
            <Box position={[0, 0.1, 0.018]} size={[0.07, 0.015, 0.008]} color="#7d91b8" edge="" metalness={0.2} />
            <mesh position={[0, -0.15, 0.019]}>
              <sphereGeometry args={[0.013, 8, 8]} />
              <meshStandardMaterial color={bay === index % 8 ? ICE : BLUE} emissive={BLUE} emissiveIntensity={0.45} />
            </mesh>
          </group>
        );
      })}
      {[-0.2, -0.13, -0.06].map((y) => (
        <Box key={y} position={[0, y, 0.435]} size={[0.18, 0.012, 0.01]} color="#5470a8" edge="" metalness={0.25} />
      ))}
    </group>
  );
}

function ServiceUnit({
  position,
  separation,
  kind,
  progress,
}: {
  position: [number, number, number];
  separation: [number, number, number];
  kind: number;
  progress: MotionValue<number>;
}) {
  const unit = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!unit.current) return;
    const p = ease(progress.get());
    unit.current.position.x = THREE.MathUtils.damp(unit.current.position.x, position[0] + separation[0] * p, 7, delta);
    unit.current.position.y = THREE.MathUtils.damp(unit.current.position.y, position[1] + separation[1] * p, 7, delta);
    unit.current.position.z = THREE.MathUtils.damp(unit.current.position.z, position[2] + separation[2] * p, 7, delta);
  });

  return (
    <group ref={unit} position={position}>
      <Box position={[0, 0, 0]} size={[1.15, 0.68, 0.72]} color="#111e3b" />
      <Box position={[0, 0, 0.38]} size={[1.07, 0.58, 0.03]} color={kind % 2 ? "#1c2e52" : "#17294b"} edge="#5874b3" />
      {[-0.21, -0.14, -0.07, 0, 0.07, 0.14].map((y) => (
        <Box key={y} position={[-0.16, y, 0.402]} size={[0.4, 0.012, 0.008]} color="#5872a8" edge="" metalness={0.3} />
      ))}
      <Box position={[0.33, 0, 0.405]} size={[0.24, 0.25, 0.02]} color="#0a1530" edge="#526b9e" metalness={0.25} />
      {[-0.23, -0.12, 0.12, 0.23].map((x, led) => (
        <mesh key={x} position={[x, -0.24, 0.41]}>
          <sphereGeometry args={[0.018, 8, 8]} />
          <meshStandardMaterial color={(kind + led) % 3 === 0 ? ICE : BLUE} emissive={BLUE} emissiveIntensity={0.55} />
        </mesh>
      ))}
    </group>
  );
}

function Interconnect({
  progress,
  active,
  onHover,
  onSelect,
}: {
  progress: MotionValue<number>;
  active: boolean;
  onHover: (id: ClusterComponentId | null) => void;
  onSelect: (id: ClusterComponentId) => void;
}) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!group.current) return;
    const p = ease(progress.get());
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, 2.52 + 0.72 * p, 7, delta);
    group.current.position.z = THREE.MathUtils.damp(group.current.position.z, -0.82 - 1.1 * p, 7, delta);
  });

  return (
    <InteractiveRegion id="interconnect" onHover={onHover} onSelect={onSelect}>
    <group ref={group} position={[0, 2.52, -0.82]}>
      {[0, 1].map((switchIndex) => (
        <group key={switchIndex} position={[0, -switchIndex * 0.48, 0]}>
          <Box position={[0, 0, 0]} size={[1.5, 0.36, 0.8]} color="#17284a" edge={active ? "#ffffff" : ICE} />
          <Box position={[0, 0, 0.415]} size={[1.38, 0.25, 0.03]} color="#09152e" edge="#5278e2" />
          {Array.from({ length: 10 }, (_, port) => (
            <group key={port} position={[-0.57 + port * 0.126, -0.01, 0.447]}>
              <Box position={[0, 0, 0]} size={[0.075, 0.09, 0.025]} color="#0b1834" edge="#405b99" metalness={0.4} />
              <mesh position={[0, -0.075, 0.012]}>
                <sphereGeometry args={[0.014, 8, 8]} />
                <meshStandardMaterial color={port % 3 === 0 ? ICE : BLUE} emissive={BLUE} emissiveIntensity={0.7} />
              </mesh>
            </group>
          ))}
        </group>
      ))}
    </group>
    </InteractiveRegion>
  );
}

function FiberPaths() {
  const fibers = [
    [[-2.65, 1.25, 0.55], [-1.75, 1.85, 0.15], [-0.7, 2.2, -0.2]],
    [[0, 1.25, 0.55], [0, 1.8, 0.2], [0, 2.2, -0.2]],
    [[2.65, 1.25, 0.55], [1.75, 1.85, 0.15], [0.7, 2.2, -0.2]],
  ].map((points) => new THREE.CatmullRomCurve3(points.map(([x, y, z]) => new THREE.Vector3(x, y, z))));

  return (
    <group>
      {fibers.map((curve, index) => (
        <mesh key={index}>
          <tubeGeometry args={[curve, 24, 0.012, 6, false]} />
          <meshStandardMaterial color={BLUE} emissive={BLUE} emissiveIntensity={0.6} transparent opacity={0.72} />
        </mesh>
      ))}
    </group>
  );
}

function SupercomputerCluster({
  progress,
  activeComponent,
  onHover,
  onSelect,
  overview,
}: {
  progress: MotionValue<number>;
  activeComponent: ClusterComponentId | null;
  onHover: (id: ClusterComponentId | null) => void;
  onSelect: (id: ClusterComponentId) => void;
  overview: boolean;
}) {
  const model = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!model.current) return;
    const p = ease(progress.get());
    model.current.rotation.y = THREE.MathUtils.damp(model.current.rotation.y, 0.16 + p * 0.08, 4, delta);
    const scale = THREE.MathUtils.damp(model.current.scale.x, overview ? 1 : 0.015, 5, delta);
    model.current.scale.setScalar(scale);
    model.current.position.x = THREE.MathUtils.damp(model.current.position.x, overview ? 0 : -1.8, 5, delta);
  });

  return (
    <group ref={model}>
      <ambientLight intensity={1.05} />
      <directionalLight position={[4, 6, 7]} intensity={2.2} color="#edf3ff" />
      <pointLight position={[-3, 1, 4]} intensity={18} color={BLUE} distance={12} />
      <pointLight position={[3, -2, 3]} intensity={8} color="#4167c8" distance={9} />

      {/* Compute partition: representative compute nodes in a dedicated rack. */}
      <InteractiveRegion id="compute" onHover={onHover} onSelect={onSelect}>
      <RackShell position={[0, 0, 0]} size={[2.35, 4.42, 1.22]} active={activeComponent === "compute"} />
      {Array.from({ length: 8 }, (_, index) => {
        const row = Math.floor(index / 2);
        const col = index % 2;
        const x = col === 0 ? -0.5 : 0.5;
        const y = 1.34 - row * 0.78;
        return <ComputeNode key={index} position={[x, y, 0.16]} separation={[col === 0 ? -0.12 : 0.12, (1.5 - row) * 0.12, 1.35]} index={index} progress={progress} />;
      })}
      </InteractiveRegion>

      {/* Parallel filesystem: storage enclosures with banks of drive bays. */}
      <InteractiveRegion id="storage" onHover={onHover} onSelect={onSelect}>
      <RackShell position={[-2.65, 0, 0]} size={[1.72, 4.42, 1.22]} active={activeComponent === "storage"} />
      {Array.from({ length: 4 }, (_, index) => (
        <StorageDrawer
          key={index}
          position={[-2.65, 1.43 - index * 0.96, 0.16]}
          separation={[-0.5, (1.5 - index) * 0.12, 1.15]}
          index={index}
          progress={progress}
        />
      ))}
      </InteractiveRegion>

      {/* Login and system-service nodes: access, management and data movement. */}
      <InteractiveRegion id="services" onHover={onHover} onSelect={onSelect}>
      <RackShell position={[2.65, 0, 0]} size={[1.72, 4.42, 1.22]} active={activeComponent === "services"} />
      {Array.from({ length: 4 }, (_, index) => (
        <ServiceUnit
          key={index}
          position={[2.65, 1.43 - index * 0.96, 0.16]}
          separation={[0.5, (1.5 - index) * 0.12, 1.1]}
          kind={index}
          progress={progress}
        />
      ))}
      </InteractiveRegion>

      <Interconnect progress={progress} active={activeComponent === "interconnect"} onHover={onHover} onSelect={onSelect} />
      <FiberPaths />
      <mesh position={[0, -2.45, -0.25]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8.3, 4.2]} />
        <meshBasicMaterial color="#071431" transparent opacity={0.32} />
      </mesh>
    </group>
  );
}

function InspectionPart({
  id,
  title,
  index,
  total,
  onSelect,
  interactive,
}: {
  id: string;
  title: string;
  index: number;
  total: number;
  onSelect: (id: string) => void;
  interactive: boolean;
}) {
  const part = useRef<THREE.Group>(null);
  const columns = total > 4 ? 3 : total === 1 ? 1 : 2;
  const rows = Math.ceil(total / columns);
  const column = total === 1 ? 0 : index % columns;
  const row = total === 1 ? 0 : Math.floor(index / columns);
  const x = total === 1 ? 0 : total > 4 ? -1.9 + column * 1.9 : (column === 0 ? -1.72 : 1.72);
  const y = total === 1 ? 0 : total > 4 ? 1.15 - row * 1.25 : (rows === 1 ? 0 : .92 - row * 1.85);
  const sizeScale = total > 4 ? .78 : 1;
  const color = id.includes("gpu") || id.includes("accelerator") ? "#3f6fd2" : id.includes("drive") || id.includes("storage") || id.includes("metadata") ? "#4a8c9e" : id.includes("switch") || id.includes("fabric") || id.includes("nic") || id.includes("port") ? "#625fd2" : "#4165a8";

  useFrame((state, delta) => {
    if (!part.current) return;
    const target = sizeScale;
    part.current.scale.setScalar(THREE.MathUtils.damp(part.current.scale.x, target, 5, delta));
    part.current.position.y = THREE.MathUtils.damp(part.current.position.y, y, 5, delta);
    part.current.rotation.y = THREE.MathUtils.damp(part.current.rotation.y, Math.sin(performance.now() / 1800 + index) * .055, 2.2, delta);
  });

  return (
    <group ref={part} position={[x, y - 1.4, 0]} scale={0.01}>
      <group
        onPointerOver={(event) => { if (!interactive) return; event.stopPropagation(); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { document.body.style.cursor = "auto"; }}
        onClick={(event) => { if (!interactive) return; event.stopPropagation(); onSelect(id); }}
      >
        <Box position={[0, -.55, -.04]} size={id === "r760" ? [3.02, .12, 4.28] : [2.05, .12, 1.05]} color="#0a142b" edge="#344b79" />
        <HardwareModel id={id} accent={color} />
        <Html position={[0, -.87, .16]} center distanceFactor={9}>
          {interactive ? <button className={`cluster-part-label${total > 4 ? " cluster-part-label--compact" : ""}`} onClick={(event) => { event.stopPropagation(); onSelect(id); }} title={`Inspect ${title}`}>{title}<span>Open component ↗</span></button> : <div className="cluster-part-label cluster-part-label--static">{title}<span>Component detail</span></div>}
        </Html>
      </group>
    </group>
  );
}

function HardwareModel({ id, accent }: { id: string; accent: string }) {
  const screwPositions: [number, number][] = [[-.82, -.22], [.82, -.22], [-.82, .43], [.82, .43]];
  if (id === "r760") return <R760ServerModel />;
  // These are representative HPC parts because QHPC's public hardware guide
  // does not identify its switch, storage appliance, or service-node SKUs.
  if (id === "switch-asic") return <EthernetSwitchModel />;
  if (id === "ports") return <SwitchPortBankModel />;
  if (id === "fabric") return <FabricTopologyModel />;
  if (id === "storage-servers") return <StorageServerModel />;
  if (id === "metadata" || id === "filesystem") return <StorageControllerModel />;
  if (["login", "scheduler", "management", "data-transfer"].includes(id)) return <ServiceServerModel id={id} />;
  if (id === "node-nic") return <ServerNicModel />;
  if (id === "cpu-1" || id === "cpu-2") return <CpuModuleModel />;
  if (id === "cpu-1" || id === "cpu-2" || id === "cores" || id === "cores-2" || id.includes("cache") || id.includes("memory-controller")) return <CpuSiliconModel id={id} />;
  if (id === "memory") return <R760MemoryModel />;
  if (id === "gpu-1" || id === "gpu-2") return <L4CardModel />;
  if (id.includes("gpu") && id.includes("memory")) return <L4MemoryModel />;
  if (id.includes("gpu") && id.includes("link")) return <PcieLinkModel />;
  if (id.includes("gpu") && id.includes("compute")) return <GpuDieModel />;
  if (id === "cooling") return <R760CoolingModel />;
  if (id === "riser") return <R760RiserModel />;
  if (id === "cpu") return <group>
    <Box position={[0, -.02, 0]} size={[1.25, .12, 1.05]} color="#b7c2d0" edge="#f2f6ff" metalness={.8} roughness={.25} />
    <Box position={[0, .12, .03]} size={[.68, .3, .67]} color="#78889d" edge="#e4ebf5" metalness={.72} roughness={.24} />
    <Box position={[0, .29, .03]} size={[.53, .035, .52]} color="#18233b" edge="#8fa9d8" metalness={.58} />
    {Array.from({ length: 36 }, (_, i) => <Box key={i} position={[-.53 + (i % 9) * .132, -.105, -.39 + Math.floor(i / 9) * .25]} size={[.035, .025, .035]} color="#d7ad62" edge="" metalness={.8} roughness={.25} />)}
    {screwPositions.map(([x, z]) => <mesh key={`${x}-${z}`} position={[x, .047, z]}><cylinderGeometry args={[.035, .035, .018, 12]} /><meshStandardMaterial color="#d5deea" metalness={.85} /></mesh>)}
  </group>;

  if (id === "cores" || id === "cache") return <group>
    <Box position={[0, -.03, 0]} size={[1.82, .08, 1.12]} color="#17334b" edge="#4d8793" />
    {(id === "cores" ? Array.from({ length: 16 }, (_, i) => i) : Array.from({ length: 8 }, (_, i) => i)).map((i) => {
      const count = id === "cores" ? 4 : 4;
      const x = -.67 + (i % count) * .45;
      const z = -.25 + Math.floor(i / count) * .34;
      return <group key={i} position={[x, .09, z]}>
        <Box position={[0, 0, 0]} size={[.31, .18, .23]} color={id === "cores" ? "#426d9a" : "#34465c"} edge={id === "cores" ? "#a4d3ff" : "#9db3cf"} />
        <Box position={[0, .105, 0]} size={[.23, .035, .16]} color={id === "cores" ? "#91d9ef" : "#9f82d2"} edge="#e5edff" metalness={.35} />
      </group>;
    })}
  </group>;

  if (id === "memory" || id === "ram") return <group>
    <Box position={[0, -.05, 0]} size={[2.05, .09, .16]} color="#16765f" edge="#8de3c5" metalness={.35} />
    {[-.78, -.52, -.26, 0, .26, .52, .78].map((x) => <group key={x} position={[x, .14, 0]}>
      <Box position={[0, 0, 0]} size={[.2, .42, .09]} color="#131d2c" edge="#62748c" />
      <Box position={[0, .018, .05]} size={[.12, .29, .012]} color="#1e2b3c" edge="#485b70" metalness={.4} />
    </group>)}
    {Array.from({ length: 20 }, (_, i) => <Box key={i} position={[-.9 + i * .095, -.115, .085]} size={[.045, .025, .025]} color="#dbbd70" edge="" metalness={.85} roughness={.22} />)}
  </group>;

  if (id.includes("gpu") || id.includes("accelerator")) return <group>
    <Box position={[0, -.06, 0]} size={[2.18, .1, .82]} color="#15553f" edge="#7ac6a6" metalness={.35} />
    <Box position={[0, -.005, .46]} size={[1.85, .09, .1]} color="#c2a65e" edge="#f2d995" metalness={.78} />
    <Box position={[-.08, .12, -.02]} size={[.69, .35, .56]} color="#262e3b" edge="#aebed0" metalness={.7} />
    <Box position={[-.08, .32, -.02]} size={[.45, .035, .38]} color="#27334c" edge="#b5c9ed" metalness={.58} />
    {Array.from({ length: 11 }, (_, i) => <Box key={i} position={[-.88 + i * .16, .37, -.015]} size={[.045, .18, .52]} color="#566475" edge="#a2b1c1" metalness={.78} roughness={.28} />)}
    {[-.57, .4].map((x) => <group key={x} position={[x, .13, -.37]}>
      <Box position={[0, 0, 0]} size={[.28, .17, .16]} color="#202b3a" edge="#91a5be" />
      <Box position={[0, .095, 0]} size={[.19, .025, .11]} color="#3c4b5d" edge="#b4c4d7" />
    </group>)}
  </group>;

  if (id.includes("nic")) return <group>
    <Box position={[0, -.05, -.04]} size={[1.32, .1, 1]} color="#135b43" edge="#73c4a0" metalness={.35} />
    <Box position={[-.12, .12, -.04]} size={[.48, .3, .4]} color="#292f3c" edge="#afbbca" metalness={.65} />
    <Box position={[-.12, .29, -.04]} size={[.32, .025, .25]} color="#1e293a" edge="#b1c5e0" metalness={.55} />
    <Box position={[.58, .05, -.04]} size={[.13, .52, .94]} color="#b2bbc5" edge="#f0f4f8" metalness={.8} roughness={.25} />
    {[-.25, .23].map((z) => <group key={z} position={[.34, .14, z]}>
      <Box position={[0, 0, 0]} size={[.32, .24, .25]} color="#232c38" edge="#adb9c7" metalness={.7} />
      <Box position={[.02, 0, .133]} size={[.2, .13, .018]} color="#0b1422" edge="#586b80" />
      <mesh position={[.02, -.08, .146]}><sphereGeometry args={[.022, 8, 8]} /><meshStandardMaterial color="#5dd2a7" emissive="#28a87a" emissiveIntensity={1.1} /></mesh>
    </group>)}
    {Array.from({ length: 12 }, (_, i) => <Box key={i} position={[-.72 + i * .12, -.115, .48]} size={[.055, .025, .035]} color="#d6b45f" edge="" metalness={.85} />)}
  </group>;

  if (id.includes("switch") || id === "ports") return <group>
    <Box position={[0, -.02, 0]} size={[2.15, .48, .92]} color="#252d3b" edge="#9aacc1" metalness={.76} roughness={.3} />
    <Box position={[0, .015, .475]} size={[2.03, .31, .035]} color="#101a2b" edge="#647791" />
    {Array.from({ length: id === "ports" ? 6 : 12 }, (_, i) => {
      const count = id === "ports" ? 3 : 6;
      const x = -.82 + (i % count) * (id === "ports" ? .55 : .31);
      const y = id === "ports" ? .09 - Math.floor(i / count) * .19 : .02;
      return <group key={i} position={[x, y, .51]}>
        <Box position={[0, 0, 0]} size={[id === "ports" ? .42 : .23, id === "ports" ? .2 : .16, .07]} color="#070d17" edge="#c0a56b" metalness={.7} />
        <Box position={[0, 0, .041]} size={[id === "ports" ? .31 : .15, .105, .015]} color="#111c2d" edge="#485b72" />
        {id !== "ports" && <mesh position={[.08, -.1, .052]}><sphereGeometry args={[.014, 8, 8]} /><meshStandardMaterial color={i % 3 ? "#46d4a7" : "#f0bd64"} emissive={i % 3 ? "#25a77e" : "#c9872e"} emissiveIntensity={.7} /></mesh>}
      </group>;
    })}
    {[-.69, .69].map((x) => <mesh key={x} position={[x, -.18, .49]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[.12, .12, .06, 20]} /><meshStandardMaterial color="#45546a" metalness={.78} /></mesh>)}
    <Box position={[0, -.24, .12]} size={[.65, .08, .24]} color="#303a48" edge="#78889c" metalness={.7} />
  </group>;

  if (id.includes("drive")) return <group>
    <Box position={[0, -.02, 0]} size={[1.48, .12, .98]} color="#aeb8c4" edge="#edf2f7" metalness={.78} roughness={.28} />
    <Box position={[0, .09, -.02]} size={[1.32, .045, .82]} color="#c5ced7" edge="#f5f7f9" metalness={.72} roughness={.3} />
    <mesh position={[-.12, .12, -.04]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[.32, .32, .025, 40]} /><meshStandardMaterial color="#738196" metalness={.82} roughness={.2} /></mesh>
    <mesh position={[-.12, .137, -.04]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[.08, .08, .032, 24]} /><meshStandardMaterial color="#d8e0e8" metalness={.78} /></mesh>
    <Box position={[.43, .16, .11]} size={[.22, .035, .2]} color="#4b5565" edge="#8795a8" />
    <Box position={[.39, .12, -.26]} size={[.36, .025, .12]} color="#7e8895" edge="#aab3bf" metalness={.7} />
    {screwPositions.map(([x, z]) => <mesh key={`${x}-${z}`} position={[x * .64, .16, z * .55]}><cylinderGeometry args={[.025, .025, .012, 10]} /><meshStandardMaterial color="#606b78" metalness={.82} /></mesh>)}
  </group>;

  if (id.includes("storage") || id.includes("metadata") || id.includes("filesystem") || id.includes("management") || id.includes("login") || id.includes("scheduler") || id.includes("data-transfer")) return <group>
    <Box position={[0, -.02, 0]} size={[2.05, .48, .94]} color="#242d3b" edge="#a2b1c1" metalness={.7} roughness={.32} />
    <Box position={[0, .015, .49]} size={[1.94, .3, .035]} color="#101725" edge="#687a91" />
    {Array.from({ length: 6 }, (_, i) => <group key={i} position={[-.72 + i * .29, .02, .52]}>
      <Box position={[0, 0, 0]} size={[.23, .18, .055]} color="#101924" edge="#65778e" />
      <mesh position={[0, -.105, .03]}><sphereGeometry args={[.018, 8, 8]} /><meshStandardMaterial color={i === 0 ? "#54d4ad" : "#52637a"} emissive={i === 0 ? "#24a981" : "#000000"} emissiveIntensity={.8} /></mesh>
    </group>)}
    {[-.67, -.22, .22, .67].map((x) => <Box key={x} position={[x, -.06, -.2]} size={[.3, .12, .26]} color="#354253" edge="#7c8da1" />)}
    <Box position={[-.98, .02, 0]} size={[.035, .32, .8]} color="#c5ccd4" edge="#f3f6f9" metalness={.8} />
  </group>;

  if (id === "fabric") return <group>
    {[-.72, 0, .72].map((x, i) => <group key={i} position={[x, .02, i === 1 ? .28 : -.22]}>
      <Box position={[0, 0, 0]} size={[.46, .28, .38]} color="#27344a" edge="#9daecc" />
      <Box position={[0, .17, 0]} size={[.22, .05, .18]} color="#526fd1" edge="#dce8ff" />
    </group>)}
    {[-.58, .58].map((x) => <mesh key={x} position={[x, .04, .02]}><sphereGeometry args={[.045, 10, 10]} /><meshStandardMaterial color={ICE} emissive={BLUE} emissiveIntensity={1.5} /></mesh>)}
  </group>;

  return <group>
    <Box position={[0, -.02, 0]} size={[1.65, .1, .88]} color="#155b43" edge="#77c9a2" />
    <Box position={[0, .11, 0]} size={[.48, .3, .42]} color="#222c3b" edge="#9cacbf" metalness={.65} />
    {Array.from({ length: 8 }, (_, i) => <Box key={i} position={[-.68 + i * .19, -.08, .42]} size={[.08, .03, .035]} color="#d5b868" edge="" metalness={.86} />)}
    <mesh position={[.68, .14, .18]}><sphereGeometry args={[.055, 10, 10]} /><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.1} /></mesh>
  </group>;
}

function R760ServerModel() {
  return <group>
    {/* Dell's 2U chassis shown open so the installed compute hardware is visible. */}
    <Box position={[0, -.29, 0]} size={[2.72, .16, 4.1]} color="#4b5665" edge="#c2ccd6" metalness={.82} roughness={.3} />
    {[-1.31, 1.31].map((x) => <Box key={x} position={[x, .02, 0]} size={[.1, .58, 4.02]} color="#8793a0" edge="#d5dde5" metalness={.8} roughness={.32} />)}
    <Box position={[0, .27, -1.95]} size={[2.55, .08, .08]} color="#647180" edge="#c0cbd8" metalness={.72} />
    <Box position={[0, -.18, 0]} size={[2.48, .1, 3.88]} color="#164c3c" edge="#50a386" metalness={.35} />
    {/* Dual-socket system board: two CPU/heat-sink modules, memory sockets and risers. */}
    {[-.52, .52].map((x) => <group key={x} position={[x, -.02, -.52]}>
      <Box position={[0, 0, 0]} size={[.74, .08, .65]} color="#1b2635" edge="#c3ceda" metalness={.55} />
      <Box position={[0, .08, 0]} size={[.68, .08, .58]} color="#737f8d" edge="#d9e1e9" metalness={.8} roughness={.28} />
      {Array.from({ length: 9 }, (_, fin) => <Box key={fin} position={[-.26 + fin * .065, .22, 0]} size={[.028, .2, .48]} color="#a7b2be" edge="#d9e1e9" metalness={.76} roughness={.3} />)}
    </group>)}
    {[-1, 1].map((side) => Array.from({ length: 16 }, (_, i) => {
      const row = Math.floor(i / 8);
      const col = i % 8;
      const x = side * (.96 + row * .12);
      const z = -.72 + col * .19;
      return <group key={`${side}-${i}`} position={[x, -.055, z]}>
        <Box position={[0, 0, 0]} size={[.05, .06, .082]} color="#101a24" edge="#b6c2cf" metalness={.4} />
        <Box position={[0, .038, 0]} size={[.018, .014, .05]} color="#d5b867" edge="" metalness={.8} />
      </group>;
    }))}
    {/* The two documented L4 cards occupy the rear expansion area. */}
    {[-.9, .9].map((x) => <group key={x} position={[x, .04, -1.48]} rotation={[0, 0, -.08]}>
      <Box position={[0, .06, 0]} size={[.44, .12, .66]} color="#18543e" edge="#70c7a4" />
      <Box position={[0, .17, -.03]} size={[.4, .16, .58]} color="#262e3a" edge="#929eac" metalness={.74} roughness={.34} />
      <Box position={[0, .265, -.03]} size={[.36, .035, .55]} color="#38434f" edge="#aab6c3" metalness={.78} roughness={.31} />
      {Array.from({ length: 13 }, (_, fin) => <Box key={fin} position={[0, .3, -.28 + fin * .042]} size={[.34, .09, .014]} color="#a4afb9" edge="#d1d9e1" metalness={.82} roughness={.28} />)}
      <Box position={[0, .11, .38]} size={[.04, .13, .16]} color="#d4b760" edge="#f1d98f" metalness={.82} />
    </group>)}
    {/* Front drive bay/backplane area. The QHPC guide does not specify its drive option. */}
    <Box position={[0, .01, 1.95]} size={[2.48, .36, .12]} color="#222d3b" edge="#adb9c7" metalness={.7} />
    <Box position={[0, .01, 2.03]} size={[2.28, .28, .035]} color="#101a26" edge="#8896a6" metalness={.62} />
    {Array.from({ length: 16 }, (_, i) => <Box key={i} position={[-1.02 + i * .136, .01, 2.055]} size={[.04, .16, .012]} color="#344253" edge="#65758a" />)}
    {/* Twin hot-swap power supplies at the rear. */}
    {[-.68, .68].map((x) => <group key={x} position={[x, -.01, -2.02]}>
      <Box position={[0, 0, 0]} size={[.66, .4, .14]} color="#252f3b" edge="#c0cbd7" metalness={.75} />
      <Box position={[0, 0, -.078]} size={[.49, .23, .018]} color="#111b28" edge="#718197" />
      <mesh position={[0, 0, -.095]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[.075, .075, .02, 20]} /><meshStandardMaterial color="#718094" metalness={.75} /></mesh>
    </group>)}
    {/* Six hot-swap fan modules span the airflow path as one fan wall. */}
    {Array.from({ length: 6 }, (_, i) => <R760Fan key={i} position={[-1.05 + i * .42, .05, 1.27]} />)}
    {/* Air-shroud guides route front-to-back airflow across CPUs and DIMMs. */}
    {[-1.14, 1.14].map((x) => <Box key={x} position={[x, .17, -.5]} size={[.07, .3, 1.9]} color="#263951" edge="#81a5c6" metalness={.35} />)}
    {/* PCIe riser boards at the rear. */}
    {[-1.05, 1.05].map((x) => <group key={x} position={[x, .08, -1.7]} rotation={[.18, 0, -.18]}>
      <Box position={[0, .24, 0]} size={[.12, .55, .65]} color="#146247" edge="#6bc4a0" />
      <Box position={[0, .24, .1]} size={[.045, .37, .44]} color="#243243" edge="#9aacc1" />
    </group>)}
    <Box position={[0, -.18, -1.94]} size={[.45, .08, .16]} color="#153e35" edge="#56a989" />
  </group>;
}

function R760Fan({ position }: { position: [number, number, number] }) {
  const rotor = useRef<THREE.Group>(null);
  useFrame((_, delta) => { if (rotor.current) rotor.current.rotation.z += delta * 4.8; });
  return <group position={position}>
    <Box position={[0, 0, 0]} size={[.39, .45, .42]} color="#1c232b" edge="#66717e" metalness={.48} roughness={.5} />
    <mesh position={[0, 0, .22]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[.17, .17, .035, 28]} /><meshStandardMaterial color="#0c1118" metalness={.42} /></mesh>
    <group ref={rotor} position={[0, 0, .245]}>
      {Array.from({ length: 7 }, (_, i) => <mesh key={i} position={[0, .082, 0]} rotation={[0, 0, i * Math.PI * 2 / 7]}><boxGeometry args={[.045, .135, .018]} /><meshStandardMaterial color="#73808e" metalness={.62} roughness={.37} /></mesh>)}
      <mesh><sphereGeometry args={[.032, 12, 12]} /><meshStandardMaterial color="#aeb8c4" metalness={.78} /></mesh>
    </group>
    {/* Dell-style orange pull tab is a useful real-world fan-module cue. */}
    <Box position={[0, .245, -.05]} size={[.12, .045, .16]} color="#d17a31" edge="#e7a15f" metalness={.28} />
  </group>;
}

function CpuModuleModel() {
  return <group>
    {/* Intel Xeon SP LGA4677 package under Dell's server heatsink module. */}
    <Box position={[0, -.16, 0]} size={[1.18, .14, .86]} color="#293544" edge="#8f9eae" metalness={.72} />
    <Box position={[0, -.06, 0]} size={[.92, .06, .66]} color="#b4bec9" edge="#e5ebf1" metalness={.82} roughness={.25} />
    <Box position={[0, .06, 0]} size={[.72, .22, .56]} color="#747f8c" edge="#e1e7ed" metalness={.76} roughness={.26} />
    {Array.from({ length: 13 }, (_, i) => <Box key={i} position={[-.29 + i * .048, .21, 0]} size={[.022, .25, .49]} color="#aeb9c5" edge="#dce4ec" metalness={.78} roughness={.3} />)}
    {[-.47, .47].map((x) => <Box key={x} position={[x, -.25, 0]} size={[.07, .035, .42]} color="#c7a65d" edge="#f0d98c" metalness={.82} />)}
    {[-.43, .43].flatMap((x) => [-.29, .29].map((z) => <mesh key={`${x}-${z}`} position={[x, .15, z]}><cylinderGeometry args={[.035, .035, .025, 12]} /><meshStandardMaterial color="#c5ced8" metalness={.84} /></mesh>))}
  </group>;
}

function CpuSiliconModel({ id }: { id: string }) {
  const isCoreView = id.startsWith("cores");
  const isCache = id.includes("cache");
  const count = isCoreView ? 32 : isCache ? 8 : 8;
  return <group>
    <Box position={[0, -.05, 0]} size={[1.85, .1, 1.08]} color="#173b35" edge="#73bca5" />
    {Array.from({ length: count }, (_, i) => {
      const cols = isCoreView ? 8 : 4;
      const x = -.78 + (i % cols) * (isCoreView ? .22 : .44);
      const z = -.3 + Math.floor(i / cols) * (isCoreView ? .2 : .32);
      return <group key={i} position={[x, .08, z]}>
        <Box position={[0, 0, 0]} size={[isCoreView ? .16 : .34, .14, isCoreView ? .13 : .22]} color={isCache ? "#49517c" : "#314f70"} edge={isCache ? "#bba8ee" : "#a4d3ff"} />
        <Box position={[0, .085, 0]} size={[isCoreView ? .1 : .26, .025, isCoreView ? .08 : .16]} color={isCache ? "#947dd2" : "#81bdd4"} edge="#e5edff" metalness={.35} />
      </group>;
    })}
    <Box position={[0, -.17, 0]} size={[1.92, .035, 1.15]} color="#c0a363" edge="#ead59b" metalness={.78} />
  </group>;
}

function R760MemoryModel() {
  return <group>
    <Box position={[0, -.12, 0]} size={[2.15, .1, .28]} color="#174c3b" edge="#74c5a3" />
    {[-1, 1].map((side) => Array.from({ length: 16 }, (_, i) => {
      const row = Math.floor(i / 8);
      const col = i % 8;
      return <group key={`${side}-${i}`} position={[side * (.95 + row * .14), .05, -.7 + col * .2]}>
        <Box position={[0, 0, 0]} size={[.07, .035, .12]} color="#111a26" edge="#8595a8" />
        <Box position={[0, .035, 0]} size={[.028, .012, .075]} color="#d5b867" edge="" metalness={.82} />
      </group>;
    }))}
    {/* One removable RDIMM is shown; the installed module count is not documented. */}
    <Box position={[0, .28, 0]} size={[1.7, .07, .13]} color="#17644a" edge="#8ad4b0" />
    <group position={[0, .5, 0]}>
      <Box position={[0, 0, 0]} size={[1.26, .34, .08]} color="#17212d" edge="#8c9baa" />
      {Array.from({ length: 10 }, (_, i) => <Box key={i} position={[-.52 + i * .116, .015, .046]} size={[.075, .22, .014]} color="#29394b" edge="#72859c" />)}
      <Box position={[0, -.166, 0]} size={[1.12, .018, .096]} color="#d5b867" edge="" metalness={.82} />
    </group>
  </group>;
}

function L4CardModel() {
  return <group>
    {/* Close silhouette of the short, single-slot, passively cooled NVIDIA L4. */}
    <Box position={[0, -.12, 0]} size={[2.04, .075, .72]} color="#176047" edge="#70b89c" metalness={.42} roughness={.45} />
    <Box position={[0, -.075, .395]} size={[1.68, .035, .075]} color="#c4a85c" edge="#eddb9b" metalness={.84} />
    {/* Low-profile silver fin stack / passive vapor chamber. */}
    <Box position={[-.04, .09, -.015]} size={[1.62, .29, .59]} color="#68727c" edge="#bec7d0" metalness={.8} roughness={.28} />
    <Box position={[-.04, .245, -.015]} size={[1.48, .025, .51]} color="#343d47" edge="#8995a1" metalness={.72} />
    {Array.from({ length: 24 }, (_, i) => <Box key={i} position={[-.73 + i * .06, .275, -.015]} size={[.018, .085, .53]} color={i % 2 ? "#aeb7bf" : "#969fa8"} edge="#cdd4dc" metalness={.82} roughness={.27} />)}
    {/* Memory packages and GPU package sit beneath the passive heatsink. */}
    <Box position={[-.04, -.012, -.015]} size={[.48, .105, .4]} color="#18212c" edge="#8794a1" metalness={.54} />
    {[-.69, -.44, .36, .61].map((x) => <Box key={x} position={[x, -.012, -.02]} size={[.2, .075, .28]} color="#171f29" edge="#596777" metalness={.4} />)}
    {/* Low-profile I/O bracket and mounting ears. */}
    <Box position={[1.025, .035, 0]} size={[.07, .38, .68]} color="#aeb7c0" edge="#e3e8ed" metalness={.84} roughness={.26} />
    <Box position={[1.07, -.02, .23]} size={[.018, .15, .24]} color="#111923" edge="#637386" />
    <Box position={[1.07, .17, -.25]} size={[.045, .055, .16]} color="#d5b667" edge="#f0da8f" metalness={.82} />
    {[-.96, .91].map((x) => <Box key={x} position={[x, -.05, -.34]} size={[.12, .035, .08]} color="#aab4bf" edge="#e4e9ef" metalness={.82} />)}
  </group>;
}

function L4MemoryModel() {
  return <group>
    <Box position={[0, -.08, 0]} size={[2.1, .1, .85]} color="#16583f" edge="#7bc7a7" />
    <Box position={[0, .12, 0]} size={[.62, .22, .55]} color="#313b49" edge="#c0ccda" metalness={.68} />
    <Box position={[0, .25, 0]} size={[.46, .025, .4]} color="#68788b" edge="#d5dfeb" metalness={.62} />
    {[-.72, -.43, .43, .72].map((x) => <group key={x} position={[x, .1, 0]}>
      <Box position={[0, 0, 0]} size={[.22, .15, .34]} color="#171f2c" edge="#8393a6" />
      <Box position={[0, .08, 0]} size={[.16, .025, .24]} color="#273a4b" edge="#91a8bc" />
    </group>)}
  </group>;
}

function PcieLinkModel() {
  return <group>
    <Box position={[0, -.08, 0]} size={[2.12, .12, .86]} color="#16583f" edge="#7bc7a7" />
    <Box position={[0, .12, 0]} size={[.8, .24, .6]} color="#263545" edge="#94a7bc" />
    <Box position={[0, .3, 0]} size={[.5, .035, .38]} color="#67798d" edge="#cad5e0" metalness={.6} />
    <Box position={[0, -.17, .47]} size={[1.92, .045, .12]} color="#c2a65e" edge="#f0d98f" metalness={.85} />
    {Array.from({ length: 32 }, (_, i) => <Box key={i} position={[-.91 + i * .059, -.18, .54]} size={[.028, .025, .025]} color="#e6cb7b" edge="" metalness={.88} />)}
    <mesh position={[0, .13, -.4]}><sphereGeometry args={[.11, 16, 16]} /><meshStandardMaterial color="#62d3f4" emissive="#238bb0" emissiveIntensity={.8} /></mesh>
    <mesh position={[0, .13, -.11]}><sphereGeometry args={[.11, 16, 16]} /><meshStandardMaterial color="#62d3f4" emissive="#238bb0" emissiveIntensity={.8} /></mesh>
    <mesh position={[0, .13, .18]}><sphereGeometry args={[.11, 16, 16]} /><meshStandardMaterial color="#62d3f4" emissive="#238bb0" emissiveIntensity={.8} /></mesh>
    <mesh position={[0, .13, .42]}><sphereGeometry args={[.11, 16, 16]} /><meshStandardMaterial color="#62d3f4" emissive="#238bb0" emissiveIntensity={.8} /></mesh>
    <mesh position={[0, .13, 0]}><sphereGeometry args={[.06, 12, 12]} /><meshStandardMaterial color="#ecf7ff" emissive="#4ea8ff" emissiveIntensity={1.5} /></mesh>
  </group>;
}

function GpuDieModel() {
  return <group>
    <Box position={[0, -.08, 0]} size={[1.86, .11, 1.02]} color="#16583f" edge="#7bc7a7" />
    <Box position={[0, .05, 0]} size={[.9, .24, .65]} color="#333b48" edge="#bec9d6" metalness={.72} />
    <Box position={[0, .2, 0]} size={[.67, .035, .48]} color="#273a4b" edge="#9bc9e5" metalness={.52} />
    {[-.22, 0, .22].flatMap((x) => [-.15, .15].map((z) => <Box key={`${x}-${z}`} position={[x, .23, z]} size={[.15, .012, .09]} color="#9ac9df" edge="#e3f4ff" />))}
  </group>;
}

function R760CoolingModel() {
  return <group>
    <Box position={[0, -.23, 0]} size={[2.55, .1, .72]} color="#242e3b" edge="#a3b2c2" metalness={.72} />
    {Array.from({ length: 6 }, (_, i) => <R760Fan key={i} position={[-1.05 + i * .42, .05, 0]} />)}
    {[-1.25, 1.25].map((x) => <Box key={x} position={[x, .29, 0]} size={[.08, .52, .68]} color="#283c55" edge="#8caccc" metalness={.35} />)}
    <Box position={[0, .53, 0]} size={[2.35, .06, .66]} color="#31485e" edge="#a8c4d7" metalness={.38} />
  </group>;
}

function R760RiserModel() {
  return <group>
    <Box position={[0, -.12, 0]} size={[2.05, .1, .48]} color="#174d3a" edge="#72c5a1" />
    {[-.75, 0, .75].map((x, i) => <group key={x} position={[x, .16, 0]} rotation={[0, 0, -.12]}>
      <Box position={[0, .22, 0]} size={[.1, .62, .62]} color="#176348" edge="#80cbaa" />
      <Box position={[0, .22, .08]} size={[.035, .45, .4]} color="#263544" edge="#93a8bf" />
      <Box position={[0, -.11, .25]} size={[.14, .06, .22]} color="#c6a960" edge="#f0d991" metalness={.8} />
      <Box position={[0, .58, -.12]} size={[.36, .04, .12]} color={i === 1 ? "#4d678e" : "#32445d"} edge="#bac9db" />
    </group>)}
  </group>;
}

function EthernetSwitchModel() {
  return <group>
    {/* Representative 1U Ethernet switch: exact QHPC switch make/model is unconfirmed. */}
    <Box position={[0, -.14, 0]} size={[2.35, .12, 1.18]} color="#252d38" edge="#aab7c7" metalness={.72} />
    <Box position={[0, .02, 0]} size={[2.28, .2, 1.08]} color="#303b49" edge="#bdc8d5" metalness={.62} />
    <Box position={[0, .14, .51]} size={[2.18, .035, .045]} color="#121a26" edge="#65758b" />
    {/* Front-panel optical cages in a realistic twin-row arrangement. */}
    {Array.from({ length: 16 }, (_, i) => {
      const x = -.98 + (i % 8) * .28;
      const y = .03 + (i < 8 ? .055 : -.055);
      return <group key={i} position={[x, y, .56]}>
        <Box position={[0, 0, 0]} size={[.21, .085, .07]} color="#090e15" edge="#a68b58" metalness={.7} />
        <Box position={[0, 0, .039]} size={[.16, .052, .012]} color="#111a27" edge="#526982" />
        <mesh position={[.075, -.052, .05]}><sphereGeometry args={[.012, 8, 8]} /><meshStandardMaterial color={i % 4 ? "#42cf9f" : "#edbd65"} emissive={i % 4 ? "#168c65" : "#9e6d24"} emissiveIntensity={.7} /></mesh>
      </group>;
    })}
    {/* Internal switching ASIC, heatsink, VRM and airflow fans. */}
    <Box position={[0, .2, -.05]} size={[.66, .1, .48]} color="#111923" edge="#a3b5ca" metalness={.38} />
    <Box position={[0, .29, -.05]} size={[.48, .09, .34]} color="#778597" edge="#d1dae4" metalness={.8} />
    {Array.from({ length: 9 }, (_, i) => <Box key={i} position={[-.19 + i * .048, .36, -.05]} size={[.018, .12, .28]} color="#aebbc8" edge="#e0e8f0" metalness={.78} />)}
    {[-.78, .78].map((x) => <group key={x} position={[x, .16, -.27]}>
      <mesh><cylinderGeometry args={[.16, .16, .11, 24]} /><meshStandardMaterial color="#151d28" metalness={.55} /></mesh>
      {Array.from({ length: 7 }, (_, i) => <Box key={i} position={[0, .065, 0]} size={[.018, .025, .25]} color="#9ba9b8" edge="" metalness={.6} />).map((blade, i) => <group key={i} rotation={[0, i * Math.PI / 3.5, 0]}>{blade}</group>)}
    </group>)}
    <Box position={[0, -.045, -.46]} size={[1.9, .08, .14]} color="#175640" edge="#77c8a3" />
    {[-.78, -.42, .42, .78].map((x) => <Box key={x} position={[x, .015, -.44]} size={[.18, .12, .16]} color="#354253" edge="#8797a9" />)}
  </group>;
}

function SwitchPortBankModel() {
  return <group>
    <Box position={[0, -.18, 0]} size={[2.26, .12, .82]} color="#303b49" edge="#b8c4d1" metalness={.66} />
    {Array.from({ length: 8 }, (_, i) => <group key={i} position={[-.84 + i * .24, .02, .08]}>
      <Box position={[0, 0, 0]} size={[.19, .33, .32]} color="#111923" edge="#c4a86b" metalness={.72} />
      <Box position={[0, .005, .17]} size={[.13, .22, .025]} color="#07111d" edge="#52677d" />
      <Box position={[0, -.105, .19]} size={[.095, .035, .015]} color="#182636" edge="#73869b" />
      <mesh position={[.065, -.13, .195]}><sphereGeometry args={[.012, 8, 8]} /><meshStandardMaterial color="#48d2a1" emissive="#168e67" emissiveIntensity={.8} /></mesh>
    </group>)}
    <Box position={[0, -.02, -.35]} size={[1.8, .28, .08]} color="#18563f" edge="#79c7a5" />
    {Array.from({ length: 8 }, (_, i) => <Box key={i} position={[-.76 + i * .218, -.02, -.29]} size={[.09, .16, .03]} color="#212d3d" edge="#8b9caf" />)}
  </group>;
}

function FabricTopologyModel() {
  const links = [[-1, .46, -.12], [-.5, -.36, .1], [.5, -.36, .1], [1, .46, -.12]] as const;
  return <group>
    {links.map(([x, y, z], i) => <group key={i} position={[x, y, z]}>
      <Box position={[0, 0, 0]} size={[.4, .3, .42]} color="#253243" edge="#a3b4ca" />
      <Box position={[0, .18, 0]} size={[.23, .06, .24]} color="#526fd1" edge="#dce8ff" />
      {[-.1, .1].map((port) => <Box key={port} position={[port, -.03, .225]} size={[.075, .085, .03]} color="#090f18" edge="#a58d5d" />)}
    </group>)}
    {[[0, .27, -.08], [-.35, 0, -.02], [.35, 0, -.02], [0, -.27, .14], [-.68, .06, -.1], [.68, .06, -.1]].map(([x, y, z], i) => {
      const start = new THREE.Vector3(x, y, z);
      const next = [[-.82, .39, -.12], [-.38, -.2, .1], [.42, -.2, .1], [.82, .39, -.12], [-.82, .06, -.1], [.82, .06, -.1]][i] as [number, number, number];
      const curve = new THREE.QuadraticBezierCurve3(start, new THREE.Vector3((x + next[0]) / 2, (y + next[1]) / 2 + .12, .42), new THREE.Vector3(...next));
      return <mesh key={i}><tubeGeometry args={[curve, 18, .018, 8, false]} /><meshStandardMaterial color={i % 2 ? "#42c4ce" : BLUE} emissive={i % 2 ? "#18858f" : BLUE} emissiveIntensity={.55} /></mesh>;
    })}
    <mesh position={[0, 0, .26]}><sphereGeometry args={[.16, 20, 16]} /><meshStandardMaterial color="#dce8ff" emissive="#5278e2" emissiveIntensity={.8} /></mesh>
  </group>;
}

function StorageServerModel() {
  return <group>
    {/* Representative 2U storage server; no QHPC storage vendor/model was found. */}
    <Box position={[0, -.19, 0]} size={[2.35, .13, 1.16]} color="#252e3a" edge="#b7c3d0" metalness={.72} />
    <Box position={[0, .015, -.02]} size={[2.28, .27, 1.06]} color="#364251" edge="#c3ced9" metalness={.55} />
    {Array.from({ length: 12 }, (_, i) => {
      const x = -.99 + (i % 6) * .397;
      const y = i < 6 ? .015 : -.105;
      return <group key={i} position={[x, y, .53]}>
        <Box position={[0, 0, 0]} size={[.34, .105, .08]} color="#151d28" edge="#8f9cad" metalness={.55} />
        <Box position={[0, 0, .045]} size={[.28, .068, .015]} color="#1b2735" edge="#586b82" />
        <Box position={[-.1, 0, .056]} size={[.012, .045, .008]} color="#8494a8" edge="" />
        <mesh position={[.12, -.027, .06]}><sphereGeometry args={[.01, 8, 8]} /><meshStandardMaterial color={i === 0 ? "#49d2a3" : "#46576d"} emissive={i === 0 ? "#168e67" : "#000000"} emissiveIntensity={.7} /></mesh>
      </group>;
    })}
    {Array.from({ length: 4 }, (_, i) => <R760Fan key={i} position={[-.68 + i * .45, .06, -.2]} />)}
    <Box position={[0, -.04, -.48]} size={[1.8, .08, .14]} color="#175640" edge="#78c8a4" />
    {[-.55, 0, .55].map((x) => <Box key={x} position={[x, .08, -.32]} size={[.4, .16, .26]} color="#303b49" edge="#8fa0b3" />)}
    {[-.92, .92].map((x) => <Box key={x} position={[x, .015, -.42]} size={[.27, .21, .16]} color="#1e2835" edge="#aab6c5" />)}
  </group>;
}

function StorageControllerModel() {
  return <group>
    <Box position={[0, -.15, 0]} size={[2.2, .12, 1.1]} color="#15543f" edge="#77c8a4" />
    <Box position={[0, -.01, -.06]} size={[.62, .16, .52]} color="#283543" edge="#a5b6c9" />
    <Box position={[0, .08, -.06]} size={[.4, .035, .32]} color="#52677d" edge="#d0deec" />
    {Array.from({ length: 4 }, (_, i) => <group key={i} position={[-.78 + i * .52, -.015, .12]}>
      <Box position={[0, 0, 0]} size={[.3, .12, .32]} color="#151f2c" edge="#8293a8" />
      <Box position={[0, .07, 0]} size={[.22, .025, .24]} color="#35485d" edge="#a5b6ca" />
      <Box position={[0, -.055, .18]} size={[.22, .025, .045]} color="#d0b36e" edge="" metalness={.8} />
    </group>)}
    {[-.88, .88].map((x) => <Box key={x} position={[x, -.04, -.4]} size={[.32, .16, .22]} color="#303d4d" edge="#9bacc0" />)}
    {Array.from({ length: 16 }, (_, i) => <Box key={i} position={[-.88 + i * .117, -.095, .44]} size={[.055, .025, .025]} color="#d2b66f" edge="" metalness={.8} />)}
  </group>;
}

function ServiceServerModel({ id }: { id: string }) {
  return <group>
    {/* Representative 1U/2U service server, used for login/scheduler/management roles. */}
    <Box position={[0, -.17, 0]} size={[2.28, .12, 1.12]} color="#252e3a" edge="#b7c3d0" metalness={.72} />
    <Box position={[0, .015, -.01]} size={[2.2, .24, 1.02]} color="#354252" edge="#bac6d3" metalness={.58} />
    <Box position={[0, .04, .51]} size={[2.12, .16, .035]} color="#111923" edge="#68798c" />
    {Array.from({ length: 6 }, (_, i) => <group key={i} position={[-.82 + i * .328, .035, .54]}>
      <Box position={[0, 0, 0]} size={[.24, .095, .045]} color="#101924" edge="#728398" />
      <mesh position={[.07, -.055, .027]}><sphereGeometry args={[.01, 8, 8]} /><meshStandardMaterial color={i === 0 ? "#4bd0a0" : "#46576d"} emissive={i === 0 ? "#168e67" : "#000000"} emissiveIntensity={.65} /></mesh>
    </group>)}
    <Box position={[0, -.035, -.06]} size={[1.82, .08, .84]} color="#175640" edge="#78c8a4" />
    <Box position={[-.38, .08, -.06]} size={[.42, .13, .34]} color="#293746" edge="#9cabbc" />
    <Box position={[.3, .08, -.06]} size={[.36, .13, .3]} color="#273644" edge="#9cabbc" />
    {[-.77, -.51, -.25, .01, .27, .53].map((x) => <Box key={x} position={[x, .13, -.32]} size={[.055, .21, .035]} color="#218261" edge="#77cba8" />)}
    {id === "data-transfer" && <Box position={[.78, .13, -.12]} size={[.3, .2, .24]} color="#1d3550" edge="#7ca9d7" />}
    {[-.88, .88].map((x) => <Box key={x} position={[x, .02, -.42]} size={[.25, .18, .16]} color="#202b38" edge="#9dacbc" />)}
  </group>;
}

function ServerNicModel() {
  return <group>
    <Box position={[0, -.16, 0]} size={[1.85, .09, .78]} color="#15543f" edge="#77c8a4" />
    <Box position={[-.2, .02, -.03]} size={[.58, .22, .46]} color="#283543" edge="#b1bfce" />
    <Box position={[-.2, .15, -.03]} size={[.4, .035, .32]} color="#505d6c" edge="#d0dae5" />
    {[-.72, .26].map((x) => <group key={x} position={[x, .02, .04]}>
      <Box position={[0, 0, 0]} size={[.34, .3, .48]} color="#252f3c" edge="#aebdce" />
      <Box position={[0, 0, .25]} size={[.25, .21, .035]} color="#080e16" edge="#667991" />
      <Box position={[0, -.12, .274]} size={[.17, .035, .012]} color="#131f2b" edge="#8295aa" />
    </group>)}
    <Box position={[0, -.18, .4]} size={[1.2, .035, .08]} color="#d1b66c" edge="" metalness={.82} />
    {Array.from({ length: 16 }, (_, i) => <Box key={i} position={[-.55 + i * .073, -.19, .44]} size={[.025, .02, .025]} color="#e4ce8d" edge="" metalness={.85} />)}
  </group>;
}

function InspectionScene({ parts, onSelect }: { parts: Array<{ id: string; title: string; interactive: boolean }>; onSelect: (id: string) => void }) {
  const group = useRef<THREE.Group>(null);
  const timer = useThreeTimer();
  useFrame(() => {
    if (!group.current || !timer.current) return;
    timer.current.update();
    const time = timer.current.getElapsed();
    const delta = timer.current.getDelta();
    group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, 1, 4, delta));
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, Math.sin(time * .25) * .035, 2, delta);
  });
  return (
    <group ref={group} scale={.01}>
      <ambientLight intensity={1.25} />
      <pointLight position={[-3, 3, 5]} intensity={16} color={BLUE} distance={12} />
      <pointLight position={[3, -2, 4]} intensity={10} color="#4fc4d7" distance={10} />
      {parts.map((part, index) => <InspectionPart key={part.id} {...part} index={index} total={parts.length} onSelect={onSelect} />)}
    </group>
  );
}

function CameraRig({ overview }: { overview: boolean }) {
  const { camera } = useThree();
  useEffect(() => {
    if (overview) camera.position.set(7.4, 4.3, 12);
    else camera.position.set(2.2, 2.5, 9.8);
    camera.lookAt(0, 0, 0);
  }, [camera, overview]);

  return <OrbitControls
    makeDefault
    enabled={!overview}
    enablePan={false}
    enableRotate
    enableZoom
    enableDamping
    dampingFactor={.08}
    rotateSpeed={.65}
    zoomSpeed={.75}
    minDistance={6.5}
    maxDistance={15}
    minPolarAngle={.12}
    maxPolarAngle={Math.PI - .12}
    target={[0, 0, 0]}
  />;
}

export default function ClusterScene({
  progress,
  activeComponent,
  onHover,
  onSelect,
  viewComponent,
  inspectionParts,
  onInspectPart,
}: {
  progress: MotionValue<number>;
  activeComponent: ClusterComponentId | null;
  onHover: (id: ClusterComponentId | null) => void;
  onSelect: (id: ClusterComponentId) => void;
  viewComponent: ClusterComponentId | null;
  inspectionParts: Array<{ id: string; title: string; interactive: boolean }>;
  onInspectPart: (id: string) => void;
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      camera={{ position: [7.4, 4.3, 12], fov: 34 }}
      onCreated={({ gl }) => gl.setClearColor("#071431", 0)}
    >
      <CameraRig overview={!viewComponent} />
      <SupercomputerCluster progress={progress} activeComponent={activeComponent} onHover={onHover} onSelect={onSelect} overview={!viewComponent} />
      {viewComponent && <InspectionScene parts={inspectionParts} onSelect={onInspectPart} />}
    </Canvas>
  );
}
