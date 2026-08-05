import type { ExperienceItem } from '@/types';

export const experiences: ExperienceItem[] = [
  {
    id: 'enovate',
    role: 'Senior Frontend Architect / Tech Lead',
    company: 'Enovate Solutions',
    period: '2024 - Presente',
    description: 'Liderazgo técnico del equipo frontend, diseñando la arquitectura base de aplicaciones a gran escala con React 18, TypeScript y CSS Modules modularizado con BEM.',
    achievements: [
      'Establecimiento del sistema de diseño interno basado enteramente en CSS Variables y arquitectura de componentes atómicos.',
      'Reducción del 40% en tiempos de primera pintura (FCP) y bloqueo total (TBT) en los dashboards de control mediante la carga diferida de módulos.',
      'Mentoría de 8 ingenieros de frontend e implantación de flujos estrictos de testing unitario y análisis estático de código.'
    ],
    technologies: ['React 18', 'TypeScript', 'CSS Modules', 'Framer Motion', 'Vitest', 'Node.js', 'Webpack'],
    companyUrl: 'https://enovate.com'
  },
  {
    id: 'newshore',
    role: 'Senior Frontend Developer',
    company: 'Newshore',
    period: '2022 - 2024',
    description: 'Desarrollo de aplicaciones de reservas aéreas de alta concurrencia y portales interactivos para aerolíneas internacionales líderes.',
    achievements: [
      'Implementación del sistema dinámico de flujos de reserva estructurado con máquinas de estado complejas y validación estricta de formularios.',
      'Desarrollo de una librería de UI interna usando CSS Modules y metodología BEM para aislamiento total de componentes externos.',
      'Migración de código heredado de Javascript a TypeScript reduciendo la tasa de errores de producción en un 35%.'
    ],
    technologies: ['React', 'TypeScript', 'CSS Modules', 'Redux Toolkit', 'Vite', 'Jest', 'Azure DevOps'],
    companyUrl: 'https://newshore.es'
  },
  {
    id: 'geekcore',
    role: 'Frontend Developer',
    company: 'Geekcore Technologies',
    period: '2020 - 2022',
    description: 'Desarrollo y mantenimiento de portales web interactivos, dashboards internos de clientes y aplicaciones web a medida.',
    achievements: [
      'Creación de interfaces responsive complejas basadas en grids y flexbox con metodologías CSS modernas, garantizando compatibilidad entre navegadores.',
      'Integración fluida con APIs RESTful, controlando estados de carga y manejo robusto de excepciones en componentes.',
      'Optimización de SEO y accesibilidad (WCAG AA) para portales gubernamentales de alta exposición.'
    ],
    technologies: ['React', 'JavaScript', 'CSS Modules', 'REST APIs', 'Sass', 'Git', 'Lighthouse'],
    companyUrl: 'https://geekcore.co'
  }
];
