export const siteConfig = {
  name: "Queen's High Performance Computing Club",
  shortName: "QHPC",
  description:
    "QHPC is Queen's University's student club for high-performance computing, with hands-on learning and collaborative projects.",
  // Override at deployment when the canonical domain is confirmed.
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.qhpc.ca").replace(/\/$/, ""),
  // Use the club-branded server-room artwork for social previews, rather than a bare logo.
  ogImage: "/qhpc-server-racks.png",
  contact: {
    email: "QHPC@engsoc.queensu.ca",
    location: "Queen's University, Kingston, ON",
  },
  links: {
    github: "https://github.com/Queen-s-High-Performance-Computing",
    linkedin: "https://www.linkedin.com/company/queens-high-performance-computing",
    instagram: "https://www.instagram.com/queenshpc",
  },
  primaryNav: [
    { title: "About", href: "/about" },
    { title: "Learning", href: "/workshops" },
    { title: "Projects", href: "/projects" },
    { title: "Competitions", href: "/competitions" },
    { title: "Team", href: "/team" },
    { title: "Sponsors", href: "/sponsors" },
  ],
  nav: [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Workshops", href: "/workshops" },
    { title: "Projects", href: "/projects" },
    { title: "Competitions", href: "/competitions" },
    { title: "Team", href: "/team" },
    { title: "Resources", href: "/resources" },
    { title: "FAQ", href: "/faq" },
    { title: "Contact", href: "/contact" },
    { title: "How to join", href: "/join" },
    { title: "Sponsors", href: "/sponsors" },
  ],
};
