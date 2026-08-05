import type { ExperienceItem } from '@/types';

export const experiences: ExperienceItem[] = [
 {
  id: 'enovate',
  company: 'Enovate',
  role: 'Desarrollador Full-Stack Mid-Senior & Integración IA',
  period: 'Abr 2024 - Actualidad',
  location: 'Houston, EEUU - Remoto',
  description: 'Liderazgo técnico y desarrollo de interfaces de alto rendimiento, dashboards analíticos industriales y plataformas de agentes autónomos con Inteligencia Artificial.',
  achievements: [
   'Plataforma de Agentes IA: Construcción de agentes autónomos con Vertex AI (Gemini), RAG Engine y Function Calling para consulta de datos de producción en lenguaje natural.',
   'Dashboard Analítico Petrolero (W&T Offshore): Liderazgo de arquitectura frontend con React + ECharts para visualización de telemetría en tiempo real de pozos petroleros.',
   'Reingeniería de Plataforma: Reestructuración de plataforma core en Angular aplicando Arquitectura Limpia (Hexagonal) para máxima escalabilidad.',
   'Ecosistema Interno & Liderazgo: Diseño y publicación de librerías UI privadas en NPM, mentoría a desarrolladores junior/mid y definición de estándares de código.'
  ],
  technologies: ['React', 'Angular', 'TypeScript', 'Python', 'FastAPI', 'Vertex AI', 'GCP', 'RAG Engine', 'ECharts', 'Arq. Hexagonal']
 },
 {
  id: 'newshore-flyr',
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
  technologies: ['Angular', 'TypeScript', '.NET', 'Umbraco', 'Integración POS', 'Deeplinks', 'RxJS']
 },
 {
  id: 'geekcore',
  company: 'Geekcore',
  role: 'Desarrollador Frontend Junior',
  period: 'Feb 2022 - Sep 2022',
  location: 'Bogotá, CO',
  description: 'Maquetado y desarrollo de portales web corporativos y consumo de servicios RESTful.',
  achievements: [
   'Desarrollo de portales web interactivos utilizando React JS, Redux y Ant Design.',
   'Consumo e integración de APIs REST y diseño modular de componentes UI.'
  ],
  technologies: ['React', 'Redux', 'Ant Design', 'APIs REST', 'CSS3', 'Git']
 }
];