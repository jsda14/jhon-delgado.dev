import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '@/data/projects';
import { Badge } from '@/components/ui/Badge';
import Container from '@/components/layout/Container';
import styles from './Projects.module.css';

export function Projects() {
  const shouldReduceMotion = useReducedMotion();

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
    <section id="projects" className={styles.projects}>
      <Container>
        <div className={styles.projects__header}>
          <h2 className={styles.projects__title}>Proyectos Destacados</h2>
          <p>Soluciones industriales y de software de alto impacto construidas con rigor técnico.</p>
        </div>

        <div className={styles.projects__grid}>
          {projects.map((project, idx) => (
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
              <p className={styles['project-card__desc']}>{project.detailedDescription || project.description}</p>

              <ul className={styles['project-card__tech-list']}>
                {project.technologies.map(tech => (
                  <li key={tech} className={styles['project-card__tech-item']}>
                    <Badge variant="default">{tech}</Badge>
                  </li>
                ))}
              </ul>

              {project.highlights && (
                <ul className={styles['project-card__highlights']}>
                  {project.highlights.map((highlight, index) => (
                    <li key={index} className={styles['project-card__highlight']}>
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}

              {project.metrics && (
                <div className={styles['project-card__metrics']}>
                  {project.metrics.map(metric => (
                    <div key={metric.label} className={styles['project-card__metric']}>
                      <span className={styles['project-card__metric-value']}>{metric.value}</span>
                      <span className={styles['project-card__metric-label']}>{metric.label}</span>
                    </div>
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
                    <span>Código</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles['project-card__link']}
                  >
                    <ExternalLink size={16} />
                    <span>Demo</span>
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
