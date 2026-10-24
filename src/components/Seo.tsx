import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { loadGtag, readConsent, trackPageView } from '../lib/analytics';

const SITE_URL = 'https://wstech.tech';

type SeoPage = 'home' | 'projects' | 'about' | 'contact' | 'notFound';

interface SeoProps {
  page: SeoPage;
  /** Canonical path; omit for pages that shouldn't be indexed */
  path?: string;
}

function setMeta(selector: string, attr: 'content' | 'href', value: string) {
  document.head.querySelector(selector)?.setAttribute(attr, value);
}

/**
 * Updates the static head tags from index.html in place (social scrapers read those
 * defaults; Google renders these per-route values). Updating in place avoids the
 * duplicate <title>/<meta> React 19 hoisting would add next to the static ones.
 */
export default function Seo({ page, path }: SeoProps) {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const title = t(`seo.${page}.title`);
  const description = t(`seo.${page}.description`);

  useEffect(() => {
    document.title = title;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:locale"]', 'content', i18n.language === 'pt-BR' ? 'pt_BR' : 'en_US');

    const url = `${SITE_URL}${path ?? ''}`;
    setMeta('link[rel="canonical"]', 'href', url);
    setMeta('meta[property="og:url"]', 'content', url);

    if (path !== undefined) return;
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex';
    document.head.appendChild(robots);
    return () => robots.remove();
  }, [title, description, path, i18n.language]);

  // Runs after the head is updated, and here rather than in Layout so lazy routes report their own title.
  // SPA navigation never reloads gtag, so each route change is a manual page_view.
  useEffect(() => {
    if (readConsent() !== 'granted') return;
    loadGtag();
    trackPageView(pathname);
  }, [pathname]);

  return null;
}
