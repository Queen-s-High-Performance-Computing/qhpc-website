import React from "react";
import { Metadata } from "next";
import { ScrollReveal } from "@/components/ScrollReveal";
import { FAQContent } from "./FAQContent";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Common questions about joining QHPC, cluster access, time commitments, and supercomputing at Queen's University.",
  alternates: {
    canonical: "/faq",
  },
};

const faqs = [
  {
    question: "Do I need prior supercomputing (HPC) or Linux experience to join?",
    answer:
      "No. QHPC welcomes students from all disciplines and skill levels. Our workshops start from the basics, covering Linux fundamentals, shell scripting, and progressively building up to parallel programming and cluster administration.",
  },
  {
    question: "What are the time commitments for QHPC members?",
    answer:
      "Weekly meetings are 2 hours (Wednesdays, 5:30–7:30 PM). Sprint projects require additional self-directed work, approximately 2–4 hours per week. Executive roles require 5–10 hours per week.",
  },
  {
    question: "Are there membership fees for QHPC?",
    answer:
      "No. All QHPC activities are free for Queen's University students, thanks to our sponsors and grants. Workshops, cluster access, and competition preparation are all included at no cost.",
  },
  {
    question: "How do I get access to the Frontenac Cluster at Queen's?",
    answer:
      "After joining QHPC, you will receive instructions to request a Frontenac account through the Centre for Advanced Computing (CAC). QHPC provides a step-by-step guide for SSH access, Slurm job submission, and shared storage usage.",
  },
  {
    question: "Does QHPC compete in international Student Cluster Competitions?",
    answer:
      "Yes, QHPC is building towards competing in the SC Student Cluster Competition (SCC) and IndySCC. We represent Queen's University on the global supercomputing stage.",
  },
  {
    question: "Can graduate students join QHPC?",
    answer:
      "Yes. QHPC is open to both undergraduate and graduate students at Queen's University. Graduate students often contribute as mentors and technical leads.",
  },
  {
    question: "What engineering and science disciplines are represented in QHPC?",
    answer:
      "QHPC has members from Computer Engineering, Electrical Engineering, Mathematics and Computing, Physics, and Arts & Science programs. Interdisciplinary collaboration is a core value.",
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
              // man qhpc --help
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


