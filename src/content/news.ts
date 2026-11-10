export type NewsItem = {
  slug: string;
  date: string;
  dateLabel: string;
  category: string;
  highlight?: boolean;
  title: string;
  summary: string;
  paragraphs: string[];
  link: string;
  linkLabel: string;
};

export const newsItems: NewsItem[] = [
  {
    slug: "raspberry-pi-learning-cluster",
    date: "2026-11-09", dateLabel: "November 2026", category: "Projects", highlight: true,
    title: "Our five-board Raspberry Pi rack is assembled",
    summary: "The rack has removable trays, a vertical eight-port switch and five Raspberry Pis. Software setup and workshop planning are next.",
    paragraphs: [
      "QHPC has assembled a five-board Raspberry Pi rack with removable trays and a vertically mounted Ethernet switch. The enclosure keeps the boards and cabling accessible for teaching and maintenance.",
      "Members are working through boot setup, wired networking and remote access. The next step is a repeatable Linux configuration that can be used in member workshops.",
      "The Projects page includes an interactive model and photographs of the assembled hardware.",
    ],
    link: "/projects#pi-cluster", linkLabel: "See the rack",
  },
  {
    slug: "isc27-preparations",
    date: "2026-11-09", dateLabel: "November 2026", category: "Competitions",
    title: "Preparing QHPC's ISC27 applications",
    summary: "We're preparing team applications for the ISC27 Student Cluster Competition, due November 20, 2026.",
    paragraphs: [
      "QHPC is assembling teams and preparing applications for the ISC27 Student Cluster Competition. The application deadline is November 20, 2026; the organizers plan to announce selected teams on December 7.",
      "Preparation covers Linux administration, software environments, benchmark interpretation, parallel applications and collaborative troubleshooting.",
      "The competition includes virtual and onsite segments in 2027. Whether QHPC participates depends on selection by the organizers.",
    ],
    link: "/competitions", linkLabel: "ISC27 dates and plans",
  },
  {
    slug: "open-learning-guides",
    date: "2026-11-09", dateLabel: "Autumn 2026", category: "Learning", highlight: true,
    title: "Linux, benchmarking and profiling guides on GitHub",
    summary: "Members and newcomers can work through published exercises outside the club's meetings.",
    paragraphs: [
      "QHPC's public meeting repository includes exercises for Linux environments, virtual machines and containers.",
      "Other guides cover the STREAM memory-bandwidth benchmark on Queen's research-computing resources and profiling a C program to understand its bottlenecks.",
      "The guides are linked from the Workshops page. Some remote cluster exercises require approved CAC access.",
    ],
    link: "/workshops", linkLabel: "Open the learning guides",
  },
  {
    slug: "cssic-hardware-collaboration",
    date: "2026-11-09", dateLabel: "November 2026", category: "Collaboration",
    title: "Exploring semiconductor hardware with CSSIC",
    summary: "QHPC is exploring a student hardware collaboration linked to the January 2027 Canadian Student Semiconductor Industry Conference.",
    paragraphs: [
      "QHPC is exploring ways to connect members interested in semiconductor hardware with the Canadian Student Semiconductor Industry Conference (CSSIC).",
      "The conference is scheduled for January 21, 2027 in Ottawa and Kanata. Visit the organizers' site for event details.",
      "Specific QHPC activities related to the conference are still being planned.",
    ],
    link: "https://www.cssic.ca/", linkLabel: "CSSIC event information",
  },
];

export const cssicPartnership = {
  label: "CSSIC · 2027",
  title: "Exploring semiconductor hardware",
  description: "QHPC is discussing student participation connected to the January 21, 2027 Canadian Student Semiconductor Industry Conference. Club plans are still being developed.",
  image: {
    src: "/partnership/qhpc-cssic-partnership.png",
    alt: "QHPC and CSSIC collaboration graphic",
  },
  date: "January 21, 2027",
  location: "Ottawa and Kanata, Ontario",
  collaborationLink: { href: "/news/cssic-hardware-collaboration", label: "QHPC update" },
  conferenceLink: { href: "https://www.cssic.ca/", label: "CSSIC website" },
};
