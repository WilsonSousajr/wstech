import { useTranslation } from 'react-i18next';
import { ExternalLink } from 'lucide-react';
import Card from '../components/ui/Card';
import { projects } from '../data/projects';

export default function Projects() {
  const { t, i18n } = useTranslation();
  const isPtBr = i18n.language === 'pt-BR';

  return (
    <div className="pt-10 sm:pt-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">{t('projects.title')}</h1>
        <p className="mt-2 text-text-muted">{t('projects.subtitle')}</p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <Card key={project.id}>
            {project.screenshot ? (
              <div className="group/img mb-4 h-32 overflow-hidden rounded-lg">
                <img
                  src={project.screenshot}
                  alt={isPtBr ? project.titlePtBr : project.title}
                  className="w-full transition-transform duration-[3s] ease-in-out group-hover/img:translate-y-[calc(-100%+8rem)]"
                />
              </div>
            ) : (
              <div className={`mb-4 h-32 rounded-lg ${project.color} opacity-60`} />
            )}
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-lg font-semibold text-text-primary">
                {isPtBr ? project.titlePtBr : project.title}
              </h2>
              <span className="rounded-full border border-border-hover px-2 py-0.5 text-xs text-text-muted">
                {project.year}
              </span>
            </div>
            <p className="text-sm text-text-muted mb-3">
              {isPtBr ? project.descriptionPtBr : project.description}
            </p>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary transition-colors"
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
