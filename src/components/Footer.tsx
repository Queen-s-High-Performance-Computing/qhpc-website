import React from "react";
import Link from "next/link";
import { Mail, MapPin, Clock } from "lucide-react";
import { FaLinkedin, FaInstagram } from "react-icons/fa6";
import { QHPCLogo } from "./QHPCLogo";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-card/50">
      <div className="section-divider" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <QHPCLogo size={32} />
            <p className="mt-4 text-sm text-text-secondary leading-relaxed">
              The first Engineering Society‑ratified supercomputing club at
              Queen&apos;s University. Building Canada&apos;s next generation of HPC talent.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-surface hover:bg-primary/10 text-text-secondary hover:text-primary transition-all duration-200"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href={siteConfig.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-surface hover:bg-primary/10 text-text-secondary hover:text-primary transition-all duration-200"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="p-2 rounded-lg bg-surface hover:bg-primary/10 text-text-secondary hover:text-primary transition-all duration-200"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-heading font-semibold text-text-primary mb-4 uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-2">
              {siteConfig.nav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-primary transition-colors duration-200"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-heading font-semibold text-text-primary mb-4 uppercase tracking-wider">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-text-secondary">
                <Mail size={16} className="mt-0.5 text-primary shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-primary transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-text-secondary">
                <MapPin size={16} className="mt-0.5 text-primary shrink-0" />
                <span>
                  {siteConfig.contact.location.split(',')[0]}
                  <br />
                  {siteConfig.contact.location.split(',').slice(1).join(',').trim()}
                </span>
              </li>
              <li className="flex items-start gap-2 text-sm text-text-secondary">
                <Clock size={16} className="mt-0.5 text-primary shrink-0" />
                <span>{siteConfig.contact.meetingTime}</span>
              </li>
            </ul>
          </div>

          {/* Terminal */}
          <div>
            <h3 className="text-sm font-heading font-semibold text-text-primary mb-4 uppercase tracking-wider">
              Quick Links
            </h3>
            <div className="terminal text-xs">
              <div className="terminal-header !py-2">
                <span className="terminal-dot !w-2 !h-2 bg-terminal-red" />
                <span className="terminal-dot !w-2 !h-2 bg-terminal-amber" />
                <span className="terminal-dot !w-2 !h-2 bg-terminal-green" />
              </div>
              <div className="p-3 space-y-1 text-text-muted">
                <p>
                  <span className="text-terminal-green">$</span>{" "}
                  <a
                    href={siteConfig.links.membershipForm}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    join --membership
                  </a>
                </p>
                <p>
                  <span className="text-terminal-green">$</span>{" "}
                  <a
                    href={siteConfig.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    connect --linkedin
                  </a>
                </p>
                <p>
                  <span className="text-terminal-green">$</span>{" "}
                  <a
                    href="https://www.instagram.com/queenshpc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    follow --instagram
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="section-divider mt-12 mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <p>
            © {new Date().getFullYear()} Queen&apos;s High-Performance Computing.
            All rights reserved.
          </p>
          <p className="font-mono flex items-center gap-1.5">
            Built with <span className="text-terminal-red">❤</span> and HPC
          </p>
        </div>
      </div>
    </footer>
  );
}
