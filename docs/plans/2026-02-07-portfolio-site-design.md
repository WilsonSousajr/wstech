# Portfolio Site Design — Wilson Sousa

**Date:** 2026-02-07
**Project:** wstech — Personal Portfolio & Blog

---

## 1. Overview

A personal portfolio site for Wilson Sousa (Backend Software Engineer) using a Bento Grid layout inspired by birobirobiro.dev. Dark-mode only, minimalist typography, every card outlined in deep purple (`#7C3AED` / Tailwind `violet-600`).

## 2. Tech Stack

- **Framework:** React (latest) + Vite + TypeScript
- **Styling:** Tailwind CSS + `@tailwindcss/typography`
- **Routing:** React Router
- **i18n:** i18next + react-i18next (EN-US default, PT-BR secondary)
- **Icons:** Lucide-React
- **Blog:** react-markdown + gray-matter + remark-gfm
- **Blog loading:** Vite `import.meta.glob` for `.md` files at build time

## 3. Personal Details

- **Name:** Wilson Sousa
- **GitHub:** WilsonSousajr
- **Role:** Backend Software Engineer
- **Email:** wstechnology.br@gmail.com
- **Location:** Brasilia, Brazil
- **Tech Stack Pills:** Python, FastAPI, Django, PostgreSQL, ClickHouse, Go, TypeScript, React, Docker, AWS, ETL/BigData, VPS/Bare Metal

## 4. Project Structure

```
wstech/
├── public/
│   └── wilson.jpg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx          # Language toggle + minimal nav
│   │   │   └── Layout.tsx          # Shared wrapper
│   │   ├── home/
│   │   │   ├── ProfileCard.tsx
│   │   │   ├── InfoCard.tsx
│   │   │   ├── NavCard.tsx
│   │   │   ├── NewsletterCard.tsx
│   │   │   └── GitHubHeatmap.tsx
│   │   ├── blog/
│   │   │   ├── PostCard.tsx
│   │   │   └── PostContent.tsx
│   │   └── ui/
│   │       └── Card.tsx            # Reusable card with purple border
│   ├── content/
│   │   └── posts/
│   │       ├── getting-started-fastapi.md
│   │       ├── docker-production.md
│   │       └── clickhouse-analytics.md
│   ├── i18n/
│   │   ├── index.ts
│   │   ├── en.json
│   │   └── pt-br.json
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Projects.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Blog.tsx
│   │   └── BlogPost.tsx
│   ├── data/
│   │   └── projects.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── tailwind.config.ts
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## 5. Design System

### Colors
- **Background:** `bg-zinc-950`
- **Card background:** `bg-zinc-900`
- **Card border:** `border-violet-600` (#7C3AED)
- **Card border hover:** `border-violet-500`
- **Primary text:** `text-zinc-100`
- **Secondary text:** `text-zinc-400`
- **Accent:** `text-violet-400`
- **Tech pills:** `bg-violet-600/20 text-violet-300 border border-violet-600`
- **Year pills:** `bg-violet-600/20 text-violet-300`

### Typography
- System font stack (`font-sans`)
- Blog prose: `prose-invert` with `prose-a:text-violet-400`

### Interactions
- Card hover: `hover:border-violet-500 hover:scale-[1.01] transition-all duration-200`
- Nav cards: additional `hover:shadow-violet-600/20 hover:shadow-lg`
- Copy email: icon swaps clipboard → check for 2s
- Clock: live-updating every second, `America/Sao_Paulo` timezone
- Page transitions: CSS fade-in on route change

## 6. Home Page — Bento Grid

Explicit `grid-template-areas` layout.

### Desktop (3 columns)
```
┌─────────────────┬───────────┬───────────────┐
│                 │           │               │
│  Profile Card   │ Info Card │  Nav: Projects│
│  (spans 1x2)   │           │               │
│                 ├───────────┼───────────────┤
│                 │           │               │
│                 │Nav: About │  Nav: Blog    │
│                 │           │               │
├─────────────────┼───────────┴───────────────┤
│                 │                           │
│  Nav: Contact   │  GitHub Heatmap           │
│                 │  (spans 2 cols)           │
├─────────────────┴───────────────────────────┤
│                                             │
│  Newsletter Card (full width)               │
│                                             │
└─────────────────────────────────────────────┘
```

### Tablet (2 columns)
Profile card spans 2 rows, other cards reflow. Heatmap full width.

### Mobile (1 column)
All cards stack: Profile → Info → Nav cards → Heatmap → Newsletter.

### Card Details

**Profile Card:**
- Avatar image (rounded)
- "Wilson Sousa" heading
- `@WilsonSousajr` handle
- "Backend Software Engineer" subtitle
- Flex-wrap tech pills

**Info Card:**
- Live clock (Brasilia timezone)
- "Brasilia, Brazil" + map-pin icon
- Mocked weather: "28°C, Sunny" + sun icon

**Nav Cards:**
- Icon + label each
- Link to respective routes
- Pronounced hover effect

**Newsletter Card:**
- Email input + Subscribe button
- Console.log on submit (no backend)

**GitHub Heatmap:**
- Grid of small squares
- Mocked data, violet shades (violet-900 to violet-400)

## 7. Inner Pages

### Projects (`/projects`)
- Header: title + "A selection of my work"
- 2-column grid (1 on mobile)
- 4 sample project cards:
  1. FastAPI Microservices Gateway
  2. ETL Pipeline Dashboard
  3. ClickHouse Analytics Platform
  4. React Component Library
- Each card: colored placeholder thumbnail, title, year pill, description, "View Project" link

### About (`/about`)
- **Bio card** (full width): 2-3 paragraphs about backend engineering, scalable systems, data pipelines, cloud infrastructure
- **Career Timeline card** (full width): Vertical line + dots
  - Senior Backend Engineer at Company Z (2023 - Present)
  - Backend Developer at Company Y (2021 - 2023)
  - Junior Developer at Company X (2019 - 2021)
  - Each with role, company, dates, 1-line description

### Contact (`/contact`)
- Two cards side by side (stacked mobile)
- **Quick Contact:** Email displayed + "Copy" button with clipboard API, "Copied!" feedback
- **Contact Form:** Name, Email, Message fields with violet focus rings. Success message on submit (no backend)

### Blog (`/blog`)
- **Index:** Post cards sorted newest first. Each: title, date, description, tag pills, "Read more" link
- **Post view (`/blog/:slug`):** Full article with `@tailwindcss/typography` prose. Back button, title, date, tags above content

## 8. Internationalization

- **Default language:** EN-US
- **Secondary:** PT-BR
- Toggle button in header: "EN" / "PT-BR"
- Persists in `localStorage`
- All static UI text translated via i18n JSON files
- Blog posts NOT translated — stay in authored language

## 9. Sample Blog Posts

3 sample posts in `src/content/posts/`:
1. `getting-started-fastapi.md` — Intro to FastAPI
2. `docker-production.md` — Docker in production tips
3. `clickhouse-analytics.md` — ClickHouse for analytics

Each with frontmatter: title, date, description, tags.
