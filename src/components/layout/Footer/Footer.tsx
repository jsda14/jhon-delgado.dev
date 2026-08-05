import React from 'react';
import Container from '@/components/layout/Container';
import styles from './Footer.module.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container className={styles.footer__content}>
        <div className={styles.footer__copyright}>
          <p>© {currentYear} — Construido por <span className={styles['footer__copyright-highlight']}>Jhon Delgado</span></p>
        </div>
        <nav>
          <ul className={styles.footer__menu}>
            <li>
              <a href="#projects" className={styles.footer__link}>Proyectos</a>
            </li>
            <li>
              <a href="#experience" className={styles.footer__link}>Experiencia</a>
            </li>
            <li>
              <a href="#stack" className={styles.footer__link}>Stack</a>
            </li>
          </ul>
        </nav>
      </Container>
    </footer>
  );
}

export default Footer;
