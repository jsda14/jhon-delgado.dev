import React from 'react';
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
            <Bot size={24} style={{ color: 'var(--color-accent-blue)' }} />
            <h2 className={styles['workflow-banner__title']}>
              AI-Native Software Engineering & Governance
            </h2>
          </div>

          <p className={styles['workflow-banner__desc']}>
            Este portafolio ha sido maquetado y optimizado utilizando flujos de trabajo asistidos por agentes autónomos de Inteligencia Artificial (Agy y Claude Code). El desarrollo se rige estrictamente por directrices técnicas detalladas en `.specs/`, validación continua de tipado estricto con TypeScript, compilación limpia y una metodología de estilos BEM completamente modular.
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
