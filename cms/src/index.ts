import type { Core } from '@strapi/strapi';

// 1. Blindamos el tipado para que TypeScript reconozca el Enum exacto de Strapi
type SkillCategory = 'frontend' | 'backend-ai' | 'cloud' | 'practices';

interface SkillSeed {
  name: string;
  iconName: string;
  category: SkillCategory;
  level: number;
  order: number;
}

const TECH_STACK: SkillSeed[] = [
  // --- FRONTEND ---
  { name: 'React 18', iconName: 'Atom', category: 'frontend', level: 95, order: 1 },
  { name: 'Angular', iconName: 'Layout', category: 'frontend', level: 90, order: 2 },
  { name: 'TypeScript', iconName: 'FileCode', category: 'frontend', level: 95, order: 3 },
  { name: 'Redux Toolkit', iconName: 'Layers', category: 'frontend', level: 90, order: 4 },
  { name: 'React Query', iconName: 'Database', category: 'frontend', level: 92, order: 5 },
  { name: 'Zustand', iconName: 'Box', category: 'frontend', level: 88, order: 6 },
  { name: 'Vite', iconName: 'Zap', category: 'frontend', level: 95, order: 7 },
  { name: 'Zod', iconName: 'CheckSquare', category: 'frontend', level: 90, order: 8 },
  { name: 'Ant Design', iconName: 'Component', category: 'frontend', level: 90, order: 9 },
  { name: 'ECharts / Analítica UI', iconName: 'BarChart3', category: 'frontend', level: 92, order: 10 },
  { name: 'Arq. Hexagonal UI', iconName: 'Hexagon', category: 'frontend', level: 88, order: 11 },
  { name: 'CSS Modules / BEM', iconName: 'Palette', category: 'frontend', level: 95, order: 12 },

  // --- BACKEND & AI ---
  { name: 'Python', iconName: 'Terminal', category: 'backend-ai', level: 90, order: 13 },
  { name: 'FastAPI', iconName: 'Server', category: 'backend-ai', level: 92, order: 14 },
  { name: 'Vertex AI (Gemini)', iconName: 'Sparkles', category: 'backend-ai', level: 95, order: 15 },
  { name: 'RAG Engine', iconName: 'BrainCircuit', category: 'backend-ai', level: 90, order: 16 },
  { name: 'Function Calling / LLM', iconName: 'Cpu', category: 'backend-ai', level: 92, order: 17 },
  { name: 'Node.js / Express', iconName: 'ServerCrash', category: 'backend-ai', level: 85, order: 18 },
  { name: '.NET (Umbraco)', iconName: 'Code2', category: 'backend-ai', level: 80, order: 19 },
  { name: 'Supabase Edge Fn (Deno)', iconName: 'CloudLightning', category: 'backend-ai', level: 90, order: 20 },
  { name: 'Patrón BFF', iconName: 'GitMerge', category: 'backend-ai', level: 90, order: 21 },

  // --- CLOUD E INFRAESTRUCTURA ---
  { name: 'Google Cloud Platform', iconName: 'Cloud', category: 'cloud', level: 88, order: 22 },
  { name: 'PostgreSQL', iconName: 'Database', category: 'cloud', level: 90, order: 23 },
  { name: 'MongoDB', iconName: 'HardDrive', category: 'cloud', level: 85, order: 24 },
  { name: 'Supabase', iconName: 'DatabaseBackup', category: 'cloud', level: 92, order: 25 },
  { name: 'Vercel', iconName: 'Triangle', category: 'cloud', level: 95, order: 26 },
  { name: 'Railway', iconName: 'Train', category: 'cloud', level: 88, order: 27 },
  { name: 'Cloudflare Tunnel', iconName: 'ShieldAlert', category: 'cloud', level: 88, order: 28 },
  { name: 'OAuth / Auth / RBAC', iconName: 'KeyRound', category: 'cloud', level: 90, order: 29 },
  { name: 'CI/CD Pipelines', iconName: 'Workflow', category: 'cloud', level: 85, order: 30 },

  // --- CALIDAD Y PRÁCTICAS ---
  { name: 'Jest', iconName: 'CheckCircle2', category: 'practices', level: 88, order: 31 },
  { name: 'React Testing Library', iconName: 'TestTube', category: 'practices', level: 90, order: 32 },
  { name: 'MSW (Mock Service Worker)', iconName: 'Radio', category: 'practices', level: 85, order: 33 },
  { name: 'Lighthouse / Web Perf', iconName: 'Gauge', category: 'practices', level: 95, order: 34 },
  { name: 'Revisión de PRs', iconName: 'GitPullRequest', category: 'practices', level: 95, order: 35 },
  { name: 'Liderazgo Técnico', iconName: 'Users', category: 'practices', level: 92, order: 36 },
  { name: 'Clean Code / SOLID', iconName: 'BookOpenCheck', category: 'practices', level: 95, order: 37 },
];

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    try {
      // 2. Pasamos un objeto vacío {} a count() para cumplir la firma de Strapi 5
      const count = await strapi.documents('api::skill.skill').count({});

      if (count === 0) {
        strapi.log.info('🚀 [SEED] No se encontraron Skills. Iniciando inyección automática...');

        for (const skill of TECH_STACK) {
          await strapi.documents('api::skill.skill').create({
            data: skill,
            status: 'published',
          });
          strapi.log.info(`✅ [SEED] Skill creada: ${skill.name}`);
        }

        strapi.log.info('🎉 [SEED] ¡Las 37 habilidades fueron sembradas y publicadas con éxito!');
      } else {
        strapi.log.info(`ℹ️ [SEED] La base de datos ya cuenta con ${count} skills. Se omite el seeding.`);
      }
    } catch (error) {
      strapi.log.error('❌ [SEED] Error al intentar sembrar las Skills:', error);
    }
  },
};