import type { Metadata } from "next";
import { BookOpen, ExternalLink, Lightbulb } from "lucide-react";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SurfaceCard } from "@/components/ui/SurfaceCard";

export const metadata: Metadata = {
  title: "Resources",
  description: "Find QHPC's shared learning guides and project information.",
  alternates: { canonical: "/resources" },
};

const resources = [
  {
    icon: BookOpen,
    title: "QHPC Meetings",
    description: "Shared guides and activities for Linux, virtual machines, containers, SSH, Slurm, and cluster computing.",
    href: "https://github.com/Queen-s-High-Performance-Computing/qhpc-meetings",
    label: "Browse learning materials",
    external: true,
  },
  {
    icon: Lightbulb,
    title: "Project ideas",
    description: "Browse possible project directions in the 2026–27 materials. Ideas are presented as possibilities, not completed work.",
    href: "/projects",
    label: "Browse project ideas",
    external: false,
  },
];

export default function ResourcesPage() {
  return (
    <div className="pt-20">
      <section className="py-20 grid-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionLabel>GUIDES · PROJECTS · REFERENCES</SectionLabel>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-text-primary mb-6">QHPC resources</h1>
          <p className="text-lg text-text-secondary leading-relaxed max-w-3xl">
            Start with the club&apos;s shared learning guides, then explore project ideas as your interests grow.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid gap-4 md:grid-cols-2">
            {resources.map(({ icon: Icon, title, description, href, label, external }) => (
              <SurfaceCard key={title} className="flex flex-col p-6 sm:p-8">
                <span className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary"><Icon size={21} aria-hidden="true" /></span>
                <h2 className="mb-2 text-xl font-heading font-semibold text-text-primary">{title}</h2>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-text-secondary">{description}</p>
                {external ? (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="home-text-link">{label}<ExternalLink size={14} aria-hidden="true" /></a>
                ) : (
                  <Link href={href} className="home-text-link">{label}<ExternalLink size={14} aria-hidden="true" /></Link>
                )}
              </SurfaceCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
