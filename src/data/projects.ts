import type { Project } from '@/types';

export const projects: Project[] = [
 {
  id: 'aluna-tyquy',
  title: 'Aluna Tyquy — E-commerce & ERP Gastronómico',
  description: 'E-commerce completo y sistema ERP a medida con motor financiero defensivo, gestión operativa, logística y asistente IA con control de roles (RBAC).',
  detailedDescription: 'Plataforma integral desarrollada en producción para un negocio gastronómico (tamales). Integra una tienda online, control de inventario, minería de líneas de pedido mediante SQL defensivo para el cálculo exacto de unidades/ticket promedio y una máquina de estados con rollback silencioso en Deno Edge Functions y Brevo.',
  technologies: [
   'React',
   'TypeScript',
   'Supabase',
   'PostgreSQL',
   'Deno Edge Functions',
   'Gemini API',
   'ExcelJS',
   'Brevo',
   'CSS Modules'
  ],
  featured: true,
  liveUrl: 'https://aluna-tyquy.vercel.app/',
  highlights: [
   'Motor financiero SQL defensivo que separa ingresos netos del recaudo de domicilios.',
   'Chatbot IA conversacional con Gemini API y control de acceso RBAC (Admin, Repartidor, Cliente) vía magic links.',
   'Algoritmo de doble pasada en ExcelJS para generación dinámica de reportes por variante de producto.',
   'Reversión de estados con webhooks silenciosos en Deno y Brevo que eliminan notificaciones duplicadas.'
  ],
  metrics: [
   { label: 'Estado', value: 'En Producción' },
   { label: 'Arquitectura', value: 'Serverless Edge' },
   { label: 'Roles RBAC', value: '3 Niveles' }
  ]
 },
 {
  id: 'gym-access-control',
  title: 'Smart Gym Access Control & ERP',
  description: 'Sistema de gestión para gimnasios con control de acceso físico en hardware biometría ZKTeco, Cloudflare Tunnels y pasarela de pagos Bold.',
  detailedDescription: 'Plataforma web en desarrollo para la administración integral de gimnasios. Conecta controladores de acceso ZKTeco inBio Pro mediante Push SDK (protocolo iClock/ADMS) y un backend en FastAPI expuesto por Cloudflare Tunnel. Automatiza la revocación de accesos por vencimiento en tiempo real y gestiona membresías multi-rol.',
  technologies: [
   'React',
   'FastAPI',
   'Python',
   'ZKTeco Push SDK',
   'Cloudflare Tunnel',
   'Bold Payments',
   'Supabase',
   'Railway',
   'pg_cron',
   'CSS Modules'
  ],
  featured: true,
  liveUrl: 'https://platinum-center.vercel.app/',
  highlights: [
   'Integración hardware de control de acceso ZKTeco inBio Pro vía protocolo iClock/ADMS.',
   'Revocación automática de acceso en tiempo real al vencer planes utilizando pg_cron en Railway.',
   'Pasarela de pagos Bold (Nequi, DaviPlata, PSE, tarjetas) con manejo estricto de idempotencia en webhooks.',
   'Arquitectura de red segura vía Cloudflare Tunnel para sincronización con dispositivos físicos locales.'
  ],
  metrics: [
   { label: 'Estado', value: 'En Desarrollo 2026' },
   { label: 'Hardware', value: 'ZKTeco inBio Pro' },
   { label: 'Sincronización', value: 'Push SDK' }
  ]
 }
];