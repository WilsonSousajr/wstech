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
      <div>
        {/* Role badge */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#2a2a2a] bg-[#1a1a1a] px-3 py-1.5">
          <span className="text-xs">🚀</span>
          <span className="text-xs font-medium text-neutral-300">{t('home.role')}</span>
        </div>

        {/* Name */}
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Wilson Sousa
        </h1>
        <p className="mt-1 text-sm text-neutral-500">@WilsonSousajr</p>

        {/* Bio */}
        <p className="mt-4 text-sm leading-relaxed text-neutral-400">
          {t('home.bio')}
        </p>
      </div>

      {/* Tech pills */}
      <div className="mt-6 flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-[#2a2a2a] px-3 py-1 text-xs text-neutral-400"
          >
            {tech}
          </span>
        ))}
      </div>
    </Card>
  );
}
