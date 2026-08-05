import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Layers,
  FileCode2,
  Palette,
  Sparkles,
  Cpu,
  Terminal,
  Bot,
  Database,
  Box,
  Cloud,
  GitBranch,
  Wrench,
  Accessibility,
  CheckCircle
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { techStack } from '@/data/stack';
import Container from '@/components/layout/Container';
import styles from './Stack.module.css';

// Dynamic Icon Mapper helper
const iconMap: Record<string, LucideIcon> = {
  React: Layers,
  FileCode2: FileCode2,
  Palette: Palette,
  Sparkles: Sparkles,
  Layers: Layers,
  Cpu: Cpu,
  Terminal: Terminal,
  Bot: Bot,
  Database: Database,
  Container: Box,
  Cloud: Cloud,
  GitBranch: GitBranch,
  Wrench: Wrench,
  Accessibility: Accessibility,
  CheckCircle: CheckCircle
};

export function Stack() {
  const shouldReduceMotion = useReducedMotion();

  const categories = [
    { key: 'frontend', title: 'Frontend Development' },
    { key: 'backend-ai', title: 'IA & Backend Integration' },
    { key: 'cloud', title: 'Cloud & DevOps' },
    { key: 'practices', title: 'Buenas Prácticas' }
  ];

  return (
    <section id="stack" className={styles.stack}>
      <Container>
        <h2>Stack Tecnológico</h2>
        <p>Herramientas y metodologías que utilizo para materializar soluciones digitales de alto nivel.</p>

        <div className={styles.stack__categories}>
          {categories.map((cat) => {
            const skills = techStack.filter(skill => skill.category === cat.key);
            return (
              <div key={cat.key} className={styles.stack__category}>
                <h3 className={styles['stack__category-title']}>{cat.title}</h3>
                <div className={styles.stack__grid}>
                  {skills.map((skill) => {
                    const IconComponent = iconMap[skill.iconName || 'Terminal'] || Terminal;
                    return (
                      <div key={skill.id} className={styles.stack__item}>
                        <div className={styles['stack__item-icon-wrapper']}>
                          <IconComponent size={20} />
                        </div>
                        <div className={styles['stack__item-details']}>
                          <div className={styles['stack__item-header']}>
                            <span className={styles['stack__item-name']}>{skill.name}</span>
                            <span className={styles['stack__item-percent']}>{skill.level}%</span>
                          </div>
                          <div className={styles['stack__item-level-bar']}>
                            <motion.div
                              className={styles['stack__item-level-fill']}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: shouldReduceMotion ? 0 : 0.8, ease: 'easeOut' }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
export default Stack;
