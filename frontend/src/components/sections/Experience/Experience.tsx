import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { experiences } from '@/data/experience';
import { Badge } from '@/components/ui/Badge';
import Container from '@/components/layout/Container';
import styles from './Experience.module.css';

export function Experience() {
  const shouldReduceMotion = useReducedMotion();

  const itemVariants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -20 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.15,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const
      }
    })
  };

  return (
    <section id="experiencia" className={styles.experience}>
      <Container narrow>
        <div className={styles.experience__header}>
          <span className={styles.experience__eyebrow}>4+ años en producción</span>
          <h2 className={styles.experience__title}>Trayectoria<br />Profesional</h2>
        </div>

        <div className={styles.experience__timeline}>
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              className={styles['timeline-item']}
              custom={idx}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className={styles['timeline-item__marker']} />
              <div className={styles['timeline-item__card']}>
                <div className={styles['timeline-item__header']}>
                  <div>
                    <h3 className={styles['timeline-item__role']}>{exp.role}</h3>
                    {exp.companyUrl ? (
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles['timeline-item__company']}
                      >
                        {exp.company}
                      </a>
                    ) : (
                      <span className={styles['timeline-item__company']}>{exp.company}</span>
                    )}
                  </div>
                  <div className={styles['timeline-item__period-group']}>
                    <span className={styles['timeline-item__period']}>{exp.period}</span>
                    {exp.location && (
                      <span className={styles['timeline-item__location']}>{exp.location}</span>
                    )}
                  </div>
                </div>

                <p className={styles['timeline-item__desc']}>{exp.description}</p>

                <ul className={styles['timeline-item__achievements']}>
                  {exp.achievements.map((ach, i) => (
                    <li key={i} className={styles['timeline-item__achievement']}>
                      {ach}
                    </li>
                  ))}
                </ul>

                <div className={styles['timeline-item__techs']}>
                  {exp.technologies.map(tech => (
                    <Badge key={tech} variant="accent">{tech}</Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Experience;
