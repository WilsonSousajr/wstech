# Portfolio Site Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build Wilson Sousa's personal portfolio site with a Bento Grid home page, projects, about, contact, and markdown blog.

**Architecture:** React SPA with Vite, Tailwind CSS for dark-mode bento grid styling, React Router for pages, i18next for EN/PT-BR translations, and markdown blog posts loaded at build time via Vite's import.meta.glob.

**Tech Stack:** React 19, Vite, TypeScript, Tailwind CSS v4, React Router v7, i18next, Lucide-React, react-markdown, gray-matter, remark-gfm

---

### Task 1: Scaffold Vite + React + TypeScript project

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/vite-env.d.ts`

**Step 1: Create Vite project**

Run from the project root `/mnt/hdd_data/Documents/Life/wstech`:
```bash
npm create vite@latest . -- --template react-ts
```
If prompted about existing directory, confirm yes.

**Step 2: Install core dependencies**

```bash
npm install react-router-dom i18next react-i18next lucide-react react-markdown gray-matter remark-gfm
```

**Step 3: Install dev dependencies**

```bash
npm install -D tailwindcss @tailwindcss/typography @types/node
```

**Step 4: Configure Tailwind in `src/index.css`**

Replace the entire contents of `src/index.css` with:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
```

**Step 5: Update `vite.config.ts` for markdown raw imports**

Replace `vite.config.ts` with:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.md'],
})
```

**Step 6: Verify the dev server starts**

```bash
npm run dev
```
Expected: Vite dev server starts on localhost.

**Step 7: Commit**

```bash
git init
git add -A
git commit -m "chore: scaffold vite + react + typescript project with dependencies"
```

---

### Task 2: Set up i18n with EN-US and PT-BR translations

**Files:**
- Create: `src/i18n/en.json`, `src/i18n/pt-br.json`, `src/i18n/index.ts`
- Modify: `src/main.tsx`

**Step 1: Create `src/i18n/en.json`**

```json
{
  "nav": {
    "home": "Home",
    "projects": "Projects",
    "about": "About",
    "contact": "Contact",
    "blog": "Blog"
  },
  "home": {
    "role": "Backend Software Engineer",
    "location": "Brasilia, Brazil",
    "weather": "28°C, Sunny",
    "newsletter": {
      "title": "Newsletter",
      "placeholder": "Enter your email",
      "button": "Subscribe",
      "success": "Thanks for subscribing!"
    },
    "github": "GitHub Activity"
  },
  "projects": {
    "title": "Projects",
    "subtitle": "A selection of my work",
    "viewProject": "View Project"
  },
  "about": {
    "title": "About Me",
    "bio": "I'm Wilson Sousa, a Backend Software Engineer based in Brasilia, Brazil. I specialize in building scalable distributed systems, high-performance APIs, and data pipelines. My daily tools include Python, FastAPI, Django, and Go, backed by PostgreSQL and ClickHouse for data storage and analytics.\n\nBeyond backend development, I have hands-on experience with cloud infrastructure — managing deployments on AWS, VPS, and bare metal servers. I enjoy the full lifecycle: from designing system architecture to deploying and monitoring production workloads.\n\nWhen I'm not writing code, I'm exploring new technologies, contributing to open source, and sharing what I learn through my blog.",
    "experience": "Experience",
    "timeline": {
      "job1": {
        "role": "Senior Backend Engineer",
        "company": "Company Z",
        "period": "2023 - Present",
        "description": "Leading backend architecture for distributed microservices platform."
      },
      "job2": {
        "role": "Backend Developer",
        "company": "Company Y",
        "period": "2021 - 2023",
        "description": "Built data pipelines and REST APIs serving millions of requests daily."
      },
      "job3": {
        "role": "Junior Developer",
        "company": "Company X",
        "period": "2019 - 2021",
        "description": "Developed internal tools and automated deployment workflows."
      }
    }
  },
  "contact": {
    "title": "Contact",
    "quickContact": "Quick Contact",
    "copy": "Copy",
    "copied": "Copied!",
    "form": {
      "title": "Send a Message",
      "name": "Name",
      "email": "Email",
      "message": "Message",
      "send": "Send Message",
      "success": "Message sent! I'll get back to you soon."
    }
  },
  "blog": {
    "title": "Blog",
    "readMore": "Read more",
    "back": "Back to Blog"
  }
}
```

**Step 2: Create `src/i18n/pt-br.json`**

```json
{
  "nav": {
    "home": "Início",
    "projects": "Projetos",
    "about": "Sobre",
    "contact": "Contato",
    "blog": "Blog"
  },
  "home": {
    "role": "Engenheiro de Software Backend",
    "location": "Brasília, Brasil",
    "weather": "28°C, Ensolarado",
    "newsletter": {
      "title": "Newsletter",
      "placeholder": "Digite seu email",
      "button": "Inscrever-se",
      "success": "Obrigado por se inscrever!"
    },
    "github": "Atividade no GitHub"
  },
  "projects": {
    "title": "Projetos",
    "subtitle": "Uma seleção do meu trabalho",
    "viewProject": "Ver Projeto"
  },
  "about": {
    "title": "Sobre Mim",
    "bio": "Sou Wilson Sousa, Engenheiro de Software Backend baseado em Brasília, Brasil. Sou especializado em construir sistemas distribuídos escaláveis, APIs de alta performance e pipelines de dados. Minhas ferramentas diárias incluem Python, FastAPI, Django e Go, com PostgreSQL e ClickHouse para armazenamento e análise de dados.\n\nAlém do desenvolvimento backend, tenho experiência prática com infraestrutura em nuvem — gerenciando deploys em AWS, VPS e servidores bare metal. Gosto de todo o ciclo: desde o design da arquitetura até o deploy e monitoramento de cargas de trabalho em produção.\n\nQuando não estou escrevendo código, estou explorando novas tecnologias, contribuindo para open source e compartilhando o que aprendo no meu blog.",
    "experience": "Experiência",
    "timeline": {
      "job1": {
        "role": "Engenheiro Backend Sênior",
        "company": "Empresa Z",
        "period": "2023 - Presente",
        "description": "Liderando arquitetura backend para plataforma de microsserviços distribuídos."
      },
      "job2": {
        "role": "Desenvolvedor Backend",
        "company": "Empresa Y",
        "period": "2021 - 2023",
        "description": "Construí pipelines de dados e APIs REST atendendo milhões de requisições diárias."
      },
      "job3": {
        "role": "Desenvolvedor Júnior",
        "company": "Empresa X",
        "period": "2019 - 2021",
        "description": "Desenvolvi ferramentas internas e automatizei fluxos de deploy."
      }
    }
  },
  "contact": {
    "title": "Contato",
    "quickContact": "Contato Rápido",
    "copy": "Copiar",
    "copied": "Copiado!",
    "form": {
      "title": "Enviar Mensagem",
      "name": "Nome",
      "email": "Email",
      "message": "Mensagem",
      "send": "Enviar Mensagem",
      "success": "Mensagem enviada! Retornarei em breve."
    }
  },
  "blog": {
    "title": "Blog",
    "readMore": "Leia mais",
    "back": "Voltar ao Blog"
  }
}
```

**Step 3: Create `src/i18n/index.ts`**

```ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import ptBr from './pt-br.json';

