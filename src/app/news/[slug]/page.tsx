import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { newsItems } from "@/content/news";

export function generateStaticParams() {
  return newsItems.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const story = newsItems.find((item) => item.slug === slug);
  if (!story) return { title: "News article not found" };
  return { title: story.title, description: story.summary, alternates: { canonical: `/news/${slug}` } };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = newsItems.find((item) => item.slug === slug);
  if (!story) notFound();
  const isExternal = story.link.startsWith("http");

  return (
    <article className="pt-28 pb-14 sm:pt-32 sm:pb-20">
      <div className="mx-auto max-w-3xl px-5 sm:px-6">
        <Link href="/news" className="home-text-link mb-9">
          <ArrowLeft size={15} aria-hidden="true" /> All news
        </Link>
        <SectionLabel>{story.category.toUpperCase()} · {story.dateLabel.toUpperCase()}</SectionLabel>
        <h1 className="mt-4 max-w-[19ch] text-3xl font-heading font-bold leading-[1.12] tracking-tight text-text-primary sm:text-[2.85rem]">
          {story.title}
        </h1>
        <p className="mt-5 text-base leading-7 text-text-secondary sm:text-lg sm:leading-8">
          {story.summary}
        </p>

        <div className="mt-8 border-t border-border pt-7 sm:mt-10 sm:pt-8">
          <div className="space-y-5">
            {story.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-base leading-[1.82] text-text-secondary">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-9 flex flex-wrap items-center justify-between gap-5 border-t border-border pt-7">
          {isExternal ? (
            <a className="home-text-link" target="_blank" rel="noopener noreferrer" href={story.link}>
              {story.linkLabel} <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          ) : (
            <Link href={story.link} className="home-text-link">
              {story.linkLabel} <ArrowRight size={16} aria-hidden="true" />
            </Link>
          )}
          <Link href="/news" className="home-text-link">
            <ArrowLeft size={15} aria-hidden="true" /> More news
          </Link>
        </div>
      </div>
    </article>
  );
}
