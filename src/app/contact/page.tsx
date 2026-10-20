"use client";

import React, { useState, useEffect } from "react";
import {
  Mail,
  MapPin,
  Clock,
  Send,
  Terminal,
  ArrowRight,
  Users,
  Handshake,
  MessageSquare,
} from "lucide-react";
import { FaLinkedin, FaInstagram } from "react-icons/fa6";
import toast from "react-hot-toast";
import { siteConfig } from "@/config/site";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { TerminalTyper } from "@/components/TerminalTyper";
import { AnimatedCounter } from "@/components/AnimatedCounter";

function MeetingCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const getNextWednesday = () => {
      const now = new Date();
      const target = new Date(now);

      // Find next Wednesday
      const dayOfWeek = now.getDay();
      const daysUntilWed = (3 - dayOfWeek + 7) % 7;

      if (daysUntilWed === 0) {
        // Today is Wednesday
        target.setHours(17, 30, 0, 0);
        if (now > target) {
          // Meeting already passed, go to next week
          target.setDate(target.getDate() + 7);
        }
      } else {
        target.setDate(now.getDate() + daysUntilWed);
        target.setHours(17, 30, 0, 0);
      }

      return target;
    };

    const update = () => {
      const now = new Date();
      const target = getNextWednesday();
      const diff = target.getTime() - now.getTime();

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-3">
      {[
        { value: timeLeft.days, label: "Days" },
        { value: timeLeft.hours, label: "Hours" },
        { value: timeLeft.minutes, label: "Min" },
        { value: timeLeft.seconds, label: "Sec" },
      ].map((unit) => (
        <div
          key={unit.label}
          className="p-3 bg-surface rounded-xl border border-border text-center"
        >
          <div className="text-2xl sm:text-3xl font-mono font-bold text-primary">
            {String(unit.value).padStart(2, "0")}
          </div>
          <p className="text-xs text-text-muted mt-1">{unit.label}</p>
        </div>
      ))}
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="pt-20">
      {/* ==================== HEADER ==================== */}
      <section className="py-20 grid-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <p className="text-sm font-mono text-primary mb-3 uppercase tracking-widest">
              // connect
            </p>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-text-primary mb-6">
              Get Involved
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Join the cluster, attend a meeting, or reach out to learn more
              about QHPC.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== TERMINAL JOIN ==================== */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-heading font-bold text-text-primary">
                Join the Cluster
              </h2>
              <p className="text-text-secondary mt-2">
                New members are welcome at any time. No experience required.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <TerminalTyper
              lines={[
                "ssh newmember@qhpc.queensu.ca",
                "Welcome to QHPC Cluster.",
                "cat /etc/motd",
                "============================",
                "No experience required.",
                "All Queen's students welcome.",
                "Meetings: Wed 5:30 PM, Dunning 10",
                "============================",
                "Ready to join? Run: submit --application membership",
              ]}
              speed={30}
            />
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <div className="mt-6 text-center">
              <a
                href={siteConfig.links.membershipForm}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-xl btn-glow transition-all duration-300 hover:bg-primary-dark text-lg"
              >
                <Terminal size={20} />
                <span>Membership Form</span>
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== NEXT MEETING COUNTDOWN ==================== */}
      <section className="py-24 grid-bg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="p-8 sm:p-12 rounded-3xl glass border border-primary/10">
              <div className="text-center mb-8">
                <p className="text-sm font-mono text-terminal-green mb-2">
                  <span className="status-dot status-active mr-2" />
                  NEXT SESSION
                </p>
                <h2 className="text-2xl font-heading font-bold text-text-primary">
                  Next Meeting Countdown
                </h2>
                <p className="text-sm text-text-secondary mt-1">
                  {siteConfig.contact.meetingTime} — {siteConfig.contact.location}
                </p>
              </div>

              <MeetingCountdown />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== CONTACT INFO ==================== */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-sm font-mono text-primary mb-2 uppercase tracking-widest">
                // reach_us
              </p>
              <h2 className="text-3xl font-heading font-bold text-text-primary">
                Contact Information
              </h2>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StaggerItem>
              <div className="p-6 bg-card rounded-2xl border border-border card-hover h-full text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                  <Mail size={24} />
                </div>
                <h3 className="text-sm font-heading font-semibold text-text-primary mb-2">
                  Email
                </h3>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-sm text-primary hover:underline break-all"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
            </StaggerItem>

            <StaggerItem>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 bg-card rounded-2xl border border-border card-hover h-full text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                  <FaLinkedin size={24} />
                </div>
                <h3 className="text-sm font-heading font-semibold text-text-primary mb-2">
                  LinkedIn
                </h3>
                <p className="text-sm text-text-secondary">
                  Queen&apos;s High-Performance Computing
                </p>
              </a>
            </StaggerItem>

            <StaggerItem>
              <a
                href={siteConfig.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 bg-card rounded-2xl border border-border card-hover h-full text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                  <FaInstagram size={24} />
                </div>
                <h3 className="text-sm font-heading font-semibold text-text-primary mb-2">
                  Instagram
                </h3>
                <p className="text-sm text-text-secondary">@queenshpc</p>
              </a>
            </StaggerItem>

            <StaggerItem>
              <div className="p-6 bg-card rounded-2xl border border-border card-hover h-full text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                  <MapPin size={24} />
                </div>
                <h3 className="text-sm font-heading font-semibold text-text-primary mb-2">
                  Location
                </h3>
                <p className="text-sm text-text-secondary">
                  Dunning 10
                  <br />
                  Queen&apos;s University
                  <br />
                  Kingston, ON
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* ==================== SPONSORSHIP ==================== */}
      <section className="py-24 grid-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="p-8 sm:p-12 rounded-3xl glass border border-secondary/10">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-xl bg-secondary/10 text-secondary shrink-0">
                  <Handshake size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
                    Sponsorship &amp; Partnerships
                  </h2>
                  <p className="text-text-secondary leading-relaxed">
                    Organisations interested in sponsoring QHPC can receive:
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                  {
                    icon: Users,
                    text: "Direct access to 40+ HPC‑focused students",
                  },
                  {
                    icon: Send,
                    text: "Logo placement on banner, website, and social media",
                  },
                  {
                    icon: Handshake,
                    text: "Collaboration on workshops and career events",
                  },
                ].map((item) => (
                  <div
                    key={item.text}
                    className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border"
                  >
                    <item.icon
                      size={16}
                      className="text-secondary shrink-0 mt-0.5"
                    />
                    <p className="text-xs text-text-secondary">{item.text}</p>
                  </div>
                ))}
              </div>

              <a
                href="mailto:QHPC@engsoc.queensu.ca?subject=Sponsorship"
                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary/10 text-secondary border border-secondary/30 rounded-xl font-mono text-sm hover:bg-secondary/20 transition-all"
              >
                <Mail size={16} />
                Contact for Sponsorship
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== FEEDBACK ==================== */}
      <section className="py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <div className="p-8 bg-card rounded-2xl border border-border">
              <MessageSquare size={32} className="text-primary mx-auto mb-4" />
              <h2 className="text-xl font-heading font-bold text-text-primary mb-2">
                Anonymous Feedback
              </h2>
              <p className="text-sm text-text-secondary mb-6">
                Have feedback, suggestions, or concerns? We&apos;d love to hear from
                you — completely anonymously.
              </p>
              <a
                href="https://forms.office.com/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => toast.success("Opening anonymous feedback form...")}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary border border-primary/30 rounded-xl font-mono text-sm hover:bg-primary/20 transition-all"
              >
                <Send size={16} />
                Submit Feedback
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
