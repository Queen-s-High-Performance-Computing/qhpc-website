import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Join QHPC",
  description: "Queen's students can inquire about QHPC membership by email. Rolling applications through January 2027, meetings and learning resources.",
  alternates: { canonical: "/join" },
};

export default function JoinPage() {
  return (
    <div className="pt-20">
      <section className="grid-bg py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <SectionLabel>JOIN QHPC</SectionLabel>
          <h1 className="mb-5 text-4xl font-heading font-bold text-text-primary sm:text-5xl">Interested in HPC? Start here.</h1>
          <p className="max-w-3xl text-lg leading-relaxed text-text-secondary">
            No prior Linux or supercomputing experience is required. Join to follow club activities, attend workshops,
            or learn about the Raspberry Pi project and competition preparation.
          </p>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-text-secondary">
            <span className="font-semibold text-text-primary">Member applications:</span> Accepted on a rolling basis until January 2027.
            Open to Queen&apos;s University students only.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={`mailto:${siteConfig.contact.email}?subject=QHPC%20Membership%20Interest`} className="qhpc-button qhpc-button--primary"><Mail size={16} /> Email to join</a>
          </div>
          <p className="mt-4 text-sm text-text-secondary">Email <a className="underline underline-offset-4 hover:text-primary" href={`mailto:${siteConfig.contact.email}?subject=QHPC%20Membership%20Interest`}>{siteConfig.contact.email}</a> to express interest in joining.</p>
        </div>
      </section>
      <section className="py-14 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-2 sm:px-6">
          <div className="rounded-2xl border border-border bg-surface-raised p-7">
            <SectionLabel>MEETINGS</SectionLabel>
            <h2 className="mt-3 text-xl font-heading font-semibold text-text-primary">Mondays at 6 PM</h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">This is the Fall 2026 member-meeting time. Check the club&apos;s announcements for the current room and any schedule changes.</p>
          </div>
          <div className="rounded-2xl border border-border bg-surface-raised p-7">
            <SectionLabel>FIRST STEP</SectionLabel>
            <h2 className="mt-3 text-xl font-heading font-semibold text-text-primary">Open a Linux guide</h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">Start with shell commands, Git and software environments. Then try remote computing, benchmarks and profiling.</p>
            <Link href="/workshops" className="home-text-link mt-5">Published guides <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
