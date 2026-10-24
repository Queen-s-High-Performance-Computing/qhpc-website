import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Mail, Users } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Join QHPC",
  description: "Find out how to connect with Queen's High Performance Computing Club.",
  alternates: { canonical: "/join" },
};

export default function JoinPage() {
  return (
    <div className="pt-20">
      <section className="py-20 grid-bg">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <SectionLabel>GET INVOLVED · 2026–27</SectionLabel>
          <h1 className="mb-6 text-4xl font-heading font-bold text-text-primary sm:text-5xl">Start with a conversation.</h1>
          <p className="max-w-3xl text-lg leading-relaxed text-text-secondary">
            If you&apos;re a Queen&apos;s student curious about high-performance computing, write to QHPC. You don&apos;t need previous HPC or Linux experience to get started.
          </p>
          <a href={`mailto:${siteConfig.contact.email}?subject=Getting%20involved%20with%20QHPC`} className="qhpc-button qhpc-button--primary mt-8">
            Email QHPC <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionLabel>YOUR FIRST STEPS</SectionLabel>
          <h2 className="mb-8 text-2xl font-heading font-semibold text-text-primary">We&apos;ll help you find a way in.</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <SurfaceCard className="p-6">
              <Mail size={22} className="mb-5 text-primary" aria-hidden="true" />
              <h3 className="mb-2 text-lg font-heading font-semibold text-text-primary">1. Get in touch</h3>
              <p className="text-sm leading-relaxed text-text-secondary">Tell us what you&apos;re curious about and ask for current meeting and membership details.</p>
            </SurfaceCard>
            <SurfaceCard className="p-6">
              <Users size={22} className="mb-5 text-primary" aria-hidden="true" />
              <h3 className="mb-2 text-lg font-heading font-semibold text-text-primary">2. Find your starting point</h3>
              <p className="text-sm leading-relaxed text-text-secondary">Explore with other students, whether you&apos;re interested in hardware, software, research questions, or learning the basics.</p>
            </SurfaceCard>
            <SurfaceCard className="p-6">
              <BookOpen size={22} className="mb-5 text-primary" aria-hidden="true" />
              <h3 className="mb-2 text-lg font-heading font-semibold text-text-primary">3. Learn at your pace</h3>
              <p className="text-sm leading-relaxed text-text-secondary">Start with the club&apos;s shared guides and build toward cluster computing and parallel workloads.</p>
            </SurfaceCard>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-text-muted">
            Meeting times, signup steps, and any membership requirements can change. Email us for the latest details; this page does not publish an unverified schedule.
          </p>
          <Link href="/resources" className="home-text-link mt-6">Browse QHPC learning resources <ArrowRight size={15} aria-hidden="true" /></Link>
        </div>
      </section>
    </div>
  );
}
