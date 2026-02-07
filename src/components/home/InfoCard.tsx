import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Sun, Clock } from 'lucide-react';
import Card from '../ui/Card';

export default function InfoCard() {
  const { t } = useTranslation();
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'America/Sao_Paulo',
          hour12: false,
        }).format(new Date())
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center gap-2 text-zinc-300">
        <Clock size={16} className="text-violet-400" />
        <span className="font-mono text-lg">{time}</span>
      </div>
      <div className="flex items-center gap-2 text-zinc-300">
        <MapPin size={16} className="text-violet-400" />
        <span className="text-sm">{t('home.location')}</span>
      </div>
      <div className="flex items-center gap-2 text-zinc-300">
        <Sun size={16} className="text-violet-400" />
        <span className="text-sm">{t('home.weather')}</span>
      </div>
    </Card>
  );
}
