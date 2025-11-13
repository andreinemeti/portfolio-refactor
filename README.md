# Andrei Nemeti – Portfolio (Next.js 15/TS/Redux Toolkit)

Refactor of the classic 2018 portfolio, keeping the original vibe while modernising the stack.

## Tech
- Next.js App Router + TypeScript
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
npm run dev
```

## Design notes
- Layout and colouring borrow heavily from the legacy site (dark, neon orange borders, card glow).
- BEM naming: `.hero--home__title`, `.card__tag`, `.breadcrumbs__item`, etc.
- Image slider is dependency free.


## Test (jest)
`npm test`


## Build

`npm run build`

## Deploy (cPanel)

- Copy `server.cjs` to your root folder
- copy `.next` folder to your root folder
- copy `public` folder to your root folder
- cPanel - Application startup file: `server.cjs`
- cPanel - Restart app

