"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Award,
  BookOpen,
  Users,
  ChevronLeft,
  ChevronRight,
  Quote,
  Heart,
  Sparkles,
  Server,
  Gift,
} from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { Mermaid } from "@/components/Mermaid";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: string;
}

interface HighlightItem {
  icon: string;
  title: string;
  description: string;
}

const iconMap: Record<string, any> = {
  Sparkles,
  BookOpen,
  Award,
  Users,
  Calendar,
  Server,
  Gift,
  Heart,
};

interface Testimonial {
  text: string;
}

export function AboutContent({ 
  timeline, 
  highlights, 
  testimonials 
}: { 
  timeline: TimelineItem[], 
  highlights: HighlightItem[], 
  testimonials: Testimonial[] 
}) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () =>
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () =>
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  return (
    <>
      {/* ==================== TIMELINE ==================== */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-3xl font-heading font-bold text-text-primary mb-12 text-center">
              History &amp; Ratification
            </h2>
          </ScrollReveal>

          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-secondary/50 to-primary/50 md:-translate-x-px" />

            {timeline.map((item, i) => {
              const Icon = iconMap[item.icon] || Sparkles;
              return (
                <ScrollReveal key={item.year} delay={i * 0.15}>
                  <div
                    className={`relative flex items-start mb-12 ${
                      i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    <div className="absolute left-6 md:left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1.5 mt-6 z-10 shadow-lg shadow-primary/30" />
                    <div
                      className={`ml-14 md:ml-0 md:w-[45%] ${
                        i % 2 === 0 ? "md:pr-12" : "md:pl-12"
                      }`}
                    >
                      <div className="p-6 bg-card rounded-2xl border border-border card-hover">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 rounded-lg bg-primary/10 text-primary">
                            <Icon size={18} />
                          </div>
                          <span className="text-xs font-mono text-primary font-semibold">
                            {item.year}
                          </span>
                        </div>
                        <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-text-secondary leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== HIGHLIGHTS ==================== */}
      <section className="py-24 grid-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm font-mono text-primary mb-2 uppercase tracking-widest">
                // 2025_2026
              </p>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text-primary">
                First Year Highlights
              </h2>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((item) => {
              const Icon = iconMap[item.icon] || Server;
              return (
                <StaggerItem key={item.title}>
                  <div className="p-6 bg-card rounded-2xl border border-border card-hover h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <Icon size={20} />
                      </div>
                      <h3 className="text-lg font-heading font-semibold text-text-primary">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ==================== ARCHITECTURE DIAGRAM ==================== */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
             <div className="text-center mb-16">
                <p className="text-sm font-mono text-secondary mb-2 uppercase tracking-widest">
                  // system_architecture
                </p>
                <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text-primary">
                  How the Cluster Works
                </h2>
                <p className="mt-4 text-text-secondary max-w-2xl mx-auto">
                    The path of a supercomputing job—from a local terminal at Queen&apos;s to a high-density compute node.
                </p>
             </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="p-8 rounded-3xl bg-surface/30 border border-border overflow-hidden">
                <Mermaid 
                    chart={`
                        graph LR
                            User((User Terminal)) -->|SSH| Login[Login Node]
                            subgraph Cluster [Frontenac Cluster]
                                Login -->|Slurm srun/sbatch| Scheduler[Job Scheduler]
                                Scheduler -->|Allocate| Compute1[Compute Node A]
                                Scheduler -->|Allocate| Compute2[Compute Node B]
                                Compute1 <--- Infiniband ---> Storage[(Shared Storage)]
                                Compute2 <--- Infiniband ---> Storage
                            end
                            Compute1 -->|Result| User
                    `} 
                />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-sm font-mono text-primary mb-2 uppercase tracking-widest">
                // testimonials
              </p>
              <h2 className="text-3xl font-heading font-bold text-text-primary">
                What Members Say
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="relative p-8 sm:p-12 bg-card rounded-3xl border border-border">
              <Quote
                size={40}
                className="text-primary/20 absolute top-6 left-6"
              />

              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={currentTestimonial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="relative z-10 text-text-primary text-lg leading-relaxed italic"
                >
                  &ldquo;{testimonials[currentTestimonial].text}&rdquo;
                </motion.blockquote>
              </AnimatePresence>

              <p className="mt-4 text-sm text-text-muted">— QHPC Member</p>

              <div className="flex items-center justify-between mt-8">
                <button
                  onClick={prevTestimonial}
                  className="p-2 rounded-lg bg-surface hover:bg-primary/10 text-text-secondary hover:text-primary transition-all"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentTestimonial(i)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i === currentTestimonial
                          ? "bg-primary w-6"
                          : "bg-text-muted/30"
                      }`}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextTestimonial}
                  className="p-2 rounded-lg bg-surface hover:bg-primary/10 text-text-secondary hover:text-primary transition-all"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== STEWARDSHIP ==================== */}
      <section className="py-24 grid-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="p-8 sm:p-12 rounded-3xl glass border border-primary/10">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-xl bg-terminal-amber/10 text-terminal-amber shrink-0">
                  <Gift size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
                    Impact of the Dean&apos;s Donation
                  </h2>
                  <p className="text-xs font-mono text-text-muted">
                    Sci&apos;44 Fortieth Year Fund
                  </p>
                </div>
              </div>
              <p className="text-text-secondary leading-relaxed mb-6">
                The generous donation from the Sci&apos;44 Fortieth Year Fund was
                instrumental in QHPC&apos;s foundational year. It directly supported:
              </p>
              <ul className="space-y-2 text-sm text-text-secondary mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  Food and beverages for meetings and social events, increasing member involvement.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  A promotional banner stand used at club fairs and campus events.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  Raspberry Pis and network devices for the Pi Cluster Project.
                </li>
              </ul>

              <div className="section-divider my-6" />

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-terminal-red/10 text-terminal-red shrink-0">
                  <Heart size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-semibold text-text-primary mb-3">
                    Thank You
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    On behalf of the entire Queen&apos;s High-Performance Computing Club,
                    the executive team and its members extend their deepest gratitude to
                    the Sci&apos;44 Fortieth Year Fund donor and the Smith Engineering
                    Dean&apos;s Donation program.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
