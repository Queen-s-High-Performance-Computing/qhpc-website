import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Cpu,
  Gauge,
  Network,
} from "lucide-react";
import { QhpcButtonLink } from "@/components/ui/QhpcButtonLink";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { ExplodedClusterExperience } from "@/components/home/ExplodedClusterExperience";

export const metadata: Metadata = {
  title: "Queen's High Performance Computing Club",
  description:
    "Meet QHPC, Queen's University's student high-performance computing club. Explore computing systems through hands-on learning and collaborative projects.",
  alternates: {
    canonical: "/",
  },
};

const focusAreas = [
  {
    number: "01",
    icon: Cpu,
    title: "Learn the foundations",
    description:
      "Explore Linux, remote computing, schedulers, parallel programming, and the systems behind HPC.",
    href: "/workshops",
    linkLabel: "See how we learn",
  },
  {
    number: "02",
    icon: Network,
    title: "Build and connect systems",
    description:
      "Work through project ideas spanning Raspberry Pi clusters, distributed computing, and benchmarking.",
    href: "/projects",
    linkLabel: "Explore project ideas",
  },
  {
    number: "03",
    icon: Gauge,
    title: "Understand performance",
    description:
      "Explore how hardware, software, and workloads affect the way computing systems perform.",
    href: "/workshops",
    linkLabel: "See learning topics",
  },
];

function ClusterIllustration() {
  return (
    <div className="compute-visual">
      <Image
        src="/qhpc-server-racks.png"
        alt="QHPC emblem in a blue-lit server room."
        fill
        priority
        sizes="(max-width: 900px) 100vw, 48vw"
        className="compute-visual__image"
      />
      <div className="compute-visual__topline" aria-hidden="true">
        <span>QUEEN&apos;S · COMPUTING</span>
        <span className="compute-visual__mark" aria-hidden="true" />
      </div>
      <div className="compute-visual__caption" aria-hidden="true">
        <span>ONE TEAM</span>
        <span className="compute-visual__caption-line" aria-hidden="true" />
        <span>MANY NODES</span>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="home-page">
      <section className="home-hero grid-bg">
        <div className="home-hero__inner">
          <div className="home-hero__copy">
            <SectionLabel onDark className="home-eyebrow">
              <span className="home-eyebrow__line" aria-hidden="true" />
              Queen&apos;s University · Student Club
            </SectionLabel>
            <h1>
              Computing at a <span>larger scale.</span>
            </h1>
            <p className="home-hero__lede">
              We bring Queen&apos;s students together to explore how powerful
              computing systems are built, programmed, and used — through
              hands-on learning and collaborative computing projects.
            </p>
            <div className="home-hero__actions">
              <QhpcButtonLink href="#work" className="home-button">
                Discover QHPC <ArrowRight size={17} aria-hidden="true" />
              </QhpcButtonLink>
              <QhpcButtonLink href="/contact" variant="outline" className="home-button">
                Get in touch <ArrowUpRight size={16} aria-hidden="true" />
              </QhpcButtonLink>
            </div>
          </div>
          <ClusterIllustration />
        </div>
        <a className="home-scroll-cue" href="#work" aria-label="Scroll to what we do">
          <span>Explore what we do</span>
          <ArrowDown size={15} aria-hidden="true" />
        </a>
      </section>

      <section className="home-work" id="work">
        <div className="home-section-heading">
          <div>
            <SectionLabel>LEARN · BUILD · COMPETE</SectionLabel>
            <h2>Curiosity, put to work.</h2>
          </div>
          <p>
            High-performance computing can sound abstract. We make it tangible
            by learning together and putting ideas to the test.
          </p>
        </div>

        <div className="home-focus-grid">
          {focusAreas.map(({ number, icon: Icon, title, description, href, linkLabel }) => (
            <SurfaceCard className="home-focus-card" key={number}>
              <div className="home-focus-card__top">
                <span className="home-focus-card__number">{number}</span>
                <span className="home-focus-card__icon"><Icon size={20} aria-hidden="true" /></span>
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
              <Link href={href} className="home-text-link">
                {linkLabel} <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </SurfaceCard>
          ))}
        </div>
      </section>

      <ExplodedClusterExperience />

      <section className="home-contact">
        <div className="home-contact__inner">
          <div>
            <SectionLabel>BUILD WITH US</SectionLabel>
            <h2>Good work takes a team.</h2>
            <p>
              Whether you&apos;re curious about computing or interested in supporting
              student-led HPC, we&apos;d be glad to hear from you.
            </p>
          </div>
          <div className="home-contact__actions">
            <QhpcButtonLink href="/contact" className="home-button">
              Contact QHPC <ArrowRight size={17} aria-hidden="true" />
            </QhpcButtonLink>
            <QhpcButtonLink href="/join" variant="outline" className="home-button">
              How to join <ArrowUpRight size={16} aria-hidden="true" />
            </QhpcButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
