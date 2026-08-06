import type { SupportedLocale } from '@/context/LocaleContext';

export interface MetaItem {
  id?: string | number;
  label: string;
  value: string;
  variant?: string;
}

export interface HeroData {
  eyebrowText: string;
  eyebrowStatus: 'available' | 'busy' | 'open-to-work';
  titleFirst: string;
  titleEmphasis: string;
  role: string;
  subtitle: string;
  primaryBtnText: string;
  cvFile: string;
  metaItems: MetaItem[];
}

const STRAPI_API_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337/api';
const STRAPI_BASE_URL = STRAPI_API_URL.replace(/\/api$/, '');

/**
 * Helper utilitario para extraer y formatear la URL absoluta de archivos media en Strapi 4 o 5.
 */
export function getStrapiMediaUrl(media: any): string {
  if (!media) return '';

  let relativeUrl = '';

  if (typeof media === 'string') {
    relativeUrl = media;
  } else if (typeof media === 'object') {
    if (media.url && typeof media.url === 'string') {
      relativeUrl = media.url;
    } else if (media.data && media.data.attributes && typeof media.data.attributes.url === 'string') {
      relativeUrl = media.data.attributes.url;
    } else if (media.data && typeof media.data.url === 'string') {
      relativeUrl = media.data.url;
    }
  }

  if (!relativeUrl) return '';

  // Si ya es un enlace absoluto (como el fallback), retornarlo directamente
  if (relativeUrl.startsWith('http://') || relativeUrl.startsWith('https://')) {
    return relativeUrl;
  }

  // Prepend de la URL base del servidor de Strapi
  const formattedRelative = relativeUrl.startsWith('/') ? relativeUrl : `/${relativeUrl}`;
  return `${STRAPI_BASE_URL}${formattedRelative}`;
}

const FALLBACK_HERO_DATA: Record<SupportedLocale, HeroData> = {
  'es-CO': {
    eyebrowText: 'Disponible para proyectos',
    eyebrowStatus: 'available',
    titleFirst: 'Jhon',
    titleEmphasis: 'Delgado',
    role: 'Full-Stack & AI Integration Engineer',
    subtitle: 'Más de 4 años construyendo interfaces de alto rendimiento, arquitecturas backend robustas y agentes autónomos con Inteligencia Artificial — en producción, no en demos.',
    primaryBtnText: 'Ver proyectos',
    cvFile: '/cv.pdf',
    metaItems: [
      { label: 'Base', value: 'Colombia · Remoto' },
      { label: 'Cliente actual', value: 'Enovate, Houston TX' }
    ]
  },
  en: {
    eyebrowText: 'Available for projects',
    eyebrowStatus: 'available',
    titleFirst: 'Jhon',
    titleEmphasis: 'Delgado',
    role: 'Full-Stack & AI Integration Engineer',
    subtitle: 'More than 4 years building high-performance interfaces, robust backend architectures, and autonomous AI agents — in production, not in demos.',
    primaryBtnText: 'View projects',
    cvFile: '/cv-en.pdf',
    metaItems: [
      { label: 'Base', value: 'Colombia · Remote' },
      { label: 'Current client', value: 'Enovate, Houston TX' }
    ]
  }
};

/**
 * Obtiene los datos del Hero estructurados desde Strapi CMS.
 * Mapea de forma segura el idioma de la URL a los locales de la API de Strapi.
 */
