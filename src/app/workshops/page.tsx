import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { publishedGuides } from "@/content/workshops";

export const metadata: Metadata = {
  title: "Workshops and Learning",
  description: "Start with QHPC's published Linux, STREAM benchmarking and profiling workshop exercises.",
  alternates: { canonical: "/workshops" },
};

export default function WorkshopsPage() {
  return (
    <div className="pt-20">
      <section className="grid-bg py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <SectionLabel>LEARNING</SectionLabel>
          <h1 className="mb-5 text-4xl font-heading font-bold text-text-primary sm:text-5xl">Workshops you can actually run</h1>
          <p className="max-w-3xl text-lg leading-relaxed text-text-secondary">
            These guides are published in the QHPC Meetings repository. Start with Linux tools,
            then explore benchmarks and profiling. You can follow along independently or at a club session.
          </p>
        </div>
      </section>
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionLabel>OPEN GUIDES</SectionLabel>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {publishedGuides.map(({ title, description, href }, index) => (
              <SurfaceCard key={title} className="flex h-full flex-col p-6">
                <span className="font-mono text-xs text-primary">0{index + 1}</span>
                <h2 className="mt-3 text-xl font-heading font-semibold text-text-primary">{title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">{description}</p>
                <a href={href} target="_blank" rel="noopener noreferrer" className="home-text-link mt-6">Open on GitHub <ExternalLink size={15} aria-hidden="true" /></a>
              </SurfaceCard>
            ))}
          </div>
          <p className="mt-5 max-w-3xl text-sm text-text-muted">The STREAM exercises use Queen&apos;s Centre for Advanced Computing resources and require an approved account. You can start the Linux exercises without cluster access.</p>
        </div>
      </section>
      <section className="border-t border-border bg-surface-light py-14">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div><SectionLabel>IN-PERSON LEARNING</SectionLabel><h2 className="mt-2 text-2xl font-heading font-semibold text-text-primary">Join a member session</h2><p className="mt-2 max-w-xl text-sm text-text-secondary">Fall member meetings are scheduled for Mondays at 6 PM. Check with the club for the room and current schedule.</p></div>
          <Link href="/join" className="qhpc-button qhpc-button--primary">How to join <ArrowRight size={16} /></Link>
        </div>
      </section>
    </div>
  );
}
