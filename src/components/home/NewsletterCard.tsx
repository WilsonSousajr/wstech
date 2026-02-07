import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, Send } from 'lucide-react';
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
            {subscribed ? t('home.newsletter.success') : t('home.newsletter.description')}
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
              className="flex-1 min-w-0 bg-transparent text-sm text-white placeholder-neutral-600 outline-none"
            />
            <button
              type="submit"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 hover:text-white transition-colors cursor-pointer"
            >
              <Send size={14} />
            </button>
          </div>
        </form>
      )}
    </Card>
  );
}
