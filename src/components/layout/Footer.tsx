import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import Container from './Container';
import styles from './Footer.module.css';

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <Container className={styles.footer__inner}>
        <div className={styles.footer__copyright}>
          <p>© {currentYear} Jhon Delgado. Todos los derechos reservados.</p>
        </div>
        <div className={styles.footer__socials}>
          <a href="https://github.com/jsda14" target="_blank" rel="noopener noreferrer" className={styles.footer__link}>
            <Github size={18} />
            <span>GitHub</span>
          </a>
          <a href="https://linkedin.com/in/jsda14" target="_blank" rel="noopener noreferrer" className={styles.footer__link}>
            <Linkedin size={18} />
            <span>LinkedIn</span>
          </a>
          <a href="mailto:jhon@example.com" className={styles.footer__link}>
            <Mail size={18} />
            <span>Contacto</span>
          </a>
        </div>
      </Container>
    </footer>
  );
}
export default Footer;
