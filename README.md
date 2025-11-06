# Andrei Nemeti – Portfolio (Next.js 16/TS/Redux Toolkit)

Refactor of the classic 2018 portfolio, keeping the original vibe while modernising the stack.

## Tech
- Next.js App Router + TypeScript
- Redux Toolkit (state + async thunks)
- SCSS with BEM
- Minimal Jest tests

## Routes
- `/` – Home: hero, breadcrumbs, card grid, tags
- `/project/[slug]` – Project detail: hero, slider, description, tags, "See next project"

## APIs
- `GET /api/projects` → `{ projects, tags }`
- `GET /api/project?slug=<slug>` or `GET /api/project?tags=html,css` → project or 404

## Run locally

```bash
pnpm i  # or npm i / yarn
cp .env.example .env.local  # fill SMTP_* and CONTACT_TO
npm run dev
```

## Design notes
- Layout and colouring borrow heavily from the legacy site (dark, neon blue borders, card glow).
- BEM naming: `.hero--home__title`, `.card__tag`, `.breadcrumbs__item`, etc.
- Image slider is dependency free.

