import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="pt-10 sm:pt-8 flex items-center justify-center min-h-[60vh]">
      <Card>
        <div className="text-center py-8 px-4">
          <p className="text-6xl font-light text-text-muted mb-4">404</p>
          <h1 className="text-xl font-semibold text-text-primary mb-2">
            {t('notFound.title')}
          </h1>
          <p className="text-sm text-text-muted mb-6">
            {t('notFound.description')}
          </p>
          <Link
            to="/"
            className="inline-block rounded-xl bg-btn-bg px-6 py-2.5 text-sm font-medium text-text-primary hover:bg-btn-bg-hover transition-colors"
          >
            {t('notFound.backHome')}
          </Link>
        </div>
      </Card>
    </div>
  );
}
