import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Card from '../ui/Card';

interface PostCardProps {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
}

export default function PostCard({ slug, title, date, description, tags }: PostCardProps) {
  const { t } = useTranslation();

  return (
    <Card>
      <div className="flex flex-wrap items-center gap-2 mb-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[#2a2a2a] px-2 py-0.5 text-xs text-neutral-500"
          >
            {tag}
          </span>
        ))}
      </div>
      <h2 className="text-lg font-semibold text-white mb-1">{title}</h2>
      <p className="text-xs text-neutral-600 mb-2">{date}</p>
      <p className="text-sm text-neutral-500 mb-3">{description}</p>
      <Link
        to={`/blog/${slug}`}
        className="text-sm text-neutral-400 hover:text-white transition-colors"
      >
        {t('blog.readMore')} →
      </Link>
    </Card>
  );
}
