export const siteConfig = {
  name: "Queen's High Performance Computing Club",
  shortName: "QHPC",
  description:
    "Queen's University student club for Linux, cluster computing, benchmarking, workshops, and a five-board Raspberry Pi lab.",
  // Override at deployment when the canonical domain is confirmed.
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://qhpc.ca").replace(/\/$/, ""),
  // Use the club-branded server-room artwork for social previews, rather than a bare logo.
  ogImage: "/qhpc-server-racks.png",
  contact: {
    email: "QHPC@engsoc.queensu.ca",
    location: "Queen's University, Kingston, ON",
  },
  links: {
    github: "https://github.com/Queen-s-High-Performance-Computing",
    linkedin: "https://www.linkedin.com/company/queen-s-high-performance-computing",
    instagram: "https://www.instagram.com/queenshpc",
  },
  primaryNav: [
    { title: "About", href: "/about" },
    { title: "Learning", href: "/workshops" },
    { title: "Projects", href: "/projects" },
    { title: "Competitions", href: "/competitions" },
    { title: "Team", href: "/team" },
    { title: "News", href: "/news" },
    { title: "Sponsors", href: "/sponsors" },
    { title: "Contact", href: "/contact" },
  ],
  nav: [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Workshops", href: "/workshops" },
    { title: "Projects", href: "/projects" },
    { title: "Competitions", href: "/competitions" },
    { title: "Team", href: "/team" },
    { title: "News", href: "/news" },
    { title: "Resources", href: "/resources" },
    { title: "FAQ", href: "/faq" },
    { title: "Contact", href: "/contact" },
    { title: "How to join", href: "/join" },
    { title: "Sponsors", href: "/sponsors" },
  ],
};
