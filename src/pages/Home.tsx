import { useTranslation } from 'react-i18next';
import { FolderGit2, User, Mail, BookOpen } from 'lucide-react';
import ProfileCard from '../components/home/ProfileCard';
import InfoCard from '../components/home/InfoCard';
import NavCard from '../components/home/NavCard';
import NewsletterCard from '../components/home/NewsletterCard';
import GitHubHeatmap from '../components/home/GitHubHeatmap';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div
      className="grid gap-4"
      style={{
        gridTemplateAreas: `
          "profile info projects"
          "profile about blog"
          "contact heatmap heatmap"
          "newsletter newsletter newsletter"
        `,
        gridTemplateColumns: '1fr 1fr 1fr',
      }}
    >
      <div style={{ gridArea: 'profile' }}>
        <ProfileCard />
      </div>
      <div style={{ gridArea: 'info' }}>
        <InfoCard />
      </div>
      <div style={{ gridArea: 'projects' }}>
        <NavCard to="/projects" label={t('nav.projects')} icon={FolderGit2} />
      </div>
      <div style={{ gridArea: 'about' }}>
        <NavCard to="/about" label={t('nav.about')} icon={User} />
      </div>
      <div style={{ gridArea: 'blog' }}>
        <NavCard to="/blog" label={t('nav.blog')} icon={BookOpen} />
      </div>
      <div style={{ gridArea: 'contact' }}>
        <NavCard to="/contact" label={t('nav.contact')} icon={Mail} />
      </div>
      <div style={{ gridArea: 'heatmap' }}>
        <GitHubHeatmap />
      </div>
      <div style={{ gridArea: 'newsletter' }}>
        <NewsletterCard />
      </div>
    </div>
  );
}
