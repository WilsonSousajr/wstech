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
    <div className="pt-10 sm:pt-8">
      <h1 className="mb-6 sm:mb-8 text-2xl sm:text-3xl font-bold">{t('contact.title')}</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <h2 className="mb-4 text-lg font-semibold">{t('contact.quickContact')}</h2>
          <div className="flex items-center gap-2 sm:gap-3 rounded-xl border border-[#2a2a2a] bg-[#0e0e0e] px-3 sm:px-4 py-3">
            <span className="flex-1 min-w-0 text-xs sm:text-sm text-neutral-400 truncate">{email}</span>
            <button
              onClick={copyEmail}
              className="flex items-center gap-1 rounded-lg bg-white/10 px-3 py-1 text-xs font-medium text-white hover:bg-white/20 transition-colors cursor-pointer"
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
        <Card>
          <h2 className="mb-4 text-lg font-semibold">{t('contact.form.title')}</h2>
          {sent ? (
            <p className="text-sm text-neutral-400">{t('contact.form.success')}</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder={t('contact.form.name')}
                required
                className="rounded-xl border border-[#2a2a2a] bg-[#0e0e0e] px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-neutral-600 focus:outline-none"
              />
              <input
                type="email"
                placeholder={t('contact.form.email')}
                required
                className="rounded-xl border border-[#2a2a2a] bg-[#0e0e0e] px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-neutral-600 focus:outline-none"
              />
              <textarea
                placeholder={t('contact.form.message')}
                required
                rows={4}
                className="rounded-xl border border-[#2a2a2a] bg-[#0e0e0e] px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-neutral-600 focus:outline-none resize-none"
              />
              <button
                type="submit"
                className="rounded-xl bg-white/10 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/20 transition-colors cursor-pointer"
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