const savedLang = localStorage.getItem('language') || 'en';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    'pt-BR': { translation: ptBr },
  },
  lng: savedLang,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
```

**Step 4: Import i18n in `src/main.tsx`**

Add `import './i18n';` before the ReactDOM render call.

**Step 5: Commit**

```bash
git add src/i18n/
git commit -m "feat: add i18n setup with EN-US and PT-BR translations"
```

---

### Task 3: Set up React Router with page shells

**Files:**
- Create: `src/pages/Home.tsx`, `src/pages/Projects.tsx`, `src/pages/About.tsx`, `src/pages/Contact.tsx`, `src/pages/Blog.tsx`, `src/pages/BlogPost.tsx`
- Modify: `src/App.tsx`

**Step 1: Create page shell components**

Each page file follows this pattern (replace PageName and translation key accordingly):

```tsx
// src/pages/Home.tsx
export default function Home() {
  return <div>Home</div>;
}
```

Create all 6 page files with just a div and the page name as text.

**Step 2: Set up routing in `src/App.tsx`**

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

**Step 3: Create `src/components/layout/Layout.tsx`**

```tsx
import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function Layout() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
```

**Step 4: Create `src/components/layout/Header.tsx`** (minimal shell)

```tsx
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'pt-BR' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <header className="border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-lg font-bold text-zinc-100">
          WS
        </Link>
        <nav className="flex items-center gap-6">
          <Link to="/" className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors">{t('nav.home')}</Link>
          <Link to="/projects" className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors">{t('nav.projects')}</Link>
          <Link to="/about" className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors">{t('nav.about')}</Link>
          <Link to="/contact" className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors">{t('nav.contact')}</Link>
          <Link to="/blog" className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors">{t('nav.blog')}</Link>
          <button
            onClick={toggleLanguage}
            className="rounded border border-violet-600 px-3 py-1 text-xs font-medium text-violet-300 hover:bg-violet-600/20 transition-colors"
          >
            {i18n.language === 'en' ? 'PT-BR' : 'EN'}
          </button>
        </nav>
      </div>
    </header>
  );
}
```

**Step 5: Verify routing works**

```bash
npm run dev
```
Navigate to `/`, `/projects`, `/about`, `/contact`, `/blog`. Each should show its placeholder text with the header.

**Step 6: Commit**

```bash
git add src/pages/ src/components/layout/ src/App.tsx
git commit -m "feat: add react router with layout, header, and page shells"
```

---

### Task 4: Build the reusable Card component

**Files:**
- Create: `src/components/ui/Card.tsx`

**Step 1: Create `src/components/ui/Card.tsx`**

```tsx
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-violet-600 bg-zinc-900 p-6 ${
        hover ? 'hover:border-violet-500 hover:scale-[1.01] transition-all duration-200' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/ui/Card.tsx
git commit -m "feat: add reusable Card component with purple border"
```

---

### Task 5: Build the Home page Bento Grid with all cards

**Files:**
- Create: `src/components/home/ProfileCard.tsx`, `src/components/home/InfoCard.tsx`, `src/components/home/NavCard.tsx`, `src/components/home/NewsletterCard.tsx`, `src/components/home/GitHubHeatmap.tsx`
- Modify: `src/pages/Home.tsx`

**Step 1: Create `src/components/home/ProfileCard.tsx`**

```tsx
import { useTranslation } from 'react-i18next';
import Card from '../ui/Card';

const techStack = [
  'Python', 'FastAPI', 'Django', 'PostgreSQL', 'ClickHouse',
  'Go', 'TypeScript', 'React', 'Docker', 'AWS', 'ETL/BigData', 'VPS/Bare Metal',
];

export default function ProfileCard() {
  const { t } = useTranslation();

  return (
    <Card className="flex flex-col items-center text-center" hover={false}>
      <div className="mb-4 h-24 w-24 overflow-hidden rounded-full border-2 border-violet-600 bg-zinc-800">
        <img
          src="/wilson.jpg"
          alt="Wilson Sousa"
          className="h-full w-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>
      <h1 className="text-xl font-bold">Wilson Sousa</h1>
      <p className="text-sm text-zinc-400">@WilsonSousajr</p>
      <p className="mt-1 text-sm text-violet-400">{t('home.role')}</p>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-violet-600 bg-violet-600/20 px-3 py-1 text-xs text-violet-300"
          >
            {tech}
          </span>
        ))}
      </div>
    </Card>
  );
}
```

**Step 2: Create `src/components/home/InfoCard.tsx`**

```tsx
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Sun, Clock } from 'lucide-react';
import Card from '../ui/Card';