export async function getHeroData(locale: SupportedLocale = 'es-CO'): Promise<HeroData> {
  // Traducir locale del frontend al código locale exacto de la base de datos de Strapi
  const strapiLocale = locale === 'es-CO' ? 'es-CO' : 'en';
  const fallback = FALLBACK_HERO_DATA[locale];

  try {
    const url = `${STRAPI_API_URL}/hero?populate=*&locale=${strapiLocale}`;
    const response = await fetch(url);

    if (!response.ok) {
      console.warn(`[Strapi API] No se pudo obtener datos de /hero para locale=${strapiLocale}. Usando fallback.`);
      return fallback;
    }

    const json = await response.json();

    if (!json || !json.data) {
      console.warn(`[Strapi API] Respuesta vacía de /hero. Usando fallback.`);
      return fallback;
    }

    const attributes = json.data.attributes ? json.data.attributes : json.data;

    return {
      eyebrowText: attributes.eyebrowText || fallback.eyebrowText,
      eyebrowStatus: attributes.eyebrowStatus || fallback.eyebrowStatus,
      titleFirst: attributes.titleFirst || fallback.titleFirst,
      titleEmphasis: attributes.titleEmphasis || fallback.titleEmphasis,
      role: attributes.role || fallback.role,
      subtitle: attributes.subtitle || fallback.subtitle,
      primaryBtnText: attributes.primaryBtnText || fallback.primaryBtnText,
      cvFile: getStrapiMediaUrl(attributes.cvFile) || fallback.cvFile,
      metaItems: Array.isArray(attributes.metaItems)
        ? attributes.metaItems
        : fallback.metaItems
    };
  } catch (error) {
    console.error(`[Strapi API Error] Excepción al obtener /hero:`, error);
    return fallback;
  }
}

export interface GovernanceBadge {
  id?: string | number;
  label: string;
  variant: 'default' | 'primary' | 'warning' | 'success' | 'purple' | 'orange' | 'blue';
}

export interface GovernanceData {
  title: string;
  description: string;
  badges: GovernanceBadge[];
}

const FALLBACK_GOVERNANCE_DATA: Record<SupportedLocale, GovernanceData> = {
  'es-CO': {
    title: 'AI-Native Software Engineering & Governance',
    description: 'Este portafolio fue construido con flujos de trabajo de desarrollo asistido por agentes autónomos de IA (Agy y Claude Code), bajo dirección técnica estricta del desarrollador. Cada decisión de arquitectura, componente y estilo fue auditada, validada y aprobada por el autor — los agentes ejecutan, el ingeniero gobierna.\n\nEl stack refleja las mismas prácticas que aplico en producción: tipado estricto con TypeScript, arquitectura de componentes modular con CSS Modules y BEM, compilación limpia sin warnings, y revisión continua de calidad antes de cada commit.',
    badges: [
      { label: 'Agy Agent Rules', variant: 'blue' },
      { label: 'Claude Code Audit', variant: 'primary' },
      { label: 'Strict BEM CSS Modules', variant: 'success' }
    ]
  },
  en: {
    title: 'AI-Native Software Engineering & Governance',
    description: 'This portfolio was built using autonomous AI agent-assisted workflows (Agy and Claude Code), under the strict technical direction of the developer. Every architectural decision, component, and style was audited, validated, and approved by the author — agents execute, the engineer governs.\n\nThe stack reflects the same practices I apply in production: strict typing with TypeScript, modular component architecture with CSS Modules and BEM, clean warning-free compilation, and continuous quality checks before every commit.',
    badges: [
      { label: 'Agy Agent Rules', variant: 'blue' },
      { label: 'Claude Code Audit', variant: 'primary' },
      { label: 'Strict BEM CSS Modules', variant: 'success' }
    ]
  }
};

/**
 * Obtiene los datos de la sección Gobernanza IA estructurados desde Strapi CMS.
 */
export async function getGovernanceData(locale: SupportedLocale = 'es-CO'): Promise<GovernanceData> {
  const strapiLocale = locale === 'es-CO' ? 'es-CO' : 'en';
  const fallback = FALLBACK_GOVERNANCE_DATA[locale];

  try {
    const url = `${STRAPI_API_URL}/governance?populate=*&locale=${strapiLocale}`;
    const response = await fetch(url);

    if (!response.ok) {
      console.warn(`[Strapi API] No se pudo obtener datos de /governance para locale=${strapiLocale}. Usando fallback.`);
      return fallback;
    }

    const json = await response.json();

    if (!json || !json.data) {
      console.warn(`[Strapi API] Respuesta vacía de /governance. Usando fallback.`);
      return fallback;
    }

    const attributes = json.data.attributes ? json.data.attributes : json.data;

    return {
      title: attributes.title || fallback.title,
      description: attributes.description || fallback.description,
      badges: Array.isArray(attributes.badges) ? attributes.badges : fallback.badges
    };
  } catch (error) {
    console.error(`[Strapi API Error] Excepción al obtener /governance:`, error);
    return fallback;
  }
}

