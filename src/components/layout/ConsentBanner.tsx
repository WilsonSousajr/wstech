import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import Glass from '../glass/Glass';
import { GA_ID, loadGtag, readConsent, trackPageView, writeConsent, type Consent } from '../../lib/analytics';

const PRIVACY_URL = 'https://blog.wstech.tech/privacy/';

export default function ConsentBanner() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [answered, setAnswered] = useState(() => readConsent() !== null);

  if (!GA_ID || answered) return null;

  const answer = (value: Consent) => {
    writeConsent(value);
    if (value === 'granted') {
      loadGtag();
      trackPageView(location.pathname);
    }
    setAnswered(true);
  };

  const privacyUrl = i18n.language === 'pt-BR' ? 'https://blog.wstech.tech/pt-br/privacy/' : PRIVACY_URL;

  return (
    // Phones: above the bottom floating controls. sm+: bottom center (controls live at the top there)
    <div
      role="region"
      aria-label={t('consent.label')}
      className="fixed inset-x-4 bottom-[calc(max(1rem,env(safe-area-inset-bottom))+3.5rem)] sm:bottom-6 sm:left-1/2 sm:right-auto sm:w-[28rem] sm:-translate-x-1/2 z-50"
    >
      <Glass variant="smoky" fixed className="rounded-[18px] p-4">
        <p className="text-sm text-text-secondary">
          {t('consent.message')}{' '}
          <a href={privacyUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 text-text-primary">
            {t('consent.privacy')}
          </a>
        </p>
        <div className="mt-3 flex justify-end gap-2">
          <button
            onClick={() => answer('denied')}
            className="rounded-full px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
          >
            {t('consent.decline')}
          </button>
          <button
            onClick={() => answer('granted')}
            className="rounded-full bg-btn-bg px-4 py-2 text-sm font-medium text-text-primary hover:bg-btn-bg-hover transition-colors cursor-pointer"
          >
            {t('consent.accept')}
          </button>
        </div>
      </Glass>
    </div>
  );
}
