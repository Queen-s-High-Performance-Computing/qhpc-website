import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";
import { siteConfig } from "@/config/site";

const exploreLinks = [
  { title: "Workshops", href: "/workshops" },
  { title: "Projects", href: "/projects" },
  { title: "Competitions", href: "/competitions" },
  { title: "News", href: "/news" },
];

export function Footer() {
  return (
    <footer className="border-t border-[#203b69] bg-[#081a39] text-[#e7efff]">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid gap-9 md:grid-cols-[1.5fr_0.75fr_1fr] md:gap-12">
          <div className="max-w-sm">
            <Link href="/" className="inline-flex items-center gap-2.5 text-lg font-heading font-semibold text-white" aria-label="QHPC home">
              <Image src="/logo-inverse.png" width={34} height={34} alt="" aria-hidden="true" />
              QHPC
            </Link>
            <p className="mt-4 max-w-[24rem] text-sm leading-7 text-[#bbcae6]">
              Queen&apos;s University student club for Linux, clusters, benchmarking and hands-on computing projects.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="mb-4 font-mono text-[11px] uppercase tracking-[.14em] text-[#8eaef7]">Explore</h2>
            <ul className="grid grid-cols-2 gap-x-5 gap-y-3 md:grid-cols-1">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link className="text-sm text-[#dbe6fa] transition-colors hover:text-white hover:underline" href={link.href}>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 font-mono text-[11px] uppercase tracking-[.14em] text-[#8eaef7]">Connect</h2>
            <a href={`mailto:${siteConfig.contact.email}`} className="inline-flex items-center gap-2 text-sm text-[#e7efff] hover:underline">
              <Mail size={16} aria-hidden="true" /> {siteConfig.contact.email}
            </a>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm">
              <Link href="/join" className="inline-flex items-center gap-1 text-[#dbe6fa] hover:text-white hover:underline">
                Join QHPC <ArrowUpRight size={13} aria-hidden="true" />
              </Link>
              <Link href="/sponsors" className="inline-flex items-center gap-1 text-[#dbe6fa] hover:text-white hover:underline">
                Partner with us <ArrowUpRight size={13} aria-hidden="true" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-1 text-[#dbe6fa] hover:text-white hover:underline">
                Contact <ArrowUpRight size={13} aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-5 flex gap-4 text-[#a8bee9]">
              <a href={siteConfig.links.linkedin} aria-label="QHPC on LinkedIn" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FaLinkedin size={18} /></a>
              <a href={siteConfig.links.instagram} aria-label="QHPC on Instagram" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FaInstagram size={18} /></a>
              <a href={siteConfig.links.github} aria-label="QHPC on GitHub" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FaGithub size={18} /></a>
            </div>
          </div>
        </div>
        <div className="mt-9 flex flex-wrap justify-between gap-2 border-t border-[#29436b] pt-5 text-xs text-[#9bb0d3]">
          <span>© {new Date().getFullYear()} QHPC</span>
          <span>Queen&apos;s University · Kingston, Ontario</span>
        </div>
      </div>
    </footer>
  );
}
