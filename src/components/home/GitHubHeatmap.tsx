import { useTranslation } from 'react-i18next';
import Card from '../ui/Card';

function generateMockData(): number[] {
  const data: number[] = [];
  for (let i = 0; i < 52 * 7; i++) {
    const rand = Math.random();
    if (rand < 0.3) data.push(0);
    else if (rand < 0.5) data.push(1);
    else if (rand < 0.7) data.push(2);
    else if (rand < 0.85) data.push(3);
    else data.push(4);
  }
  return data;
}

const intensityClasses = [
  'bg-zinc-800',
  'bg-violet-900',
  'bg-violet-700',
  'bg-violet-500',
  'bg-violet-400',
];

const mockData = generateMockData();

export default function GitHubHeatmap() {
  const { t } = useTranslation();

  return (
    <Card hover={false}>
      <h3 className="mb-3 font-semibold">{t('home.github')}</h3>
      <div className="overflow-x-auto">
        <div className="grid grid-flow-col grid-rows-7 gap-1">
          {mockData.map((level, i) => (
            <div
              key={i}
              className={`h-3 w-3 rounded-sm ${intensityClasses[level]}`}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
