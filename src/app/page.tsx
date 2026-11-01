import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Cpu,
  Gauge,
  Network,
} from "lucide-react";
import { QhpcButtonLink } from "@/components/ui/QhpcButtonLink";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { OrbitalHero } from "@/components/home/OrbitalHero";
import { ExplodedClusterExperience } from "@/components/home/ExplodedClusterExperience";
import { ClubNews } from "@/components/home/ClubNews";
import { ArrivalIntro } from "@/components/home/ArrivalIntro";
import styles from "./home.module.css";

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

export default function HomePage() {
  return (
    <div className="home-page">
      <ArrivalIntro />
      <OrbitalHero />

      <ClubNews />

      <section className={`home-work ${styles.work}`} id="work">
        <div className={`home-section-heading ${styles.heading}`}>
          <div>
            <SectionLabel>LEARN · BUILD · COMPETE</SectionLabel>
            <h2>Curiosity, put to work.</h2>
          </div>
          <p>
            High-performance computing can sound abstract. We make it tangible
            by learning together and putting ideas to the test.
          </p>
        </div>

        <div className={`home-focus-grid ${styles.focusGrid}`}>
          {focusAreas.map(({ number, icon: Icon, title, description, href, linkLabel }) => (
            <article className={`home-focus-card ${styles.focusCard}`} key={number}>
              <div className="home-focus-card__top">
                <span className="home-focus-card__number">{number}</span>
                <span className="home-focus-card__icon"><Icon size={20} aria-hidden="true" /></span>
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
              <Link href={href} className="home-text-link">
                {linkLabel} <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <ExplodedClusterExperience />

      <section className={`home-contact ${styles.contact}`}>
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
