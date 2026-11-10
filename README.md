# QHPC Website

Public website for Queen's High Performance Computing Club, built with Next.js 16, React, TypeScript, Tailwind CSS, and React Three Fiber.

**Primary domain:** https://qhpc.ca (when connected to Cloudflare Pages)

## Development

Install Node.js and npm:

```bash
npm ci
npm run dev
```

Visit http://localhost:3000. Before merging changes, run:

```bash
npm run lint
CF_PAGES=1 npm run build
```

The Cloudflare Pages build uses `output: "export"` and produces `out/`. Normal Vercel builds retain the standard Next.js output. Build settings for Cloudflare Pages: **Next.js (Static HTML Export)**, `npm run build`, output directory `out`, production branch `main`.

## Where to edit

- `src/app/`: routes and page layout.
- `src/app/news/`: public news landing and static individual article routes.
- `src/content/news.ts`: story data for the news archive, homepage, and article URLs. Add one unique `slug`, `date`, `dateLabel`, `category`, `title`, `summary`, `paragraphs`, and a useful link per update. Older stories should be preserved unless corrected or retracted.
- `src/content/workshops.ts`: verified public learning guide links and descriptions.
- `src/content/projects.ts`: **proposed ideas**, separate from active projects described on the Projects page.
- `src/content/team.ts`: current executives, advisors, and photo filenames.
- `src/config/site.ts`: metadata, canonical domain, navigation, and club links.
- `src/components/projects/RaspberryPiRackViewer.tsx`: interactive rack viewer built from the GLB exports of STEP geometry supplied by QHPC, with additional illustrative in-scene geometry and assembly animation.
- `public/`: images and static assets.

Content should be accurate, current, and clear about what is planned versus completed. Do not present an unsubmitted application as a confirmed competition selection, or list a company as a sponsor without approval. Keep student research that is not an authorized QHPC project out of club publicity.

## 3D model licensing

The original MakerWorld reference CAD file is not distributed in this website. The viewer uses QHPC-supplied STEP CAD exports for the rack frame, trays, and Raspberry Pi boards; the shipped GLB files identify `trimesh` as their generator. The switch internals, port details, fasteners, and assembly animation include illustrative geometry. The repository does not identify who originally authored the supplied STEP files or describe a LiDAR scan. Obtain the appropriate permission before publishing any remixed or converted third-party CAD model.

## Domain and organizational continuity

The code lives in the QHPC GitHub organization; Cloudflare Pages controls hosting, and Porkbun remains the `qhpc.ca` registrar. Maintain at least two authorized administrators across the GitHub, Cloudflare, and domain-recovery workflows. Do not publish passwords, DNS tokens, or private cluster account details in this repository.

See `AGENTS.md` for coding conventions and project safety rules.
