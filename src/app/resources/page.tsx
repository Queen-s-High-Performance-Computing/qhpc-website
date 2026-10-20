"use client";

import React from "react";
import {
  BookOpen,
  ExternalLink,
  GitBranch,
  ArrowRight,
  ChevronRight,
  Terminal,
  Mail,
  Layers,
} from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";

const officialDocs = [
  {
    name: "Frontenac Cluster Guide",
    description: "SSH, Slurm, storage usage",
    url: "https://github.com/QHPC/frontenac-guide",
  },
  {
    name: "VM Installation Workshop",
    description: "Rocky Linux setup with VirtualBox",
    url: "https://github.com/QHPC/vm-workshop",
  },
  {
    name: "Intro to Linux (CAC)",
    description: "CAC Linux workshop materials",
    url: "https://cac.queensu.ca/wiki",
  },
  {
    name: "OpenMP Programming Guide",
    description: "Shared memory parallel programming",
    url: "https://github.com/QHPC/openmp-guide",
  },
  {
    name: "MPI Hello World Examples",
    description: "Message passing code samples",
    url: "https://github.com/QHPC/mpi-examples",
  },
  {
    name: "Raspberry Pi Cluster Build",
    description: "Pi cluster setup guide",
    url: "https://github.com/QHPC/pi-cluster",
  },
];

const externalResources = [
  {
    name: "SC Student Cluster Competition",
    url: "https://sc24.supercomputing.org/students/student-cluster-competition/",
  },
  { name: "IndySCC", url: "https://sc24.supercomputing.org/students/indyscc/" },
  {
    name: "CAC Frontenac Wiki",
    url: "https://info.cac.queensu.ca/",
  },
  { name: "Slurm Documentation", url: "https://slurm.schedmd.com/" },
  { name: "OpenMPI", url: "https://www.open-mpi.org/" },
  { name: "HPL Benchmark", url: "https://www.netlib.org/benchmark/hpl/" },
  { name: "HPCG Benchmark", url: "https://hpcg-benchmark.org/" },
];

const curriculum = [
  { step: 1, name: "Linux Command Line", level: "Foundation" },
  { step: 2, name: "Shell Scripting", level: "Foundation" },
  { step: 3, name: "Building & Debugging", level: "Core", detail: "make, cmake, gdb, valgrind" },
  { step: 4, name: "Profiling & Benchmarking", level: "Core" },
  { step: 5, name: "Single‑Core Optimisation", level: "Core", detail: "algorithms, loop optimisations" },
  { step: 6, name: "Multi‑Core Programming", level: "Advanced", detail: "Pthreads, OpenMP" },
  { step: 7, name: "Distributed Programming", level: "Advanced", detail: "MPI, Slurm" },
  { step: 8, name: "Accelerator Programming", level: "Expert", detail: "CUDA, CPU vector intrinsics, GPU opts" },
];

const gitCommands = [
  "clone", "init", "branch", "checkout", "fetch", "pull", "status", "add", "commit", "push", "blame",
];

const levelColor: Record<string, string> = {
  Foundation: "bg-terminal-green/10 text-terminal-green border-terminal-green/20",
  Core: "bg-primary/10 text-primary border-primary/20",
  Advanced: "bg-terminal-amber/10 text-terminal-amber border-terminal-amber/20",
  Expert: "bg-terminal-red/10 text-terminal-red border-terminal-red/20",
};

