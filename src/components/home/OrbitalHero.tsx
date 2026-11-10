import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import styles from "./OrbitalHero.module.css";

export function OrbitalHero() {
  return (
    <section className={`home-hero ${styles.hero}`} aria-labelledby="hero-title">
      <div className={styles.stage}>
        <div className={styles.grid} aria-hidden="true" />
        <div className={styles.universe} data-arrival-logo aria-hidden="true" />
        <div className={styles.copy}>
          <p className={styles.eyebrow}>QUEEN&apos;S HIGH PERFORMANCE COMPUTING CLUB</p>
          <h1 id="hero-title">Learn Linux.<br /><span>Build clusters.</span></h1>
          <p className={styles.intro}>
            A Queen&apos;s student club exploring how computing systems work — through workshops,
            a five-board Raspberry Pi lab, and cluster competition preparation.
          </p>
          <div className={styles.actions}>
            <Link href="/workshops" className={styles.cta}>Explore workshops <ArrowRight size={16} aria-hidden="true" /></Link>
            <Link href="/join" className={styles.secondaryCta}>Join QHPC <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>
        <a href="#pi-lab" className={styles.scrollCue}>
          <ArrowDown size={15} aria-hidden="true" /> See our Raspberry Pi build
        </a>
      </div>
    </section>
  );
}
