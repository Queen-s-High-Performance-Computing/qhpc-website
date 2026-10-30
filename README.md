# QHPC Website

Public website for Queen's High Performance Computing Club, built with Next.js, React, and TypeScript.

## Development

Install Node.js and npm, then run:

```bash
npm ci
npm run dev
```

Open http://localhost:3000. Use `npm run lint` to check code and `npm run build` to verify the production build. Commit both `package.json` and `package-lock.json` when dependencies change.

## Where to edit

- `src/app/`: pages and layouts; the homepage is `src/app/page.tsx`.
- `src/content/`: editable content in `news.ts`, `team.ts`, `workshops.ts`, and `projects.ts`. Keep layout and styling in components.
- `src/components/`: shared components; `home/` contains homepage components and `ui/` contains reusable visual elements.
- `src/config/site.ts`: site identity, navigation, contact details, and social links.
- `public/`: images and other static assets.

Set `NEXT_PUBLIC_SITE_URL` in `.env.local` to override the canonical site URL; otherwise it defaults to `https://www.qhpc.ca`.

See [AGENTS.md](AGENTS.md) for coding-agent guidance.
