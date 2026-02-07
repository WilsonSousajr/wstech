import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail } from 'lucide-react';
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
    <Card hover={false}>
      <div className="flex items-center gap-2 mb-3">
        <Mail size={18} className="text-violet-400" />
        <h3 className="font-semibold">{t('home.newsletter.title')}</h3>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('home.newsletter.placeholder')}
          required
          className="flex-1 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-violet-600 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500 transition-colors"
        >
          {subscribed ? t('home.newsletter.success') : t('home.newsletter.button')}
        </button>
      </form>
    </Card>
  );
}
