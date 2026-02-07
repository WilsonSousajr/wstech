import { useTranslation } from 'react-i18next';
import Card from '../components/ui/Card';

const timelineKeys = ['job1', 'job2', 'job3'] as const;

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="pt-8">
      <h1 className="mb-8 text-3xl font-bold">{t('about.title')}</h1>
      <div className="grid gap-4">
        <Card>
          <p className="text-neutral-400 leading-relaxed whitespace-pre-line">
            {t('about.bio')}
          </p>
        </Card>
        <Card>
          <h2 className="mb-6 text-xl font-semibold">{t('about.experience')}</h2>
          <div className="relative border-l-2 border-[#2a2a2a] pl-6">
            {timelineKeys.map((key, i) => (
              <div key={key} className={i < timelineKeys.length - 1 ? 'mb-8' : ''}>
                <div className="absolute -left-[9px] mt-1 h-4 w-4 rounded-full border-2 border-[#2a2a2a] bg-[#141414]" />
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-white">{t(`about.timeline.${key}.role`)}</h3>
                  <span className="text-sm text-neutral-500">
                    @ {t(`about.timeline.${key}.company`)}
                  </span>
                </div>
                <p className="text-xs text-neutral-600 mt-1">
                  {t(`about.timeline.${key}.period`)}
                </p>
                <p className="mt-2 text-sm text-neutral-500">
                  {t(`about.timeline.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
