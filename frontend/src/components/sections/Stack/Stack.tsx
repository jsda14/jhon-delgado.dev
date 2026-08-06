
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

  const groups = [
    { key: 'frontend', title: 'Frontend Development' },
    { key: 'backend-ai', title: 'IA & Backend Integration' },
    { key: 'cloud', title: 'Cloud & DevOps' },
    { key: 'practices', title: 'Buenas Prácticas' }
  ];

  return (
    <section id="stack" className={styles.stack}>
      <Container>
        <div className={styles.stack__header}>
          <span className={styles.stack__eyebrow}>Herramientas de trabajo</span>
          <h2 className={styles.stack__title}>Ecosistema<br />& Tech Stack</h2>
        </div>

        <div className={styles.stack__grid}>
          {groups.map((group) => {
            const skills = techStack.filter(skill => skill.category === group.key);
            return (
              <div key={group.key} className={styles['stack-group']}>
                <h3 className={styles['stack-group__title']}>{group.title}</h3>
                <ul className={styles['stack-group__list']}>
                  {skills.map((skill) => {
                    const IconComponent = iconMap[skill.iconName || 'Terminal'] || Terminal;
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
