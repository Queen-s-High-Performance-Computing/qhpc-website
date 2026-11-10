import type { Metadata } from "next";
import { ArrowUpRight, BookOpen, GitBranch, Server } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SurfaceCard } from "@/components/ui/SurfaceCard";

export const metadata: Metadata = {
  title: "Resources",
  description: "QHPC's GitHub workshop repository, public code and links to Queen's research computing documentation.",
  alternates: { canonical: "/resources" },
};

const resources = [
  { icon: BookOpen, title: "Workshop exercises", description: "Linux and containers, STREAM benchmarking, and C profiling material from QHPC meetings.", href: "https://github.com/Queen-s-High-Performance-Computing/qhpc-meetings", linkLabel: "View meeting guides" },
  { icon: GitBranch, title: "QHPC GitHub", description: "The club's public code repositories, including the website and workshop materials.", href: "https://github.com/Queen-s-High-Performance-Computing", linkLabel: "Browse repositories" },
  { icon: Server, title: "Queen's Centre for Advanced Computing", description: "Official research computing information and access requirements. Access to shared systems must be authorized.", href: "https://cac.queensu.ca/systems/traditional-hpc/", linkLabel: "CAC documentation" },
];

export default function ResourcesPage() {
  return (
    <div className="pt-20">
      <section className="grid-bg py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <SectionLabel>RESOURCES</SectionLabel>
          <h1 className="mb-5 text-4xl font-heading font-bold text-text-primary sm:text-5xl">Guides, code and cluster documentation</h1>
          <p className="max-w-3xl text-lg leading-relaxed text-text-secondary">Direct links to materials members use. For a recommended starting order, visit the Workshops page.</p>
        </div>
      </section>
      <section className="py-14 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 md:grid-cols-3 sm:px-6">
          {resources.map(({ icon: Icon, title, description, href, linkLabel }) => (
            <SurfaceCard key={title} className="flex h-full flex-col p-7">
              <Icon size={23} className="mb-4 text-primary" aria-hidden="true" />
              <h2 className="text-xl font-heading font-semibold text-text-primary">{title}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">{description}</p>
              <a href={href} target="_blank" rel="noopener noreferrer" className="home-text-link mt-6">{linkLabel} <ArrowUpRight size={15} /></a>
            </SurfaceCard>
          ))}
        </div>
      </section>
    </div>
  );
}
