import React from 'react';
import { Terminal } from 'lucide-react';
import Container from '@/components/layout/Container';
import styles from './Navbar.module.css';

export function Navbar() {
  return (
    <header className={styles.navbar}>
      <Container className={styles.navbar__inner}>
        <a href="#" className={styles.navbar__logo}>
          <Terminal size={20} className={styles['navbar__logo-highlight']} />
          <span>jhon<span className={styles['navbar__logo-highlight']}>-</span>delgado.dev</span>
        </a>
        <nav>
          <ul className={styles.navbar__menu}>
            <li className={styles.navbar__item}>
              <a href="#projects" className={styles.navbar__link}>Proyectos</a>
            </li>
            <li className={styles.navbar__item}>
              <a href="#experience" className={styles.navbar__link}>Experiencia</a>
            </li>
            <li className={styles.navbar__item}>
              <a href="#stack" className={styles.navbar__link}>Stack</a>
            </li>
            <li className={styles.navbar__item}>
              <a href="#contacto" className={styles.navbar__link}>Contacto</a>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Navbar;
