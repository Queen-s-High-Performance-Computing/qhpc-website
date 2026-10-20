import React from "react";
import { Metadata } from "next";
import {
  Calendar,
  Award,
  BookOpen,
  Users,
  Sparkles,
  Server,
} from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "About Our High-Performance Computing Club",
  description: "The history, mission, and highlights of QHPC — the first ratified supercomputing team at Queen's University.",
  alternates: {
    canonical: "/about",
  },
};

const timeline = [
  {
    year: "2023",
    title: "Origins & Vision",
    description:
      "Faculty advisor Dr. Ryan Grant gathered students interested in Student Cluster Competitions. The team began preparing charters, safety plans, and budgets.",
    icon: "Sparkles",
  },
  {
    year: "2024",
    title: "Strategic Pivoting",
    description:
      "The group sought initial ratification. While the first effort didn't succeed, the team re-strategized to meet Engineering Society standards.",
    icon: "BookOpen",
  },
  {
    year: "Jan 2025",
    title: "EngSoc Ratification",
    description:
      "QHPC was officially ratified as a Design Team under the Queen's Engineering Society, securing its place as a permanent student organization.",
    icon: "Award",
  },
  {
    year: "Sep 2025",
    title: "Launch & Growth",
    description:
      "Operations began with 40+ members, weekly workshops in Dunning 10, and high-density computing projects like the Raspberry Pi Cluster.",
    icon: "Users",
  },
];

const highlights = [
  {
    icon: "BookOpen",
    title: "HPC Training Workshops",
    description:
      "A structured curriculum covering Linux, parallel programming (MPI), and cluster hardware.",
  },
  {
    icon: "Calendar",
    title: "Learning Sprints",
    description:
      "Four-week project cycles where small teams tackle emerging HPC technologies and document results.",
  },
  {
    icon: "Server",
    title: "Active Cluster Computing",
    description:
      "Hands-on experience running scientific jobs on the CAC Frontenac cluster.",
  },
  {
    icon: "Users",
    title: "Industry Connections",
    description:
      "Guest speaker sessions with experts from NVIDIA, Sandia National Labs, and Lawrence Livermore.",
  },
  {
    icon: "Server",
    title: "Distributed Systems Lab",
    description:
      "Building a custom 5-node Raspberry Pi cluster to learn network booting and shared storage.",
  },
  {
    icon: "Award",
    title: "Competitive Readiness",
    description:
      "Simulated 48-hour competitions to prepare for the global Student Cluster Competition.",
  },
];


const testimonials = [
  {
    text: "My experience with QHPC has been really helpful. I've been getting the hang of using SLURM, writing batch scripts, and running jobs on the cluster. It's real-world parallel computing experience.",
  },
  {
    text: "I'd definitely recommend QHPC. It's a supportive environment where you can grow technically. The mentors are helpful and there are lots of skills to build.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* ==================== HEADER ==================== */}
      <section className="py-20 grid-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <p className="text-sm font-mono text-primary mb-3 uppercase tracking-widest">
              // root: about_us
            </p>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-text-primary mb-6">
              Our Journey in Supercomputing
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
              Building the future of high-performance computing leaders at Queen&apos;s University
              through hands-on engineering and community stewardship.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <AboutContent 
        timeline={timeline} 
        highlights={highlights} 
        testimonials={testimonials} 
      />
    </div>
  );
}

