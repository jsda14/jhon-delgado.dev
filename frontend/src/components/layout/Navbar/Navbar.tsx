import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import clsx from 'clsx';
import Container from '@/components/layout/Container';
import { useTheme } from '@/hooks/useTheme';
import styles from './Navbar.module.css';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className={clsx(styles.navbar, scrolled && styles['navbar--scrolled'])}>
      <Container className={styles.navbar__inner}>
        <a href="#" className={styles.navbar__logo} onClick={closeMenu}>
          <span className={styles['navbar__logo-mark']}>jd</span>
          <span className={styles['navbar__logo-dot']}>/</span>
          <span className={styles['navbar__logo-domain']}>dev</span>
        </a>

        <nav className={styles.navbar__nav} aria-label="Navegación principal">
          <ul className={clsx(styles.navbar__menu, isOpen && styles['navbar__menu--open'])}>
            {['Proyectos', 'Experiencia', 'Stack', 'Contacto'].map((label) => (
              <li key={label} className={styles.navbar__item}>
                <a
                  href={`#${label.toLowerCase()}`}
                  className={styles.navbar__link}
                  onClick={closeMenu}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.navbar__controls}>
            <button
              className={styles.navbar__theme}
              onClick={toggle}
              aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            <button
              onClick={() => setIsOpen(o => !o)}
              className={styles.navbar__toggle}
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Navbar;
