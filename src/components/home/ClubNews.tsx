import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CssicPartnershipFeature } from "@/components/CssicPartnershipFeature";
import { newsItems } from "@/content/news";

export function ClubNews() {
  return (
    <section id="news" className="border-b border-border py-16 sm:py-20" aria-labelledby="club-news-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <div>
            <SectionLabel>CLUB NEWS</SectionLabel>
            <h2 id="club-news-title" className="mt-3 text-3xl font-heading font-semibold text-text-primary sm:text-4xl">
              Club news
            </h2>
          </div>
          <Link href="/news" className="home-text-link">
            All news <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {newsItems.slice(0, 3).map((story) => (
            <article key={story.slug} className="rounded-2xl border border-border bg-surface-raised p-6">
              <p className="font-mono text-xs uppercase tracking-wider text-primary">
                {story.category} · {story.dateLabel}
              </p>
              <h3 className="mt-4 text-lg font-heading font-semibold leading-snug text-text-primary">
                <Link href={`/news/${story.slug}`} className="hover:text-primary">
                  {story.title}
                </Link>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{story.summary}</p>
              <Link className="home-text-link mt-5" href={`/news/${story.slug}`}>
                Read story <ArrowRight size={15} />
              </Link>
            </article>
          ))}
        </div>
        <div className="mt-6">
          <CssicPartnershipFeature headingLevel="h3" />
        </div>
      </div>
    </section>
  );
}
