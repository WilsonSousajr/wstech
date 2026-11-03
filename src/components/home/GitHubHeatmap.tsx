import { useEffect, useState, type CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { Github, ExternalLink } from 'lucide-react';
import Card from '../ui/Card';

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ContributionsData {
  total: Record<string, number>;
  contributions: ContributionDay[];
}

const INTENSITY_VARS = [
  'var(--color-heatmap-0)',
  'var(--color-heatmap-1)',
  'var(--color-heatmap-2)',
  'var(--color-heatmap-3)',
  'var(--color-heatmap-4)',
];

const LEGEND_VARS = [
  'var(--color-heatmap-legend-0)',
  'var(--color-heatmap-legend-1)',
  'var(--color-heatmap-legend-2)',
  'var(--color-heatmap-legend-3)',
  'var(--color-heatmap-legend-4)',
];

export default function GitHubHeatmap() {
  const { t } = useTranslation();
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const year = new Date().getFullYear();

  useEffect(() => {
    async function fetchContributions() {
      try {
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/WilsonSousajr?y=last`
        );
        const data: ContributionsData = await res.json();
        setContributions(data.contributions);

        const totalCount = Object.values(data.total).reduce((a, b) => a + b, 0);
        setTotal(totalCount);
      } catch {
        // Fallback to mock data if API fails
        const mock: ContributionDay[] = [];
        const today = new Date();
        for (let i = 364; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          const rand = Math.random();
          let level = 0;
          if (rand > 0.3) level = 1;
          if (rand > 0.5) level = 2;
          if (rand > 0.7) level = 3;
          if (rand > 0.85) level = 4;
          mock.push({
            date: date.toISOString().split('T')[0],
            count: level * 2,
            level,
          });
        }
        setContributions(mock);
        setTotal(mock.reduce((sum, d) => sum + d.count, 0));
      } finally {
        setLoading(false);
      }
    }
    fetchContributions();
  }, []);

  // Group contributions into weeks (columns of 7 days, Sunday first) so each
  // row is always the same weekday — pad the first week with empty slots.
  const weeks: (ContributionDay | null)[][] = [];
  if (contributions.length > 0) {
    const offset = new Date(`${contributions[0].date}T00:00:00`).getDay();
    const days: (ContributionDay | null)[] = [
      ...Array.from({ length: offset }, () => null),
      ...contributions,
    ];
    for (let i = 0; i < days.length; i += 7) {
      const week = days.slice(i, i + 7);
      while (week.length < 7) week.push(null);
      weeks.push(week);
    }
  }

  return (
    <Card className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Github size={16} className="text-text-secondary" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-text-muted">
            {t('home.github')} • {year}
          </span>
        </div>
        <a
          href="https://github.com/WilsonSousajr"
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-faint hover:text-text-primary transition-colors"
          aria-label={t('home.githubProfile')}
        >
          <ExternalLink size={14} />
        </a>
      </div>

      {/* Graph + legend share one dot size: a week column's share of the
          container width (cqw), floored at 6px so phones scroll instead. */}
      <div
        className="@container mt-4 flex flex-1 flex-col [--dot-gap:2px] sm:[--dot-gap:3px] [--dot:max(6px,calc((100cqw-(var(--weeks)-1)*var(--dot-gap))/var(--weeks)))]"
        style={{ '--weeks': weeks.length || 53 } as CSSProperties}
      >
        {/* Heatmap */}
        <div className="flex-1 heatmap-scroll">
          {loading ? (
            <div className="flex h-24 items-center justify-center">
              <span className="text-xs text-text-faint">{t('common.loading')}</span>
            </div>
          ) : (
            // Fluid grid: one column per week, dots scale with the card width.
            // The 6px floor keeps them legible on phones, where it scrolls instead.
            <div className="grid grid-flow-col grid-rows-7 gap-(--dot-gap) grid-cols-[repeat(var(--weeks),var(--dot))]">
              {weeks.flatMap((week, wi) =>
                week.map((day, di) =>
                  day ? (
                    <div
                      key={`${wi}-${di}`}
                      className="aspect-square w-full rounded-full"
                      style={{ backgroundColor: INTENSITY_VARS[day.level] }}
                      title={t('home.heatmap.dayTitle', {
                        date: day.date,
                        count: day.count,
                      })}
                    />
                  ) : (
                    <div key={`${wi}-${di}`} className="aspect-square w-full" aria-hidden="true" />
                  )
                )
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-text-muted">
            {total} {t('home.activitiesIn')} {year}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-text-faint">{t('home.heatmap.less')}</span>
            {LEGEND_VARS.map((color, i) => (
              <div
                key={i}
                className="size-(--dot) shrink-0 rounded-full"
                style={{ backgroundColor: color }}
              />
            ))}
            <span className="text-[10px] text-text-faint">{t('home.heatmap.more')}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
