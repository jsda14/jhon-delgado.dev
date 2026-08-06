import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, Download } from 'lucide-react';
import Container from '@/components/layout/Container';
import { useLocale } from '@/context/LocaleContext';
import { getProfileData, getStrapiMediaUrl } from '@/services/strapi';
import type { Profile } from '@/services/strapi';
import styles from './Footer.module.css';

const TEXTS = {
  'es-CO': {
    navigation: 'Navegación',
    proyectos: 'Proyectos',
    experiencia: 'Experiencia',
    stack: 'Stack',
    contact: 'Contacto',
    downloadCv: 'Descargar CV',
    copyright: 'Todos los derechos reservados.'
  },
  en: {
    navigation: 'Navigation',
    proyectos: 'Projects',
    experiencia: 'Experience',
    stack: 'Stack',
    contact: 'Contact',
    downloadCv: 'Download CV',
    copyright: 'All rights reserved.'
  }
};

interface FooterProps {
  onOpenContact: () => void;
}

export function Footer({ onOpenContact }: FooterProps) {
  const { locale } = useLocale();
  const [profile, setProfile] = useState<Profile | null>(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    let isMounted = true;
    getProfileData(locale).then(res => {
      if (isMounted) {
        setProfile(res);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [locale]);

  const currentProfile: Profile = profile || {
    headline: 'Jhon Delgado — Full-Stack & AI Integration Engineer',
    bio: locale === 'es-CO'
      ? 'Desarrollador Full-Stack e Ingeniero de Integración de IA con más de 4 años de trayectoria creando productos de software robustos, con arquitectura limpia y listos para producción.'
      : 'Full-Stack Developer and AI Integration Engineer with over 4 years of experience building robust, clean architecture, production-ready software products.',
    email: 'jsda14@gmail.com',
    linkedinUrl: 'https://linkedin.com/in/jsda14',
    githubUrl: 'https://github.com/jsda14',
    resumePdf: locale === 'es-CO' ? '/cv.pdf' : '/cv-en.pdf'
  };

  const t = TEXTS[locale] || TEXTS['es-CO'];

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footer__grid}>
          {/* Columna 1: Branding y Bio */}
          <div>
            <a href="#" className={styles.footer__brand}>
              jd<span className={styles['footer__brand-highlight']}>/</span>dev
            </a>
            <p className={styles.footer__headline}>{currentProfile.headline}</p>
            <p className={styles.footer__bio}>{currentProfile.bio}</p>
          </div>

          {/* Columna 2: Navegación */}
          <div>
            <h3 className={styles.footer__title}>{t.navigation}</h3>
            <ul className={styles.footer__menu}>
              <li>
                <a href="#proyectos" className={styles.footer__link}>{t.proyectos}</a>
              </li>
              <li>
                <a href="#experiencia" className={styles.footer__link}>{t.experiencia}</a>
              </li>
              <li>
                <a href="#stack" className={styles.footer__link}>{t.stack}</a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Contacto y Enlaces */}
          <div className={styles.footer__contact}>
            <h3 className={styles.footer__title}>{t.contact}</h3>
            <a
              href={`mailto:${currentProfile.email}`}
              className={styles.footer__email}
              onClick={(e) => {
                e.preventDefault();
                onOpenContact();
              }}
            >
              {currentProfile.email}
            </a>
            <div className={styles.footer__socials}>
              <a
                href={currentProfile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles['footer__social-btn']}
                aria-label="GitHub"
              >
                <Github size={16} />
              </a>
              <a
                href={currentProfile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles['footer__social-btn']}
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={`mailto:${currentProfile.email}`}
                className={styles['footer__social-btn']}
                aria-label="Email"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenContact();
                }}
              >
                <Mail size={16} />
              </a>
            </div>
            {currentProfile.resumePdf && (
              <a
                href={getStrapiMediaUrl(currentProfile.resumePdf)}
                target="_blank"
                rel="noopener noreferrer"
                download
                className={styles['footer__cv-btn']}
              >
                <Download size={14} />
                <span>{t.downloadCv}</span>
              </a>
            )}
          </div>
        </div>

        {/* Barra inferior */}
        <div className={styles.footer__bottom}>
          <p className={styles.footer__copyright}>
            © {currentYear} Jhon Delgado. {t.copyright}
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
