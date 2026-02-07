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
    id: 'fastapi-gateway',
    title: 'FastAPI Microservices Gateway',
    titlePtBr: 'Gateway de Microsserviços FastAPI',
    year: 2025,
    description: 'A high-performance API gateway built with FastAPI, handling authentication, rate limiting, and request routing across multiple microservices.',
    descriptionPtBr: 'Um gateway de API de alta performance construído com FastAPI, lidando com autenticação, rate limiting e roteamento de requisições entre múltiplos microsserviços.',
    color: 'bg-violet-600',
    link: '#',
  },
  {
    id: 'etl-pipeline',
    title: 'ETL Pipeline Dashboard',
    titlePtBr: 'Dashboard de Pipeline ETL',
    year: 2024,
    description: 'Real-time monitoring dashboard for ETL pipelines processing millions of records daily. Built with React frontend and Python orchestration.',
    descriptionPtBr: 'Dashboard de monitoramento em tempo real para pipelines ETL processando milhões de registros diários. Construído com frontend React e orquestração Python.',
    color: 'bg-emerald-600',
    link: '#',
  },
  {
    id: 'clickhouse-analytics',
    title: 'ClickHouse Analytics Platform',
    titlePtBr: 'Plataforma de Analytics ClickHouse',
    year: 2024,
    description: 'Analytics platform leveraging ClickHouse for sub-second queries over billions of events. Includes custom SQL query builder and visualization layer.',
    descriptionPtBr: 'Plataforma de analytics utilizando ClickHouse para consultas em sub-segundo sobre bilhões de eventos. Inclui construtor de consultas SQL customizado e camada de visualização.',
    color: 'bg-amber-600',
    link: '#',
  },
  {
    id: 'react-component-lib',
    title: 'React Component Library',
    titlePtBr: 'Biblioteca de Componentes React',
    year: 2023,
    description: 'A reusable component library with dark mode support, accessibility built-in, and comprehensive Storybook documentation.',
    descriptionPtBr: 'Uma biblioteca de componentes reutilizáveis com suporte a dark mode, acessibilidade integrada e documentação abrangente no Storybook.',
    color: 'bg-sky-600',
    link: '#',
  },
];
