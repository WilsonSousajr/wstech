# CLAUDE.md

## Project Overview

Personal portfolio website for Wilson Sousa (Senior FullStack Engineer). Built as a monochrome bento-grid dashboard (inspired by birobirobiro.dev) with an Apple-style liquid glass look over a dune photograph, in dark and light themes.

## Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 (uses `@tailwindcss/vite` plugin, NOT PostCSS)
- **Routing**: React Router v7
- **i18n**: i18next + react-i18next (EN-US default, PT-BR secondary)
- **Icons**: Lucide React
- **Blog**: lives separately at `blog.wstech.tech` (Hugo, repo `wstech-blog`) — NOT in this app. The home bento "Blog" card is an external link.
- **Contact Form**: EmailJS (`@emailjs/browser`) — client-side email sending, no backend needed
- **Newsletter**: Buttondown — client-side form POST to embed endpoint, no API key needed
- **Font**: Outfit (Google Fonts)

## Key Architecture Decisions

- **No header navigation** — cards on the home bento grid are the only navigation
- **Floating UI** — clear-glass pills: theme + language toggle and, on inner pages, a back button. Bottom corners on phones (above the iPhone home indicator via `env(safe-area-inset-bottom)`, needs `viewport-fit=cover`), top corners from `sm` up
- **CSS Grid with explicit `grid-template-areas`** for the 4-column bento layout
- **`NavCard` handles internal and external links** — an `http(s)` `to` renders a new-tab `<a>` (with an `ArrowUpRight` affordance); otherwise a react-router `<Link>`. The Blog card uses this to point at `blog.wstech.tech`.
- **GitHub heatmap** fetches real data from `github-contributions-api.jogruber.de` with mock fallback
- **Contact form** uses EmailJS `sendForm` with form ref — input `name` attrs (`from_name`, `from_email`, `message`) map directly to EmailJS template variables. Requires `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY` in `.env`
- **Newsletter** uses Buttondown's public embed-subscribe endpoint via `fetch` POST (no API key required). Requires `VITE_BUTTONDOWN_USERNAME` in `.env`
- **Route-based code splitting** — all pages except Home use `React.lazy()` + `Suspense` in App.tsx. Home is eagerly loaded as the landing page. This keeps the main bundle under 500KB.
- **Liquid glass** (`src/components/glass/`) — every `Card` is `<Glass variant="smoky">`, floating controls are `<Glass variant="clear">`. True refraction is an SVG `feDisplacementMap` used as `backdrop-filter: url(#id)`, **Chromium only** (`html.glass-refract`, set in `support.ts`); Safari/Firefox get a CSS frosted fallback. Frost/saturation live inside the SVG filter — never chain CSS `blur()` after `url()` (Chrome bands). The displacement map (`displacementMap.ts`, unit-tested) is a whole-surface magnifying lens plus a stronger bezel bend.
- **Backdrop root rule** — no ancestor of a `Glass` may have `opacity < 1`, `filter`, `mask`, `clip-path`, `backdrop-filter`, `mix-blend-mode` (or matching `will-change`), and Glass must never be nested: the glass would stop seeing the page behind it. That's why the Home entrance is split: wrappers only `rise`, the glass fades itself; stagger with `[--fade-delay:Nms]`, not `animation-delay`
- **Light source** (`light.ts`) — one rAF-throttled pointer listener moves the backdrop spotlight and sets each glass's `--rim-angle`; nothing is written to `:root` per frame. Touch devices drift via CSS keyframes; reduced motion keeps it static
- **Backdrop** and the light provider are mounted in `App.tsx` **outside** `<Suspense>` so lazy routes never unmount them
- **`<meta name="darkreader-lock">`** in `index.html` — Dark Reader's color rewriting breaks the glass; the site ships its own themes
- **`<html lang>` syncs automatically** via `i18n.on('languageChanged')` in `src/i18n/index.ts` — no need to manage it in React components

## Design System

- Monochrome palette — neutral grays only; the one exception is the faint spectral sheen on light-theme glass
- Backdrop: dune photo in `public/backgrounds/` (AVIF + WebP, desktop landscape / mobile portrait crops, Unsplash — credit in `Backdrop.tsx`), toned per theme via `--photo-filter`
- Glass tokens live in plain `:root` / `.light` blocks in `index.css` (`--glass-smoky-*`, `--glass-clear-tint`, `--glass-rim*`, `--glass-shadow`, …); text/surface tokens stay in `@theme`
- Surfaces inside cards are translucent (`--color-input`, `--color-badge`, `--color-border-hover`); light-theme text is darker than usual because light glass is clear
- Radii: cards `rounded-[18px] sm:rounded-[20px]`, inputs/images `rounded-2xl`, buttons and pills `rounded-full`

## Commands

- `npm run dev` — Start dev server
- `npm run build` — TypeScript check + production build
- `npm run preview` — Preview production build
- `npm test` — Vitest unit tests (`src/**/*.test.ts`, node environment)

## Project Structure

```
src/
  components/
    glass/       — Glass, Backdrop, LightProvider, light engine, refraction hook, displacement map, SVG filters
    home/        — ProfileCard, InfoCard, NavCard, NewsletterCard, GitHubHeatmap
    layout/      — Layout (floating clear-glass controls: theme + language toggle, back button)
    ui/          — Card (a smoky Glass)
  data/          — projects.ts (sample project data)
  i18n/          — en.json, pt-br.json, index.ts
  pages/         — Home, Projects, About, Contact, NotFound
```

The blog is a separate project — see the `wstech-blog` repo (Hugo) deployed to `blog.wstech.tech`.

## Workflow Rules

- **Always delete plan files after completing plans** — remove files from `docs/plans/` once implementation is done. Do not leave stale plans in the repo.

## Responsive Design

- **Mobile-first** CSS Grid in `src/index.css` — base is 1-column, `sm` (640px) is 2-column, `lg` (1024px) is 4-column
- Grid cell wrappers in `Home.tsx` must have `min-w-0` to prevent content from overflowing grid boundaries
- Card component uses `p-4 sm:p-6` for tighter mobile padding and `overflow-hidden` + `min-w-0`
- `main` has extra bottom padding on phones so the last card clears the bottom floating controls
- Layout root has `overflow-x-hidden` as a safety net against horizontal scroll
- GitHub heatmap uses `.heatmap-scroll` class for horizontal scrolling with styled scrollbar on small screens

## Deployment

- **Hosting**: Vercel (team: `wilsonsousajrs-projects`, project: `wstech`)
- All `VITE_*` env vars are configured in Vercel for production, preview, and development environments
- These are client-side variables (bundled into JS at build time) — safe to expose since they're public keys/identifiers

## Important Notes

- Tailwind CSS v4 requires `@tailwindcss/vite` in vite.config.ts (not PostCSS config)
- **All user-visible strings must use `t()` from react-i18next** — never hardcode English text in components (includes aria-labels, loading states, legend labels)
- Icon-only buttons/links must always have `aria-label` with a translated string
- All external `<a>` tags must use `target="_blank" rel="noopener noreferrer"`
