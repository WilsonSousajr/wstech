import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useTheme } from '../../contexts/ThemeContext';

interface PostContentProps {
  content: string;
}

export default function PostContent({ content }: PostContentProps) {
  const { theme } = useTheme();

  return (
    <div className={`prose ${theme === 'dark' ? 'prose-invert' : ''} prose-a:text-text-secondary prose-headings:text-text-primary prose-code:text-text-secondary prose-strong:text-text-primary max-w-none`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
