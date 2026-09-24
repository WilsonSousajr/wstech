import { Outlet, useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import Glass from '../glass/Glass';

export default function Layout() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { theme, toggleTheme } = useTheme();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'pt-BR' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    // No background here: the fixed Backdrop (App.tsx) shows through, body keeps a fallback color
    <div className="min-h-screen text-text-primary overflow-x-hidden">
      {/* Floating controls: bottom corners on phones (thumb reach), top corners from sm up */}
      <div className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] sm:bottom-auto sm:top-5 sm:right-6 z-50">
        <Glass variant="clear" fixed className="flex h-11 sm:h-9 items-center gap-0.5 rounded-full px-1">
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 sm:h-7 sm:w-7 items-center justify-center rounded-full text-text-primary cursor-pointer"
            aria-label={t(theme === 'dark' ? 'nav.themeToLight' : 'nav.themeToDark')}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <span aria-hidden="true" className="h-4 w-px bg-border-hover" />
          <button
            onClick={toggleLanguage}
            className="h-9 sm:h-7 rounded-full px-3 sm:px-2 text-xs tracking-widest uppercase text-text-secondary cursor-pointer"
            aria-label={t('nav.switchLanguage')}
          >
            {i18n.language === 'en' ? 'PT' : 'EN'}{' '}
            <span className="text-text-faint">/</span>{' '}
            <span className="text-text-primary">{i18n.language === 'en' ? 'EN' : 'PT'}</span>
          </button>
        </Glass>
      </div>

      {/* Back button for inner pages */}
      {!isHome && (
        <div className="fixed left-4 bottom-[max(1rem,env(safe-area-inset-bottom))] sm:bottom-auto sm:top-5 sm:left-6 z-50">
          <Glass variant="clear" fixed className="rounded-full">
            <Link to="/" className="flex h-11 sm:h-9 items-center gap-2 px-4 sm:px-3.5 text-sm text-text-primary">
              <ArrowLeft size={16} />
              <span>{t('nav.back')}</span>
            </Link>
          </Glass>
        </div>
      )}

      {/* Bottom padding on phones keeps the last card clear of the floating controls */}
      <main className="mx-auto max-w-6xl px-3 pt-6 pb-[calc(6rem+env(safe-area-inset-bottom))] sm:px-6 sm:py-12">
        <Outlet />
      </main>
    </div>
  );
}
