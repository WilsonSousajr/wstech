import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { LucideIcon } from 'lucide-react';
import Card from '../ui/Card';

interface NavCardProps {
  to: string;
  translationKey: string;
  icon: LucideIcon;
}

export default function NavCard({ to, translationKey, icon: Icon }: NavCardProps) {
  const { t } = useTranslation();

  return (
    <Link to={to} className="block h-full">
      <Card className="flex h-full flex-col justify-between">
        <Icon size={20} className="text-neutral-400 sm:w-6 sm:h-6" strokeWidth={1.5} />
        <div className="mt-3 sm:mt-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-500">
            {t(`cards.${translationKey}.label`)}
          </p>
          <h3 className="mt-1 text-base sm:text-lg font-semibold text-white">
            {t(`cards.${translationKey}.title`)}
          </h3>
          <p className="mt-0.5 text-xs sm:text-sm text-neutral-500">
            {t(`cards.${translationKey}.description`)}
          </p>
        </div>
      </Card>
    </Link>
  );
}
