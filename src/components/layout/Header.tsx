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
