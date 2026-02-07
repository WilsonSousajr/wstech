import { Outlet, useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';

export default function Layout() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'pt-BR' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Floating language toggle */}
      <div className="fixed top-5 right-6 z-50 flex items-center gap-1">
        <button
          onClick={toggleLanguage}
          className="text-xs tracking-widest uppercase text-neutral-500 hover:text-white transition-colors cursor-pointer"
        >
          {i18n.language === 'en' ? 'PT' : 'EN'}{' '}
          <span className="text-neutral-600">/</span>{' '}
          <span className="text-white">{i18n.language === 'en' ? 'EN' : 'PT'}</span>
        </button>
      </div>

      {/* Back button for inner pages */}
      {!isHome && (
        <div className="fixed top-5 left-6 z-50">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </Link>
        </div>
      )}

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <Outlet />
      </main>
    </div>
  );
}
