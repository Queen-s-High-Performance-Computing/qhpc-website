import type { Metadata } from "next";
import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { advisors, coPresidents, directors, type Person } from "@/content/team";

export const metadata: Metadata = {
  title: "2026–27 Executive Team",
  description: "Meet the 2026–27 executive team and advisors for Queen's High Performance Computing Club.",
  alternates: { canonical: "/team" },
};

const portraitClasses: Record<string, string> = {
  "alexandra-kaine.png": "scale-100",
  "alexandra-kaine-2026.png": "scale-100",
  "anthony-botticchio.png": "scale-[1.4] -translate-x-[9%] -translate-y-[5%]",
  "curtis-shorts.png": "scale-[1.22] -translate-y-[4%]",
  "ryan-grant.png": "scale-[1.22] -translate-y-[4%]",
};

function PersonCard({ person }: { person: Person }) {
  return (
    <SurfaceCard className="flex h-full flex-col items-center p-5 text-center sm:p-6">
      <div className="mb-4 h-28 w-28 shrink-0 overflow-hidden rounded-full border-2 border-primary/30 sm:h-32 sm:w-32">
        {/* Crop the original portraits' baked-in circular frames inside one centered frame. */}
        <Image
          src={`/team/${person.image}`}
          alt={`Portrait of ${person.name}`}
          width={192}
          height={192}
          className={`h-full w-full object-cover object-center ${portraitClasses[person.image] ?? "scale-[1.16]"}`}
        />
      </div>
      <h3 className="text-lg font-heading font-semibold text-text-primary">{person.name}</h3>
      <p className="mt-1 text-sm font-medium text-primary">{person.role}</p>
      {person.program && <p className="mt-2 text-xs leading-relaxed text-text-muted">{person.program}</p>}
    </SurfaceCard>
  );
}

function TeamSection({ title, people, columns }: { title: string; people: Person[]; columns: string }) {
  return (
    <section aria-labelledby={`team-${title.toLowerCase().replaceAll(" ", "-")}`}>
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <SectionLabel>QHPC · 2026–27</SectionLabel>
          <h2 id={`team-${title.toLowerCase().replaceAll(" ", "-")}`} className="text-2xl font-heading font-semibold text-text-primary">{title}</h2>
        </div>
        <p className="hidden text-sm text-text-muted sm:block">{people.length} {people.length === 1 ? "person" : "people"}</p>
      </div>
      <div className={`grid gap-4 ${columns}`}>
        {people.map((person) => <PersonCard key={person.name} person={person} />)}
      </div>
    </section>
  );
}

export default function TeamPage() {
  return (
    <div className="pt-20">
      <section className="py-20 grid-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionLabel>QUEEN&apos;S UNIVERSITY · STUDENT CLUB</SectionLabel>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-text-primary mb-6">Meet the 2026–27 Executive Team</h1>
          <p className="text-lg text-text-secondary leading-relaxed max-w-3xl">
            The 2026–27 student executive team and advisors. For club questions, use the Contact page.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-14 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <TeamSection title="Co-Presidents" people={coPresidents} columns="sm:grid-cols-2" />
        <TeamSection title="Directors" people={directors} columns="sm:grid-cols-2 lg:grid-cols-3" />
        <TeamSection title="Advisors" people={advisors} columns="sm:grid-cols-2" />
      </div>
    </div>
  );
}
