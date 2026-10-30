import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import styles from "./OrbitalHero.module.css";

const destinations = [
  { label: "About", href: "/about", detail: "The bigger picture", x: 20, y: 27 },
  { label: "Workshops", href: "/workshops", detail: "Learn by doing", x: 76, y: 21 },
  { label: "Projects", href: "/projects", detail: "Make something matter", x: 89, y: 53 },
  { label: "Team", href: "/team", detail: "Meet your people", x: 78, y: 80 },
  { label: "Resources", href: "/resources", detail: "Follow your curiosity", x: 25, y: 83 },
  { label: "Join", href: "/join", detail: "Your next connection", x: 10, y: 55 },
];

export function OrbitalHero() {
  return (
    <section className={`home-hero ${styles.hero}`} aria-labelledby="hero-title">
      <div className={styles.stage}>
        <div className={styles.grid} aria-hidden="true" />
        <div className={styles.coordinate} aria-hidden="true">44°13′ N / 76°30′ W <span>KINGSTON, ON</span></div>
        <div className={styles.universe} data-arrival-logo aria-hidden="true" />
        <div className={styles.copy}>
          <p className={styles.eyebrow}><span /> QUEEN&apos;S HIGH PERFORMANCE COMPUTING</p>
          <h1 id="hero-title">Small world.<br /><span>Big compute.</span></h1>
          <p className={styles.intro}>A community of curious minds.<br />A whole new scale of possibilities.</p>
          <Link href="/join" className={styles.cta}>Find your place <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
        <nav className={styles.nodes} aria-label="Explore QHPC">
          {destinations.map(({ label, href, detail, x, y }, i) => (
            <Link key={label} href={href} className={styles.node} style={{ left: `${x}%`, top: `${y}%` }}>
              <span className={styles.nodeCircle}><span className={styles.nodeDot} /><ArrowUpRight size={18} aria-hidden="true" /></span>
              <span className={styles.nodeText}><span className={styles.nodeLabel}>{label}<span className={styles.nodeIndex}>0{i + 1}</span></span><span className={styles.nodeDetail}>{detail}</span></span>
            </Link>
          ))}
        </nav>
        <div className={styles.footer}>
          <span className={styles.footerCaption}>MANY MINDS.<br /><span>ONE CONNECTED COMMUNITY.</span></span>
          <a href="#work" className={styles.scrollCue}><span className={styles.scrollIcon}><ArrowDown size={16} aria-hidden="true" /></span><span>EXPLORE THE CLUB</span></a>
          <span className={styles.footerIndex}>EXPLORE THE POSSIBILITIES <span>01 — 06</span></span>
        </div>
      </div>
    </section>
  );
}
