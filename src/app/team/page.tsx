import React from "react";
import { Metadata } from "next";
import { ScrollReveal } from "@/components/ScrollReveal";
import { TeamContent } from "./TeamContent";

export const metadata: Metadata = {
  title: "Meet the Team",
  description: "The faculty, mentors, and student executives leading the Queen's High‑Performance Computing Club.",
  alternates: {
    canonical: "/team",
  },
};

const facultyAdvisor = {
  name: "Dr. Ryan Grant",
  role: "Faculty Advisor",
  description:
    "Professor at Queen's University, expert in HPC, networking, and cluster competitions. Formerly at Sandia National Laboratories.",
  nodeType: "head-node",
};

const gradMentors = [
  {
    name: "Curtis Shorts",
    role: "Graduate Mentor",
    description:
      "Advises on technical development, competition strategies, mock competitions, server administration, and vendor outreach.",
  },
  {
    name: "Elizabeth Reid",
    role: "Graduate Mentor",
    description:
      "Supports workshops, parallel programming, application optimisation, and technical content.",
  },
];

const execTeam = [
  {
    name: "Trask Smith",
    role: "President",
    status: "active",
  },
  {
    name: "Robert Zielinski",
    role: "Technical Lead",
    status: "active",
  },
  {
    name: "Johnnie Tse",
    role: "Administrative Lead",
    status: "active",
  },
  {
    name: "Open Position",
    role: "HR Lead",
    status: "available",
    isOpen: true,
  },
  {
    name: "Open Position",
    role: "Outreach & Admin Lead",
    status: "available",
    isOpen: true,
  },
  {
    name: "Open Position",
    role: "Financial & Sponsorships Lead",
    status: "available",
    isOpen: true,
  },
];

const coFounders = ["Trask Smith", "Robert Zielinski", "Johnnie Tse"];

export default function TeamPage() {
  return (
    <div className="pt-20">
      {/* ==================== HEADER ==================== */}
      <section className="py-20 grid-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <p className="text-sm font-mono text-primary mb-3 uppercase tracking-widest">
              // root: exec_nodes
            </p>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-text-primary mb-6">
              Leadership &amp; Mentorship
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Driven by a shared passion for distributed systems and supercomputing
              excellence at Queen&apos;s University.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <TeamContent 
        facultyAdvisor={facultyAdvisor}
        gradMentors={gradMentors}
        execTeam={execTeam}
        coFounders={coFounders}
      />
    </div>
  );
}

