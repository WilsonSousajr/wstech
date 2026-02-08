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

// Keep <html lang> in sync with the current language
const updateHtmlLang = (lang: string) => {
  document.documentElement.lang = lang === 'pt-BR' ? 'pt-BR' : 'en';
};

updateHtmlLang(savedLang);
i18n.on('languageChanged', updateHtmlLang);

export default i18n;
