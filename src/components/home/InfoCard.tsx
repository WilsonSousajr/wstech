import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin } from 'lucide-react';
import Card from '../ui/Card';

const forecastKeys = ['sat', 'sun', 'mon', 'tue', 'wed', 'thu'] as const;
const forecastTemps = [28, 21, 18, 20, 19, 21];

export default function InfoCard() {
  const { t, i18n } = useTranslation();
  const [time, setTime] = useState('');

  useEffect(() => {
    const locale = i18n.language === 'pt-BR' ? 'pt-BR' : 'en-US';
    const update = () => {
      setTime(
        new Intl.DateTimeFormat(locale, {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'America/Sao_Paulo',
          hour12: locale === 'en-US',
        }).format(new Date())
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [i18n.language]);

  return (
    <Card className="flex h-full flex-col justify-between">
      <div>
        {/* Time */}
        <p className="text-sm font-medium text-text-secondary">{time}</p>

        {/* Location */}
        <div className="mt-1 flex items-center gap-1 text-text-muted">
          <MapPin size={12} />
          <span className="text-xs">{t('home.location')}</span>
        </div>

        {/* Temperature */}
        <div className="mt-4">
          <span className="text-4xl sm:text-5xl font-light tracking-tight text-text-primary">28</span>
          <span className="ml-1 text-lg text-text-muted">°C</span>
        </div>
        <p className="mt-1 text-sm text-text-muted">{t('home.weather')}</p>
      </div>

      {/* Forecast */}
      <div className="mt-4 sm:mt-6 grid grid-cols-6 gap-2">
        {forecastKeys.map((key, i) => (
          <div key={key} className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-medium tracking-wider text-text-faint">{t(`home.forecast.${key}`)}</span>
            <span className="text-sm text-text-secondary">{forecastTemps[i]}°</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
