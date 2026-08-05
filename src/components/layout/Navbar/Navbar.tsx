import React, { useState } from 'react';
import { Terminal, Menu, X } from 'lucide-react';
import clsx from 'clsx';
import Container from '@/components/layout/Container';
import styles from './Navbar.module.css';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className={styles.navbar}>
      <Container className={styles.navbar__inner}>
        <a href="#" className={styles.navbar__logo} onClick={closeMenu}>
          <Terminal size={20} className={styles['navbar__logo-highlight']} />
          <span>jhon<span className={styles['navbar__logo-highlight']}>-</span>delgado.dev</span>
        </a>
        
        <nav className={styles.navbar__nav}>
          <button
            onClick={toggleMenu}
            className={styles.navbar__toggle}
            aria-label={isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <ul className={clsx(styles.navbar__menu, isOpen && styles['navbar__menu--open'])}>
            <li className={styles.navbar__item}>
              <a href="#projects" className={styles.navbar__link} onClick={closeMenu}>Proyectos</a>
            </li>
            <li className={styles.navbar__item}>
              <a href="#experience" className={styles.navbar__link} onClick={closeMenu}>Experiencia</a>
            </li>
            <li className={styles.navbar__item}>
              <a href="#stack" className={styles.navbar__link} onClick={closeMenu}>Stack</a>
            </li>
            <li className={styles.navbar__item}>
              <a href="#contacto" className={styles.navbar__link} onClick={closeMenu}>Contacto</a>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Navbar;