export interface ProjectTechnology {
  id?: string | number;
  label: string;
  variant: 'default' | 'primary' | 'warning' | 'success' | 'purple' | 'orange' | 'blue';
}

export interface ProjectMetric {
  id?: string | number;
  value: string;
  label: string;
}

export interface Project {
  id: string | number;
  title: string;
  description: string;
  technologies: ProjectTechnology[];
  highlights: string[];
  metrics: ProjectMetric[];
  demoUrl?: string;
  demoLabel?: string;
  githubUrl?: string;
  featured: boolean;
  order: number;
}

const FALLBACK_PROJECTS_DATA: Record<SupportedLocale, Project[]> = {
  'es-CO': [
    {
      id: 1,
      title: 'Aluna Tyquy',
      description: 'Plataforma ERP y E-commerce para negocio gastronómico a escala, integrando pagos en tiempo real, control de stock automatizado y generación de reportes tributarios.',
      technologies: [
        { label: 'Deno Edge Functions', variant: 'purple' },
        { label: 'Supabase', variant: 'success' },
        { label: 'React', variant: 'blue' }
      ],
      highlights: [
        'Reducción del 45% en tiempos de facturación manual',
        'Integración fluida con pasarelas de pago y Brevo',
        'Arquitectura Serverless optimizada en latencia edge'
      ],
      metrics: [
        { value: '99.9%', label: 'Uptime' },
        { value: '<50ms', label: 'Latencia' },
        { value: '+15k', label: 'Transac.' }
      ],
      demoUrl: 'https://aluna-tyquy.vercel.app/',
      demoLabel: 'Live Demo',
      githubUrl: 'https://github.com/jsda14',
      featured: true,
      order: 1
    },
    {
      id: 2,
      title: 'Smart Gym Access Control',
      description: 'Sistema IoT e interfaz web conectado a dispositivos de control de acceso biométrico ZKTeco inBio Pro mediante ADMS/Push SDK en red local de alta fiabilidad.',
      technologies: [
        { label: 'TypeScript', variant: 'blue' },
        { label: 'Node.js', variant: 'success' },
        { label: 'IoT ADMS', variant: 'primary' }
      ],
      highlights: [
        'Conexión directa con paneles de control inBio Pro',
        'Sincronización en tiempo real de huellas y RFID',
        'Interfaz del administrador adaptativa y responsiva'
      ],
      metrics: [
        { value: '<1s', label: 'Sinc. Acceso' },
        { value: '500+', label: 'Usuarios Act.' },
        { value: '100%', label: 'Local Uptime' }
      ],
      demoUrl: 'https://platinum-center.vercel.app/',
      demoLabel: 'Live Demo',
      githubUrl: 'https://github.com/jsda14',
      featured: true,
      order: 2
    }
  ],
  en: [
    {
      id: 1,
      title: 'Aluna Tyquy',
      description: 'ERP and E-commerce platform for large-scale gastronomic business, integrating real-time payments, automated stock control, and tax report generation.',
      technologies: [
        { label: 'Deno Edge Functions', variant: 'purple' },
        { label: 'Supabase', variant: 'success' },
        { label: 'React', variant: 'blue' }
      ],
      highlights: [
        '45% reduction in manual billing processing times',
        'Seamless integration with local payment gateways and Brevo',
        'Serverless architecture optimized for edge latency'
      ],
      metrics: [
        { value: '99.9%', label: 'Uptime' },
        { value: '<50ms', label: 'Latency' },
        { value: '+15k', label: 'Transac.' }
      ],
      demoUrl: 'https://aluna-tyquy.vercel.app/',
      demoLabel: 'Live Demo',
      githubUrl: 'https://github.com/jsda14',
      featured: true,
      order: 1
    },
    {
      id: 2,
      title: 'Smart Gym Access Control',
      description: 'IoT system and web interface connected to ZKTeco inBio Pro biometric access control devices via ADMS/Push SDK in local network.',
      technologies: [
        { label: 'TypeScript', variant: 'blue' },
        { label: 'Node.js', variant: 'success' },
        { label: 'IoT ADMS', variant: 'primary' }
      ],
      highlights: [
        'Direct socket connection with inBio Pro control panels',
        'Real-time fingerprint and RFID sync',
        'Responsive and adaptive administrator dashboard'
      ],
      metrics: [
        { value: '<1s', label: 'Access Sync' },
        { value: '500+', label: 'Active Users' },
        { value: '100%', label: 'Local Uptime' }
      ],
      demoUrl: 'https://platinum-center.vercel.app/',
      demoLabel: 'Live Demo',
      githubUrl: 'https://github.com/jsda14',
      featured: true,
      order: 2
    }
  ]
};

