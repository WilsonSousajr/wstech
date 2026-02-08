export interface Project {
  id: string;
  title: string;
  titlePtBr: string;
  year: number;
  description: string;
  descriptionPtBr: string;
  color: string;
  link: string;
  screenshot?: string;
}

export const projects: Project[] = [
  {
    id: "portfolio",
    title: "Personal Portfolio Website",
    titlePtBr: "Site Pessoal de Portfólio",
    year: 2026,
    description:
      "A sleek and responsive portfolio website built with React and VITE showcasing my projects, skills, and experience in a visually appealing way.",
    descriptionPtBr:
      "Um site pessoal de portfólio elegante e responsivo construído com React e VITE, exibindo meus projetos, habilidades e experiência de forma visualmente atraente.",
    color: "bg-violet-600",
    link: "https://www.wstech.tech",
    screenshot: "/screenshots/portfolio.jpg",
  },
  {
    id: "ecommerce",
    title: "Skate E-commerce Website",
    titlePtBr: "Site de E-commerce de Skate",
    year: 2023,
    description:
      "A ecommerce website for skate products built with pure HTML and CSS, showcasing my projects, skills, and experience in a visually appealing way.",
    descriptionPtBr:
      "Um site de e-commerce de skate elegante e responsivo construído com HTML e CSS puro, exibindo meus projetos, habilidades e experiência de forma visualmente atraente.",
    color: "bg-violet-600",
    link: "https://4skt.netlify.app/",
    screenshot: "/screenshots/4skt.jpg",
  },
  {
    id: "system-monitor",
    title: "TUI System Monitor made with Rust",
    titlePtBr: "Monitor de Sistema TUI feito com Rust",
    year: 2025,
    description:
      "A terminal-based system monitor built with Rust, providing real-time insights into system performance and resource usage in a visually appealing way.",
    descriptionPtBr:
      "Um monitor de sistema baseado em terminal construído com Rust, fornecendo insights em tempo real sobre o desempenho do sistema e o uso de recursos de forma visualmente atraente.",
    color: "bg-violet-600",
    link: "https://github.com/WilsonSousajr/lp-system-monitor",
    screenshot: "/screenshots/system_monitor.jpg",
  },
];
