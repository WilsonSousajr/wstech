import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
    return <div className="text-neutral-600 pt-8">Loading...</div>;
  }

  return (
    <div className="pt-8">
      <Card>
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#2a2a2a] px-2 py-0.5 text-xs text-neutral-500"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl font-bold text-white mb-1">{post.title}</h1>
          <p className="text-sm text-neutral-600">{post.date}</p>
        </div>
        <PostContent content={post.content} />
      </Card>
    </div>
  );
}
