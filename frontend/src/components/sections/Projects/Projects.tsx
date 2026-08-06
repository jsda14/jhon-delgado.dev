import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import Container from '@/components/layout/Container';
import { useLocale } from '@/context/LocaleContext';
import { getProjectsData } from '@/services/strapi';
import type { Project } from '@/services/strapi';
import Tag from '@/components/common/Tag/Tag';
import Metric from '@/components/common/Metric/Metric';
import styles from './Projects.module.css';

const TEXTS = {
  'es-CO': {
    eyebrow: 'Trabajo selecto',
    title: <>Proyectos<br />Destacados</>,
    code: 'Código',
    demo: 'Demo'
  },
  en: {
    eyebrow: 'Featured work',
    title: <>Featured<br />Projects</>,
    code: 'Code',
    demo: 'Demo'
  }
};

export function Projects() {
  const { locale } = useLocale();
  const [data, setData] = useState<Project[] | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let isMounted = true;
    getProjectsData(locale).then(res => {
      if (isMounted) {
        setData(res);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [locale]);

  const projectsList = (data || [])
    .filter(p => p.featured)
    .sort((a, b) => a.order - b.order);

  const t = TEXTS[locale] || TEXTS['es-CO'];

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const
      }
    })
  };

  return (
    <section id="proyectos" className={styles.projects}>
      <Container>
        <div className={styles.projects__header}>
          <span className={styles.projects__eyebrow}>{t.eyebrow}</span>
          <h2 className={styles.projects__title}>{t.title}</h2>
        </div>

        <div className={styles.projects__grid}>
          {projectsList.map((project, idx) => (
            <motion.div
              key={project.id}
              custom={idx}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className={styles['project-card']}
            >
              <div className={styles['project-card__header']}>
                <h3 className={styles['project-card__title']}>{project.title}</h3>
              </div>
              <p className={styles['project-card__desc']}>{project.description}</p>

              <ul className={styles['project-card__tech-list']}>
                {project.technologies.map((tech, tIdx) => (
                  <li key={tech.id || tIdx} className={styles['project-card__tech-item']}>
                    <Tag variant={tech.variant}>{tech.label}</Tag>
                  </li>
                ))}
              </ul>

              {project.highlights && project.highlights.length > 0 && (
                <ul className={styles['project-card__highlights']}>
                  {project.highlights.map((highlight, index) => (
                    <li key={index} className={styles['project-card__highlight']}>
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}

              {project.metrics && project.metrics.length > 0 && (
                <div className={styles['project-card__metrics']}>
                  {project.metrics.map((metric, mIdx) => (
                    <Metric
                      key={metric.id || mIdx}
                      value={metric.value}
                      label={metric.label}
                    />
                  ))}
                </div>
              )}

              <div className={styles['project-card__footer']}>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles['project-card__link']}
                  >
                    <Github size={16} />
                    <span>{t.code}</span>
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles['project-card__link']}
                  >
                    <ExternalLink size={16} />
                    <span>{project.demoLabel || t.demo}</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Projects;
