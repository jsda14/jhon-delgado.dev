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
