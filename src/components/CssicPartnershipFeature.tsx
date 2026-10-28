import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function CssicPartnershipFeature() {
  return (
    <section className="cssic-feature" aria-labelledby="cssic-feature-title">
      <div className="cssic-feature__art">
        <Image
          src="/partnership/qhpc-cssic-partnership.png"
          alt="QHPC and CSSIC partnership graphic"
          width={1650}
          height={450}
          sizes="(max-width: 900px) 100vw, 42vw"
        />
      </div>
      <div className="cssic-feature__copy">
        <SectionLabel>NEW COLLABORATION · 2026–27</SectionLabel>
        <h2 id="cssic-feature-title">Semiconductor hardware, together.</h2>
        <p>
          QHPC is working with the Canadian Student Semiconductor Industry
          Conference (CSSIC) to develop an affiliated group for students
          interested in hardware engineering. The group is taking shape with
          the goal of attending and competing at CSSIC&apos;s January conference.
        </p>
        <div className="cssic-feature__meta">
          <span>January 21, 2027</span>
          <span aria-hidden="true">·</span>
          <span>Ottawa, Ontario</span>
        </div>
        <div className="cssic-feature__actions">
          <Link href="/competitions" className="home-text-link">
            Follow the collaboration <ArrowRight size={15} aria-hidden="true" />
          </Link>
          <a
            href="https://www.cssic.ca/"
            target="_blank"
            rel="noopener noreferrer"
            className="home-text-link"
          >
            Visit CSSIC <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
