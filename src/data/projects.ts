export interface Project {
  id: string;
  title: string;
  titlePtBr: string;
  year: number;
  description: string;
  descriptionPtBr: string;
  color: string;
  link: string;
}

export const projects: Project[] = [
  {
    id: 'portfolio',
    title: 'Personal Portfolio Website',
    titlePtBr: 'Site Pessoal de Portfólio',
    year: 2025,
    description: 'A sleek and responsive portfolio website built with React and VITE showcasing my projects, skills, and experience in a visually appealing way.',
    descriptionPtBr: 'Um site pessoal de portfólio elegante e responsivo construído com React e VITE, exibindo meus projetos, habilidades e experiência de forma visualmente atraente.',
    color: 'bg-violet-600',
    link: '#',
  },
];
