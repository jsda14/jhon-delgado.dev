import Container from '@/components/layout/Container';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
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
        ease: [0.16, 1, 0.3, 1] as const,
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
          <motion.div className={styles.hero__badge} variants={itemVariants}>
            <span className={styles['hero__badge-indicator']} />
            <span>Disponible para Proyectos</span>
          </motion.div>

          <motion.h1 className={styles.hero__title} variants={itemVariants}>
            Jhon Delgado — <span className={styles['hero__title-gradient']}>Full-Stack & AI Integration Engineer</span>
          </motion.h1>

          <motion.p className={styles.hero__subtitle} variants={itemVariants}>
            Ingeniero con más de 4 años de experiencia construyendo interfaces web de alto rendimiento, arquitecturas backend robustas y agentes autónomos con Inteligencia Artificial.
          </motion.p>

          <motion.div className={styles.hero__actions} variants={itemVariants}>
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className={`${styles.hero__btn} ${styles['hero__btn--primary']}`}
            >
              <span>Ver Proyectos</span>
              <ArrowRight size={16} />
            </button>
            <a
              href="/cv.pdf"
              download
              className={`${styles.hero__btn} ${styles['hero__btn--secondary']}`}
            >
              <Download size={16} />
              <span>Descargar CV</span>
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

export default Hero;
