"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Cpu,
  Trophy,
  Users,
  ArrowRight,
  Terminal,
  Zap,
  Server,
  Network,
  GraduationCap,
  Rocket,
} from "lucide-react";
import { ParticleNetwork } from "@/components/ParticleNetwork";
import { ClusterCore } from "@/components/ClusterCore";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { TerminalTyper } from "@/components/TerminalTyper";

const features = [
  {
    icon: Cpu,
    title: "Skill Development",
    description:
      "Workshops, tutorials, and hands‑on sessions led by HPC experts. Access the CAC Frontenac cluster and cutting‑edge GPU resources.",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
  {
    icon: Trophy,
    title: "Competitions",
    description:
      "Prepare for SC Student Cluster Competition, IndySCC, and Winter Classic. Scholarship opportunities and global exposure.",
    color: "text-secondary",
    bg: "bg-secondary/10",
    border: "border-secondary/20",
  },
  {
    icon: Network,
    title: "Networking",
    description:
      "Connect with peers, faculty, and industry leaders like CAC and Dell. Build relationships that launch careers.",
    color: "text-terminal-green",
    bg: "bg-terminal-green/10",
    border: "border-terminal-green/20",
  },
];

const stats = [
  { value: 40, suffix: "+", label: "Active Members" },
  { value: 5, suffix: "", label: "Node Pi Cluster" },
  { value: 20, suffix: "+", label: "Workshops Held" },
  { value: 48, suffix: "hr", label: "Mock Competition" },
];

const whyJoin = [
  {
    icon: Users,
    title: "Inclusivity",
    description:
      "Open to all Queen's students. No prior HPC experience required. Interdisciplinary collaboration is encouraged.",
  },
  {
    icon: Rocket,
    title: "Career Edge",
    description:
      "Gain niche expertise in HPC — a field poised for rapid growth with AI advancements. Members have secured internships from club experience.",
  },
  {
    icon: GraduationCap,
    title: "Growth Opportunities",
    description:
      "Structured training, mentorship from faculty and grad students, and clear progression from local to global competitions.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ==================== HERO ==================== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Particle background */}
        <div className="absolute inset-0 z-0">
          <ParticleNetwork />
        </div>

        {/* 3D Core - Subtle background or side element */}
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40 md:opacity-100 pointer-events-none">
          <ClusterCore className="max-w-4xl" />
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none z-0" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none z-0" />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-mono mb-8">
              <span className="status-dot status-active" />
              Queen&apos;s First EngSoc‑Ratified Supercomputing Club
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold leading-tight">
              <span className="text-text-primary">Queen&apos;s</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent animate-gradient">
                High-Performance
              </span>
              <br />
              <span className="text-text-primary">Computing</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Empowering students with hands‑on supercomputing experience through
              collaborative learning, competitions, and industry engagement.
            </p>
          </motion.div>

          {/* Terminal Typer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-10 max-w-lg mx-auto"
          >
            <TerminalTyper
              lines={[
                "ssh student@qhpc.queensu.ca",
                "srun --nodes=5 --ntasks=40 ./learn_hpc",
                "Job submitted. Welcome to the cluster.",
              ]}
              speed={35}
            />
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="group flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl btn-glow transition-all duration-300 hover:bg-primary-dark"
            >
              <Terminal size={18} />
              <span>Join the Cluster</span>
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-2 px-6 py-3 text-text-secondary border border-border rounded-xl hover:border-primary/30 hover:text-text-primary transition-all duration-200"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ==================== FEATURES ==================== */}
      <section className="relative py-24 grid-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm font-mono text-primary mb-2 uppercase tracking-widest">
                // what_we_do
              </p>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text-primary">
                Three Pillars of QHPC
              </h2>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <StaggerItem key={feature.title}>
                <div
                  className={`p-6 rounded-2xl bg-card border ${feature.border} card-hover h-full`}
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${feature.bg} ${feature.color} mb-4`}
                  >
                    <feature.icon size={24} />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ==================== STATS ==================== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-6 rounded-2xl glass card-hover"
                >
                  <div className="text-4xl sm:text-5xl font-heading font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    <AnimatedCounter
                      end={stat.value}
                      suffix={stat.suffix}
                      duration={2000}
                    />
                  </div>
                  <p className="mt-2 text-sm text-text-secondary font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== WHY JOIN ==================== */}
      <section className="py-24 grid-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm font-mono text-primary mb-2 uppercase tracking-widest">
                // why_join
              </p>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text-primary">
                Why Join QHPC?
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyJoin.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.15}>
                <div className="relative p-6 rounded-2xl bg-card border border-border card-hover h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <item.icon size={20} />
                    </div>
                    <h3 className="text-lg font-heading font-semibold text-text-primary">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== UNIQUE VALUE ==================== */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="relative p-8 sm:p-12 rounded-3xl glass border border-primary/10">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
                  <Zap size={24} />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-heading font-bold text-text-primary mb-4">
                    Unique Value
                  </h2>
                  <p className="text-text-secondary leading-relaxed">
                    QHPC is Queen&apos;s first Engineering Society‑ratified
                    supercomputing club, filling a critical gap in technical education.
                    Our focus on practical, competition‑driven learning — supported by
                    faculty advisors and industry sponsors — sets us apart from any
                    other club on campus.
                  </p>
                </div>
              </div>

              <div className="section-divider my-6" />

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-secondary/10 text-secondary shrink-0">
                  <Server size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
                    Future Vision
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    Expand outreach through high school STEM workshops, diversify
                    membership, compete internationally at SCC and IndySCC, and
                    establish Queen&apos;s as a leader in HPC education across Canada.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="py-24 grid-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <p className="text-sm font-mono text-terminal-green mb-4">
              $ submit_application --type &quot;membership&quot;
            </p>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text-primary mb-4">
              Ready to Join the Cluster?
            </h2>
            <p className="text-text-secondary mb-8 max-w-xl mx-auto">
              Weekly meetings — Wednesdays, 5:30 PM, Dunning 10, Queen&apos;s
              University. No experience required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://forms.office.com/pages/responsepage.aspx?id=eCPPiRaKW0S_qx14hTcxIcrkpYECpXdErg9q2tctsCVUNkE0RDZTTDA2U0xKU1hEVENXUEc2MUwwUS4u"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-8 py-3.5 bg-primary text-white font-semibold rounded-xl btn-glow transition-all duration-300 hover:bg-primary-dark"
              >
                <Terminal size={18} />
                <span>Membership Form</span>
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
              <a
                href="mailto:QHPC@engsoc.queensu.ca"
                className="flex items-center gap-2 px-8 py-3.5 text-text-secondary border border-border rounded-xl hover:border-primary/30 hover:text-text-primary transition-all duration-200"
              >
                Email Us
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