/**
 * Obtiene los proyectos estructurados desde Strapi CMS.
 */
export async function getProjectsData(locale: SupportedLocale = 'es-CO'): Promise<Project[]> {
  const strapiLocale = locale === 'es-CO' ? 'es-CO' : 'en';
  const fallback = FALLBACK_PROJECTS_DATA[locale];

  try {
    const url = `${STRAPI_API_URL}/projects?populate=*&locale=${strapiLocale}&sort=order:asc`;
    const response = await fetch(url);

    if (!response.ok) {
      console.warn(`[Strapi API] No se pudo obtener datos de /projects para locale=${strapiLocale}. Usando fallback.`);
      return fallback;
    }

    const json = await response.json();

    if (!json || !json.data) {
      console.warn(`[Strapi API] Respuesta vacía de /projects. Usando fallback.`);
      return fallback;
    }

    // Mapear array de items de Strapi
    return json.data.map((item: any) => {
      const attributes = item.attributes ? item.attributes : item;
      const id = item.id;
      
      // Parsear highlights de forma segura (puede venir como JSON String o como array directo)
      let highlightsArray: string[] = [];
      if (attributes.highlights) {
        if (Array.isArray(attributes.highlights)) {
          highlightsArray = attributes.highlights;
        } else if (typeof attributes.highlights === 'string') {
          try {
            highlightsArray = JSON.parse(attributes.highlights);
          } catch {
            highlightsArray = [attributes.highlights];
          }
        }
      }

      return {
        id: id,
        title: attributes.title || '',
        description: attributes.description || '',
        technologies: Array.isArray(attributes.technologies) ? attributes.technologies : [],
        highlights: highlightsArray,
        metrics: Array.isArray(attributes.metrics) ? attributes.metrics : [],
        demoUrl: attributes.demoUrl || undefined,
        demoLabel: attributes.demoLabel || undefined,
        githubUrl: attributes.githubUrl || undefined,
        featured: typeof attributes.featured === 'boolean' ? attributes.featured : true,
        order: typeof attributes.order === 'number' ? attributes.order : 99
      };
    });
  } catch (error) {
    console.error(`[Strapi API Error] Excepción al obtener /projects:`, error);
    return fallback;
  }
}

export interface ExperienceTechnology {
  id?: string | number;
  label: string;
  variant: 'default' | 'primary' | 'warning' | 'success' | 'purple' | 'orange' | 'blue';
}

export interface Experience {
  id: string | number;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: ExperienceTechnology[];
  order: number;
}

