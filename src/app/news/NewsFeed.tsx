"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { newsItems } from "@/content/news";

const categories = ["All categories", ...Array.from(new Set(newsItems.map((item) => item.category)))];
type SortOrder = "recent" | "highlights" | "alphabetical";

export function NewsFeed() {
  const [category, setCategory] = useState("All categories");
  const [sortOrder, setSortOrder] = useState<SortOrder>("recent");

  const stories = useMemo(() => {
    return newsItems
      .map((story, index) => ({ story, index }))
      .filter(({ story }) => category === "All categories" || story.category === category)
      .sort((a, b) => {
        if (sortOrder === "highlights" && Boolean(a.story.highlight) !== Boolean(b.story.highlight)) {
          return Number(Boolean(b.story.highlight)) - Number(Boolean(a.story.highlight));
        }
        if (sortOrder === "alphabetical") return a.story.title.localeCompare(b.story.title);
        const dateComparison = b.story.date.localeCompare(a.story.date);
        return dateComparison || a.index - b.index;
      })
      .map(({ story }) => story);
  }, [category, sortOrder]);

  return (
    <section className="py-12 sm:py-16" aria-label="Club news articles">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-wrap gap-4">
            <label className="flex min-w-44 flex-col gap-2 text-xs font-medium uppercase tracking-wide text-text-secondary">
              Category
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full rounded-xl border border-border bg-surface-raised px-4 py-3 text-sm font-normal normal-case tracking-normal text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {categories.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </label>
            <label className="flex min-w-44 flex-col gap-2 text-xs font-medium uppercase tracking-wide text-text-secondary">
              Sort by
              <select
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value as SortOrder)}
                className="w-full rounded-xl border border-border bg-surface-raised px-4 py-3 text-sm font-normal normal-case tracking-normal text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <option value="recent">Most recent</option>
                <option value="highlights">Highlights first</option>
                <option value="alphabetical">Title A–Z</option>
              </select>
            </label>
          </div>
          <p className="pb-1 text-sm text-text-muted" aria-live="polite">
            {stories.length} {stories.length === 1 ? "article" : "articles"}
          </p>
        </div>

        {stories.length ? (
          <div className="grid gap-5 md:grid-cols-2">
            {stories.map((story) => (
              <article key={story.slug} className="news-card rounded-2xl border border-border bg-surface-raised p-7 sm:p-8">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wide text-primary">
                  <span>{story.category}</span>
                  <span className="text-text-muted" aria-hidden="true">·</span>
                  <span className="text-text-muted">{story.dateLabel}</span>
                  {story.highlight && (
                    <span className="ml-auto rounded-md border border-border px-2 py-1 text-[10px] text-text-secondary">Highlight</span>
                  )}
                </div>
                <h2 className="mt-4 text-xl font-heading font-semibold leading-snug text-text-primary sm:text-2xl">
                  <Link href={`/news/${story.slug}`} className="hover:text-primary">{story.title}</Link>
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">{story.summary}</p>
                <Link href={`/news/${story.slug}`} className="home-text-link mt-7">
                  Read story <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-border bg-surface-raised p-8 text-text-secondary">
            No news articles in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}
