"use client";

import React, { useState, useMemo } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, HelpCircle, Search, X } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import Fuse from "fuse.js";

interface FAQ {
  question: string;
  answer: string;
}

export function FAQContent({ faqs }: { faqs: FAQ[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const fuse = useMemo(
    () =>
      new Fuse(faqs, {
        keys: ["question", "answer"],
        threshold: 0.3,
      }),
    [faqs]
  );

  const filteredFaqs = useMemo(() => {
    if (!searchQuery) return faqs;
    return fuse.search(searchQuery).map((result) => result.item);
  }, [searchQuery, fuse, faqs]);

  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Search bar */}
        <ScrollReveal>
          <div className="relative mb-8 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={18} className="text-text-muted group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search cluster FAQ (e.g. 'Linux', 'Fees', 'CAC')..."
              className="block w-full bg-surface/50 border border-border rounded-2xl py-4 pl-12 pr-12 text-sm text-text-primary placeholder:text-text-muted focus:bg-surface focus:border-primary/50 focus:ring-4 focus:ring-primary/5 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-muted hover:text-text-primary transition-colors"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </ScrollReveal>

        {/* Result count */}
        {searchQuery && (
          <p className="text-xs font-mono text-text-muted mb-6 px-2">
            Found {filteredFaqs.length} results for &quot;{searchQuery}&quot;
          </p>
        )}

        <StaggerContainer className="space-y-3">
          {filteredFaqs.length > 0 ? (
            <Accordion.Root type="single" collapsible className="space-y-3 w-full">
              {filteredFaqs.map((faq, i) => (
                <StaggerItem key={faq.question}>
                  <Accordion.Item
                    value={`item-${i}`}
                    className="bg-card rounded-xl border border-border overflow-hidden card-hover"
                  >
                    <Accordion.Header className="flex">
                      <Accordion.Trigger className="group w-full flex items-start gap-4 p-5 text-left custom-focus">
                        <span className="text-xs font-mono text-primary mt-1 shrink-0">
                          [{String(i + 1).padStart(2, "0")}]
                        </span>
                        <span className="flex-1 text-sm font-heading font-semibold text-text-primary">
                          {faq.question}
                        </span>
                        <ChevronDown 
                          size={18} 
                          className="text-text-muted shrink-0 mt-0.5 transition-transform duration-200 group-data-[state=open]:rotate-180" 
                        />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="overflow-hidden text-sm text-text-secondary data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                      <div className="px-5 pb-5 pl-14 leading-relaxed">
                        {faq.answer}
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                </StaggerItem>
              ))}
            </Accordion.Root>
          ) : (
            <div className="text-center py-20 p-8 glass rounded-2xl border border-border">
              <Search size={32} className="text-text-muted mx-auto mb-4 opacity-20" />
              <p className="text-text-secondary">No results found in the cluster database.</p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 text-primary text-sm font-mono hover:underline"
              >
                $ clear_search
              </button>
            </div>
          )}
        </StaggerContainer>

        {/* Still have questions */}
        <ScrollReveal>
          <div className="mt-12 p-8 glass rounded-2xl border border-primary/10 text-center">
            <HelpCircle size={32} className="text-primary mx-auto mb-4" />
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
              Still have questions?
            </h3>
            <p className="text-sm text-text-secondary mb-4">
              Reach out to us directly — we&apos;re happy to help!
            </p>
            <a
              href="mailto:QHPC@engsoc.queensu.ca"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary/10 text-primary border border-primary/30 rounded-lg font-mono text-sm hover:bg-primary/20 transition-all"
            >
              $ mail QHPC@engsoc.queensu.ca
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
