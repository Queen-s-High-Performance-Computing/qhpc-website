import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Cpu, Handshake, Lightbulb, Users } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Sponsors and Partners",
  description: "Connect with Queen's High Performance Computing Club about supporting student computing.",
  alternates: { canonical: "/sponsors" },
};

const conversationTopics = [
  { icon: Cpu, title: "Computing access", description: "Compute time, software, or technical resources that can support student learning." },
  { icon: Lightbulb, title: "Equipment and projects", description: "Hardware or advice that helps students explore systems and computing ideas." },
  { icon: Users, title: "Mentorship", description: "A conversation with people working in HPC, research computing, or related fields." },
  { icon: Handshake, title: "Student activities", description: "Support for club learning activities and opportunities to connect with the HPC community." },
];

export default function SponsorsPage() {
  return (
    <div className="pt-20">
      <section className="py-20 grid-bg">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <SectionLabel>PARTNERSHIPS · STUDENT COMPUTING</SectionLabel>
          <h1 className="mb-6 text-4xl font-heading font-bold text-text-primary sm:text-5xl">Help students explore computing.</h1>
          <p className="max-w-3xl text-lg leading-relaxed text-text-secondary">
            QHPC brings Queen&apos;s students together to learn about high-performance computing through shared learning and collaborative project ideas. We welcome conversations with organizations interested in supporting that work.
          </p>
          <a href={`mailto:${siteConfig.contact.email}?subject=QHPC%20Partnership`} className="qhpc-button qhpc-button--primary mt-8">
            Start a conversation <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <SectionLabel>WAYS TO CONNECT</SectionLabel>
            <h2 className="text-2xl font-heading font-semibold text-text-primary">Let&apos;s find a useful fit.</h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">Every partnership is different. These are possible conversation topics, not a list of confirmed funding requests or promised sponsor benefits.</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {conversationTopics.map(({ icon: Icon, title, description }) => (
              <SurfaceCard key={title} className="p-6">
                <Icon size={22} className="mb-5 text-primary" aria-hidden="true" />
                <h3 className="mb-2 text-lg font-heading font-semibold text-text-primary">{title}</h3>
                <p className="text-sm leading-relaxed text-text-secondary">{description}</p>
              </SurfaceCard>
            ))}
          </div>
          <div className="mt-10 rounded-2xl border border-border bg-surface-light p-6 sm:p-8">
            <h2 className="text-xl font-heading font-semibold text-text-primary">Learn more about QHPC</h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-text-secondary">We can discuss the club&apos;s learning goals, project ideas, and current priorities directly. Project ideas on this website are possibilities, not claims of completed work.</p>
            <div className="mt-5 flex flex-wrap gap-5">
              <Link href="/about" className="home-text-link">About QHPC <ArrowRight size={15} aria-hidden="true" /></Link>
              <Link href="/projects" className="home-text-link">Project ideas <ArrowRight size={15} aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
