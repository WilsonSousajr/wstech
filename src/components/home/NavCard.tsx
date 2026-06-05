import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, type LucideIcon } from 'lucide-react';
import Card from '../ui/Card';

interface NavCardProps {
  to: string;
  translationKey: string;
  icon: LucideIcon;
}

export default function NavCard({ to, translationKey, icon: Icon }: NavCardProps) {
  const { t } = useTranslation();
  const isExternal = /^https?:\/\//.test(to);

  const content = (
    <Card className="flex h-full flex-col justify-between">
      <div className="flex items-start justify-between">
        <Icon size={20} className="text-text-secondary sm:w-6 sm:h-6" strokeWidth={1.5} />
        {isExternal && (
          <ArrowUpRight size={16} className="text-text-faint" strokeWidth={1.5} aria-hidden="true" />
        )}
      </div>
      <div className="mt-3 sm:mt-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-text-muted">
          {t(`cards.${translationKey}.label`)}
        </p>
        <h3 className="mt-1 text-base sm:text-lg font-semibold text-text-primary">
          {t(`cards.${translationKey}.title`)}
        </h3>
        <p className="mt-0.5 text-xs sm:text-sm text-text-muted">
          {t(`cards.${translationKey}.description`)}
        </p>
      </div>
    </Card>
  );

  if (isExternal) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className="block h-full">
        {content}
      </a>
    );
  }

  return (
    <Link to={to} className="block h-full">
      {content}
    </Link>
  );
}
