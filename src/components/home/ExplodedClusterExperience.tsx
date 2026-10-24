"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { ClusterComponentId } from "./ClusterScene";

const ClusterScene = dynamic(() => import("./ClusterScene"), {
  ssr: false,
  loading: () => <div className="cluster-story__loading">Preparing the cluster model…</div>,
});

const stages = ["WHOLE CLUSTER", "COMPUTE PARTITION", "HIGH-SPEED INTERCONNECT", "STORAGE + SERVICE NODES"];

const components: Record<ClusterComponentId, { label: string; title: string; description: string; summary: string }> = {
  compute: {
    label: "QHPC FRONTENAC NODE",
    title: "Dell PowerEdge R760",
    description: "QHPC’s Frontenac node is documented as a Dell PowerEdge R760 with two Intel Xeon Gold 6430 processors, two NVIDIA L4 GPUs, and 256 GiB of system memory. Select the server to open its documented components.",
    summary: "Frontenac’s R760 combines two Xeon Gold 6430 CPUs, two NVIDIA L4 GPUs, and 256 GiB of system memory.",
  },
  interconnect: {
    label: "HIGH-SPEED NETWORK",
    title: "Interconnect fabric",
    description: "Switches and fast network links carry messages between nodes. The archive does not identify QHPC’s switch or fabric product numbers, so this view uses a representative data-center Ethernet switch and transceiver layout.",
    summary: "Switches and high-speed links carry data between compute nodes; this network view is illustrative.",
  },
  storage: {
    label: "PARALLEL FILESYSTEM",
    title: "Shared storage",
    description: "Storage servers and drive or flash enclosures provide a shared filesystem. The archive does not identify QHPC’s storage appliance, drive, or filesystem product numbers; the 3D parts are representative HPC storage hardware.",
    summary: "Shared storage gives cluster nodes a common place to read and write data; this hardware view is illustrative.",
  },
  services: {
    label: "ACCESS + OPERATIONS",
    title: "Login and service nodes",
    description: "Login nodes provide user access for preparing work and submitting jobs. Service-node product models are not documented in the archive, so the 3D view shows representative rack servers for login, scheduling, management, and data movement.",
    summary: "Login and service systems support user access and cluster operations; the hardware shown is illustrative.",
  },
};

