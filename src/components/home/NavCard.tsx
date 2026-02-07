import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import Card from '../ui/Card';

interface NavCardProps {
  to: string;
  label: string;
  icon: LucideIcon;
}

export default function NavCard({ to, label, icon: Icon }: NavCardProps) {
  return (
    <Link to={to} className="block h-full">
      <Card className="flex h-full items-center gap-3 hover:shadow-lg hover:shadow-violet-600/20">
        <Icon size={24} className="text-violet-400" />
        <span className="text-lg font-semibold">{label}</span>
      </Card>
    </Link>
  );
}
