import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cssicPartnership } from "@/content/news";

export function CssicPartnershipFeature({
  headingLevel = "h2",
}: {
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;

  return (
    <section className="cssic-feature" aria-labelledby="cssic-feature-title">
      <div className="cssic-feature__art">
        <Image
          src={cssicPartnership.image.src}
          alt={cssicPartnership.image.alt}
          width={1650}
          height={450}
          sizes="(max-width: 900px) 100vw, 42vw"
        />
      </div>
      <div className="cssic-feature__copy">
        <SectionLabel>{cssicPartnership.label}</SectionLabel>
        <Heading id="cssic-feature-title">{cssicPartnership.title}</Heading>
        <p>{cssicPartnership.description}</p>
        <div className="cssic-feature__meta">
          <span>{cssicPartnership.date}</span>
          <span aria-hidden="true">·</span>
          <span>{cssicPartnership.location}</span>
        </div>
        <div className="cssic-feature__actions">
          <Link href={cssicPartnership.collaborationLink.href} className="home-text-link">
            {cssicPartnership.collaborationLink.label} <ArrowRight size={15} aria-hidden="true" />
          </Link>
          <a
            href={cssicPartnership.conferenceLink.href}
            target="_blank"
            rel="noopener noreferrer"
            className="home-text-link"
          >
            {cssicPartnership.conferenceLink.label} <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