type DetailPart = { id: string; title: string; description: string; children?: DetailPart[] };
const internals: Record<ClusterComponentId, DetailPart[]> = {
  compute: [
    { id: "r760", title: "Explore the R760 interior", description: "Dell PowerEdge R760 · 2U dual-socket chassis. The QHPC Frontenac guide lists two Intel Xeon Gold 6430 processors, two NVIDIA L4 GPUs, and 256 GiB of system memory. Open the assembly to inspect each installed component.", children: [
      { id: "cpu-1", title: "CPU 1 · Intel Xeon Gold 6430", description: "The first socket holds an Intel Xeon Gold 6430: 32 cores, 64 threads, and 60 MB cache. It connects to its own memory channels and the first NVIDIA L4 through PCIe Gen 4 x16.", children: [{ id: "cores", title: "32 CPU cores", description: "The Xeon Gold 6430 has 32 physical cores and 64 threads. The scheduler can assign CPU cores to parallel jobs; each core executes instructions and can run multiple hardware threads." }, { id: "cache", title: "60 MB processor cache", description: "The Xeon Gold 6430 includes 60 MB of cache. Cache keeps frequently reused instructions and data closer to the cores than system memory." }, { id: "memory-controller", title: "Eight memory channels", description: "This CPU has eight memory channels. The R760 places 16 DIMM sockets on each processor’s memory subsystem." }] },
      { id: "cpu-2", title: "CPU 2 · Intel Xeon Gold 6430", description: "The second socket contains the same 32-core, 64-thread Xeon Gold 6430, giving the server 64 physical CPU cores in total. It connects to its own memory channels and the second L4 GPU.", children: [{ id: "cores-2", title: "32 CPU cores", description: "This second Xeon Gold 6430 contributes 32 physical cores and 64 hardware threads to the two-socket server." }, { id: "cache-2", title: "60 MB processor cache", description: "Each Xeon Gold 6430 has 60 MB of cache close to its own cores." }, { id: "memory-controller-2", title: "Eight memory channels", description: "The second processor has its own eight-channel memory subsystem and 16 DIMM sockets on the R760 system board." }] },
      { id: "memory", title: "256 GiB · DDR5 RDIMM memory", description: "The Frontenac guide lists 256 GiB of system memory. The R760 uses DDR5 registered DIMMs and has 32 sockets total, split into 16 sockets per processor across eight channels. The guide does not state the installed DIMM count or module sizes." },
      { id: "gpu-1", title: "GPU 1 · NVIDIA L4", description: "One NVIDIA L4 is connected to each CPU socket by PCIe Gen 4 x16. Each L4 is a low-profile, single-slot, passively cooled card with 24 GB of GDDR6 memory and a 72 W maximum power envelope.", children: [{ id: "gpu1-compute", title: "Ada Lovelace GPU", description: "The L4 contains GPU compute hardware for parallel workloads. It is a data-center accelerator, not a desktop graphics card." }, { id: "gpu1-memory", title: "24 GB GDDR6 memory", description: "The L4 has 24 GB of onboard GDDR6 memory, separate from the server’s 256 GiB of CPU system memory." }, { id: "gpu1-link", title: "PCIe Gen 4 x16 link", description: "The QHPC Frontenac guide documents a PCIe Gen 4 x16 connection from the corresponding CPU socket to this L4." }] },
      { id: "gpu-2", title: "GPU 2 · NVIDIA L4", description: "The second NVIDIA L4 is attached to the other CPU socket over PCIe Gen 4 x16. Together, the two cards provide 48 GB of accelerator memory, separate from system RAM.", children: [{ id: "gpu2-compute", title: "Ada Lovelace GPU", description: "A second L4 provides another accelerator for compatible parallel workloads." }, { id: "gpu2-memory", title: "24 GB GDDR6 memory", description: "This GPU has its own 24 GB of GDDR6 memory; GPU memories are not automatically combined into one pool." }, { id: "gpu2-link", title: "PCIe Gen 4 x16 link", description: "This L4 is connected to the second CPU socket over PCIe Gen 4 x16, as documented in the QHPC Frontenac hardware guide." }] },
      { id: "cooling", title: "Fan cage + GPU air shroud", description: "The R760 uses a fan cage and airflow shroud to move air through the chassis. NVIDIA L4 cards are passively cooled, so they rely on server airflow rather than onboard fans. The R760 supports up to six system fans." },
      { id: "riser", title: "PCIe expansion risers", description: "Riser cards stand vertically in the R760 and carry expansion cards, including the two L4 accelerators. Dell’s service guide shows the risers, GPU shroud, fan cage, system board, memory sockets, and power supplies inside the chassis." },
    ] },
  ],
  interconnect: [
    { id: "switch-asic", title: "Switch · forwarding hardware", description: "Representative Ethernet switch interior: a forwarding ASIC and heatsink, power regulation, cooling fans, and front-panel cages. QHPC’s switch product number is not in the available archive." },
    { id: "ports", title: "Ports and transceivers", description: "Representative pluggable optical transceivers seated in switch cages. Actual port type, speed, count, and optical or copper cabling depend on QHPC’s undocumented switch model." },
    { id: "node-nic", title: "Node NIC", description: "Representative server network adapter with controller, board, edge connector, and two ports. The Frontenac guide does not identify the installed NIC model or port configuration." },
    { id: "fabric", title: "Fabric topology", description: "Illustrative switch-and-node connections only. The actual QHPC topology, switch count, link speeds, and cabling are not specified in the available hardware guide." },
  ],
  storage: [
    { id: "metadata", title: "Metadata service", description: "Representative storage controller board with processor, memory, and storage interfaces. It illustrates a common filesystem role; QHPC’s actual metadata-service hardware is not documented here." },
    { id: "storage-servers", title: "Storage servers", description: "Representative 2U storage server with hot-swap drive carriers, fan modules, system board, and power-supply bays. The actual chassis and installed drive count are unknown." },
    { id: "drives", title: "Drives · HDD or flash", description: "An illustrative hard-disk drive assembly with platter, spindle, actuator, and head. QHPC’s drive type, capacity, model, and quantity are not in the available archive." },
    { id: "filesystem", title: "Shared filesystem", description: "Illustrative controller and media arrangement for a shared filesystem. The filesystem software, storage layout, and QHPC hardware model are not confirmed by this view." },
  ],
  services: [
    { id: "login", title: "Login node", description: "Representative rack server for user access, file preparation, and job submission. QHPC’s login-node model and exact hardware configuration are not listed in the source material reviewed." },
    { id: "scheduler", title: "Job scheduler", description: "The scheduler is software, not a dedicated hardware component by definition. This generic server model is illustrative of a possible host; the actual QHPC deployment is not confirmed." },
    { id: "management", title: "Management services", description: "Illustrative server hardware for monitoring and cluster operations. Roles may be virtualized or combined; this does not claim a separate QHPC management server exists." },
    { id: "data-transfer", title: "Data-transfer node", description: "Representative server for moving data between a cluster and external systems. A dedicated QHPC data-transfer node and its hardware model are not confirmed by the available materials." },
  ],
};

