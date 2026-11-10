import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Cpu, Network, Presentation, Trophy } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Support QHPC",
  description: "QHPC is seeking student-configurable computing hardware, technical mentorship and support for ISC27 preparation.",
  alternates: { canonical: "/sponsors" },
};

const needs = [
  {
    icon: Cpu,
    title: "Servers students can configure",
    description: "One or two usable multicore servers, donated or loaned, would let members install and manage a small Slurm/MPI cluster. Surplus machines without drives may still be useful.",
  },
  {
    icon: Network,
    title: "Networking equipment",
    description: "Spare 1/10GbE switches, NICs and compatible cabling would support local cluster experiments. We already have an eight-port switch for the Pi lab.",
  },
  {
    icon: Presentation,
    title: "Speakers and technical mentors",
    description: "HPC and infrastructure engineers can help with a guest workshop, project feedback or guidance on cluster setup and benchmarking.",
  },
  {
    icon: Trophy,
    title: "ISC27 preparation and possible travel",
    description: "Support for training, computing equipment and, if selected, travel for one six-student onsite team and an advisor to Hamburg.",
  },
];

export default function SponsorsPage() {
  return (
    <div className="pt-20">
      <section className="grid-bg py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <SectionLabel>SPONSORSHIP AND PARTNERSHIPS</SectionLabel>
          <h1 className="mb-5 text-4xl font-heading font-bold text-text-primary sm:text-5xl">Support hands-on computing at Queen&apos;s</h1>
          <p className="max-w-3xl text-lg leading-relaxed text-text-secondary">
            QHPC runs technical learning activities and is building a five-board Raspberry Pi lab.
            We&apos;re looking for equipment, expertise and funding that members can put to use directly.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={`mailto:${siteConfig.contact.email}?subject=QHPC%20Partnership%20Inquiry`} className="qhpc-button qhpc-button--primary">Contact the executive team <ArrowRight size={16} /></a>
            <Link href="/projects" className="qhpc-button qhpc-button--outline">See the current build <ArrowUpRight size={16} /></Link>
          </div>
        </div>
      </section>
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionLabel>WHAT WOULD HELP NOW</SectionLabel>
          <h2 className="mt-3 max-w-3xl text-2xl font-heading font-semibold text-text-primary sm:text-3xl">Four practical partnership opportunities</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {needs.map(({ icon: Icon, title, description }) => (
              <SurfaceCard key={title} className="p-7">
                <Icon size={23} className="mb-4 text-primary" aria-hidden="true" />
                <h3 className="text-xl font-heading font-semibold text-text-primary">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{description}</p>
              </SurfaceCard>
            ))}
          </div>
        </div>
      </section>
      <section className="border-t border-border bg-surface-light py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionLabel>WHY THE SUPPORT MATTERS</SectionLabel>
            <h2 className="mt-3 text-2xl font-heading font-semibold text-text-primary">Direct access to systems</h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              Members can use Queen&apos;s shared research-computing resources where authorized. Our hardware request is different:
              we want equipment students can configure, break, troubleshoot and rebuild themselves.
            </p>
          </div>
          <div>
            <SectionLabel>HOW A PARTNERSHIP WORKS</SectionLabel>
            <h2 className="mt-3 text-2xl font-heading font-semibold text-text-primary">We agree on a useful contribution first</h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              We can discuss equipment requirements, workshop topics, event participation and appropriate public recognition.
              Any deliverables and acknowledgement are agreed with each partner; no fixed tier or audience size is promised.
            </p>
            <a href={`mailto:${siteConfig.contact.email}?subject=QHPC%20Partnership%20Inquiry`} className="home-text-link mt-5">Email {siteConfig.contact.email} <ArrowRight size={15} /></a>
          </div>
        </div>
      </section>
    </div>
  );
}
