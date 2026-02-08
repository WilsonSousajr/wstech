# CLAUDE.md

## Project Overview

Personal portfolio website for Wilson Sousa (Backend Software Engineer). Built as a monochrome dark bento-grid dashboard inspired by birobirobiro.dev.

## Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 (uses `@tailwindcss/vite` plugin, NOT PostCSS)
- **Routing**: React Router v7
- **i18n**: i18next + react-i18next (EN-US default, PT-BR secondary)
- **Icons**: Lucide React
- **Blog**: Markdown files parsed with gray-matter + react-markdown + remark-gfm
- **Contact Form**: EmailJS (`@emailjs/browser`) — client-side email sending, no backend needed
- **Newsletter**: Buttondown — client-side form POST to embed endpoint, no API key needed
- **Font**: Outfit (Google Fonts)

## Key Architecture Decisions

- **No header navigation** — cards on the home bento grid are the only navigation
- **Floating UI** — language toggle (top-right) and back button on inner pages (top-left)
- **CSS Grid with explicit `grid-template-areas`** for the 4-column bento layout
- **gray-matter requires Buffer polyfill** in the browser (`buffer` package, imported in main.tsx)
- **Blog posts** loaded via `import.meta.glob('/src/content/posts/*.md')` at build time
- **GitHub heatmap** fetches real data from `github-contributions-api.jogruber.de` with mock fallback
- **Contact form** uses EmailJS `sendForm` with form ref — input `name` attrs (`from_name`, `from_email`, `message`) map directly to EmailJS template variables. Requires `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY` in `.env`
- **Newsletter** uses Buttondown's public embed-subscribe endpoint via `fetch` POST (no API key required). Requires `VITE_BUTTONDOWN_USERNAME` in `.env`

## Design System

- Background: `#0a0a0a`
- Card background: `#141414`
- Card borders: `#232323`
- Card hover: `#1a1a1a`
- Monochrome palette — no color accents, neutral grays only

## Commands

- `npm run dev` — Start dev server
- `npm run build` — TypeScript check + production build
- `npm run preview` — Preview production build

## Project Structure

```
src/
  components/
    blog/        — PostCard, PostContent
    home/        — ProfileCard, InfoCard, NavCard, NewsletterCard, GitHubHeatmap
    layout/      — Layout (with floating lang toggle + back button)
    ui/          — Card (reusable)
  content/
    posts/       — Markdown blog posts with frontmatter
  data/          — projects.ts (sample project data)
  i18n/          — en.json, pt-br.json, index.ts
  pages/         — Home, Projects, About, Contact, Blog, BlogPost
```

## Workflow Rules

- **Always delete plan files after completing plans** — remove files from `docs/plans/` once implementation is done. Do not leave stale plans in the repo.

## Responsive Design

- **Mobile-first** CSS Grid in `src/index.css` — base is 1-column, `sm` (640px) is 2-column, `lg` (1024px) is 4-column
- Grid cell wrappers in `Home.tsx` must have `min-w-0` to prevent content from overflowing grid boundaries
- Card component uses `p-4 sm:p-6` for tighter mobile padding and `overflow-hidden` + `min-w-0`
- Layout root has `overflow-x-hidden` as a safety net against horizontal scroll
- GitHub heatmap uses `.heatmap-scroll` class for horizontal scrolling with styled scrollbar on small screens

## Important Notes

- Tailwind CSS v4 requires `@tailwindcss/vite` in vite.config.ts (not PostCSS config)
- `globalThis.Buffer` assignment uses `(globalThis as Record<string, unknown>)` cast to avoid TS7017