export default function InfoCard() {
  const { t } = useTranslation();
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'America/Sao_Paulo',
          hour12: false,
        }).format(new Date())
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center gap-2 text-zinc-300">
        <Clock size={16} className="text-violet-400" />
        <span className="font-mono text-lg">{time}</span>
      </div>
      <div className="flex items-center gap-2 text-zinc-300">
        <MapPin size={16} className="text-violet-400" />
        <span className="text-sm">{t('home.location')}</span>
      </div>
      <div className="flex items-center gap-2 text-zinc-300">
        <Sun size={16} className="text-violet-400" />
        <span className="text-sm">{t('home.weather')}</span>
      </div>
    </Card>
  );
}
```

**Step 3: Create `src/components/home/NavCard.tsx`**

```tsx
import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import Card from '../ui/Card';

interface NavCardProps {
  to: string;
  label: string;
  icon: LucideIcon;
}

export default function NavCard({ to, label, icon: Icon }: NavCardProps) {
  return (
    <Link to={to}>
      <Card className="flex items-center gap-3 hover:shadow-lg hover:shadow-violet-600/20">
        <Icon size={24} className="text-violet-400" />
        <span className="text-lg font-semibold">{label}</span>
      </Card>
    </Link>
  );
}
```

**Step 4: Create `src/components/home/NewsletterCard.tsx`**

```tsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail } from 'lucide-react';
import Card from '../ui/Card';

export default function NewsletterCard() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <Card hover={false}>
      <div className="flex items-center gap-2 mb-3">
        <Mail size={18} className="text-violet-400" />
        <h3 className="font-semibold">{t('home.newsletter.title')}</h3>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('home.newsletter.placeholder')}
          required
          className="flex-1 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-violet-600 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500 transition-colors"
        >
          {subscribed ? t('home.newsletter.success') : t('home.newsletter.button')}
        </button>
      </form>
    </Card>
  );
}
```

**Step 5: Create `src/components/home/GitHubHeatmap.tsx`**

```tsx
import { useTranslation } from 'react-i18next';
import Card from '../ui/Card';

function generateMockData(): number[] {
  const data: number[] = [];
  for (let i = 0; i < 52 * 7; i++) {
    const rand = Math.random();
    if (rand < 0.3) data.push(0);
    else if (rand < 0.5) data.push(1);
    else if (rand < 0.7) data.push(2);
    else if (rand < 0.85) data.push(3);
    else data.push(4);
  }
  return data;
}

const intensityClasses = [
  'bg-zinc-800',
  'bg-violet-900',
  'bg-violet-700',
  'bg-violet-500',
  'bg-violet-400',
];

const mockData = generateMockData();

