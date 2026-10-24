import type { Metadata } from "next";
import { ArrowRight, BookOpen, Cpu, Handshake, Network } from "lucide-react";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SurfaceCard } from "@/components/ui/SurfaceCard";

export const metadata: Metadata = {
  title: "About QHPC",
  description: "Meet Queen's High Performance Computing Club and learn what members explore together.",
  alternates: { canonical: "/about" },
};

const pillars = [
  { icon: BookOpen, title: "Learn together", description: "Build practical skills in Linux, parallel programming, cluster systems, and performance analysis." },
  { icon: Cpu, title: "Explore computing systems", description: "Learn how hardware, software, and workloads work together through hands-on projects and benchmarks." },
  { icon: Network, title: "Connect ideas and people", description: "Bring students together across computing interests, from hardware and software to scientific workloads." },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      <section className="py-20 grid-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionLabel>QUEEN&apos;S UNIVERSITY · STUDENT CLUB</SectionLabel>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-text-primary mb-6">About QHPC</h1>
          <p className="text-lg text-text-secondary leading-relaxed max-w-3xl">
            Queen&apos;s High Performance Computing Club brings students together to learn how powerful computing systems are built and used. Members explore the tools, programming approaches, and workloads behind high-performance computing through guided learning and collaborative projects.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            {pillars.map(({ icon: Icon, title, description }) => (
              <SurfaceCard key={title} className="p-6 sm:p-8">
                <span className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary"><Icon size={21} aria-hidden="true" /></span>
                <h2 className="mb-3 text-xl font-heading font-semibold text-text-primary">{title}</h2>
                <p className="text-sm leading-relaxed text-text-secondary">{description}</p>
              </SurfaceCard>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface-light py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <div>
            <SectionLabel>WHAT WE EXPLORE</SectionLabel>
            <h2 className="text-2xl font-heading font-semibold text-text-primary">From foundations to bigger systems.</h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              Learning materials cover the command line and version control, remote access and job scheduling, parallel workloads, benchmarking, reproducible experiments, and small cluster systems. Project ideas let members apply those foundations in practice.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3">
              <Link href="/workshops" className="home-text-link">Explore the learning path <ArrowRight size={15} aria-hidden="true" /></Link>
              <Link href="/join" className="home-text-link">How to join <ArrowRight size={15} aria-hidden="true" /></Link>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-surface-raised p-6 sm:p-8">
            <Handshake size={24} className="mb-4 text-primary" aria-hidden="true" />
            <SectionLabel>FOR PARTNERS AND SUPPORTERS</SectionLabel>
            <h2 className="text-xl font-heading font-semibold text-text-primary">Help students explore computing.</h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              We welcome conversations with organizations interested in supporting student learning and practical computing exploration.
            </p>
            <Link href="/sponsors" className="home-text-link mt-5">Explore partnerships <ArrowRight size={15} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
