import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import matter from 'gray-matter';
import PostCard from '../components/blog/PostCard';

interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
}

const postFiles = import.meta.glob('/src/content/posts/*.md', {
  query: '?raw',
  import: 'default',
});

export default function Blog() {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<PostMeta[]>([]);

  useEffect(() => {
    async function loadPosts() {
      const loaded: PostMeta[] = [];
      for (const path in postFiles) {
        const raw = (await postFiles[path]()) as string;
        const { data } = matter(raw);
        loaded.push({
          slug: data.slug,
          title: data.title,
          date: data.date,
          description: data.description,
          tags: data.tags || [],
        });
      }
      loaded.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setPosts(loaded);
    }
    loadPosts();
  }, []);

  return (
    <div className="pt-10 sm:pt-8">
      <h1 className="mb-6 sm:mb-8 text-2xl sm:text-3xl font-bold">{t('blog.title')}</h1>
      <div className="grid gap-4">
        {posts.map((post) => (
          <PostCard key={post.slug} {...post} />
        ))}
      </div>
    </div>
  );
}
