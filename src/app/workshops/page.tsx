import React from "react";
import { Metadata } from "next";
import {
  Terminal as TerminalIcon,
  Server,
  Cpu,
  Zap,
  Monitor,
  Network,
  HardDrive,
  Gauge,
} from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { WorkshopsContent } from "./WorkshopsContent";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Workshops & Tutorials",
  description: "Hands‑on supercomputing training at Queen's University. Learn Linux, Parallel Programming (MPI/OpenMP), and Cluster Administration.",
  alternates: {
    canonical: "/workshops",
  },
};

const workshops = [
  {
    id: "JOB-001",
    name: "Intro to HPC & Systems",
    description: "Fundamentals of High-Performance Computing cluster architecture, hardware (CPUs, GPUs, networking), and software stacks.",
    status: "COMPLETED",
    cores: "Beginner",
    icon: "Server",
  },
  {
    id: "JOB-002",
    name: "Linux Command Line for HPC",
    description: "Essential Linux skills for supercomputing: file manipulation, text processing, and shell scripting.",
    status: "COMPLETED",
    cores: "Beginner",
    icon: "Terminal",
  },
  {
    id: "JOB-003",
    name: "Rocky Linux VM Setup",
    description: "Hands-on guide to installing Rocky Linux (the community supercomputing OS) via VirtualBox.",
    status: "COMPLETED",
    cores: "Beginner",
    icon: "Monitor",
  },
  {
    id: "JOB-004",
    name: "CAC Frontenac Cluster Access",
    description: "Mastering SSH, Slurm scheduling, and shared storage on the Queen's Frontenac cluster.",
    status: "COMPLETED",
    cores: "Intermediate",
    icon: "Network",
  },
  {
    id: "JOB-005",
    name: "Parallel Programming Paradigms",
    description: "Learning the industry-standard OpenMP (shared memory) and MPI (message passing) paradigms.",
    status: "COMPLETED",
    cores: "Intermediate",
    icon: "Cpu",
  },
  {
    id: "JOB-006",
    name: "HPC Performance Profiling",
    description: "Analyzing application efficiency with Valgrind, NSight Systems, and Linux monitoring tools.",
    status: "COMPLETED",
    cores: "Intermediate",
    icon: "Gauge",
  },
  {
    id: "JOB-007",
    name: "Supercomputing Benchmarking",
    description: "Running and optimizing HPL (High-Performance LINPACK), HPCG, and MLPerf suites.",
    status: "COMPLETED",
    cores: "Advanced",
    icon: "Zap",
  },
  {
    id: "JOB-008",
    name: "Raspberry Pi Cluster Build",
    description: "Building a 5‑node distributed system using Raspberry Pis, network boot, and parallel‑ssh.",
    status: "COMPLETED",
    cores: "Advanced",
    icon: "HardDrive",
  },
];

const upcomingWorkshops = [
  { name: "GPU Programming with CUDA", icon: "Cpu" },
  { name: "Advanced MPI Collectives", icon: "Network" },
  { name: "Energy‑Aware Scheduling with Slurm", icon: "Zap" },
  { name: "Containerisation for HPC (Apptainer)", icon: "HardDrive" },
];


const sprintTopics = [
  "Linux Performance Monitoring Tools",
  "Cluster Architecture & NUMA",
  "Compiler Flags (GCC vs. Clang)",
  "Slurm Scheduling Optimisation",
  "NFS vs. Lustre File Systems",
  "HPL vs. HPCG Benchmarking",
];

export default function WorkshopsPage() {
  const workshopSchema = workshops.map((ws) => ({
    "@context": "https://schema.org",
    "@type": "EducationEvent",
    "name": ws.name,
    "description": ws.description,
    "educationalLevel": ws.cores,
    "organizer": {
      "@type": "Organization",
      "name": "QHPC",
      "url": siteConfig.url
    },
    "location": {
      "@type": "Place",
      "name": "Dunning 10, Queen's University",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Kingston",
        "addressRegion": "ON",
        "addressCountry": "CA"
      }
    }
  }));

  return (
    <div className="pt-20">
      <JsonLd data={workshopSchema} />
      
      {/* ==================== HEADER ==================== */}
      <section className="py-20 grid-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <p className="text-sm font-mono text-primary mb-3 uppercase tracking-widest">
              // squeue --state=LEARNING
            </p>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-text-primary mb-6">
              Workshops &amp; Tutorials
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Weekly hands‑on sessions covering everything from Linux basics to
              advanced cluster optimisation. All free for Queen&apos;s students.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <WorkshopsContent 
        workshops={workshops} 
        upcomingWorkshops={upcomingWorkshops}
        sprintTopics={sprintTopics}
      />
    </div>
  );
}

