import React from 'react';
import { Terminal } from 'lucide-react';
import Container from './Container';
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
            <li>
              <a href="#projects" className={styles.navbar__link}>Proyectos</a>
            </li>
            <li>
              <a href="#experience" className={styles.navbar__link}>Experiencia</a>
            </li>
            <li>
              <a href="#stack" className={styles.navbar__link}>Tecnologías</a>
            </li>
            <li>
              <a href="#ai-workflow" className={styles.navbar__link}>Gobernanza IA</a>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
export default Navbar;
