import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import Container from '@/components/layout/Container';
import styles from './AIWorkflow.module.css';

interface WorkflowStep {
  stepNumber: string;
  title: string;
  description: string;
}

const steps: WorkflowStep[] = [
  {
    stepNumber: '01',
    title: 'Contexto de Especificaciones',
    description: 'Los agentes de IA (Agy y Claude Code) leen obligatoriamente el directorio `.specs/` antes de escribir o modificar código para alinearse con los límites técnicos del proyecto.'
  },
  {
    stepNumber: '02',
    title: 'Validación de Compilación',
    description: 'Se requiere validar localmente mediante `npm run build` o `tsc --noEmit` que las declaraciones de TypeScript no presenten ningún error de tipado o interfaces.'
  },
  {
    stepNumber: '03',
    title: 'Estructuración BEM y CSS',
    description: 'Los estilos se declaran aisladamente en CSS Modules, garantizando una arquitectura CSS limpia con nomenclatura BEM súper estricta.'
  },
  {
    stepNumber: '04',
    title: 'Accesibilidad & Performance',
    description: 'Priorización estricta de velocidad de carga Lighthouse 100/100, semántica estructurada de HTML5 y cumplimiento estricto de los estándares WCAG AA.'
  }
];

export function AIWorkflow() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="ai-workflow" className={styles['ai-workflow']}>
      <Container>
        <h2>Gobernanza & Workflow de IA</h2>
        <p>Protocolos técnicos de desarrollo aplicados por agentes autónomos de inteligencia artificial en este portafolio.</p>

        <div className={styles['ai-workflow__grid']}>
          {steps.map((step, index) => (
            <motion.div
              key={step.stepNumber}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className={styles['ai-workflow__card']}>
                <span className={styles['ai-workflow__card-number']}>{step.stepNumber}</span>
                <h3 className={styles['ai-workflow__card-title']}>{step.title}</h3>
                <p className={styles['ai-workflow__card-desc']}>{step.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
export default AIWorkflow;
