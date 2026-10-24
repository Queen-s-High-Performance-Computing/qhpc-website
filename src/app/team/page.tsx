import type { Metadata } from "next";
import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SurfaceCard } from "@/components/ui/SurfaceCard";

export const metadata: Metadata = {
  title: "2026–27 Executive Team",
  description: "Meet the 2026–27 executive team and advisors for Queen's High Performance Computing Club.",
  alternates: { canonical: "/team" },
};

const directors = [
  { name: "Charlie Bolt", role: "Technical Director", program: "Computer Engineering · 5th Year+", image: "charlie-bolt.png" },
  { name: "Daniil Nistribenko", role: "Director of Research", program: "Electrical Engineering · 4th Year", image: "daniil-nistribenko.png" },
  { name: "Aaron Lin", role: "Director of Projects", program: "Electrical Engineering · 3rd Year", image: "aaron-lin.png" },
  { name: "Lucas Yaskowich", role: "Director of Curriculum & Education", program: "Computing (Security) & Math · 2nd Year", image: "lucas-yaskowich.png" },
  { name: "Christina Le", role: "Director of Outreach", program: "Computer Engineering · 2nd Year", image: "christina-le.png" },
];

const coPresidents = [
  { name: "Alexandra Kaine", role: "Co-President", image: "alexandra-kaine.png" },
  { name: "Anthony Botticchio", role: "Co-President", image: "anthony-botticchio.png" },
];

const advisors = [
  { name: "Curtis Shorts", role: "Student Advisor", image: "curtis-shorts.png" },
  { name: "Dr. Ryan Grant", role: "Faculty Advisor", image: "ryan-grant.png" },
];

type Person = {
  name: string;
  role: string;
  image: string;
  program?: string;
};

function PersonCard({ person }: { person: Person }) {
  return (
    <SurfaceCard className="flex h-full flex-col items-center p-5 text-center sm:p-6">
      <Image
        src={`/team/${person.image}`}
        alt={`Portrait of ${person.name}`}
        width={192}
        height={192}
        className="mb-4 h-28 w-28 rounded-full border-2 border-primary/30 object-cover sm:h-32 sm:w-32"
      />
      <h3 className="text-lg font-heading font-semibold text-text-primary">{person.name}</h3>
      <p className="mt-1 text-sm font-medium text-primary">{person.role}</p>
      {person.program && <p className="mt-2 text-xs leading-relaxed text-text-muted">{person.program}</p>}
    </SurfaceCard>
  );
}

function TeamSection({ title, people, columns }: { title: string; people: Person[]; columns: string }) {
  return (
    <section className="mt-14 first:mt-0" aria-labelledby={`team-${title.toLowerCase().replaceAll(" ", "-")}`}>
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
            Meet the students and advisors guiding Queen&apos;s High Performance Computing Club this year.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <TeamSection title="Directors" people={directors} columns="sm:grid-cols-2 lg:grid-cols-3" />
        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          <TeamSection title="Co-Presidents" people={coPresidents} columns="sm:grid-cols-2" />
          <TeamSection title="Advisors" people={advisors} columns="sm:grid-cols-2" />
        </div>
      </div>
    </div>
  );
}
