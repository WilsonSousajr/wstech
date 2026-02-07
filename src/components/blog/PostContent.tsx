import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface PostContentProps {
  content: string;
}

export default function PostContent({ content }: PostContentProps) {
  return (
    <div className="prose prose-invert prose-a:text-violet-400 prose-headings:text-zinc-100 prose-code:text-violet-300 max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
