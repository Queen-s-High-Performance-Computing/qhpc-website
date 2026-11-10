import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "ISC27 Student Cluster Competition",
  description: "QHPC's plans for the ISC27 Student Cluster Competition, important dates and training topics.",
  alternates: { canonical: "/competitions" },
};

const dates = [
  ["Applications close", "November 20, 2026"],
  ["Teams announced", "December 7, 2026"],
  ["Virtual competition", "March 8 – April 23, 2027"],
  ["Onsite event, Hamburg", "June 8–10, 2027"],
] as const;

export default function CompetitionsPage() {
  return (
    <div className="pt-20">
      <section className="grid-bg py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <SectionLabel>ISC27 · APPLICATIONS IN PROGRESS</SectionLabel>
          <h1 className="mb-5 text-4xl font-heading font-bold text-text-primary sm:text-5xl">Student Cluster Competition</h1>
          <p className="max-w-3xl text-lg leading-relaxed text-text-secondary">
            QHPC is preparing team applications for ISC27. Teams work on scientific computing workloads,
            benchmarks and cluster configuration. Participation is subject to the organizers&apos; selection process.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="https://isc-hpc.com/program/student-cluster-competition/" target="_blank" rel="noopener noreferrer" className="qhpc-button qhpc-button--primary">Official competition details <ArrowUpRight size={16} /></a>
            <Link href="/contact" className="qhpc-button qhpc-button--outline">Ask about QHPC&apos;s teams <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
      <section className="py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[1.15fr_0.85fr] sm:px-6 lg:px-8">
          <div>
            <SectionLabel>OUR PREPARATION</SectionLabel>
            <h2 className="mt-3 text-2xl font-heading font-semibold text-text-primary">What members are working on</h2>
            <ul className="mt-5 space-y-4 text-sm leading-relaxed text-text-secondary">
              <li><strong className="text-text-primary">Linux and cluster setup:</strong> software environments, SSH, resource allocation and Slurm.</li>
              <li><strong className="text-text-primary">Benchmarks and applications:</strong> measuring performance, understanding bottlenecks and recording reproducible results.</li>
              <li><strong className="text-text-primary">Team coordination:</strong> dividing technical tasks, documenting tests and explaining design decisions.</li>
            </ul>
            <Link href="/workshops" className="home-text-link mt-6">Start with the workshop guides <ArrowRight size={15} /></Link>
          </div>
          <div className="rounded-2xl border border-border bg-surface-light p-6 sm:p-8">
            <h2 className="text-xl font-heading font-semibold text-text-primary">ISC27 dates</h2>
            <dl className="mt-5 divide-y divide-border">
              {dates.map(([label, date]) => (
                <div key={label} className="flex flex-col gap-1 py-3 first:pt-0 sm:flex-row sm:justify-between sm:gap-4">
                  <dt className="text-sm text-text-secondary">{label}</dt>
                  <dd className="text-sm font-medium text-text-primary sm:text-right">{date}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-xs text-text-muted">Organizer schedule. QHPC has not announced selection.</p>
          </div>
        </div>
      </section>
      <section className="border-t border-border bg-surface-light py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div><h2 className="text-xl font-heading font-semibold text-text-primary">Interested in supporting competition preparation?</h2><p className="mt-2 text-sm text-text-secondary">We welcome technical mentorship and discussions about equipment or potential travel support.</p></div>
          <Link href="/sponsors" className="qhpc-button qhpc-button--primary">Partnership information <ArrowRight size={16} /></Link>
        </div>
      </section>
    </div>
  );
}
