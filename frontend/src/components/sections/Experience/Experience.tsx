import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Container from '@/components/layout/Container';
import { useLocale } from '@/context/LocaleContext';
import { getExperienceData } from '@/services/strapi';
import type { Experience } from '@/services/strapi';
import Tag from '@/components/common/Tag/Tag';
import styles from './Experience.module.css';

const TEXTS = {
  'es-CO': {
    eyebrow: '4+ años en producción',
    title: <>Trayectoria<br />Profesional</>
  },
  en: {
    eyebrow: '4+ years in production',
    title: <>Professional<br />Experience</>
  }
};

export function Experience() {
  const { locale } = useLocale();
  const [data, setData] = useState<Experience[] | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let isMounted = true;
    getExperienceData(locale).then(res => {
      if (isMounted) {
        setData(res);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [locale]);

  const experienceList = (data || []).sort((a, b) => a.order - b.order);
  const t = TEXTS[locale] || TEXTS['es-CO'];

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
          <span className={styles.experience__eyebrow}>{t.eyebrow}</span>
          <h2 className={styles.experience__title}>{t.title}</h2>
        </div>

        <div className={styles.experience__timeline}>
          {experienceList.map((exp, idx) => (
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
                    <span className={styles['timeline-item__company']}>{exp.company}</span>
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
                  {exp.technologies.map((tech, tIdx) => (
                    <Tag key={tech.id || tIdx} variant={tech.variant}>
                      {tech.label}
                    </Tag>
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
