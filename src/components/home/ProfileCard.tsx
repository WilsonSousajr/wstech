import { useTranslation } from 'react-i18next';
import Card from '../ui/Card';

const techStack = [
  'Python', 'FastAPI', 'Django', 'PostgreSQL', 'ClickHouse',
  'Go', 'TypeScript', 'React', 'Docker', 'AWS',
];

export default function ProfileCard() {
  const { t } = useTranslation();

  return (
    <Card className="flex h-full flex-col justify-between">
      <div className="min-w-0">
        {/* Role badge */}
        <div className="mb-4 sm:mb-5 inline-flex items-center gap-2 rounded-full border border-border-hover bg-badge px-3 py-1.5">
          <span className="text-xs">🚀</span>
          <span className="text-xs font-medium text-text-secondary">{t('home.role')}</span>
        </div>

        {/* Name */}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
          Wilson Sousa
        </h1>
        <p className="mt-1 text-sm text-text-muted">@WilsonSousajr</p>

        {/* Bio */}
        <p className="mt-3 sm:mt-4 text-sm leading-relaxed text-text-secondary">
          {t('home.bio')}
        </p>
      </div>

      {/* Tech pills */}
      <div className="mt-4 sm:mt-6 flex flex-wrap gap-1.5 sm:gap-2">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-border-hover px-2.5 py-0.5 sm:px-3 sm:py-1 text-xs text-text-secondary"
          >
            {tech}
          </span>
        ))}
      </div>
    </Card>
  );
}
