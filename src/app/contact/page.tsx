import type { Metadata } from "next";
import { ArrowUpRight, Handshake, Mail } from "lucide-react";
import { FaInstagram, FaLinkedin } from "react-icons/fa6";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact QHPC",
  description: "Get in touch with Queen's High Performance Computing Club about joining, projects, or partnerships.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="pt-20">
      <section className="py-20 grid-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionLabel>QUESTIONS · MEMBERSHIP · PARTNERSHIPS</SectionLabel>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-text-primary mb-6">Get in touch</h1>
          <p className="text-lg text-text-secondary leading-relaxed max-w-3xl">
            Curious about QHPC, interested in a project, or looking to support student computing? Send us a note and we&apos;ll connect you with the right people.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <SurfaceCard className="p-6">
              <Mail size={22} className="mb-5 text-primary" aria-hidden="true" />
              <h2 className="mb-2 text-lg font-heading font-semibold text-text-primary">Email</h2>
              <a href={`mailto:${siteConfig.contact.email}`} className="text-sm text-primary hover:underline break-all">{siteConfig.contact.email}</a>
            </SurfaceCard>
            <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="qhpc-card p-6 transition-colors hover:border-primary">
              <FaLinkedin size={22} className="mb-5 text-primary" aria-hidden="true" />
              <h2 className="mb-2 text-lg font-heading font-semibold text-text-primary">LinkedIn</h2>
              <span className="inline-flex items-center gap-1 text-sm text-text-secondary">Follow QHPC <ArrowUpRight size={14} aria-hidden="true" /></span>
            </a>
            <a href={siteConfig.links.instagram} target="_blank" rel="noopener noreferrer" className="qhpc-card p-6 transition-colors hover:border-primary">
              <FaInstagram size={22} className="mb-5 text-primary" aria-hidden="true" />
              <h2 className="mb-2 text-lg font-heading font-semibold text-text-primary">Instagram</h2>
              <span className="inline-flex items-center gap-1 text-sm text-text-secondary">Follow QHPC <ArrowUpRight size={14} aria-hidden="true" /></span>
            </a>
          </div>

          <div className="mt-10 rounded-2xl border border-border bg-surface-light p-6 sm:p-8">
            <Handshake size={24} className="mb-4 text-primary" aria-hidden="true" />
            <SectionLabel>SPONSORSHIP AND PARTNERSHIPS</SectionLabel>
            <h2 className="text-2xl font-heading font-semibold text-text-primary">Support hands-on computing at Queen&apos;s.</h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-text-secondary">
              We&apos;re glad to hear from organizations interested in supporting student learning, computing projects, and opportunities to connect students with the HPC community. Get in touch to start a conversation.
            </p>
            <a href={`mailto:${siteConfig.contact.email}?subject=QHPC%20Partnership`} className="qhpc-button qhpc-button--primary mt-6">Contact us <ArrowUpRight size={15} aria-hidden="true" /></a>
          </div>
        </div>
      </section>
    </main>
  );
}