export function ExplodedClusterExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [stage, setStage] = useState(stages[0]);
  const [hoveredComponent, setHoveredComponent] = useState<ClusterComponentId | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<ClusterComponentId | null>(null);
  const [detailPath, setDetailPath] = useState<DetailPart[]>([]);
  const activeComponent = hoveredComponent ?? selectedComponent;
  const detailRoot = selectedComponent ? components[selectedComponent] : null;
  const currentDetail = detailPath.at(-1);
  const sceneParts = currentDetail?.children ?? (currentDetail ? [currentDetail] : selectedComponent ? internals[selectedComponent] : []);
  const inspectionParts = currentDetail?.children ?? (currentDetail ? [] : selectedComponent ? internals[selectedComponent] : []);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });
  const progress = useTransform(scrollYProgress, (value) => reduceMotion ? 0 : value);
  const progressScale = useTransform(progress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const nextStage = value < 0.16 ? stages[0] : value < 0.4 ? stages[1] : value < 0.7 ? stages[2] : stages[3];
    setStage((current) => current === nextStage ? current : nextStage);
  });

  return (
    <section
      ref={sectionRef}
      className="cluster-story"
      aria-labelledby="cluster-story-title"
      aria-describedby="cluster-story-description"
    >
      <div className="cluster-story__sticky">
        <div className={`cluster-story__copy${selectedComponent ? " cluster-story__copy--inspecting" : ""}`}>
          {selectedComponent && detailRoot ? (
            <>
              <SectionLabel onDark>{detailRoot.label} · INSPECTING</SectionLabel>
              <button className="cluster-story__back cluster-story__back--copy" type="button" onClick={() => {
                if (detailPath.length) setDetailPath((path) => path.slice(0, -1));
                else setSelectedComponent(null);
              }}>{detailPath.length ? "← Back one level" : "← Cluster overview"}</button>
              <div className="cluster-story__breadcrumbs">{detailRoot.title}{detailPath.map((part) => <span key={part.id}> / {part.title}</span>)}</div>
              <h2 id="cluster-story-title">{currentDetail?.title ?? detailRoot.title}</h2>
              <p id="cluster-story-description">{currentDetail?.description ?? detailRoot.description}</p>
              {selectedComponent === "compute" && <a className="cluster-story__source-link" href="https://www.dell.com/support/product-details/en-us/product/poweredge-r760/resources/3dguides" target="_blank" rel="noreferrer">Open Dell’s interactive R760 service models ↗</a>}
              {inspectionParts.length > 0 && <div className="cluster-story__copy-parts">
                <strong>{currentDetail ? `Inside ${currentDetail.title}` : `Inside ${detailRoot.title}`}</strong>
                {inspectionParts.map((part) => <button key={part.id} type="button" onClick={() => setDetailPath((path) => [...path, part])}>{part.title}<span aria-hidden="true">↗</span></button>)}
              </div>}
            </>
          ) : (
            <>
              <SectionLabel onDark>SUPERCOMPUTER CLUSTER · CONCEPTUAL MODEL</SectionLabel>
              <h2 id="cluster-story-title">Many nodes.<br /><span>One cluster.</span></h2>
              <p id="cluster-story-description">
                Compute nodes work in parallel, a high-speed fabric connects them, and
                shared storage and service nodes support the system. Scroll to explore
                how the parts fit together, then scroll back to reassemble them.
              </p>
              <Link href="/projects" className="cluster-story__link">
                Explore project ideas <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <div className="cluster-story__scroll-cue" aria-hidden="true">
                <span><ArrowDown size={15} /> SCROLL TO EXPLORE</span>
                <span className="cluster-story__stage">{stage}</span>
              </div>
            </>
          )}
        </div>

        <div
          className={`cluster-story__model${activeComponent ? " cluster-story__model--explaining" : ""}${selectedComponent ? " cluster-story__model--inspecting" : ""}`}
          onPointerLeave={() => setHoveredComponent(null)}
        >
          <div className="cluster-story__model-grid" />
          <ClusterScene
            progress={progress}
            activeComponent={activeComponent}
            viewComponent={selectedComponent}
            inspectionParts={sceneParts.map(({ id, title }) => ({ id, title, interactive: !currentDetail || Boolean(currentDetail.children) }))}
            onHover={setHoveredComponent}
            onSelect={setSelectedComponent}
            onInspectPart={(id) => {
              const available = currentDetail?.children ?? (currentDetail ? [] : selectedComponent ? internals[selectedComponent] : []);
              const next = available.find((part) => part.id === id);
              if (next) setDetailPath((path) => [...path, next]);
            }}
          />
          {!selectedComponent && <div className="cluster-story__component-controls" role="group" aria-label="Explore cluster components">
            {(Object.keys(components) as ClusterComponentId[]).map((id) => (
              <button
                key={id}
                type="button"
                aria-pressed={selectedComponent === id}
                onPointerEnter={() => setHoveredComponent(id)}
                onPointerLeave={() => setHoveredComponent(null)}
                onFocus={() => setHoveredComponent(id)}
                onBlur={() => setHoveredComponent(null)}
                onClick={() => {
                  setSelectedComponent((current) => current === id ? null : id);
                  setDetailPath([]);
                }}
              >
                {components[id].title}
              </button>
            ))}
          </div>}
          {!selectedComponent && hoveredComponent && <div className="cluster-story__explanation" role="status" aria-live="polite">
            <div className="cluster-story__explanation-topline">{components[hoveredComponent].label}</div>
            <h3>{components[hoveredComponent].title}</h3>
            <p>{components[hoveredComponent].summary}</p>
            <span className="cluster-story__explanation-hint">Click the component to explore inside ↗</span>
          </div>}
          {selectedComponent && <div className="cluster-story__orbit-hint">DRAG TO ROTATE · SCROLL TO ZOOM</div>}
          <div className="cluster-story__model-caption">
            <span>{selectedComponent === "compute" ? "QHPC FRONTENAC · DELL POWEREDGE R760" : "COMPUTE · FABRIC · PARALLEL STORAGE · SERVICES"}</span>
            <span>{selectedComponent === "compute" ? "2 × XEON GOLD 6430 · 2 × NVIDIA L4" : "CONCEPTUAL · NOT TO SCALE"}</span>
          </div>
        </div>

        <div className="cluster-story__progress" aria-hidden="true">
          <motion.span style={{ scaleX: reduceMotion ? 0 : progressScale }} />
        </div>
      </div>
    </section>
  );
}