export default function GitHubHeatmap() {
  const { t } = useTranslation();

  return (
    <Card hover={false}>
      <h3 className="mb-3 font-semibold">{t('home.github')}</h3>
      <div className="overflow-x-auto">
        <div className="grid grid-flow-col grid-rows-7 gap-1">
          {mockData.map((level, i) => (
            <div
              key={i}
              className={`h-3 w-3 rounded-sm ${intensityClasses[level]}`}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
```

**Step 6: Build the Home page grid in `src/pages/Home.tsx`**

```tsx
import { useTranslation } from 'react-i18next';
import { FolderGit2, User, Mail, BookOpen } from 'lucide-react';
import ProfileCard from '../components/home/ProfileCard';
import InfoCard from '../components/home/InfoCard';
import NavCard from '../components/home/NavCard';
import NewsletterCard from '../components/home/NewsletterCard';
import GitHubHeatmap from '../components/home/GitHubHeatmap';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div
      className="grid gap-4"
      style={{
        gridTemplateAreas: `
          "profile info projects"
          "profile about blog"
          "contact heatmap heatmap"
          "newsletter newsletter newsletter"
        `,
        gridTemplateColumns: '1fr 1fr 1fr',
      }}
    >
      <div style={{ gridArea: 'profile' }}>
        <ProfileCard />
      </div>
      <div style={{ gridArea: 'info' }}>
        <InfoCard />
      </div>
      <div style={{ gridArea: 'projects' }}>
        <NavCard to="/projects" label={t('nav.projects')} icon={FolderGit2} />
      </div>
      <div style={{ gridArea: 'about' }}>
        <NavCard to="/about" label={t('nav.about')} icon={User} />
      </div>
      <div style={{ gridArea: 'blog' }}>
        <NavCard to="/blog" label={t('nav.blog')} icon={BookOpen} />
      </div>
      <div style={{ gridArea: 'contact' }}>
        <NavCard to="/contact" label={t('nav.contact')} icon={Mail} />
      </div>
      <div style={{ gridArea: 'heatmap' }}>
        <GitHubHeatmap />
      </div>
      <div style={{ gridArea: 'newsletter' }}>
        <NewsletterCard />
      </div>
    </div>
  );
}
```

**Step 7: Add responsive grid CSS to `src/index.css`**

Append to the bottom of `src/index.css`:

```css
@media (max-width: 768px) {
  .grid[style] {
    grid-template-areas:
      "profile"
      "info"
      "projects"
      "about"
      "blog"
      "contact"
      "heatmap"
      "newsletter" !important;
    grid-template-columns: 1fr !important;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .grid[style] {
    grid-template-areas:
      "profile info"
      "profile projects"
      "about blog"
      "contact contact"
      "heatmap heatmap"
      "newsletter newsletter" !important;
    grid-template-columns: 1fr 1fr !important;
  }
}
```

**Step 8: Verify the Home page renders correctly**

```bash
npm run dev
```
Navigate to `/`. You should see the bento grid with all cards. Check mobile/tablet layouts by resizing the browser.

**Step 9: Commit**

```bash
git add src/components/home/ src/pages/Home.tsx src/index.css
git commit -m "feat: build home page bento grid with all widget cards"
```

---

### Task 6: Build the Projects page

**Files:**
- Create: `src/data/projects.ts`
- Modify: `src/pages/Projects.tsx`

**Step 1: Create `src/data/projects.ts`**

```ts
export interface Project {
  id: string;
  title: string;
  titlePtBr: string;
  year: number;
  description: string;
  descriptionPtBr: string;
  color: string;
  link: string;
}

export const projects: Project[] = [
  {
    id: 'fastapi-gateway',
    title: 'FastAPI Microservices Gateway',
    titlePtBr: 'Gateway de Microsserviços FastAPI',
    year: 2025,
    description: 'A high-performance API gateway built with FastAPI, handling authentication, rate limiting, and request routing across multiple microservices.',
    descriptionPtBr: 'Um gateway de API de alta performance construído com FastAPI, lidando com autenticação, rate limiting e roteamento de requisições entre múltiplos microsserviços.',
    color: 'bg-violet-600',
    link: '#',
  },
  {
    id: 'etl-pipeline',
    title: 'ETL Pipeline Dashboard',
    titlePtBr: 'Dashboard de Pipeline ETL',
    year: 2024,
    description: 'Real-time monitoring dashboard for ETL pipelines processing millions of records daily. Built with React frontend and Python orchestration.',
    descriptionPtBr: 'Dashboard de monitoramento em tempo real para pipelines ETL processando milhões de registros diários. Construído com frontend React e orquestração Python.',
    color: 'bg-emerald-600',
    link: '#',
  },
  {
    id: 'clickhouse-analytics',
    title: 'ClickHouse Analytics Platform',
    titlePtBr: 'Plataforma de Analytics ClickHouse',
    year: 2024,
    description: 'Analytics platform leveraging ClickHouse for sub-second queries over billions of events. Includes custom SQL query builder and visualization layer.',
    descriptionPtBr: 'Plataforma de analytics utilizando ClickHouse para consultas em sub-segundo sobre bilhões de eventos. Inclui construtor de consultas SQL customizado e camada de visualização.',
    color: 'bg-amber-600',
    link: '#',
  },
  {
    id: 'react-component-lib',
    title: 'React Component Library',
    titlePtBr: 'Biblioteca de Componentes React',
    year: 2023,
    description: 'A reusable component library with dark mode support, accessibility built-in, and comprehensive Storybook documentation.',
    descriptionPtBr: 'Uma biblioteca de componentes reutilizáveis com suporte a dark mode, acessibilidade integrada e documentação abrangente no Storybook.',
    color: 'bg-sky-600',
    link: '#',
  },
];
```

**Step 2: Build `src/pages/Projects.tsx`**

```tsx
import { useTranslation } from 'react-i18next';
import { ExternalLink } from 'lucide-react';
import Card from '../components/ui/Card';
import { projects } from '../data/projects';

export default function Projects() {
  const { t, i18n } = useTranslation();
  const isPtBr = i18n.language === 'pt-BR';

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{t('projects.title')}</h1>
        <p className="mt-2 text-zinc-400">{t('projects.subtitle')}</p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <Card key={project.id}>
            <div className={`mb-4 h-32 rounded-lg ${project.color} opacity-80`} />
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-lg font-semibold">
                {isPtBr ? project.titlePtBr : project.title}
              </h2>
              <span className="rounded-full bg-violet-600/20 px-2 py-0.5 text-xs text-violet-300">
                {project.year}
              </span>
            </div>
            <p className="text-sm text-zinc-400 mb-3">
              {isPtBr ? project.descriptionPtBr : project.description}
            </p>
            <a
              href={project.link}
              className="inline-flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300 transition-colors"
            >
              {t('projects.viewProject')}
              <ExternalLink size={14} />
            </a>
          </Card>
        ))}
      </div>
    </div>
  );
}
```

**Step 3: Verify the Projects page**

```bash
npm run dev
```
Navigate to `/projects`. Should show 4 project cards in a 2-column grid.

**Step 4: Commit**

```bash
git add src/data/projects.ts src/pages/Projects.tsx
git commit -m "feat: add projects page with sample project cards"
```

---

### Task 7: Build the About page

**Files:**
- Modify: `src/pages/About.tsx`

**Step 1: Build `src/pages/About.tsx`**

```tsx
import { useTranslation } from 'react-i18next';
import Card from '../components/ui/Card';