const FALLBACK_EXPERIENCE_DATA: Record<SupportedLocale, Experience[]> = {
  'es-CO': [
    {
      id: 1,
      company: 'Enovate',
      role: 'Desarrollador Full-Stack Mid-Senior & Integración IA',
      period: 'Abr 2024 - Actualidad',
      location: 'Houston, EEUU - Remoto',
      description: 'Liderazgo técnico y desarrollo de interfaces de alto rendimiento, dashboards analíticos industriales y plataformas de agentes autónomos con Inteligencia Artificial.',
      achievements: [
        'Plataforma de Agentes IA: Construcción de agentes autónomos con Vertex AI (Gemini), RAG Engine y Function Calling para consulta de datos de producción en lenguaje natural.',
        'Dashboard Analítico Petrolero (W&T Offshore): Liderazgo de arquitectura frontend con React + ECharts para visualización de telemetría en tiempo real de pozos petroleros.',
        'Reingeniería de Plataforma: Reestructuración de plataforma core en Angular aplicando Arquitectura Limpia (Hexagonal) para máxima scalabilidad.',
        'Ecosistema Interno & Liderazgo: Diseño y publicación de librerías UI privadas en NPM, mentoría a desarrolladores junior/mid y definición de estándares de código.'
      ],
      technologies: [
        { label: 'React', variant: 'blue' },
        { label: 'Angular', variant: 'purple' },
        { label: 'TypeScript', variant: 'blue' },
        { label: 'Python', variant: 'primary' },
        { label: 'FastAPI', variant: 'success' },
        { label: 'Vertex AI', variant: 'orange' },
        { label: 'GCP', variant: 'blue' },
        { label: 'RAG Engine', variant: 'primary' },
        { label: 'ECharts', variant: 'purple' },
        { label: 'Arq. Hexagonal', variant: 'default' }
      ],
      order: 1
    },
    {
      id: 2,
      company: 'Newshore by Flyr',
      role: 'Ingeniero de Software Avanzado UI',
      period: 'Nov 2022 - Mar 2024',
      location: 'Manizales, CO - Remoto',
      description: 'Desarrollo y optimización de flujos críticos de usuario para la industria aerolínea y comercio electrónico de alto tráfico.',
      achievements: [
        'Check-in Avianca: Construcción y optimización del flujo de check-in de pasajeros, garantizando una UX de alto rendimiento a escala masiva.',
        'Lógica de Pagos & POS: Desarrollo de scripts de validación para pagos divididos (split payments) con integridad transaccional.',
        'Metabuscadores & Deeplinks: Construcción de sistemas de redirección masiva para mejorar conversión desde canales externos.',
        'Stack Híbrido: Integración de interfaces en Angular + TypeScript con el CMS Umbraco (.NET).'
      ],
      technologies: [
        { label: 'Angular', variant: 'purple' },
        { label: 'TypeScript', variant: 'blue' },
        { label: '.NET', variant: 'purple' },
        { label: 'Umbraco', variant: 'default' },
        { label: 'Integración POS', variant: 'primary' },
        { label: 'Deeplinks', variant: 'orange' },
        { label: 'RxJS', variant: 'purple' }
      ],
      order: 2
    },
    {
      id: 3,
      company: 'Geekcore',
      role: 'Desarrollador Frontend Junior',
      period: 'Feb 2022 - Sep 2022',
      location: 'Bogotá, CO',
      description: 'Maquetado y desarrollo de portales web corporativos y consumo de servicios RESTful.',
      achievements: [
        'Desarrollo de portales web interactivos utilizando React JS, Redux y Ant Design.',
        'Consumo e integración de APIs REST y diseño modular de componentes UI.'
      ],
      technologies: [
        { label: 'React', variant: 'blue' },
        { label: 'Redux', variant: 'purple' },
        { label: 'Ant Design', variant: 'default' },
        { label: 'APIs REST', variant: 'success' },
        { label: 'CSS3', variant: 'primary' },
        { label: 'Git', variant: 'default' }
      ],
      order: 3
    }
  ],
  en: [
    {
      id: 1,
      company: 'Enovate',
      role: 'Full-Stack Mid-Senior & AI Integration Developer',
      period: 'Apr 2024 - Present',
      location: 'Houston, USA - Remote',
      description: 'Technical leadership and development of high-performance interfaces, industrial analytical dashboards, and autonomous AI agent platforms.',
      achievements: [
        'AI Agent Platform: Developed autonomous agents with Vertex AI (Gemini), RAG Engine, and Function Calling to query production data using natural language.',
        'Oilfield Analytics Dashboard (W&T Offshore): Led the frontend architecture using React + ECharts to visualize real-time telemetry from offshore oil wells.',
        'Platform Reengineering: Restructured core platform in Angular applying Clean Architecture (Hexagonal) for maximum scalability.',
        'Internal Ecosystem & Leadership: Designed and published private NPM UI packages, mentored junior/mid developers, and established codebase standards.'
      ],
      technologies: [
        { label: 'React', variant: 'blue' },
        { label: 'Angular', variant: 'purple' },
        { label: 'TypeScript', variant: 'blue' },
        { label: 'Python', variant: 'primary' },
        { label: 'FastAPI', variant: 'success' },
        { label: 'Vertex AI', variant: 'orange' },
        { label: 'GCP', variant: 'blue' },
        { label: 'RAG Engine', variant: 'primary' },
        { label: 'ECharts', variant: 'purple' },
        { label: 'Hexagonal Arch.', variant: 'default' }
      ],
      order: 1
    },
    {
      id: 2,
      company: 'Newshore by Flyr',
      role: 'Advanced UI Software Engineer',
      period: 'Nov 2022 - Mar 2024',
      location: 'Manizales, CO - Remote',
      description: 'Development and optimization of critical user flows for the airline industry and high-traffic e-commerce.',
      achievements: [
        'Avianca Check-in: Built and optimized the passenger check-in flow, ensuring high performance at massive scale.',
        'Payment Logic & POS: Developed validation scripts for split payments with transactional integrity.',
        'Metasearch engines & Deeplinks: Built massive redirection systems to improve conversion from external channels.',
        'Hybrid Stack: Integrated Angular + TypeScript interfaces with Umbraco CMS (.NET).'
      ],
      technologies: [
        { label: 'Angular', variant: 'purple' },
        { label: 'TypeScript', variant: 'blue' },
        { label: '.NET', variant: 'purple' },
        { label: 'Umbraco', variant: 'default' },
        { label: 'POS Integration', variant: 'primary' },
        { label: 'Deeplinks', variant: 'orange' },
        { label: 'RxJS', variant: 'purple' }
      ],
      order: 2
    },
    {
      id: 3,
      company: 'Geekcore',
      role: 'Junior Frontend Developer',
      period: 'Feb 2022 - Sep 2022',
      location: 'Bogotá, CO',
      description: 'Layout and development of corporate web portals and consumption of RESTful services.',
      achievements: [
        'Developed interactive corporate web portals using React JS, Redux, and Ant Design.',
        'Consumed and integrated REST APIs, establishing modular UI component design patterns.'
      ],
      technologies: [
        { label: 'React', variant: 'blue' },
        { label: 'Redux', variant: 'purple' },
        { label: 'Ant Design', variant: 'default' },
        { label: 'REST APIs', variant: 'success' },
        { label: 'CSS3', variant: 'primary' },
        { label: 'Git', variant: 'default' }
      ],
      order: 3
    }
  ]
};

