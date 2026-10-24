import type { Metadata } from "next";
import { BookOpen, Boxes, Cpu, GitBranch, Network, Server, Terminal } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SurfaceCard } from "@/components/ui/SurfaceCard";

export const metadata: Metadata = {
  title: "Workshops and Learning",
  description: "Explore QHPC's hands-on learning in Linux, clusters, parallel computing, and reproducible experiments.",
  alternates: { canonical: "/workshops" },
};

const learningAreas = [
  { icon: Terminal, title: "Linux and development tools", description: "Build confidence with the command line, Git, compilers, libraries, and software environments." },
  { icon: Network, title: "Remote computing", description: "Learn how SSH connects your computer to shared systems and how to work safely in a remote environment." },
  { icon: Server, title: "Clusters and job scheduling", description: "Understand nodes, shared resources, and how Slurm schedules work on a cluster." },
  { icon: Cpu, title: "Parallel computing", description: "Explore CPUs, GPUs, processes, threads, shared-memory programming, and distributed workloads." },
  { icon: Boxes, title: "Applications and systems", description: "Connect computing concepts to real workloads, containers, virtual machines, and small cluster projects." },
  { icon: GitBranch, title: "Performance and reproducibility", description: "Practice benchmarking, profiling, experiment design, debugging, and documenting results." },
];

export default function WorkshopsPage() {
  return (
    <main className="pt-20">
      <section className="py-20 grid-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionLabel>START WITH THE BASICS · BUILD TOWARD HPC</SectionLabel>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-text-primary mb-6">Learn by doing</h1>
          <p className="text-lg text-text-secondary leading-relaxed max-w-3xl">
            QHPC&apos;s 2026–27 learning materials take members from computer and Linux fundamentals toward working with shared clusters, parallel programs, and real workloads. You can join with different levels of experience and build skills one step at a time.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-start gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"><BookOpen size={21} aria-hidden="true" /></span>
            <div>
              <h2 className="text-2xl font-heading font-semibold text-text-primary">A practical learning path</h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-text-secondary">The club&apos;s learning resources combine short explanations with guided exercises, checkpoints, and project work.</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {learningAreas.map(({ icon: Icon, title, description }) => (
              <SurfaceCard key={title} className="p-6">
                <span className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary"><Icon size={21} aria-hidden="true" /></span>
                <h3 className="mb-2 text-lg font-heading font-semibold text-text-primary">{title}</h3>
                <p className="text-sm leading-relaxed text-text-secondary">{description}</p>
              </SurfaceCard>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-text-muted">Topics reflect QHPC&apos;s current learning materials. Meeting dates and activities may change; contact the club for current details.</p>
        </div>
      </section>

      <section className="border-t border-border bg-surface-light py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <SectionLabel>OPEN LEARNING MATERIALS</SectionLabel>
            <h2 className="text-2xl font-heading font-semibold text-text-primary">Explore the guides and activities.</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-secondary">The QHPC Meetings repository includes Linux, virtual machine and container activities, plus guides to SSH and Slurm.</p>
          </div>
          <a href="https://github.com/Queen-s-High-Performance-Computing/qhpc-meetings" target="_blank" rel="noopener noreferrer" className="qhpc-button qhpc-button--outline">Visit QHPC Meetings</a>
        </div>
      </section>
    </main>
  );
}
