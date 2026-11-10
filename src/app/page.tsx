import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, Trophy } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { OrbitalHero } from "@/components/home/OrbitalHero";
import { ArrivalIntro } from "@/components/home/ArrivalIntro";
import { RaspberryPiRackViewer } from "@/components/projects/RaspberryPiRackViewer";
import { RackPhotoLightbox } from "@/components/home/RackPhotoLightbox";
import { ClubNews } from "@/components/home/ClubNews";
import styles from "./home.module.css";

export const metadata: Metadata = {
  title: "Queen's High Performance Computing Club",
  description: "QHPC is Queen's University's student club for Linux, clusters, benchmarking, workshops and hands-on high-performance computing.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <div className="home-page">
      <ArrivalIntro />
      <OrbitalHero />

      <section className={styles.featureSection} id="pi-lab" aria-labelledby="home-pi-title">
        <div className={styles.featureGrid}>
          <div className={styles.featureCopy}>
            <SectionLabel>CURRENT PROJECT · FIVE-BOARD RASPBERRY PI CLUSTER</SectionLabel>
            <h2 id="home-pi-title">Our cluster, built from the hardware up.</h2>
            <p className={styles.featureLead}>
              Members assembled a five-board Raspberry Pi rack with removable trays and a vertically mounted
              eight-port Ethernet switch. We&apos;re configuring it for Linux, networking and introductory cluster workshops.
            </p>
            <p className={styles.featureDescription}>
              Explore the rack in 3D or open photographs of the real build. The hardware is assembled;
              workshop software and exercises are still being developed.
            </p>
            <div className={styles.featureLinks}>
              <Link href="/projects#pi-cluster" className="qhpc-button qhpc-button--primary">
                Project details <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link href="/contact" className="home-text-link">Ask about the lab <ArrowUpRight size={15} aria-hidden="true" /></Link>
            </div>
          </div>
          <div className={styles.featureVisual}>
            <RaspberryPiRackViewer />
            <RackPhotoLightbox />
          </div>
        </div>
      </section>

      <section className={styles.opportunitiesSection} aria-labelledby="get-started-title">
        <div className={styles.opportunitiesInner}>
          <div className={styles.opportunitiesIntro}>
            <SectionLabel>OTHER WAYS TO TAKE PART</SectionLabel>
            <h2 id="get-started-title">Start with a workshop. Go further with a team.</h2>
            <p>Not every member needs to work on the Pi rack. Here are two other concrete ways to get involved.</p>
          </div>
          <div className={styles.opportunityCards}>
            <article className={styles.opportunityCard}>
              <BookOpen size={23} aria-hidden="true" />
              <h3>Work through our published guides</h3>
              <p>Try Linux and containers, run a STREAM memory-bandwidth benchmark, or profile a C program. The materials are available on GitHub.</p>
              <Link href="/workshops" className="home-text-link">Open learning guides <ArrowRight size={15} /></Link>
            </article>
            <article className={styles.opportunityCard}>
              <Trophy size={23} aria-hidden="true" />
              <h3>Prepare for ISC27</h3>
              <p>QHPC is preparing Student Cluster Competition applications. Members are learning how to run and optimize HPC workloads; team selection is pending.</p>
              <Link href="/competitions" className="home-text-link">Competition details <ArrowRight size={15} /></Link>
            </article>
          </div>
        </div>
      </section>

      <ClubNews />

      <section className={`home-contact ${styles.contact}`} aria-labelledby="home-next-title">
        <div className="home-contact__inner">
          <div>
            <SectionLabel>GET INVOLVED</SectionLabel>
            <h2 id="home-next-title">Join QHPC or work with us.</h2>
            <p>Queen&apos;s University students can apply for membership on a rolling basis until January 2027. Organizations can support the club with equipment, technical speakers or competition funding.</p>
          </div>
          <div className="home-contact__actions">
            <Link href="/join" className="qhpc-button qhpc-button--primary">How to join <ArrowRight size={16} /></Link>
            <Link href="/sponsors" className="qhpc-button qhpc-button--outline">For partners <ArrowUpRight size={16} /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
