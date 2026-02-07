import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
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
    }
    loadPost();
  }, [slug]);

  if (!post) {
    return <div className="text-zinc-400">Loading...</div>;
  }

  return (
    <div>
      <Link
        to="/blog"
        className="mb-6 inline-flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300 transition-colors"
      >
        <ArrowLeft size={16} />
        {t('blog.back')}
      </Link>
      <Card hover={false}>
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 mb-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-violet-600 bg-violet-600/20 px-2 py-0.5 text-xs text-violet-300"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl font-bold mb-1">{post.title}</h1>
          <p className="text-sm text-zinc-500">{post.date}</p>
        </div>
        <PostContent content={post.content} />
      </Card>
    </div>
  );
}
