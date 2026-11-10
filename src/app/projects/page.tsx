import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Cpu,
  Server,
  Network,
  BarChart3,
  Workflow,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { projectIdeas } from "@/content/projects";
import { RaspberryPiRackViewer } from "@/components/projects/RaspberryPiRackViewer";

export const metadata: Metadata = {
  title: "Projects and Infrastructure",
  description:
    "Discover QHPC's five-board Raspberry Pi teaching cluster, performance benchmarking materials, and project directions.",
  alternates: { canonical: "/projects" },
};

const projectIcons = { Cpu, Server, Network, BarChart3, Workflow };

export default function ProjectsPage() {
  return (
    <div className="pt-20">
      <section className="py-20 grid-bg">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <SectionLabel>HARDWARE · SYSTEMS · PERFORMANCE</SectionLabel>
          <h1 className="mb-6 text-4xl font-heading font-bold text-text-primary sm:text-5xl">
            Projects
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-text-secondary">
            Our main hardware project is a five-board Raspberry Pi cluster. Below are the assembled rack, our current setup work and a few possible follow-up exercises.
          </p>
        </div>
      </section>

      <section id="pi-cluster" className="scroll-mt-24 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionLabel>FEATURED · ACTIVE BUILD</SectionLabel>
          <div className="mb-8 grid items-end gap-4 md:grid-cols-[1.35fr_1fr]">
            <h2 className="text-3xl font-heading font-semibold text-text-primary sm:text-4xl">
              Five Raspberry Pis, one learning cluster.
            </h2>
            <p className="text-sm leading-relaxed text-text-secondary">
              We assembled the white rack with removable Pi trays and a vertical eight-port Ethernet switch. We&apos;re configuring the boards and preparing exercises for members.
            </p>
          </div>
          <RaspberryPiRackViewer />
          <div id="rack-photos" className="mt-9 scroll-mt-24">
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="text-xl font-heading font-semibold text-text-primary">The assembled rack</h3>
              <p className="text-xs leading-relaxed text-text-secondary">Photos of the five-board build</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <figure className="overflow-hidden rounded-2xl border border-border bg-surface-raised">
                <div className="relative aspect-[4/5] overflow-hidden bg-surface-light">
                  <Image src="/projects/qhpc-rack-img-3168-2026.webp" alt="White 3D-printed QHPC rack holding five Raspberry Pis with the vertical TP-Link switch installed in the right bay" fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover object-center" />
                </div>
                <figcaption className="p-4 text-sm text-text-secondary">Five Raspberry Pi trays and the vertical switch.</figcaption>
              </figure>
              <figure className="overflow-hidden rounded-2xl border border-border bg-surface-raised">
                <div className="relative aspect-[4/5] overflow-hidden bg-surface-light">
                  <Image src="/projects/qhpc-rack-img-3163-2026.webp" alt="QHPC Raspberry Pi rack with five Ethernet cables connected from the Pi boards to the side-mounted switch" fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover object-center" />
                </div>
                <figcaption className="p-4 text-sm text-text-secondary">The side panel, QHPC emblem and Ethernet cabling.</figcaption>
              </figure>
            </div>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            <SurfaceCard className="p-6">
              <Cpu size={22} className="mb-4 text-primary" />
              <h3 className="font-heading text-lg font-semibold text-text-primary">Hardware</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                Five Raspberry Pi boards, power supplies, an eight-port Gigabit switch and a 3D-printed rack with removable trays.
              </p>
            </SurfaceCard>
            <SurfaceCard className="p-6">
              <Network size={22} className="mb-4 text-primary" />
              <h3 className="font-heading text-lg font-semibold text-text-primary">Current setup work</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                Preparing boot media, connecting the boards through Ethernet, setting up SSH and planning repeatable workshop configurations.
              </p>
            </SurfaceCard>
            <SurfaceCard className="p-6">
              <Server size={22} className="mb-4 text-primary" />
              <h3 className="font-heading text-lg font-semibold text-text-primary">Workshop goal</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                Let members bring up a small Linux cluster themselves, troubleshoot it and run introductory distributed jobs.
              </p>
            </SurfaceCard>
          </div>

        </div>
      </section>

      <section className="border-t border-border bg-surface-light py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <SectionLabel>POSSIBLE NEXT EXERCISES</SectionLabel>
              <h2 className="mt-3 text-3xl font-heading font-semibold text-text-primary sm:text-4xl">
                What we could try next
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-text-secondary">
              These are possible student exercises, not projects we are claiming to have completed.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {projectIdeas.map(({ title, description, icon }) => {
              const Icon = projectIcons[icon as keyof typeof projectIcons] ?? Cpu;
              return (
                <SurfaceCard key={title} className="p-6">
                  <Icon size={22} className="mb-4 text-primary" />
                  <h3 className="text-xl font-heading font-semibold text-text-primary">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">{description}</p>

                </SurfaceCard>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="rounded-2xl border border-border p-7 sm:p-10">
            <SectionLabel>OPEN LEARNING</SectionLabel>
            <h2 className="mt-3 text-2xl font-heading font-semibold text-text-primary">
              Want to help with the cluster?
            </h2>
            <p className="mt-3 max-w-3xl text-sm text-text-secondary">
              Start with a published workshop, then contact the club about joining the hardware setup or a related performance experiment.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/workshops" className="qhpc-button qhpc-button--primary">
                See workshops <ArrowRight size={16} />
              </Link>
              <a
                href="https://github.com/Queen-s-High-Performance-Computing/qhpc-meetings"
                target="_blank"
                rel="noopener noreferrer"
                className="qhpc-button qhpc-button--secondary"
              >
                Browse GitHub resources <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
