// GA4 behind consent (basic Consent Mode): gtag is never loaded until the visitor accepts.
// The choice lives in a cookie on .wstech.tech so one answer covers the portfolio and the blog.

export type Consent = 'granted' | 'denied';

const COOKIE = 'wstech_consent';
const MAX_AGE = 60 * 60 * 24 * 365;
const ROOT_DOMAIN = 'wstech.tech';

export const GA_ID: string | undefined = import.meta.env.PROD ? import.meta.env.VITE_GA_MEASUREMENT_ID : undefined;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function readConsent(): Consent | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE}=(granted|denied)`));
  return match ? (match[1] as Consent) : null;
}

export function writeConsent(value: Consent) {
  const host = window.location.hostname;
  const domain = host === ROOT_DOMAIN || host.endsWith(`.${ROOT_DOMAIN}`) ? `; Domain=.${ROOT_DOMAIN}` : '';
  document.cookie = `${COOKIE}=${value}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${domain}${window.location.protocol === 'https:' ? '; Secure' : ''}`;
}

export function loadGtag() {
  if (!GA_ID || window.gtag) return;
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  // gtag.js expects the Arguments object, not an array
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { send_page_view: false });
}

export function trackPageView(path: string) {
  window.gtag?.('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}
