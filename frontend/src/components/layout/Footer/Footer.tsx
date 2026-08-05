import React from 'react';
import Container from '@/components/layout/Container';
import styles from './Footer.module.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container className={styles.footer__content}>
        <div>
          <p className={styles.footer__brand}>
            jd<span className={styles['footer__brand-highlight']}>/</span>dev
          </p>
          <p className={styles.footer__copyright}>© {currentYear} Jhon Delgado</p>
        </div>
        <nav>
          <ul className={styles.footer__menu}>
            <li>
              <a href="#proyectos" className={styles.footer__link}>Proyectos</a>
            </li>
            <li>
              <a href="#experiencia" className={styles.footer__link}>Experiencia</a>
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
