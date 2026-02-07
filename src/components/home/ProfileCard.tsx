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
        <div className="mb-4 sm:mb-5 inline-flex items-center gap-2 rounded-full border border-[#2a2a2a] bg-[#1a1a1a] px-3 py-1.5">
          <span className="text-xs">🚀</span>
          <span className="text-xs font-medium text-neutral-300">{t('home.role')}</span>
        </div>

        {/* Name */}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Wilson Sousa
        </h1>
        <p className="mt-1 text-sm text-neutral-500">@WilsonSousajr</p>

        {/* Bio */}
        <p className="mt-3 sm:mt-4 text-sm leading-relaxed text-neutral-400">
          {t('home.bio')}
        </p>
      </div>

      {/* Tech pills */}
      <div className="mt-4 sm:mt-6 flex flex-wrap gap-1.5 sm:gap-2">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-[#2a2a2a] px-2.5 py-0.5 sm:px-3 sm:py-1 text-xs text-neutral-400"
          >
            {tech}
          </span>
        ))}
      </div>
    </Card>
  );
}
