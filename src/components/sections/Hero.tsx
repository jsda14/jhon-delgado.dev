import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Bot } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import Container from '@/components/layout/Container';
import styles from './Hero.module.css';

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className={styles.hero}>
      <Container>
        <motion.div
          className={styles.hero__content}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className={styles['hero__badge-container']} variants={itemVariants}>
            <Badge variant="success">
              <span style={{ display: 'inline-block', width: '6px', height: '6px', backgroundColor: 'currentColor', borderRadius: '50%', marginRight: '4px' }}></span>
              Disponible para Proyectos
            </Badge>
          </motion.div>

          <motion.h1 className={styles.hero__title} variants={itemVariants}>
            Ingeniería de Software de Alto Impacto & <span className={styles['hero__title--gradient']}>Gobernanza de IA</span>
          </motion.h1>

          <motion.p className={styles.hero__subtitle} variants={itemVariants}>
            Especialista en Frontend de alto rendimiento. Diseño arquitecturas modulares y eficientes con una integración responsable de flujos de trabajo autónomos mediante agentes de IA.
          </motion.p>

          <motion.div className={styles.hero__actions} variants={itemVariants}>
            <Button variant="primary" onClick={() => document.getElementById('projects')?.scrollIntoView()}>
              <span>Ver Proyectos</span>
              <ArrowRight size={16} />
            </Button>
            <Button variant="secondary" onClick={() => document.getElementById('ai-workflow')?.scrollIntoView()}>
              <Bot size={16} />
              <span>Gobernanza IA</span>
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
export default Hero;
