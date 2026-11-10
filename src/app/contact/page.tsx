import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail, Users, Handshake } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact QHPC",
  description: "Contact the QHPC executive team about membership, projects, events and sponsorship.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="pt-20">
      <section className="grid-bg py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <SectionLabel>CONTACT</SectionLabel>
          <h1 className="mb-5 text-4xl font-heading font-bold text-text-primary sm:text-5xl">Get in touch with QHPC</h1>
          <p className="max-w-3xl text-lg leading-relaxed text-text-secondary">For questions about joining, workshops, projects, or supporting the club, email our executive team.</p>
          <a href={`mailto:${siteConfig.contact.email}`} className="qhpc-button qhpc-button--primary mt-7"><Mail size={16} /> {siteConfig.contact.email}</a>
        </div>
      </section>
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-4 md:grid-cols-2">
            <SurfaceCard className="p-7">
              <Users size={24} className="mb-4 text-primary" />
              <h2 className="text-xl font-heading font-semibold text-text-primary">Students and prospective members</h2>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">Queen&apos;s students can email us about membership, meeting locations, workshop prerequisites or projects.</p>
              <Link href="/join" className="home-text-link mt-5">How to join <ArrowRight size={15} /></Link>
            </SurfaceCard>
            <SurfaceCard className="p-7">
              <Handshake size={24} className="mb-4 text-primary" />
              <h2 className="text-xl font-heading font-semibold text-text-primary">Sponsors and collaborators</h2>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">Discuss equipment loans or donations, technical talks, mentorship, competitions or an event.</p>
              <Link href="/sponsors" className="home-text-link mt-5">Partnership priorities <ArrowRight size={15} /></Link>
            </SurfaceCard>
          </div>
          <div className="mt-9 border-t border-border pt-6">
            <SectionLabel>FIND US ONLINE</SectionLabel>
            <div className="mt-4 flex flex-wrap gap-x-7 gap-y-3 text-sm">
              <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="home-text-link"><FaLinkedin size={18} /> LinkedIn <ArrowUpRight size={14} /></a>
              <a href={siteConfig.links.instagram} target="_blank" rel="noopener noreferrer" className="home-text-link"><FaInstagram size={18} /> Instagram <ArrowUpRight size={14} /></a>
              <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="home-text-link"><FaGithub size={18} /> GitHub <ArrowUpRight size={14} /></a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