/**
 * Obtiene las experiencias estructuradas desde Strapi CMS.
 */
export async function getExperienceData(locale: SupportedLocale = 'es-CO'): Promise<Experience[]> {
  const strapiLocale = locale === 'es-CO' ? 'es-CO' : 'en';
  const fallback = FALLBACK_EXPERIENCE_DATA[locale];

  try {
    const url = `${STRAPI_API_URL}/experiences?populate=*&locale=${strapiLocale}&sort=order:asc`;
    const response = await fetch(url);

    if (!response.ok) {
      console.warn(`[Strapi API] No se pudo obtener datos de /experiences para locale=${strapiLocale}. Usando fallback.`);
      return fallback;
    }

    const json = await response.json();

    if (!json || !json.data) {
      console.warn(`[Strapi API] Respuesta vacía de /experiences. Usando fallback.`);
      return fallback;
    }

    return json.data.map((item: any) => {
      const attributes = item.attributes ? item.attributes : item;
      const id = item.id;
      
      // Parsear achievements de forma segura
      let achievementsArray: string[] = [];
      if (attributes.achievements) {
        if (Array.isArray(attributes.achievements)) {
          achievementsArray = attributes.achievements;
        } else if (typeof attributes.achievements === 'string') {
          try {
            achievementsArray = JSON.parse(attributes.achievements);
          } catch {
            achievementsArray = [attributes.achievements];
          }
        }
      }

      return {
        id: id,
        company: attributes.company || '',
        role: attributes.role || '',
        period: attributes.period || '',
        location: attributes.location || '',
        description: attributes.description || '',
        achievements: achievementsArray,
        technologies: Array.isArray(attributes.technologies) ? attributes.technologies : [],
        order: typeof attributes.order === 'number' ? attributes.order : 99
      };
    });
  } catch (error) {
    console.error(`[Strapi API Error] Excepción al obtener /experiences:`, error);
    return fallback;
  }
}



