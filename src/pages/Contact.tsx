import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Clipboard, Check, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import Card from '../components/ui/Card';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const COOLDOWN_SECONDS = 60;

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<FormErrors>({});
  const [cooldown, setCooldown] = useState(0);

  const email = 'wstechnology.br@gmail.com';

  // Cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: select the email text for manual copy
    }
  };

  const validate = useCallback((): FormErrors => {
    const form = formRef.current;
    if (!form) return {};
    const data = new FormData(form);
    const errs: FormErrors = {};

    const name = (data.get('from_name') as string | null)?.trim() ?? '';
    const emailVal = (data.get('from_email') as string | null)?.trim() ?? '';
    const message = (data.get('message') as string | null)?.trim() ?? '';

    if (!name) {
      errs.name = t('contact.form.validation.required');
    }

    if (!emailVal) {
      errs.email = t('contact.form.validation.required');
    } else if (!EMAIL_REGEX.test(emailVal)) {
      errs.email = t('contact.form.validation.email');
    }

    if (!message) {
      errs.message = t('contact.form.validation.required');
    }

    return errs;
  }, [t]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    if (!formRef.current) return;

    setStatus('sending');

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY },
      );
      setStatus('success');
      setCooldown(COOLDOWN_SECONDS);
      formRef.current?.reset();
      setTimeout(() => setStatus('idle'), 3000);
    } catch {
      setStatus('error');
    }
  };

  const isSendDisabled = status === 'sending' || cooldown > 0;

  const inputClass =
    'rounded-xl border border-border-hover bg-input px-4 py-2.5 text-sm text-text-primary placeholder-text-faint focus:border-text-muted focus:outline-none disabled:opacity-50';

  return (
    <div className="pt-10 sm:pt-8">
      <h1 className="mb-6 sm:mb-8 text-2xl sm:text-3xl font-bold">{t('contact.title')}</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <h2 className="mb-4 text-lg font-semibold">{t('contact.quickContact')}</h2>
          <div className="flex items-center gap-2 sm:gap-3 rounded-xl border border-border-hover bg-input px-3 sm:px-4 py-3">
            <span className="flex-1 min-w-0 text-xs sm:text-sm text-text-secondary truncate">{email}</span>
            <button
              onClick={copyEmail}
              className="flex items-center gap-1 rounded-lg bg-btn-bg px-3 py-1 text-xs font-medium text-text-primary hover:bg-btn-bg-hover transition-colors cursor-pointer"
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
          {status === 'success' ? (
            <p className="text-sm text-text-secondary">{t('contact.form.success')}</p>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
              <div>
                <input
                  type="text"
                  name="from_name"
                  placeholder={t('contact.form.name')}
                  disabled={status === 'sending'}
                  className={`${inputClass} w-full`}
                />
                {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
              </div>
              <div>
                <input
                  type="email"
                  name="from_email"
                  placeholder={t('contact.form.email')}
                  disabled={status === 'sending'}
                  className={`${inputClass} w-full`}
                />
                {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder={t('contact.form.message')}
                  disabled={status === 'sending'}
                  rows={4}
                  className={`${inputClass} w-full resize-none`}
                />
                {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
              </div>

              {status === 'error' && (
                <p className="text-xs text-red-400">{t('contact.form.error')}</p>
              )}

              <button
                type="submit"
                disabled={isSendDisabled}
                className="rounded-xl bg-btn-bg px-4 py-2.5 text-sm font-medium text-text-primary hover:bg-btn-bg-hover transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    {t('contact.form.sending')}
                  </>
                ) : cooldown > 0 ? (
                  t('contact.form.cooldown', { seconds: cooldown })
                ) : (
                  t('contact.form.send')
                )}
              </button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
