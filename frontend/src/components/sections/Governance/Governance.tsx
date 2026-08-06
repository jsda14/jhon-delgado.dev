import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Bot, ShieldCheck } from 'lucide-react';
import Container from '@/components/layout/Container';
import { useLocale } from '@/context/LocaleContext';
import { getGovernanceData } from '@/services/strapi';
import type { GovernanceData } from '@/services/strapi';
import { Tag } from '@/components/common/Tag/Tag';
import styles from './Governance.module.css';

export function Governance() {
  const { locale } = useLocale();
  const [data, setData] = useState<GovernanceData | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let isMounted = true;
    getGovernanceData(locale).then(res => {
      if (isMounted) {
        setData(res);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [locale]);

  const currentData: GovernanceData = data || {
    title: 'AI-Native Software Engineering & Governance',
    description: locale === 'es-CO'
      ? 'Este portafolio fue construido con flujos de trabajo de desarrollo asistido por agentes autónomos de IA (Agy y Claude Code), bajo dirección técnica estricta del desarrollador. Cada decisión de arquitectura, componente y estilo fue auditada, validada y aprobada por el autor — los agentes ejecutan, el ingeniero gobierna.\n\nEl stack refleja las mismas prácticas que aplico en producción: tipado estricto con TypeScript, arquitectura de componentes modular con CSS Modules y BEM, compilación limpia sin warnings, y revisión continua de calidad antes de cada commit.'
      : 'This portfolio was built using autonomous AI agent-assisted workflows (Agy and Claude Code), under the strict technical direction of the developer. Every architectural decision, component, and style was audited, validated, and approved by the author — agents execute, the engineer governs.\n\nThe stack reflects the same practices I apply in production: strict typing with TypeScript, modular component architecture with CSS Modules and BEM, clean warning-free compilation, and continuous quality checks before every commit.',
    badges: [
      { label: 'Agy Agent Rules', variant: 'blue' },
      { label: 'Claude Code Audit', variant: 'primary' },
      { label: 'Strict BEM CSS Modules', variant: 'success' }
    ]
  };

  return (
    <section id="ai-workflow" className={styles.governance}>
      <Container>
        <motion.div
          className={styles.governance__content}
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles['governance__title-group']}>
            <Bot size={24} style={{ color: 'var(--clr-copper)' }} />
            <h2 className={styles.governance__title}>
              {currentData.title}
            </h2>
          </div>

          <p className={styles.governance__desc}>
            {currentData.description}
          </p>

          <div className={styles.governance__badges}>
            {currentData.badges.map((badge, idx) => (
              <Tag key={badge.id || idx} variant={badge.variant}>
                <ShieldCheck size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                {badge.label}
              </Tag>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export default Governance;
