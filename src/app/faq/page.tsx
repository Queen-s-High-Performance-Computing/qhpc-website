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
    question: "Do I need prior supercomputing (HPC) or Linux experience to join?",
    answer:
      "No. QHPC's learning materials begin with computer and Linux fundamentals, then build toward shared clusters, parallel computing, and hands-on projects.",
  },
  {
    question: "How much time should I expect to commit?",
    answer:
      "Time commitments vary with the activities and projects you choose. Contact QHPC for current meeting details and expectations.",
  },
  {
    question: "What should I know before joining?",
    answer:
      "Get in touch to ask about current activities, membership details, and any resource or access requirements for a project.",
  },
  {
    question: "How do I get involved with QHPC?",
    answer:
      "Email QHPC to ask about current membership steps and upcoming meetings. You do not need prior HPC or Linux experience to get started.",
  },
  {
    question: "Are the projects on this website underway?",
    answer:
      "The projects page presents ideas to explore. It does not claim those ideas are active or completed projects. Contact QHPC for current activities.",
  },
  {
    question: "How can an organization discuss supporting QHPC?",
    answer:
      "Organizations can email QHPC to start a conversation about student learning, computing resources, mentorship, or other possible partnership topics. No specific sponsor benefits or funding requests are promised on this site.",
  },
  {
    question: "Do projects use Queen's Frontenac cluster?",
    answer:
      "Some learning materials cover remote computing and cluster job scheduling. Access depends on the activity and the relevant account requirements; contact the club for current guidance.",
  },
  {
    question: "Does QHPC take part in Student Cluster Competitions?",
    answer:
      "This website does not announce a QHPC entry in an external competition. Email the club for current information about 2026–27 competition plans and related learning activities.",
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
      
      {/* ==================== HEADER ==================== */}
      <section className="py-20 grid-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <p className="text-sm font-mono text-primary mb-3 uppercase tracking-widest">
              {"// man qhpc --help"}
            </p>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-text-primary mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Everything you need to know about joining and participating in Queen&apos;s 
              High-Performance Computing club.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== SEARCH & FAQ CONTENT ==================== */}
      <FAQContent faqs={faqs} />
    </div>
  );
}


