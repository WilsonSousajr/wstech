import { Outlet, useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export default function Layout() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { theme, toggleTheme } = useTheme();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'pt-BR' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <div className="min-h-screen bg-bg text-text-primary overflow-x-hidden">
      {/* Floating top-right controls */}
      <div className="fixed top-4 right-4 sm:top-5 sm:right-6 z-50 flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="text-text-muted hover:text-text-primary transition-colors cursor-pointer"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button
          onClick={toggleLanguage}
          className="text-xs tracking-widest uppercase text-text-muted hover:text-text-primary transition-colors cursor-pointer"
        >
          {i18n.language === 'en' ? 'PT' : 'EN'}{' '}
          <span className="text-text-faint">/</span>{' '}
          <span className="text-text-primary">{i18n.language === 'en' ? 'EN' : 'PT'}</span>
        </button>
      </div>

      {/* Back button for inner pages */}
      {!isHome && (
        <div className="fixed top-4 left-4 sm:top-5 sm:left-6 z-50">
          <Link
            to={location.pathname.startsWith('/blog/') ? '/blog' : '/'}
            className="flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </Link>
        </div>
      )}

      <main className="mx-auto max-w-6xl px-3 py-6 sm:px-6 sm:py-12">
        <Outlet />
      </main>
    </div>
  );
}
