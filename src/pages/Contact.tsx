import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Clipboard, Check } from 'lucide-react';
import Card from '../components/ui/Card';

export default function Contact() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

  const email = 'wstechnology.br@gmail.com';

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">{t('contact.title')}</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card hover={false}>
          <h2 className="mb-4 text-lg font-semibold">{t('contact.quickContact')}</h2>
          <div className="flex items-center gap-3 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3">
            <span className="flex-1 text-sm text-zinc-300 truncate">{email}</span>
            <button
              onClick={copyEmail}
              className="flex items-center gap-1 rounded bg-violet-600 px-3 py-1 text-xs font-medium text-white hover:bg-violet-500 transition-colors"
            >
              {copied ? (
                <>
                  <Check size={14} />
                  {t('contact.copied')}
                </>
              ) : (
                <>
                  <Clipboard size={14} />
                  {t('contact.copy')}
                </>
              )}
            </button>
          </div>
        </Card>
        <Card hover={false}>
          <h2 className="mb-4 text-lg font-semibold">{t('contact.form.title')}</h2>
          {sent ? (
            <p className="text-sm text-violet-400">{t('contact.form.success')}</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder={t('contact.form.name')}
                required
                className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-violet-600 focus:outline-none"
              />
              <input
                type="email"
                placeholder={t('contact.form.email')}
                required
                className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-violet-600 focus:outline-none"
              />
              <textarea
                placeholder={t('contact.form.message')}
                required
                rows={4}
                className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-violet-600 focus:outline-none resize-none"
              />
              <button
                type="submit"
                className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500 transition-colors"
              >
                {t('contact.form.send')}
              </button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
