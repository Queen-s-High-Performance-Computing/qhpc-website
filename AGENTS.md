<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project

Public website for Queen's High Performance Computing Club.
Keep content concise, student-friendly, and outward-facing.
Do not invent events, partnerships, sponsors, results, or access claims.
Clearly distinguish project ideas from active projects.

Projects are listed here: https://github.com/Queen-s-High-Performance-Computing/qhpc-projects

## Organization

- `src/app/`: routes, layouts, and page-specific content.
- `src/content/`: recurring news, team, learning, and project content; keep presentation in pages and components.
- `src/components/`: shared components.
- `src/components/home/`: homepage-specific components.
- `src/components/ui/`: reusable visual primitives.
- `src/config/site.ts`: shared site identity, links, and navigation.
- `public/`: static assets.

## Working conventions

- Use npm and retain `package-lock.json`.
- Follow existing styling and component patterns.
- Keep changes focused; avoid unrelated redesigns.
- Reuse shared components before adding new ones.
- Never edit generated files or `node_modules`.
- Keep these instructions authoritative; tool-specific guidance files should point here rather than duplicate them.

## Validation

- Run `npm run lint` and `npm run build` after code changes.
- For visual changes, check mobile and desktop layouts in the browser.
- Report checks that could not be completed.
