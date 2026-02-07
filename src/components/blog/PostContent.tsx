import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface PostContentProps {
  content: string;
}

export default function PostContent({ content }: PostContentProps) {
  return (
    <div className="prose prose-invert prose-a:text-neutral-300 prose-headings:text-white prose-code:text-neutral-300 prose-strong:text-white max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
