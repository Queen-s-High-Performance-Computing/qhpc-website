import type { Metadata } from "next";
import { BarChart3, Network, Server, Trophy } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SurfaceCard } from "@/components/ui/SurfaceCard";

export const metadata: Metadata = {
  title: "Competitions",
  description: "Learn how QHPC members prepare for student cluster competitions through hands-on HPC projects.",
  alternates: { canonical: "/competitions" },
};

const preparation = [
  { icon: Server, title: "Understand the system", description: "Get familiar with cluster hardware, Linux environments, networking, and job schedulers." },
  { icon: BarChart3, title: "Measure and tune", description: "Use benchmarks and real workloads to understand performance and improve a solution." },
  { icon: Network, title: "Work as a team", description: "Bring together systems, software, and workload knowledge to solve a shared technical challenge." },
];

export default function CompetitionsPage() {
  return (
    <div className="pt-20">
      <section className="py-20 grid-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionLabel>LEARN · PRACTISE · COMPETE</SectionLabel>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-text-primary mb-6">Student cluster competitions</h1>
          <p className="text-lg text-text-secondary leading-relaxed max-w-3xl">
            Student Cluster Competitions challenge teams to build, configure, and tune computing systems while solving workload and benchmark tasks. This page introduces the skills involved; it is not an announcement that QHPC has entered a competition.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <SectionLabel>WHAT THE CHALLENGE CAN INVOLVE</SectionLabel>
            <h2 className="text-2xl font-heading font-semibold text-text-primary">Computing is a team sport.</h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">These challenges bring together systems knowledge, workload tuning, and teamwork. Ask QHPC for the latest information about competition plans and related activities.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {preparation.map(({ icon: Icon, title, description }) => (
              <SurfaceCard key={title} className="p-6">
                <span className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary"><Icon size={21} aria-hidden="true" /></span>
                <h3 className="mb-2 text-lg font-heading font-semibold text-text-primary">{title}</h3>
                <p className="text-sm leading-relaxed text-text-secondary">{description}</p>
              </SurfaceCard>
            ))}
          </div>
          <div className="mt-10 flex items-center gap-4 rounded-2xl border border-border bg-surface-light p-6 sm:p-8">
            <span className="hidden h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary sm:grid"><Trophy size={22} aria-hidden="true" /></span>
            <div>
              <h2 className="text-xl font-heading font-semibold text-text-primary">A place to start</h2>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">Explore the project ideas and learning path that build toward cluster competitions.</p>
            </div>
            <a href="/projects" className="qhpc-button qhpc-button--outline ml-auto shrink-0">See projects</a>
          </div>
        </div>
      </section>
    </div>
  );
}
