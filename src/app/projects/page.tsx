import type { Metadata } from "next";
import { Activity, BarChart3, Cpu, Image, Network, Repeat2, Server, Workflow } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SurfaceCard } from "@/components/ui/SurfaceCard";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore QHPC's high-performance computing project ideas and hands-on systems work.",
  alternates: { canonical: "/projects" },
};

const projectIdeas = [
  { icon: Activity, title: "OpenMP scaling and bottlenecks", description: "Measure how a shared-memory program responds to additional CPU threads and identify where performance stops scaling." },
  { icon: Network, title: "MPI placement and scaling", description: "Explore how process placement and communication affect distributed workloads." },
  { icon: BarChart3, title: "HPL and HPCG benchmarks", description: "Use established benchmarks to study what different measures of system performance reveal." },
  { icon: Cpu, title: "GPU workloads and inference", description: "Investigate how hardware and workload choices affect accelerated computing and model inference." },
  { icon: Image, title: "Large image batch processing", description: "Design a parallel workflow for processing a collection of images and compare its behavior as the work grows." },
  { icon: Server, title: "Raspberry Pi cluster bring-up", description: "Connect small computers into a cluster and learn about the network and software layers that make it work." },
  { icon: Workflow, title: "A reusable benchmark harness", description: "Build repeatable tools for running workloads, collecting measurements, and comparing configurations." },
  { icon: Repeat2, title: "Reproducing an HPC result", description: "Recreate a published computational result and document the steps and conditions needed to reproduce it." },
];

export default function ProjectsPage() {
  return (
    <main className="pt-20">
      <section className="py-20 grid-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionLabel>LEARN · BUILD · MEASURE</SectionLabel>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-text-primary mb-6">Projects at QHPC</h1>
          <p className="text-lg text-text-secondary leading-relaxed max-w-3xl">
            High-performance computing spans hardware, software, and the questions we can ask with them. QHPC&apos;s 2026–27 planning materials collect project ideas members can explore in small teams, from building a cluster to measuring parallel performance.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {projectIdeas.map(({ icon: Icon, title, description }) => (
              <SurfaceCard key={title} className="p-6">
                <span className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary"><Icon size={21} aria-hidden="true" /></span>
                <h2 className="mb-2 text-lg font-heading font-semibold text-text-primary">{title}</h2>
                <p className="text-sm leading-relaxed text-text-secondary">{description}</p>
              </SurfaceCard>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-text-muted">
            These are project directions from the 2026–27 planning materials, not a claim that every project is currently underway. Scope and timing depend on member interest, available equipment, and access to computing resources.
          </p>
        </div>
      </section>

      <section className="border-t border-border bg-surface-light py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <SectionLabel>HANDS-ON LEARNING</SectionLabel>
            <h2 className="text-2xl font-heading font-semibold text-text-primary">Start with a guide, then make it your own.</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-secondary">Browse shared meeting activities and starter guides in the QHPC Meetings repository.</p>
          </div>
          <a href="https://github.com/Queen-s-High-Performance-Computing/qhpc-meetings" target="_blank" rel="noopener noreferrer" className="qhpc-button qhpc-button--outline">Explore meeting guides</a>
        </div>
      </section>
    </main>
  );
}
