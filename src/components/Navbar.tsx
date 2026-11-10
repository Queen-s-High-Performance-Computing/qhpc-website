"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { QHPCLogo } from "./QHPCLogo";
import { siteConfig } from "@/config/site";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const homeHero = pathname === "/" && !scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      aria-label="Primary navigation"
      className={`qhpc-nav fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${homeHero ? "qhpc-nav--home-hero" : ""} ${
        scrolled
          ? "qhpc-nav--scrolled glass-strong border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <QHPCLogo size={28} />
          </Link>

          {/* Desktop nav */}
          <div className="hidden xl:flex flex-wrap items-center gap-1 overflow-hidden">
            {siteConfig.primaryNav.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`qhpc-nav__link relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? "text-primary"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {link.title}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-primary/10 rounded-lg border border-primary/20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/sponsors"
              className="qhpc-nav__cta hidden sm:flex xl:hidden items-center gap-1 px-4 py-2 text-sm font-medium border border-border rounded-full hover:bg-surface transition-all duration-200"
            >
              <span>Sponsor</span><ArrowUpRight size={15} aria-hidden="true" />
            </Link>
            <Link
              href="/join"
              className="qhpc-nav__cta hidden sm:flex items-center gap-1 px-4 py-2 text-sm font-medium border border-border rounded-full hover:bg-surface transition-all duration-200"
            >
              <span>How to join</span><ArrowUpRight size={15} aria-hidden="true" />
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="qhpc-nav__toggle xl:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              aria-controls="qhpc-mobile-navigation"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            id="qhpc-mobile-navigation"
            className="xl:hidden glass-strong border-t border-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
              {siteConfig.primaryNav.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "text-text-secondary hover:text-text-primary hover:bg-surface/50"
                    }`}
                  >
                    {link.title}
                  </Link>
                );
              })}
              <Link
                href="/join"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-1 px-4 py-3 mt-2 text-sm font-medium bg-primary text-white rounded-full"
              >
                <span>How to join</span><ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
