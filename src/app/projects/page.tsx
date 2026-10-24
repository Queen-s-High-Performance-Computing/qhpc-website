import type { Metadata } from "next";
import { Activity, BarChart3, Cpu, Network, Repeat2, Server, Workflow } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SurfaceCard } from "@/components/ui/SurfaceCard";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore QHPC's high-performance computing project ideas and hands-on systems work.",
  alternates: { canonical: "/projects" },
};

const projectIdeas = [
  { icon: Cpu, title: "CPU-only AI inference", description: "Compare ways to run language-model workloads on CPUs, looking at throughput, latency, and energy use." },
  { icon: BarChart3, title: "Model size and quantization", description: "Explore how reducing model precision can change memory needs, response quality, and inference speed." },
  { icon: Network, title: "A small retrieval system", description: "Build a local search-and-answer prototype and evaluate how well it finds relevant material." },
  { icon: Activity, title: "Energy-aware scheduling", description: "Use simulation to explore how scheduling choices could respond to changing workload and energy conditions." },
  { icon: Workflow, title: "OpenMP scaling and bottlenecks", description: "Measure how a shared-memory program responds to additional CPU threads and where performance stops scaling." },
  { icon: Network, title: "MPI placement and scaling", description: "Explore how process placement and communication affect a distributed workload." },
  { icon: Server, title: "A small cluster bring-up", description: "Connect small computers and learn about the networking and software layers that make a cluster work." },
  { icon: Repeat2, title: "A reusable benchmark workflow", description: "Create repeatable steps for running workloads, collecting measurements, and comparing configurations." },
];

export default function ProjectsPage() {
  return (
    <div className="pt-20">
      <section className="py-20 grid-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionLabel>LEARN · BUILD · MEASURE</SectionLabel>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-text-primary mb-6">Projects at QHPC</h1>
          <p className="text-lg text-text-secondary leading-relaxed max-w-3xl">
            High-performance computing spans hardware, software, and the questions we can ask with them. These examples range from small software studies to distributed-systems experiments. Each is a possible direction that interested students could shape into a project.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {projectIdeas.map(({ icon: Icon, title, description }) => (
              <SurfaceCard key={title} className="p-6">
                <span className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary"><Icon size={21} aria-hidden="true" /></span>
                <span className="mb-3 inline-flex w-fit rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-primary">Idea to explore</span>
                <h2 className="mb-2 text-lg font-heading font-semibold text-text-primary">{title}</h2>
                <p className="text-sm leading-relaxed text-text-secondary">{description}</p>
              </SurfaceCard>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-text-muted">
            These are ideas, not a list of active or completed projects. A project&apos;s scope and timing would depend on member interest, equipment, and access to computing resources. Ask QHPC about current activities.
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
    </div>
  );
}
