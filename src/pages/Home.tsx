import { Code2, User, Mail, BookOpen } from 'lucide-react';
import ProfileCard from '../components/home/ProfileCard';
import InfoCard from '../components/home/InfoCard';
import NavCard from '../components/home/NavCard';
import NewsletterCard from '../components/home/NewsletterCard';
import GitHubHeatmap from '../components/home/GitHubHeatmap';

export default function Home() {
  return (
    <div
      className="bento-grid grid gap-4"
      style={{
        gridTemplateAreas: `
          "profile profile profile info"
          "projects projects about about"
          "contact blog newsletter newsletter"
          "github github github github"
        `,
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridTemplateRows: 'auto auto auto auto',
      }}
    >
      <div style={{ gridArea: 'profile' }} className="animate-fade-up" >
        <ProfileCard />
      </div>
      <div style={{ gridArea: 'info' }} className="animate-fade-up [animation-delay:50ms]">
        <InfoCard />
      </div>
      <div style={{ gridArea: 'projects' }} className="animate-fade-up [animation-delay:100ms]">
        <NavCard to="/projects" translationKey="projects" icon={Code2} />
      </div>
      <div style={{ gridArea: 'about' }} className="animate-fade-up [animation-delay:150ms]">
        <NavCard to="/about" translationKey="about" icon={User} />
      </div>
      <div style={{ gridArea: 'contact' }} className="animate-fade-up [animation-delay:200ms]">
        <NavCard to="/contact" translationKey="contact" icon={Mail} />
      </div>
      <div style={{ gridArea: 'blog' }} className="animate-fade-up [animation-delay:250ms]">
        <NavCard to="/blog" translationKey="blog" icon={BookOpen} />
      </div>
      <div style={{ gridArea: 'newsletter' }} className="animate-fade-up [animation-delay:300ms]">
        <NewsletterCard />
      </div>
      <div style={{ gridArea: 'github' }} className="animate-fade-up [animation-delay:350ms]">
        <GitHubHeatmap />
      </div>
    </div>
  );
}
