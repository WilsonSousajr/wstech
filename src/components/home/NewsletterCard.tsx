import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, Send, Loader2 } from 'lucide-react';
import Card from '../ui/Card';

const BUTTONDOWN_USERNAME = import.meta.env.VITE_BUTTONDOWN_USERNAME;

export default function NewsletterCard() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const res = await fetch(
        `https://buttondown.com/api/emails/embed-subscribe/${BUTTONDOWN_USERNAME}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ email }),
        }
      );

      if (!res.ok) throw new Error('Subscribe failed');

      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    } catch {
      setError(true);
      setTimeout(() => setError(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  const statusMessage = subscribed
    ? t('home.newsletter.success')
    : error
      ? t('home.newsletter.error')
      : t('home.newsletter.description');

  return (
    <Card className="flex h-full flex-col justify-between">
      <div>
        <Bell size={24} className="text-neutral-400" strokeWidth={1.5} />
        <div className="mt-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-500">
            {t('home.newsletter.label')}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-white">
            {t('home.newsletter.title')}
          </h3>
          <p className="mt-0.5 text-sm text-neutral-500">
            {statusMessage}
          </p>
        </div>
      </div>

      {!subscribed && (
        <form onSubmit={handleSubmit} className="mt-5">
          <div className="flex items-center rounded-xl border border-[#2a2a2a] bg-[#0e0e0e] pl-4 pr-1 py-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('home.newsletter.placeholder')}
              required
              disabled={loading}
              className="flex-1 min-w-0 bg-transparent text-sm text-white placeholder-neutral-600 outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 hover:text-white transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
            </button>
          </div>
        </form>
      )}
    </Card>
  );
}
