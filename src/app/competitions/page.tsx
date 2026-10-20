"use client";

import React from "react";
import {
  Trophy,
  Zap,
  Target,
  BarChart3,
  Server,
  ChevronRight,
  Info,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { AnimatedCounter } from "@/components/AnimatedCounter";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Pagination, Navigation } from "swiper/modules";

const powerData = [
  { time: "00:00", power: 2100 },
  { time: "08:00", power: 3400 },
  { time: "16:00", power: 4300 },
  { time: "24:00", power: 4450 },
  { time: "32:00", power: 4200 },
  { time: "40:00", power: 4600 },
  { time: "48:00", power: 3000 },
];

const pastCompetitions = [
  {
    event: "SC24 (Atlanta)",
    location: "Atlanta, GA",
    benchmarks: ["HPL", "MLPerf", "Cat Recognition"],
    applications: ["NAMD", "ICON"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800",
  },
  {
    event: "SC23 (Denver)",
    location: "Denver, CO",
    benchmarks: ["HPL", "MLPerf", "HPCG"],
    applications: ["MPAS", "3DMHD"],
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800",
  },
  {
    event: "SC22 (Dallas)",
    location: "Dallas, TX",
    benchmarks: ["LINPACK", "HPCG", "IO500", "MLPerf"],
    applications: ["PHASTA", "LAMMPS", "SeisSol"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
  },
];

const competitionFeatures = [
  {
    icon: Server,
    title: "Build a Cluster",
    description: "Design and assemble a small cluster within strict power budget (e.g., 4500W).",
  },
  {
    icon: BarChart3,
    title: "Run Benchmarks",
    description: "Execute HPL, HPCG, MLPerf and scientific applications under real constraints.",
  },
  {
    icon: Zap,
    title: "Optimise Performance",
    description: "Tune system performance under power caps and simulated blackouts.",
  },
  {
    icon: Users,
    title: "Collaborate",
    description: "Work as a team under real competition pressure for 48 continuous hours.",
  },
];

import { Users } from "lucide-react";

export default function CompetitionsPage() {
  return (
    <div className="pt-20">
      {/* ==================== HEADER ==================== */}
      <section className="py-20 grid-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <p className="text-sm font-mono text-primary mb-3 uppercase tracking-widest">
              // competitions
            </p>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-text-primary mb-6">
              Competitions
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              QHPC prepares teams for international Student Cluster Competitions —
              the ultimate test of HPC knowledge and teamwork.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== WHAT IS SCC ==================== */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-heading font-bold text-text-primary mb-4">
                What is a Student Cluster Competition?
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Teams of students build, configure, and optimize a small supercomputer
                under strict constraints, then compete by running scientific benchmarks
                and applications.
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {competitionFeatures.map((feat) => (
              <StaggerItem key={feat.title}>
                <div className="p-6 bg-card rounded-2xl border border-border card-hover h-full text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                    <feat.icon size={24} />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {feat.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ==================== PAST SCC EXAMPLES (CAROUSEL) ==================== */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-sm font-mono text-primary mb-2 uppercase tracking-widest">
                // retrospective
              </p>
              <h2 className="text-3xl font-heading font-bold text-text-primary">
                SCC Event Deck
              </h2>
              <p className="text-sm text-text-secondary mt-2">
                Swipe through configurations from recent global competitions.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="py-10 max-w-[400px] mx-auto">
              <Swiper
                effect={"cards"}
                grabCursor={true}
                modules={[EffectCards, Pagination, Navigation]}
                className="mySwiper"
                pagination={{ clickable: true }}
              >
                {pastCompetitions.map((comp) => (
                  <SwiperSlide key={comp.event} className="rounded-2xl overflow-hidden">
                    <div className="relative h-[500px] w-full bg-card border border-border flex flex-col shadow-2xl">
                        {/* Background image overlay */}
                        <div 
                          className="absolute inset-0 opacity-20 grayscale pointer-events-none"
                          style={{ backgroundImage: `url(${comp.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent pointer-events-none" />

                        <div className="relative z-10 p-8 h-full flex flex-col">
                            <div className="flex items-center justify-between mb-8">
                                <span className="px-3 py-1 bg-primary/20 text-primary text-[10px] font-mono rounded-full uppercase tracking-tighter">
                                    cluster_config.yaml
                                </span>
                                <Trophy size={20} className="text-terminal-amber" />
                            </div>

                            <h3 className="text-2xl font-heading font-bold text-text-primary mb-1">
                                {comp.event}
                            </h3>
                            <p className="text-xs text-text-muted mb-8">{comp.location}</p>

                            <div className="space-y-6 flex-1">
                                <div>
                                    <p className="text-[10px] font-mono text-terminal-green mb-2 uppercase">
                                        $ ls benchmarks/
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {comp.benchmarks.map((b) => (
                                            <span key={b} className="text-xs text-text-secondary font-mono bg-surface p-1.5 rounded-md border border-border">
                                                {b}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <p className="text-[10px] font-mono text-secondary mb-2 uppercase">
                                        $ ls apps/
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {comp.applications.map((a) => (
                                            <span key={a} className="text-xs text-text-secondary font-mono bg-surface p-1.5 rounded-md border border-border">
                                                {a}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto pt-6 border-t border-border/50 flex items-center justify-between text-[10px] font-mono text-text-muted">
                                <span>STATUS: ARCHIVED</span>
                                <span>v1.0.4</span>
                            </div>
                        </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-text-muted font-mono animate-pulse">
               <Info size={12} />
               <span>Click and drag to swipe through nodes</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== TARGET COMPETITIONS ==================== */}
      <section className="py-24 grid-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-sm font-mono text-primary mb-2 uppercase tracking-widest">
                // targets
              </p>
              <h2 className="text-3xl font-heading font-bold text-text-primary">
                Target Competitions
              </h2>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "SC SCC",
                full: "Student Cluster Competition",
                description:
                  "The premier international SCC held at the annual Supercomputing conference. Teams compete on-site over 48 hours.",
                link: "https://sc24.supercomputing.org/students/student-cluster-competition/",
              },
              {
                name: "IndySCC",
                full: "Independent SCC",
                description:
                  "A virtual SCC format allowing teams to compete remotely, making it accessible for first-time competitors.",
                link: "https://sc24.supercomputing.org/students/indyscc/",
              },
              {
                name: "Winter Classic",
                full: "Winter Classic Invitational",
                description:
                  "An invitational competition for teams to practice in a real SCC environment with mentorship opportunities.",
                link: "#",
              },
            ].map((comp) => (
              <StaggerItem key={comp.name}>
                <div className="p-6 bg-card rounded-2xl border border-border card-hover h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Trophy size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-heading font-bold text-text-primary">
                        {comp.name}
                      </h3>
                      <p className="text-xs text-text-muted">{comp.full}</p>
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed flex-1">
                    {comp.description}
                  </p>
                  {comp.link !== "#" && (
                    <a
                      href={comp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-4 font-mono"
                    >
                      Learn more <ChevronRight size={12} />
                    </a>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ==================== MOCK COMPETITION ==================== */}
      <section className="py-24 grid-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="p-8 sm:p-12 rounded-3xl glass border border-primary/10 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6">
                <Target size={32} />
              </div>
              <h2 className="text-3xl font-heading font-bold text-text-primary mb-4">
                QHPC Mock Competition
              </h2>
              <p className="text-text-secondary leading-relaxed max-w-xl mx-auto mb-8">
                A simulated 48‑hour SCC environment allowing teams to practice
                system optimisation and application tuning under real‑world
                constraints — power limits, collaborative problem‑solving, and
                timed benchmarks.
              </p>

              <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
                <div className="p-4 bg-card rounded-xl border border-border">
                  <div className="text-2xl font-heading font-bold text-primary">
                    <AnimatedCounter end={48} suffix="h" />
                  </div>
                  <p className="text-xs text-text-muted mt-1">Duration</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <div className="text-2xl font-heading font-bold text-secondary">
                    <AnimatedCounter end={4500} suffix="W" />
                  </div>
                  <p className="text-xs text-text-muted mt-1">Power Cap</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <div className="text-2xl font-heading font-bold text-terminal-green">
                    <AnimatedCounter end={5} suffix="+" />
                  </div>
                  <p className="text-xs text-text-muted mt-1">Teams</p>
                </div>
              </div>

              <div className="mt-12 h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={powerData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickMargin={10} />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "8px" }}
                      itemStyle={{ color: "#38bdf8" }}
                    />
                    <ReferenceLine y={4500} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: '4500W Cap', fill: '#ef4444', fontSize: 12 }} />
                    <Line type="monotone" dataKey="power" name="Power (W)" stroke="#38bdf8" strokeWidth={3} dot={{ fill: "#38bdf8", strokeWidth: 2 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== FUTURE GOALS ==================== */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <p className="text-sm font-mono text-terminal-green mb-3 uppercase tracking-widest">
              // roadmap
            </p>
            <h2 className="text-3xl font-heading font-bold text-text-primary mb-8">
              Future Goals
            </h2>
            <div className="space-y-4">
              {[
                "Submit applications for IndySCC and SCC in 2026‑27",
                "Attend an in‑person SC Student Cluster Competition",
                "Build a competitive cluster with sponsored hardware",
                "Establish QHPC as a top Canadian SCC contender",
              ].map((goal, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border card-hover text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-terminal-green/10 text-terminal-green flex items-center justify-center text-sm font-mono font-bold shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-sm text-text-secondary">{goal}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