const timelineKeys = ['job1', 'job2', 'job3'] as const;

export default function About() {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">{t('about.title')}</h1>
      <div className="grid gap-4">
        <Card hover={false}>
          <p className="text-zinc-300 leading-relaxed whitespace-pre-line">
            {t('about.bio')}
          </p>
        </Card>
        <Card hover={false}>
          <h2 className="mb-6 text-xl font-semibold">{t('about.experience')}</h2>
          <div className="relative border-l-2 border-violet-600 pl-6">
            {timelineKeys.map((key, i) => (
              <div key={key} className={i < timelineKeys.length - 1 ? 'mb-8' : ''}>
                <div className="absolute -left-[9px] mt-1 h-4 w-4 rounded-full border-2 border-violet-600 bg-zinc-900" />
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold">{t(`about.timeline.${key}.role`)}</h3>
                  <span className="text-sm text-violet-400">
                    @ {t(`about.timeline.${key}.company`)}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 mt-1">
                  {t(`about.timeline.${key}.period`)}
                </p>
                <p className="mt-2 text-sm text-zinc-400">
                  {t(`about.timeline.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
```

**Step 2: Verify the About page**

Navigate to `/about`. Should show bio and timeline with 3 entries.

**Step 3: Commit**

```bash
git add src/pages/About.tsx
git commit -m "feat: add about page with bio and career timeline"
```

---

### Task 8: Build the Contact page

**Files:**
- Modify: `src/pages/Contact.tsx`

**Step 1: Build `src/pages/Contact.tsx`**

```tsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Clipboard, Check } from 'lucide-react';
import Card from '../components/ui/Card';

export default function Contact() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

  const email = 'wstechnology.br@gmail.com';

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">{t('contact.title')}</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card hover={false}>
          <h2 className="mb-4 text-lg font-semibold">{t('contact.quickContact')}</h2>
          <div className="flex items-center gap-3 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3">
            <span className="flex-1 text-sm text-zinc-300 truncate">{email}</span>
            <button
              onClick={copyEmail}
              className="flex items-center gap-1 rounded bg-violet-600 px-3 py-1 text-xs font-medium text-white hover:bg-violet-500 transition-colors"
            >
              {copied ? (
                <>
                  <Check size={14} />
                  {t('contact.copied')}
                </>
              ) : (
                <>
                  <Clipboard size={14} />
                  {t('contact.copy')}
                </>
              )}
            </button>
          </div>
        </Card>
        <Card hover={false}>
          <h2 className="mb-4 text-lg font-semibold">{t('contact.form.title')}</h2>
          {sent ? (
            <p className="text-sm text-violet-400">{t('contact.form.success')}</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder={t('contact.form.name')}
                required
                className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-violet-600 focus:outline-none"
              />
              <input
                type="email"
                placeholder={t('contact.form.email')}
                required
                className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-violet-600 focus:outline-none"
              />
              <textarea
                placeholder={t('contact.form.message')}
                required
                rows={4}
                className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-violet-600 focus:outline-none resize-none"
              />
              <button
                type="submit"
                className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500 transition-colors"
              >
                {t('contact.form.send')}
              </button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
```

**Step 2: Verify the Contact page**

Navigate to `/contact`. Should show email card with copy button and contact form side by side.

**Step 3: Commit**

```bash
git add src/pages/Contact.tsx
git commit -m "feat: add contact page with copy-to-clipboard and form"
```

---

### Task 9: Create sample blog posts and blog infrastructure

**Files:**
- Create: `src/content/posts/getting-started-fastapi.md`, `src/content/posts/docker-production.md`, `src/content/posts/clickhouse-analytics.md`
- Create: `src/components/blog/PostCard.tsx`, `src/components/blog/PostContent.tsx`

**Step 1: Create `src/content/posts/getting-started-fastapi.md`**

```markdown
---
title: "Getting Started with FastAPI"
date: "2026-01-15"
description: "A practical guide to building your first high-performance API with FastAPI, from project setup to deployment."
tags: ["Python", "FastAPI", "API"]
slug: "getting-started-fastapi"
---

# Getting Started with FastAPI

FastAPI has quickly become one of the most popular Python frameworks for building APIs. Its combination of speed, automatic documentation, and type safety makes it an excellent choice for modern backend development.

## Why FastAPI?

There are several reasons I chose FastAPI as my go-to framework:

- **Performance**: Built on Starlette and Pydantic, FastAPI is one of the fastest Python frameworks available, comparable to Node.js and Go in many benchmarks.
- **Type Safety**: Leverages Python type hints for automatic request validation and serialization.
- **Auto Documentation**: Generates interactive Swagger UI and ReDoc documentation out of the box.
- **Async Support**: First-class support for async/await, making it easy to build concurrent applications.

## Setting Up Your First Project

Start by creating a virtual environment and installing FastAPI:

```bash
python -m venv venv
source venv/bin/activate
pip install fastapi uvicorn
```

Create a simple `main.py`:

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello, FastAPI!"}

@app.get("/items/{item_id}")
async def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}
```

Run it with:

```bash
uvicorn main:app --reload
```

Visit `http://localhost:8000/docs` to see the auto-generated documentation.

## Adding Pydantic Models

Define your data models using Pydantic for automatic validation:

```python
from pydantic import BaseModel

class Item(BaseModel):
    name: str
    price: float
    is_offer: bool = False

@app.post("/items/")
async def create_item(item: Item):
    return item
```

FastAPI will automatically validate incoming JSON against your model schema and return clear error messages for invalid data.

## Conclusion

FastAPI makes it incredibly easy to build robust, well-documented APIs. In future posts, I'll cover more advanced topics like dependency injection, database integration, and deploying to production.
```

**Step 2: Create `src/content/posts/docker-production.md`**

```markdown
---
title: "Docker in Production: Lessons Learned"
date: "2025-11-20"
description: "Practical tips and hard-won lessons from running Docker containers in production environments."
tags: ["Docker", "DevOps", "Infrastructure"]
slug: "docker-production"
---

# Docker in Production: Lessons Learned

After years of running Docker containers in production across various projects, I've accumulated a set of practices that have saved me from countless headaches. Here are the most important ones.

## Use Multi-Stage Builds

Multi-stage builds dramatically reduce your final image size:

```dockerfile
# Build stage
FROM python:3.12-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt

# Production stage
FROM python:3.12-slim
WORKDIR /app
COPY --from=builder /install /usr/local
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]
```

This approach keeps your production image clean — no build tools, no cache files, just what you need to run.

## Health Checks Matter

Always define health checks in your Dockerfile or compose file:

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD curl -f http://localhost:8000/health || exit 1
```

Without health checks, your orchestrator has no way to know if your application is actually serving requests or just sitting there with an open port.

## Log to stdout

Never write logs to files inside containers. Write to stdout/stderr and let your logging infrastructure (ELK, Loki, CloudWatch) handle collection:

```python
import logging
import sys

logging.basicConfig(stream=sys.stdout, level=logging.INFO)
```

## Resource Limits Are Non-Negotiable

Always set memory and CPU limits. A single container without limits can take down an entire host:

```yaml
services:
  api:
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: '0.5'
```

## Conclusion

Docker in production is powerful but requires discipline. Multi-stage builds, health checks, proper logging, and resource limits are the foundation. Get these right, and you'll sleep much better at night.
```

**Step 3: Create `src/content/posts/clickhouse-analytics.md`**

```markdown
---
title: "ClickHouse for Real-Time Analytics"
date: "2025-09-05"
description: "How we used ClickHouse to build a real-time analytics platform processing billions of events with sub-second query times."
tags: ["ClickHouse", "BigData", "Analytics"]
slug: "clickhouse-analytics"
---

# ClickHouse for Real-Time Analytics

When our PostgreSQL-based analytics started struggling with 100M+ rows and complex aggregation queries taking minutes, we knew it was time for a specialized solution. Enter ClickHouse.

## Why ClickHouse?

ClickHouse is a column-oriented database designed for online analytical processing (OLAP). Key advantages:

- **Blazing fast aggregations**: Column storage means reading only the columns you query, not entire rows.
- **Excellent compression**: Columnar data compresses 5-10x better than row-based storage.
- **SQL-compatible**: No need to learn a new query language.
- **Real-time inserts**: Handles millions of inserts per second.

## Our Architecture

We built a pipeline with three main components:

1. **Event Ingestion**: FastAPI service receives events and buffers them in batches.
2. **Batch Writer**: A background worker inserts batched events into ClickHouse every 5 seconds.
3. **Query API**: FastAPI service translates dashboard queries into optimized ClickHouse SQL.

```
Events → FastAPI → Buffer Queue → Batch Insert → ClickHouse
                                                      ↓
Dashboard ← FastAPI Query API ←──────────────────────┘
```

## Table Design

The key to ClickHouse performance is table design. Use the `MergeTree` engine family and choose your `ORDER BY` carefully:

```sql
CREATE TABLE events (
    event_date Date,
    event_time DateTime,
    user_id UInt64,
    event_type LowCardinality(String),
    properties String
) ENGINE = MergeTree()
PARTITION BY toYYYYMM(event_date)
ORDER BY (event_type, user_id, event_time);
```

The `ORDER BY` clause determines how data is physically sorted on disk — put your most common filter columns first.

## Results

After migrating to ClickHouse:
- Query times dropped from **minutes to milliseconds**
- Storage reduced by **8x** due to compression
- We can now handle **2 billion events** without breaking a sweat

## Conclusion

If you're building analytics on large datasets and need real-time query performance, ClickHouse is an incredible tool. The learning curve is minimal if you already know SQL, and the performance gains are dramatic.
```

**Step 4: Create `src/components/blog/PostCard.tsx`**

```tsx
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Card from '../ui/Card';

interface PostCardProps {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
}

export default function PostCard({ slug, title, date, description, tags }: PostCardProps) {
  const { t } = useTranslation();

  return (
    <Card>
      <div className="flex flex-wrap items-center gap-2 mb-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-violet-600 bg-violet-600/20 px-2 py-0.5 text-xs text-violet-300"
          >
            {tag}
          </span>
        ))}
      </div>
      <h2 className="text-lg font-semibold mb-1">{title}</h2>
      <p className="text-xs text-zinc-500 mb-2">{date}</p>
      <p className="text-sm text-zinc-400 mb-3">{description}</p>
      <Link
        to={`/blog/${slug}`}
        className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
      >
        {t('blog.readMore')} →
      </Link>
    </Card>
  );
}
```

**Step 5: Create `src/components/blog/PostContent.tsx`**

```tsx
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface PostContentProps {
  content: string;
}

export default function PostContent({ content }: PostContentProps) {
  return (
    <div className="prose prose-invert prose-a:text-violet-400 prose-headings:text-zinc-100 prose-code:text-violet-300 max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
```

**Step 6: Commit**

```bash
git add src/content/ src/components/blog/
git commit -m "feat: add blog infrastructure and sample markdown posts"
```

---

### Task 10: Build the Blog and BlogPost pages

**Files:**
- Modify: `src/pages/Blog.tsx`, `src/pages/BlogPost.tsx`

**Step 1: Build `src/pages/Blog.tsx`**

```tsx
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import matter from 'gray-matter';
import PostCard from '../components/blog/PostCard';

interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
}

const postFiles = import.meta.glob('/src/content/posts/*.md', {
  query: '?raw',
  import: 'default',
});

export default function Blog() {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<PostMeta[]>([]);

  useEffect(() => {
    async function loadPosts() {
      const loaded: PostMeta[] = [];
      for (const path in postFiles) {
        const raw = (await postFiles[path]()) as string;
        const { data } = matter(raw);
        loaded.push({
          slug: data.slug,
          title: data.title,
          date: data.date,
          description: data.description,
          tags: data.tags || [],
        });
      }
      loaded.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setPosts(loaded);
    }
    loadPosts();
  }, []);

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">{t('blog.title')}</h1>
      <div className="grid gap-4">
        {posts.map((post) => (
          <PostCard key={post.slug} {...post} />
        ))}
      </div>
    </div>
  );
}
```

**Step 2: Build `src/pages/BlogPost.tsx`**

```tsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import matter from 'gray-matter';
import Card from '../components/ui/Card';
import PostContent from '../components/blog/PostContent';

const postFiles = import.meta.glob('/src/content/posts/*.md', {
  query: '?raw',
  import: 'default',
});

interface PostData {
  title: string;
  date: string;
  tags: string[];
  content: string;
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const [post, setPost] = useState<PostData | null>(null);

  useEffect(() => {
    async function loadPost() {
      for (const path in postFiles) {
        const raw = (await postFiles[path]()) as string;
        const { data, content } = matter(raw);
        if (data.slug === slug) {
          setPost({
            title: data.title,
            date: data.date,
            tags: data.tags || [],
            content,
          });
          return;
        }
      }
    }
    loadPost();
  }, [slug]);

  if (!post) {
    return <div className="text-zinc-400">Loading...</div>;
  }

  return (
    <div>
      <Link
        to="/blog"
        className="mb-6 inline-flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300 transition-colors"
      >
        <ArrowLeft size={16} />
        {t('blog.back')}
      </Link>
      <Card hover={false}>
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 mb-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-violet-600 bg-violet-600/20 px-2 py-0.5 text-xs text-violet-300"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl font-bold mb-1">{post.title}</h1>
          <p className="text-sm text-zinc-500">{post.date}</p>
        </div>
        <PostContent content={post.content} />
      </Card>
    </div>
  );
}
```

**Step 3: Note on `gray-matter` in the browser**

`gray-matter` uses Node.js `Buffer`. You may need to add a polyfill. If it fails, install:

```bash
npm install buffer
```

Then add to the top of `src/main.tsx`:

```ts
import { Buffer } from 'buffer';
globalThis.Buffer = Buffer;
```

**Step 4: Verify the Blog works**

Navigate to `/blog`. Should see 3 post cards sorted by date. Click one — should navigate to `/blog/<slug>` and render the full article.

**Step 5: Commit**

```bash
git add src/pages/Blog.tsx src/pages/BlogPost.tsx
git commit -m "feat: add blog index and post pages with markdown rendering"
```

---

### Task 11: Add page fade-in animation

**Files:**
- Modify: `src/index.css`, `src/components/layout/Layout.tsx`

**Step 1: Add fade-in keyframe to `src/index.css`**

Append to `src/index.css`:

```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}
```

**Step 2: Apply animation in Layout.tsx**

Wrap the `<Outlet />` in the Layout with the animation class. Replace the `<main>` content:

```tsx
<main className="mx-auto max-w-6xl px-4 py-8 animate-fade-in">
  <Outlet />
</main>
```

**Step 3: Commit**

```bash
git add src/index.css src/components/layout/Layout.tsx
git commit -m "feat: add page fade-in animation"
```

---

### Task 12: Add placeholder profile image and final polish

**Files:**
- Create: `public/wilson.jpg` (placeholder)
- Modify: `src/main.tsx` (ensure i18n import and Buffer polyfill are in place)

**Step 1: Create a placeholder SVG as profile image**

Since we don't have a real photo, create a placeholder. Create `public/wilson.jpg` — actually, use an SVG in the component instead. Modify `src/components/home/ProfileCard.tsx` to show initials when image fails to load:

The `onError` handler already hides the broken image. Add a fallback initials display:

Replace the image container in ProfileCard:

```tsx
<div className="mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-violet-600 bg-zinc-800">
  <img
    src="/wilson.jpg"
    alt="Wilson Sousa"
    className="h-full w-full object-cover"
    onError={(e) => {
      (e.target as HTMLImageElement).style.display = 'none';
      (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
    }}
  />
  <span className="hidden text-2xl font-bold text-violet-400">WS</span>
</div>
```

**Step 2: Verify everything works end-to-end**

```bash
npm run dev
```

Check all routes: `/`, `/projects`, `/about`, `/contact`, `/blog`, `/blog/getting-started-fastapi`.
Test language toggle. Test responsive layouts.

**Step 3: Run production build**

```bash
npm run build
```
Expected: Build succeeds without errors.

**Step 4: Final commit**

```bash
git add .
git commit -m "feat: add profile fallback and final polish"
```

---

## Summary

| Task | Description | Files |
|------|-------------|-------|
| 1 | Scaffold Vite + React + TS project | Config files, deps |
| 2 | i18n setup (EN/PT-BR) | `src/i18n/*` |
| 3 | React Router + Layout + Header | `src/pages/*`, `src/components/layout/*` |
| 4 | Reusable Card component | `src/components/ui/Card.tsx` |
| 5 | Home page Bento Grid | `src/components/home/*`, `src/pages/Home.tsx` |
| 6 | Projects page | `src/data/projects.ts`, `src/pages/Projects.tsx` |
| 7 | About page | `src/pages/About.tsx` |
| 8 | Contact page | `src/pages/Contact.tsx` |
| 9 | Blog infrastructure + sample posts | `src/content/posts/*`, `src/components/blog/*` |
| 10 | Blog + BlogPost pages | `src/pages/Blog.tsx`, `src/pages/BlogPost.tsx` |
| 11 | Page fade-in animation | `src/index.css`, Layout |
| 12 | Profile fallback + final polish | ProfileCard, build verification |
