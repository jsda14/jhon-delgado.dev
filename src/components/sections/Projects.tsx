import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '@/data/projects';
import { Card } from '@/components/ui/Card';
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
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <section id="projects" className={styles.projects}>
      <Container>
        <h2>Proyectos Destacados</h2>
        <p>Soluciones técnicas complejas diseñadas con rigurosidad arquitectónica.</p>

        <div className={styles.projects__grid}>
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              custom={idx}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              style={{ height: '100%' }}
            >
              <Card featured={project.featured} className={styles.projects__card}>
                <div className={styles['projects__card-header']}>
                  <h3 className={styles['projects__card-title']}>{project.title}</h3>
                </div>
                <p className={styles['projects__card-desc']}>{project.description}</p>

                <div className={styles['projects__card-tags']}>
                  {project.technologies.map(tech => (
                    <Badge key={tech} variant="default">{tech}</Badge>
                  ))}
                </div>

                {project.metrics && (
                  <div className={styles.projects__metrics}>
                    {project.metrics.map(metric => (
                      <div key={metric.label} className={styles.projects__metric}>
                        <span className={styles['projects__metric-value']}>{metric.value}</span>
                        <span className={styles['projects__metric-label']}>{metric.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className={styles['projects__card-footer']}>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles['projects__card-link']}
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
                      className={styles['projects__card-link']}
                    >
                      <ExternalLink size={16} />
                      <span>Demo en Vivo</span>
                    </a>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
export default Projects;
