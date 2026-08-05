import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { experiences } from '@/data/experience';
import { Card } from '@/components/ui/Card';
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
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <section id="experience" className={styles.experience}>
      <Container narrow>
        <h2>Experiencia Laboral</h2>
        <p>Mi trayectoria profesional liderando y construyendo productos web.</p>

        <div className={styles.experience__timeline}>
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              className={styles.experience__item}
              custom={idx}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className={styles['experience__item-marker']} />
              <Card>
                <div className={styles['experience__item-header']}>
                  <div>
                    <h3 className={styles['experience__item-role']}>{exp.role}</h3>
                    {exp.companyUrl ? (
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles['experience__item-company']}
                      >
                        {exp.company}
                      </a>
                    ) : (
                      <span className={styles['experience__item-company']}>{exp.company}</span>
                    )}
                  </div>
                  <span className={styles['experience__item-period']}>{exp.period}</span>
                </div>

                <p className={styles['experience__item-desc']}>{exp.description}</p>

                <ul className={styles['experience__item-achievements']}>
                  {exp.achievements.map((ach, i) => (
                    <li key={i} className={styles['experience__item-achievement']}>
                      {ach}
                    </li>
                  ))}
                </ul>

                <div className={styles['experience__item-techs']}>
                  {exp.technologies.map(tech => (
                    <Badge key={tech} variant="accent">{tech}</Badge>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
export default Experience;
