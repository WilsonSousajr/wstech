import { useTranslation } from 'react-i18next';
import Card from '../ui/Card';

const techStack = [
  'Python', 'FastAPI', 'Django', 'PostgreSQL', 'ClickHouse',
  'Go', 'TypeScript', 'React', 'Docker', 'AWS', 'ETL/BigData', 'VPS/Bare Metal',
];

export default function ProfileCard() {
  const { t } = useTranslation();

  return (
    <Card className="flex flex-col items-center text-center h-full" hover={false}>
      <div className="mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-violet-600 bg-zinc-800">
        <img
          src="/wilson.jpg"
          alt="Wilson Sousa"
          className="h-full w-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
            (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
          }}
        />
        <span className="hidden text-2xl font-bold text-violet-400">WS</span>
      </div>
      <h1 className="text-xl font-bold">Wilson Sousa</h1>
      <p className="text-sm text-zinc-400">@WilsonSousajr</p>
      <p className="mt-1 text-sm text-violet-400">{t('home.role')}</p>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-violet-600 bg-violet-600/20 px-3 py-1 text-xs text-violet-300"
          >
            {tech}
          </span>
        ))}
      </div>
    </Card>
  );
}
