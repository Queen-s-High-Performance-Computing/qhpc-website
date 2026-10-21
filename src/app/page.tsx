import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Cpu,
  Network,
  Trophy,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Queen's High-Performance Computing",
  description:
    "Meet QHPC, Queen's University's student high-performance computing team. Learn through hands-on projects, workshops, and cluster competitions.",
  alternates: {
    canonical: "/",
  },
};

const focusAreas = [
  {
    number: "01",
    icon: Cpu,
    title: "Learn by building",
    description:
      "Get hands-on with Linux, parallel programming, and the hardware behind modern computing.",
    href: "/workshops",
    linkLabel: "Explore workshops",
  },
  {
    number: "02",
    icon: Network,
    title: "Make systems work together",
    description:
      "Explore distributed computing through practical team projects, including a Raspberry Pi cluster.",
    href: "/about",
    linkLabel: "About our work",
  },
  {
    number: "03",
    icon: Trophy,
    title: "Take on a challenge",
    description:
      "Prepare for student cluster competitions by building, tuning, and running real workloads as a team.",
    href: "/competitions",
    linkLabel: "See competitions",
  },
];

function ClusterIllustration() {
  return (
    <div className="compute-visual" aria-label="Illustration of connected computing nodes">
      <div className="compute-visual__topline">
        <span>QHPC / SYSTEMS LAB</span>
        <span className="compute-visual__mark" aria-hidden="true" />
      </div>
      <svg
        className="compute-visual__diagram"
        viewBox="0 0 560 450"
        fill="none"
        role="img"
        aria-labelledby="compute-diagram-title"
      >
        <title id="compute-diagram-title">A diagram of compute nodes connected in a cluster</title>
        <defs>
          <linearGradient id="node-line" x1="74" y1="65" x2="490" y2="385" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--primary)" stopOpacity=".9" />
            <stop offset="1" stopColor="var(--secondary)" stopOpacity=".35" />
          </linearGradient>
          <radialGradient id="core-glow" cx="0" cy="0" r="1" gradientTransform="translate(280 224) rotate(90) scale(170)" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--primary)" stopOpacity=".27" />
            <stop offset="1" stopColor="var(--primary)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="280" cy="224" r="170" fill="url(#core-glow)" />
        <circle cx="280" cy="224" r="146" stroke="var(--border)" strokeOpacity=".8" strokeDasharray="2 8" />
        <circle cx="280" cy="224" r="105" stroke="var(--primary)" strokeOpacity=".27" />
        <path d="M108 111 228 185M452 111 332 185M108 337l120-75m224 75-120-75M280 67v81m0 152v83M69 224h105m212 0h105" stroke="url(#node-line)" strokeWidth="1.5" />
        <path d="M108 111 228 185M452 111 332 185M108 337l120-75m224 75-120-75" stroke="var(--primary)" strokeOpacity=".2" strokeDasharray="4 8" />
        <rect x="222" y="166" width="116" height="116" rx="28" fill="var(--card)" stroke="var(--primary)" strokeOpacity=".65" />
        <rect x="238" y="182" width="84" height="84" rx="19" fill="var(--primary)" fillOpacity=".1" />
        <path d="M253 224h14l9-18 13 36 9-18h9" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <text x="280" y="304" textAnchor="middle" fill="var(--text-muted)" fontSize="10" letterSpacing="2.4">COMPUTE</text>
        {[{x:84,y:88},{x:428,y:88},{x:84,y:315},{x:428,y:315},{x:263,y:42},{x:263,y:366},{x:45,y:205},{x:457,y:205}].map((node, index) => (
          <g key={index}>
            <rect x={node.x} y={node.y} width="48" height="48" rx="13" fill="var(--card)" stroke="var(--border)" />
            <rect x={node.x + 13} y={node.y + 13} width="22" height="22" rx="6" fill={index % 2 ? "var(--secondary)" : "var(--primary)"} fillOpacity=".78" />
            <circle cx={node.x + 24} cy={node.y + 24} r="3" fill="var(--background)" />
          </g>
        ))}
        <circle cx="280" cy="224" r="4" fill="var(--primary-light)" />
      </svg>
      <div className="compute-visual__caption">
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
            <p className="home-eyebrow">
              <span className="home-eyebrow__line" aria-hidden="true" />
              Queen&apos;s University · Student Design Team
            </p>
            <h1>
              Computing at a <span>larger scale.</span>
            </h1>
            <p className="home-hero__lede">
              We bring Queen&apos;s students together to explore how powerful
              computing systems are built, programmed, and used — through
              hands-on projects, workshops, and cluster competitions.
            </p>
            <div className="home-hero__actions">
              <Link href="#work" className="home-button home-button--primary">
                Discover QHPC <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link href="/contact" className="home-button home-button--quiet">
                Get in touch <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <p className="home-hero__note">
              The first Engineering Society-ratified supercomputing club at Queen&apos;s.
            </p>
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
            <p className="home-section-kicker">LEARN · BUILD · COMPETE</p>
            <h2>Curiosity, put to work.</h2>
          </div>
          <p>
            High-performance computing can sound abstract. We make it tangible
            by learning together and putting ideas to the test.
          </p>
        </div>

        <div className="home-focus-grid">
          {focusAreas.map(({ number, icon: Icon, title, description, href, linkLabel }) => (
            <article className="home-focus-card" key={number}>
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

      <section className="home-project grid-bg" aria-labelledby="home-project-title">
        <div className="home-project__visual" aria-hidden="true">
          <div className="home-project__halo" />
          <div className="home-project__stack">
            <div className="home-project__stack-label">CLUSTER / 01</div>
            {["node-a", "node-b", "node-c"].map((node, index) => (
              <div className="home-project__node" key={node}>
                <span className="home-project__node-light" />
                <span>{node}</span>
                <span className="home-project__node-chip">PI {String(index + 1).padStart(2, "0")}</span>
              </div>
            ))}
            <div className="home-project__stack-foot"><span /> SHARED NETWORK</div>
          </div>
        </div>
        <div className="home-project__copy">
          <p className="home-section-kicker">A PROJECT IN PROGRESS</p>
          <h2 id="home-project-title">Small boards.<br /><span>Big ideas.</span></h2>
          <p>
            Our Raspberry Pi cluster is a hands-on way to explore the building
            blocks of distributed computing — from connecting machines to
            coordinating work across them.
          </p>
          <Link href="/about" className="home-text-link">
            More about QHPC <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="home-contact">
        <div className="home-contact__inner">
          <div>
            <p className="home-section-kicker">BUILD WITH US</p>
            <h2>Good work takes a team.</h2>
            <p>
              Whether you&apos;re curious about computing or interested in supporting
              student-led HPC, we&apos;d be glad to hear from you.
            </p>
          </div>
          <div className="home-contact__actions">
            <Link href="/contact" className="home-button home-button--primary">
              Contact QHPC <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link href="/team" className="home-button home-button--quiet">
              Meet the team <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
