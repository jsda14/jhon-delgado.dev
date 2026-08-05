import type { TechSkill } from '@/types';

export const techStack: TechSkill[] = [
 // --- FRONTEND ---
 { id: 'react', name: 'React 18', iconName: 'Atom', category: 'frontend', level: 95 },
 { id: 'angular', name: 'Angular', iconName: 'Layout', category: 'frontend', level: 90 },
 { id: 'typescript', name: 'TypeScript', iconName: 'FileCode', category: 'frontend', level: 95 },
 { id: 'redux-toolkit', name: 'Redux Toolkit', iconName: 'Layers', category: 'frontend', level: 90 },
 { id: 'react-query', name: 'React Query', iconName: 'Database', category: 'frontend', level: 92 },
 { id: 'zustand', name: 'Zustand', iconName: 'Box', category: 'frontend', level: 88 },
 { id: 'vite', name: 'Vite', iconName: 'Zap', category: 'frontend', level: 95 },
 { id: 'zod', name: 'Zod', iconName: 'CheckSquare', category: 'frontend', level: 90 },
 { id: 'ant-design', name: 'Ant Design', iconName: 'Component', category: 'frontend', level: 90 },
 { id: 'echarts', name: 'ECharts / Analítica UI', iconName: 'BarChart3', category: 'frontend', level: 92 },
 { id: 'hexagonal', name: 'Arq. Hexagonal UI', iconName: 'Hexagon', category: 'frontend', level: 88 },
 { id: 'css-modules', name: 'CSS Modules / BEM', iconName: 'Palette', category: 'frontend', level: 95 },

 // --- BACKEND & AI ---
 { id: 'python', name: 'Python', iconName: 'Terminal', category: 'backend-ai', level: 90 },
 { id: 'fastapi', name: 'FastAPI', iconName: 'Server', category: 'backend-ai', level: 92 },
 { id: 'vertex-ai', name: 'Vertex AI (Gemini)', iconName: 'Sparkles', category: 'backend-ai', level: 95 },
 { id: 'rag-engine', name: 'RAG Engine', iconName: 'BrainCircuit', category: 'backend-ai', level: 90 },
 { id: 'function-calling', name: 'Function Calling / LLM', iconName: 'Cpu', category: 'backend-ai', level: 92 },
 { id: 'node-express', name: 'Node.js / Express', iconName: 'ServerCrash', category: 'backend-ai', level: 85 },
 { id: 'dotnet-umbraco', name: '.NET (Umbraco)', iconName: 'Code2', category: 'backend-ai', level: 80 },
 { id: 'supabase-edge', name: 'Supabase Edge Fn (Deno)', iconName: 'CloudLightning', category: 'backend-ai', level: 90 },
 { id: 'patron-bff', name: 'Patrón BFF', iconName: 'GitMerge', category: 'backend-ai', level: 90 },

 // --- CLOUD E INFRAESTRUCTURA ---
 { id: 'gcp', name: 'Google Cloud Platform', iconName: 'Cloud', category: 'cloud', level: 88 },
 { id: 'postgresql', name: 'PostgreSQL', iconName: 'Database', category: 'cloud', level: 90 },
 { id: 'mongodb', name: 'MongoDB', iconName: 'HardDrive', category: 'cloud', level: 85 },
 { id: 'supabase', name: 'Supabase', iconName: 'DatabaseBackup', category: 'cloud', level: 92 },
 { id: 'vercel', name: 'Vercel', iconName: 'Triangle', category: 'cloud', level: 95 },
 { id: 'railway', name: 'Railway', iconName: 'Train', category: 'cloud', level: 88 },
 { id: 'cloudflare-tunnel', name: 'Cloudflare Tunnel', iconName: 'ShieldAlert', category: 'cloud', level: 88 },
 { id: 'oauth', name: 'OAuth / Auth / RBAC', iconName: 'KeyRound', category: 'cloud', level: 90 },
 { id: 'cicd', name: 'CI/CD Pipelines', iconName: 'Workflow', category: 'cloud', level: 85 },

 // --- CALIDAD Y PRÁCTICAS ---
 { id: 'jest', name: 'Jest', iconName: 'CheckCircle2', category: 'practices', level: 88 },
 { id: 'rtl', name: 'React Testing Library', iconName: 'TestTube', category: 'practices', level: 90 },
 { id: 'msw', name: 'MSW (Mock Service Worker)', iconName: 'Radio', category: 'practices', level: 85 },
 { id: 'lighthouse', name: 'Lighthouse / Web Perf', iconName: 'Gauge', category: 'practices', level: 95 },
 { id: 'pr-reviews', name: 'Revisión de PRs', iconName: 'GitPullRequest', category: 'practices', level: 95 },
 { id: 'tech-leadership', name: 'Liderazgo Técnico', iconName: 'Users', category: 'practices', level: 92 },
 { id: 'clean-code', name: 'Clean Code / SOLID', iconName: 'BookOpenCheck', category: 'practices', level: 95 }
];