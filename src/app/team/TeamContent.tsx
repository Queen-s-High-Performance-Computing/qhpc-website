"use client";

import React from "react";
import {
  Crown,
  Code,
  Briefcase,
  Plus,
  LucideIcon,
} from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";

interface Member {
  name: string;
  role: string;
  icon?: LucideIcon;
  status: string;
  isOpen?: boolean;
}

interface Mentor {
  name: string;
  role: string;
  description: string;
}

export function TeamContent({ 
  facultyAdvisor, 
  gradMentors, 
  execTeam, 
  coFounders 
}: { 
  facultyAdvisor: any, 
  gradMentors: Mentor[], 
  execTeam: Member[], 
  coFounders: string[] 
}) {
  return (
    <>
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-8">
              <p className="text-xs font-mono text-terminal-green mb-2">
                HEAD_NODE — Online
              </p>
              <h2 className="text-2xl font-heading font-bold text-text-primary">
                Faculty Advisor
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="max-w-xl mx-auto p-8 bg-card rounded-2xl border border-primary/30 card-hover animate-pulse-glow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xl font-heading font-bold">
                  RG
                </div>
                <div>
                  <h3 className="text-xl font-heading font-semibold text-text-primary">
                    {facultyAdvisor.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="status-dot status-active" />
                    <span className="text-xs font-mono text-terminal-green">
                      {facultyAdvisor.role}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                {facultyAdvisor.description}
              </p>
            </div>
          </ScrollReveal>

          <div className="flex justify-center my-6">
            <div className="w-px h-12 bg-gradient-to-b from-primary/50 to-secondary/50" />
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-8">
              <p className="text-xs font-mono text-secondary-light mb-2">
                GPU_NODES — Online
              </p>
              <h2 className="text-2xl font-heading font-bold text-text-primary">
                Graduate Student Mentors
              </h2>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {gradMentors.map((mentor) => (
              <StaggerItem key={mentor.name}>
                <div className="p-6 bg-card rounded-2xl border border-secondary/20 card-hover h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-secondary-light flex items-center justify-center text-white text-sm font-heading font-bold">
                      {mentor.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <h3 className="text-lg font-heading font-semibold text-text-primary">
                        {mentor.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="status-dot status-active" />
                        <span className="text-xs font-mono text-text-muted">
                          {mentor.role}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {mentor.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="flex justify-center my-6">
            <div className="w-px h-12 bg-gradient-to-b from-secondary/50 to-primary/50" />
          </div>
        </div>
      </section>

      <section className="pb-24 grid-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-xs font-mono text-primary mb-2">
                COMPUTE_NODES — 2025‑2026 Executive Team
              </p>
              <h2 className="text-2xl font-heading font-bold text-text-primary">
                Executive Team
              </h2>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {execTeam.map((member) => (
              <StaggerItem key={member.role}>
                <div
                  className={`p-6 rounded-2xl border card-hover h-full ${
                    member.isOpen
                      ? "bg-surface/50 border-dashed border-text-muted/30"
                      : "bg-card border-border"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        member.isOpen
                          ? "bg-text-muted/10 text-text-muted"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {member.isOpen ? (
                        <Plus size={22} />
                      ) : (
                        <span className="text-sm font-heading font-bold">
                          {member.name.split(" ").map((n) => n[0]).join("")}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3
                        className={`text-lg font-heading font-semibold ${
                          member.isOpen
                            ? "text-text-muted"
                            : "text-text-primary"
                        }`}
                      >
                        {member.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span
                          className={`status-dot ${
                            member.isOpen ? "status-queued" : "status-active"
                          }`}
                        />
                        <span className="text-xs font-mono text-text-muted">
                          {member.role}
                        </span>
                      </div>
                    </div>
                  </div>
                  {member.isOpen && (
                    <p className="text-sm text-text-muted italic">
                      Position open for 2026‑27. Interested?{" "}
                      <a
                        href="mailto:QHPC@engsoc.queensu.ca"
                        className="text-primary hover:underline not-italic"
                      >
                        Apply here
                      </a>
                    </p>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <p className="text-xs font-mono text-primary mb-2 uppercase tracking-widest">
              // init_process
            </p>
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-8">
              Co‑Founders
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {coFounders.map((name) => (
                <div
                  key={name}
                  className="px-6 py-3 bg-card rounded-xl border border-primary/20 text-text-primary font-heading font-medium"
                >
                  {name}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
