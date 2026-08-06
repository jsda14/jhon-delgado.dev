
import { motion, useReducedMotion } from 'framer-motion';
import { Bot, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import Container from '@/components/layout/Container';
import styles from './AIWorkflow.module.css';

export function AIWorkflow() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="ai-workflow" className={styles['workflow-banner']}>
      <Container>
        <motion.div
          className={styles['workflow-banner__content']}
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles['workflow-banner__title-group']}>
            <Bot size={24} style={{ color: 'var(--clr-copper)' }} />
            <h2 className={styles['workflow-banner__title']}>
              AI-Native Software Engineering & Governance
            </h2>
          </div>

          <p className={styles['workflow-banner__desc']}>
           Este portafolio fue construido con flujos de trabajo de desarrollo asistido por agentes autónomos de IA (Agy y Claude Code), bajo dirección técnica estricta del desarrollador. Cada decisión de arquitectura, componente y estilo fue auditada, validada y aprobada por el autor — los agentes ejecutan, el ingeniero gobierna.

El stack refleja las mismas prácticas que aplico en producción: tipado estricto con TypeScript, arquitectura de componentes modular con CSS Modules y BEM, compilación limpia sin warnings, y revisión continua de calidad antes de cada commit.
          </p>

          <div className={styles['workflow-banner__badges']}>
            <Badge variant="blue">
              <ShieldCheck size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
              Agy Agent Rules
            </Badge>
            <Badge variant="accent">Claude Code Audit</Badge>
            <Badge variant="success">Strict BEM CSS Modules</Badge>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export default AIWorkflow;
