import type { Metadata } from "next";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { NewsFeed } from "./NewsFeed";

export const metadata: Metadata = {
  title: "News",
  description: "Updates on QHPC projects, learning resources, competitions and collaborations.",
  alternates: { canonical: "/news" },
};

export default function NewsPage() {
  return (
    <div className="pt-20">
      <section className="grid-bg py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <SectionLabel>QHPC · 2026–27</SectionLabel>
          <h1 className="mb-6 text-4xl font-heading font-bold text-text-primary sm:text-5xl">News</h1>
          <p className="max-w-3xl text-lg leading-relaxed text-text-secondary">
            Updates on our Raspberry Pi lab, learning resources, competition preparations and collaborations.
          </p>
        </div>
      </section>
      <NewsFeed />
    </div>
  );
}
