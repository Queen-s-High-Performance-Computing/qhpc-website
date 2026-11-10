import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Terminal, Server, Users } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SurfaceCard } from "@/components/ui/SurfaceCard";

export const metadata: Metadata = {
  title: "About QHPC",
  description: "What Queen's High Performance Computing Club does, who can join, and how members learn.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      <section className="grid-bg py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <SectionLabel>ABOUT THE CLUB</SectionLabel>
          <h1 className="mb-5 text-4xl font-heading font-bold text-text-primary sm:text-5xl">What is QHPC?</h1>
          <p className="max-w-3xl text-lg leading-relaxed text-text-secondary">
            We&apos;re a Queen&apos;s University student club focused on high-performance computing (HPC):
            running programs across powerful computers, understanding how clusters are organized,
            and measuring how software uses hardware.
          </p>
        </div>
      </section>
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionLabel>WHAT MEMBERS DO</SectionLabel>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <SurfaceCard className="p-6">
              <Terminal size={22} className="mb-4 text-primary" />
              <h2 className="text-xl font-heading font-semibold text-text-primary">Learn the tools</h2>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">Work through Linux, SSH, Slurm, benchmarking and profiling exercises. Guides are available publicly.</p>
              <Link href="/workshops" className="home-text-link mt-5">View workshops <ArrowRight size={15} /></Link>
            </SurfaceCard>
            <SurfaceCard className="p-6">
              <Server size={22} className="mb-4 text-primary" />
              <h2 className="text-xl font-heading font-semibold text-text-primary">Work on hardware</h2>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">Help set up a five-board Raspberry Pi learning cluster and test the software needed to run it.</p>
              <Link href="/projects" className="home-text-link mt-5">See the Pi project <ArrowRight size={15} /></Link>
            </SurfaceCard>
            <SurfaceCard className="p-6">
              <Users size={22} className="mb-4 text-primary" />
              <h2 className="text-xl font-heading font-semibold text-text-primary">Prepare as a team</h2>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">Practice cluster administration and application performance for student competitions, including our ISC27 applications.</p>
              <Link href="/competitions" className="home-text-link mt-5">Competition plans <ArrowRight size={15} /></Link>
            </SurfaceCard>
          </div>
        </div>
      </section>
      <section className="border-t border-border bg-surface-light py-14 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-[1.3fr_1fr] md:items-center sm:px-6">
          <div>
            <SectionLabel>WHO CAN JOIN</SectionLabel>
            <h2 className="mt-3 text-2xl font-heading font-semibold text-text-primary">You don&apos;t need HPC experience.</h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              Students interested in software, hardware, mathematics or scientific computing can start with the published guides. Some advanced activities require training or approved computing access.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link href="/join" className="qhpc-button qhpc-button--primary">How to join <ArrowRight size={16} /></Link>
            <Link href="/team" className="qhpc-button qhpc-button--outline">Meet the team</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
