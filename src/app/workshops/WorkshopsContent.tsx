"use client";

import React from "react";
import {
  Terminal,
  Server,
  Cpu,
  Zap,
  Clock,
  MapPin,
  Monitor,
  Network,
  HardDrive,
  Gauge,
  ArrowRight,
} from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { AnimatedCounter } from "@/components/AnimatedCounter";

interface Workshop {
  id: string;
  name: string;
  description: string;
  status: string;
  cores: string;
  icon: string;
}

interface UpcomingWorkshop {
  name: string;
  icon: string;
}

const iconMap: Record<string, any> = {
  Terminal,
  Server,
  Cpu,
  Zap,
  Monitor,
  Network,
  HardDrive,
  Gauge,
};

const statusColor: Record<string, string> = {
  COMPLETED: "status-completed",
  RUNNING: "status-active",
  QUEUED: "status-queued",
};

const statusTextColor: Record<string, string> = {
  COMPLETED: "text-primary",
  RUNNING: "text-terminal-green",
  QUEUED: "text-terminal-amber",
};

const coreColor: Record<string, string> = {
  Beginner: "bg-terminal-green/10 text-terminal-green border-terminal-green/20",
  Intermediate: "bg-terminal-amber/10 text-terminal-amber border-terminal-amber/20",
  Advanced: "bg-terminal-red/10 text-terminal-red border-terminal-red/20",
};

export function WorkshopsContent({ 
  workshops, 
  upcomingWorkshops, 
  sprintTopics 
}: { 
  workshops: Workshop[], 
  upcomingWorkshops: UpcomingWorkshop[],
  sprintTopics: string[]
}) {
  return (
    <>
      {/* ==================== WORKSHOP CARDS ==================== */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-12">
              <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
                2025‑2026 Workshop Queue
              </h2>
              <p className="text-sm text-text-secondary font-mono">
                squeue --partition=workshops --state=ALL
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {workshops.map((ws) => (
              <StaggerItem key={ws.id}>
                <div className="bg-card rounded-2xl border border-border card-hover overflow-hidden h-full">
                  <div className="px-5 py-3 bg-surface/50 border-b border-border flex items-center justify-between">
                    <span className="text-xs font-mono text-text-muted">
                      {ws.id}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`status-dot ${statusColor[ws.status]}`} />
                      <span
                        className={`text-xs font-mono font-medium ${statusTextColor[ws.status]}`}
                      >
                        {ws.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                        {iconMap[ws.icon] && React.createElement(iconMap[ws.icon], { size: 18 })}
                      </div>
                      <h3 className="text-base font-heading font-semibold text-text-primary leading-snug">
                        {ws.name}
                      </h3>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed mb-4">
                      {ws.description}
                    </p>

                    <span
                      className={`inline-flex items-center px-2.5 py-1 text-xs font-mono font-medium rounded-md border ${coreColor[ws.cores]}`}
                    >
                      {ws.cores}
                    </span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ==================== SPRINT MODEL ==================== */}
      <section className="py-24 grid-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-sm font-mono text-primary mb-2 uppercase tracking-widest">
                // sprint_model
              </p>
              <h2 className="text-3xl font-heading font-bold text-text-primary">
                Sprint Learning Model
              </h2>
              <p className="mt-4 text-text-secondary max-w-xl mx-auto">
                Every four weeks, small teams research, experiment, and present on a
                specific HPC topic, creating lasting resources for future members.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-12">
              {["Research", "Experiment", "Document", "Present"].map(
                (step, i) => (
                  <div key={step} className="relative">
                    <div className="p-4 bg-card rounded-xl border border-border text-center">
                      <div className="text-xs font-mono text-primary mb-1">
                        Week {i + 1}
                      </div>
                      <div className="text-sm font-heading font-semibold text-text-primary">
                        {step}
                      </div>
                    </div>
                    {i < 3 && (
                      <div className="hidden sm:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                        <ArrowRight size={14} className="text-primary/40" />
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="p-6 bg-card rounded-2xl border border-border">
              <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                Sample Sprint Topics
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {sprintTopics.map((topic) => (
                  <div
                    key={topic}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface/50 text-sm text-text-secondary"
                  >
                    <span className="text-primary">▸</span>
                    {topic}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== PI CLUSTER ==================== */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="p-8 rounded-3xl glass border border-primary/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <HardDrive size={24} />
                </div>
                <h2 className="text-2xl font-heading font-bold text-text-primary">
                  Raspberry Pi Cluster — Technical Summary
                </h2>
              </div>

              <div className="space-y-3 text-sm text-text-secondary mb-6">
                {[
                  "Assembled 5 Raspberry Pi 4s with PoE+ HATs and a managed switch.",
                  "Configured DHCP and TFTP for network boot.",
                  "Set up NFS to share a central SSD across all nodes.",
                  "Enabled passwordless SSH for cluster management.",
                  "Used parallel-ssh to run commands on all nodes simultaneously.",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-terminal-green mt-0.5 font-mono text-xs">
                      [{i + 1}]
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-surface/50 border border-terminal-amber/20">
                <p className="text-sm text-terminal-amber font-medium flex items-center gap-2">
                  <Zap size={14} />
                  Key learning: Wi‑Fi is unstable for clustering; wired Ethernet
                  is essential.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== UPCOMING ==================== */}
      <section className="py-24 grid-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-sm font-mono text-terminal-amber mb-2">
                STATUS: QUEUED
              </p>
              <h2 className="text-3xl font-heading font-bold text-text-primary">
                Upcoming Workshops (2026‑27)
              </h2>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {upcomingWorkshops.map((ws) => (
              <StaggerItem key={ws.name}>
                <div className="flex items-center gap-4 p-5 bg-card rounded-xl border border-dashed border-terminal-amber/30 card-hover">
                  <div className="p-2 rounded-lg bg-terminal-amber/10 text-terminal-amber">
                    {iconMap[ws.icon] && React.createElement(iconMap[ws.icon], { size: 20 })}
                  </div>
                  <div>
                    <h3 className="text-sm font-heading font-semibold text-text-primary">
                      {ws.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="status-dot status-queued" />
                      <span className="text-xs font-mono text-terminal-amber">
                        QUEUED
                      </span>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <ScrollReveal>
            <div className="mt-12 p-6 bg-card rounded-2xl border border-border text-center">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-text-secondary">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-primary" />
                  <span>Wednesdays, 5:30 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-primary" />
                  <span>Dunning 10, Queen&apos;s University</span>
                </div>
              </div>
              <p className="mt-3 text-xs text-text-muted">
                All workshops are free. No prior experience required.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
