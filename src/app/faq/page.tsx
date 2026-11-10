import React from "react";
import { Metadata } from "next";
import { ScrollReveal } from "@/components/ScrollReveal";
import { FAQContent } from "./FAQContent";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers to common questions about learning, activities, and getting involved with QHPC.",
  alternates: {
    canonical: "/faq",
  },
};

const faqs = [
  {
    question: "Do I need Linux or HPC experience to join?",
    answer: "No. Start with the public Linux exercises. More advanced work, including shared computing systems and competition preparation, can require additional training or access.",
  },
  {
    question: "When does QHPC meet?",
    answer: "Member meetings have been scheduled for Mondays at 6 PM in Fall 2026. Contact the executive team for the current room and any schedule changes.",
  },
  {
    question: "How do I join?",
    answer: "Applications are open to Queen's University students only and accepted on a rolling basis until January 2027. Email QHPC@engsoc.queensu.ca to express interest in joining.",
  },
  {
    question: "Can I try the learning material on my own?",
    answer: "Yes. The Linux, benchmarking and profiling guides are linked from Workshops. Some exercises require approved access to Queen's Centre for Advanced Computing systems.",
  },
  {
    question: "Is the Raspberry Pi cluster finished?",
    answer: "The five-board rack is assembled. Software configuration and repeatable workshop exercises are still being developed.",
  },
  {
    question: "Is QHPC competing at ISC27?",
    answer: "QHPC is preparing applications for the ISC27 Student Cluster Competition. Selection and onsite participation are not yet confirmed.",
  },
  {
    question: "Can my organization support the club?",
    answer: "Yes. Visit Sponsors for our current equipment, mentorship and competition-support priorities, then email the executive team.",
  },
];

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <div className="pt-20">
      <JsonLd data={faqSchema} />
      
      
      <section className="py-20 grid-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <p className="text-sm font-mono text-primary mb-3 uppercase tracking-widest">
              QHPC · MEMBER INFORMATION
            </p>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-text-primary mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Answers about membership, meetings, projects and learning resources.
            </p>
          </ScrollReveal>
        </div>
      </section>

      
      <FAQContent faqs={faqs} />
    </div>
  );
}