export default function ResourcesPage() {
  return (
    <div className="pt-20">
      {/* ==================== HEADER ==================== */}
      <section className="py-20 grid-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <p className="text-sm font-mono text-primary mb-3 uppercase tracking-widest">
              // resources
            </p>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-text-primary mb-6">
              Resources
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Documentation, learning materials, and tools to supercharge your HPC
              journey.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== OFFICIAL DOCS ==================== */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <BookOpen size={20} />
              </div>
              <h2 className="text-2xl font-heading font-bold text-text-primary">
                Official Documentation
              </h2>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {officialDocs.map((doc) => (
              <StaggerItem key={doc.name}>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 p-5 bg-card rounded-xl border border-border card-hover"
                >
                  <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0 group-hover:bg-primary/20 transition-colors">
                    <GitBranch size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-heading font-semibold text-text-primary group-hover:text-primary transition-colors">
                      {doc.name}
                    </h3>
                    <p className="text-xs text-text-muted mt-1">
                      {doc.description}
                    </p>
                  </div>
                  <ExternalLink
                    size={14}
                    className="text-text-muted group-hover:text-primary transition-colors shrink-0 mt-1"
                  />
                </a>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ==================== CURRICULUM ==================== */}
      <section className="py-24 grid-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-sm font-mono text-primary mb-2 uppercase tracking-widest">
                // learning_path
              </p>
              <h2 className="text-3xl font-heading font-bold text-text-primary">
                Curriculum Dependency Graph
              </h2>
              <p className="text-sm text-text-secondary mt-2">
                Progression from fundamentals to advanced HPC topics
              </p>
            </div>
          </ScrollReveal>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-terminal-green/50 via-primary/50 via-terminal-amber/50 to-terminal-red/50" />

            <StaggerContainer className="space-y-4">
              {curriculum.map((item) => (
                <StaggerItem key={item.step}>
                  <div className="relative flex items-center gap-4 ml-4">
                    {/* Step number */}
                    <div
                      className={`relative z-10 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold border ${levelColor[item.level]}`}
                    >
                      {item.step}
                    </div>

                    {/* Card */}
                    <div className="flex-1 p-4 bg-card rounded-xl border border-border card-hover">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-heading font-semibold text-text-primary">
                            {item.name}
                          </h3>
                          {item.detail && (
                            <p className="text-xs text-text-muted mt-0.5">
                              {item.detail}
                            </p>
                          )}
                        </div>
                        <span
                          className={`px-2 py-0.5 text-xs font-mono rounded border ${levelColor[item.level]}`}
                        >
                          {item.level}
                        </span>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ==================== EXTERNAL RESOURCES ==================== */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                <ExternalLink size={20} />
              </div>
              <h2 className="text-2xl font-heading font-bold text-text-primary">
                External Learning Resources
              </h2>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {externalResources.map((res) => (
              <StaggerItem key={res.name}>
                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 bg-card rounded-xl border border-border card-hover"
                >
                  <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                    {res.name}
                  </span>
                  <ChevronRight
                    size={16}
                    className="text-text-muted group-hover:text-primary transition-colors"
                  />
                </a>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ==================== GIT ==================== */}
      <section className="py-24 grid-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="p-8 bg-card rounded-2xl border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <GitBranch size={20} />
                </div>
                <h2 className="text-xl font-heading font-bold text-text-primary">
                  Git &amp; Version Control
                </h2>
              </div>
              <p className="text-sm text-text-secondary mb-4">
                Members learn and use Git for collaborative development. Essential
                commands:
              </p>
              <div className="flex flex-wrap gap-2">
                {gitCommands.map((cmd) => (
                  <span
                    key={cmd}
                    className="px-3 py-1.5 text-xs font-mono bg-surface text-terminal-green rounded-lg border border-terminal-green/10"
                  >
                    git {cmd}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== ACCESS ==================== */}
      <section className="py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <div className="p-8 glass rounded-2xl border border-primary/10">
              <Layers size={32} className="text-primary mx-auto mb-4" />
              <h2 className="text-xl font-heading font-bold text-text-primary mb-3">
                Access Shared Resources
              </h2>
              <p className="text-sm text-text-secondary mb-6">
                For access to the QHPC GitHub organisation, shared drive, or
                cluster, get in touch:
              </p>
              <a
                href="mailto:QHPC@engsoc.queensu.ca"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary border border-primary/30 rounded-xl font-mono text-sm hover:bg-primary/20 transition-all"
              >
                <Mail size={16} />
                QHPC@engsoc.queensu.ca
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
