import type { TechSkill } from '@/types';

export const techStack: TechSkill[] = [
  /* Frontend */
  { id: 'react', name: 'React (18/19)', category: 'frontend', level: 95, iconName: 'React' },
  { id: 'typescript', name: 'TypeScript', category: 'frontend', level: 90, iconName: 'FileCode2' },
  { id: 'css-modules', name: 'CSS Modules (BEM)', category: 'frontend', level: 98, iconName: 'Palette' },
  { id: 'framer-motion', name: 'Framer Motion', category: 'frontend', level: 85, iconName: 'Sparkles' },
  { id: 'nextjs', name: 'Next.js', category: 'frontend', level: 88, iconName: 'Layers' },

  /* IA / Backend */
  { id: 'nodejs', name: 'Node.js', category: 'backend-ai', level: 85, iconName: 'Cpu' },
  { id: 'python', name: 'Python (FastAPI)', category: 'backend-ai', level: 80, iconName: 'Terminal' },
  { id: 'langchain', name: 'LangChain / LLMs', category: 'backend-ai', level: 75, iconName: 'Bot' },
  { id: 'postgresql', name: 'PostgreSQL', category: 'backend-ai', level: 80, iconName: 'Database' },

  /* Cloud */
  { id: 'docker', name: 'Docker', category: 'cloud', level: 80, iconName: 'Container' },
  { id: 'aws', name: 'AWS (S3/EC2/Lambda)', category: 'cloud', level: 75, iconName: 'Cloud' },
  { id: 'ci-cd', name: 'GitHub Actions (CI/CD)', category: 'cloud', level: 85, iconName: 'GitBranch' },

  /* Prácticas */
  { id: 'clean-architecture', name: 'Arquitectura Limpia / SRP', category: 'practices', level: 90, iconName: 'Wrench' },
  { id: 'a11y', name: 'Accesibilidad (WCAG AA)', category: 'practices', level: 85, iconName: 'Accessibility' },
  { id: 'testing', name: 'Testing (Vitest/Jest)', category: 'practices', level: 80, iconName: 'CheckCircle' }
];
