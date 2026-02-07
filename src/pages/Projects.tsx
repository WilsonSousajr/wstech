import { useTranslation } from 'react-i18next';
import { ExternalLink } from 'lucide-react';
import Card from '../components/ui/Card';
import { projects } from '../data/projects';

export default function Projects() {
  const { t, i18n } = useTranslation();
  const isPtBr = i18n.language === 'pt-BR';

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{t('projects.title')}</h1>
        <p className="mt-2 text-zinc-400">{t('projects.subtitle')}</p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <Card key={project.id}>
            <div className={`mb-4 h-32 rounded-lg ${project.color} opacity-80`} />
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-lg font-semibold">
                {isPtBr ? project.titlePtBr : project.title}
              </h2>
              <span className="rounded-full bg-violet-600/20 px-2 py-0.5 text-xs text-violet-300">
                {project.year}
              </span>
            </div>
            <p className="text-sm text-zinc-400 mb-3">
              {isPtBr ? project.descriptionPtBr : project.description}
            </p>
            <a
              href={project.link}
              className="inline-flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300 transition-colors"
            >
              {t('projects.viewProject')}
              <ExternalLink size={14} />
            </a>
          </Card>
        ))}
      </div>
    </div>
  );
}
