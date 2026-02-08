import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import matter from 'gray-matter';
import Card from '../components/ui/Card';
import PostContent from '../components/blog/PostContent';

const postFiles = import.meta.glob('/src/content/posts/*.md', {
  query: '?raw',
  import: 'default',
});

interface PostData {
  title: string;
  date: string;
  tags: string[];
  content: string;
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const [post, setPost] = useState<PostData | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function loadPost() {
      for (const path in postFiles) {
        const raw = (await postFiles[path]()) as string;
        const { data, content } = matter(raw);
        if (data.slug === slug) {
          setPost({
            title: data.title,
            date: data.date,
            tags: data.tags || [],
            content,
          });
          return;
        }
      }
      setNotFound(true);
    }
    loadPost();
  }, [slug]);

  if (notFound) {
    return (
      <div className="pt-10 sm:pt-8 flex items-center justify-center min-h-[40vh]">
        <Card>
          <div className="text-center py-8 px-4">
            <p className="text-4xl font-light text-text-muted mb-4">404</p>
            <h1 className="text-lg font-semibold text-text-primary mb-2">
              {t('blog.notFound')}
            </h1>
            <Link
              to="/blog"
              className="inline-block mt-4 rounded-xl bg-btn-bg px-6 py-2.5 text-sm font-medium text-text-primary hover:bg-btn-bg-hover transition-colors"
            >
              {t('blog.back')}
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  if (!post) {
    return <div className="text-text-faint pt-8">{t('common.loading')}</div>;
  }

  return (
    <div className="pt-10 sm:pt-8">
      <Card>
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border-hover px-2 py-0.5 text-xs text-text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-1">{post.title}</h1>
          <p className="text-sm text-text-faint">{post.date}</p>
        </div>
        <PostContent content={post.content} />
      </Card>
    </div>
  );
}
