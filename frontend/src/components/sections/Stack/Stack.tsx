import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import * as Icons from 'lucide-react';
import Container from '@/components/layout/Container';
import { useLocale } from '@/context/LocaleContext';
import { getSkillsData } from '@/services/strapi';
import type { Skill } from '@/services/strapi';
import styles from './Stack.module.css';

const TEXTS = {
  'es-CO': {
    eyebrow: 'Herramientas de trabajo',
    title: <>Ecosistema<br />& Tech Stack</>,
    categories: {
      frontend: 'Desarrollo Frontend',
      'backend-ai': 'IA e Integración Backend',
      cloud: 'Nube y DevOps',
      practices: 'Buenas Prácticas'
    }
  },
  en: {
    eyebrow: 'Core tech stack',
    title: <>Ecosystem<br />& Tech Stack</>,
    categories: {
      frontend: 'Frontend Development',
      'backend-ai': 'AI & Backend Integration',
      cloud: 'Cloud & DevOps',
      practices: 'Engineering Practices'
    }
  }
};

export function Stack() {
  const { locale } = useLocale();
  const [data, setData] = useState<Skill[] | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let isMounted = true;
    getSkillsData().then(res => {
      if (isMounted) {
        setData(res);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [locale]);

  const skillsList = data || [];
  const t = TEXTS[locale] || TEXTS['es-CO'];

  const groups = [
    { key: 'frontend' as const, title: t.categories.frontend },
    { key: 'backend-ai' as const, title: t.categories['backend-ai'] },
    { key: 'cloud' as const, title: t.categories.cloud },
    { key: 'practices' as const, title: t.categories.practices }
  ];

  return (
    <section id="stack" className={styles.stack}>
      <Container>
        <div className={styles.stack__header}>
          <span className={styles.stack__eyebrow}>{t.eyebrow}</span>
          <h2 className={styles.stack__title}>{t.title}</h2>
        </div>

        <div className={styles.stack__grid}>
          {groups.map((group) => {
            const skills = skillsList
              .filter(skill => skill.category === group.key)
              .sort((a, b) => a.order - b.order);

            return (
              <div key={group.key} className={styles['stack-group']}>
                <h3 className={styles['stack-group__title']}>{group.title}</h3>
                <ul className={styles['stack-group__list']}>
                  {skills.map((skill) => {
                    // Cargar el icono dinámicamente usando el mapa general de lucide-react
                    const IconComponent = (Icons as any)[skill.iconName] || Icons.Terminal;

                    return (
                      <li key={skill.id} className={styles['stack-item']}>
                        <div className={styles['stack-item__icon']}>
                          <IconComponent size={18} />
                        </div>
                        <div className={styles['stack-item__details']}>
                          <div className={styles['stack-item__header']}>
                            <span className={styles['stack-item__name']}>{skill.name}</span>
                            <span className={styles['stack-item__level-pct']}>
                              {skill.level}%
                            </span>
                          </div>
                          <div className={styles['stack-item__level-bar']}>
                            <motion.div
                              className={styles['stack-item__level-fill']}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: shouldReduceMotion ? 0 : 0.8, ease: 'easeOut' }}
                            />
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default Stack;
