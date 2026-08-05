# Guía de Estilos y Sistema de Diseño (CSS Modules, BEM & Framer Motion)

Este documento establece las especificaciones estéticas, tokens de diseño y reglas de animación del portafolio. Toda la arquitectura de estilos se implementará utilizando **CSS Modules** con la metodología **BEM (Block Element Modifier)** súper estricta, prescindiendo totalmente de Tailwind CSS.

---

## 1. Metodología BEM Súper Estricta

Para mantener estilos predecibles, evitar colisiones globales y estructurar clases legibles, se impone el uso de la convención de nomenclatura BEM junto con CSS Modules.

### 1.1 Reglas de Nomenclatura
* **Bloque (`.bloque`):** Representa el componente de nivel superior.
  * *Ejemplo:* `.tarjeta`, `.proyecto-tarjeta`, `.boton`
* **Elemento (`.bloque__elemento`):** Una parte interna del bloque que no tiene significado autónomo. Se une con doble guion bajo (`__`).
  * *Ejemplo:* `.tarjeta__titulo`, `.proyecto-tarjeta__contenedor-imagen`, `.boton__icono`
* **Modificador (`.bloque--modificador` o `.bloque__elemento--modificador`):** Define variaciones en el aspecto o comportamiento de un bloque o elemento. Se une con doble guion medio (`--`).
  * *Ejemplo:* `.tarjeta--destacada`, `.boton--secundario`, `.boton__icono--rotado`

### 1.2 Integración con CSS Modules
* Todos los componentes deben usar archivos `.module.css`.
* Las clases BEM se definen en el archivo `.module.css` y se inyectan en el componente React como propiedades del objeto importado `styles`.
* Para combinar clases dinámicas (como modificadores condicionales) se utilizará la librería `clsx`.

```typescript
// ❌ INCORRECTO: Estilos directos globales o sin convención BEM
import './Tarjeta.css';
export function Tarjeta({ esDestacada }) {
  return <div className={`tarjeta ${esDestacada ? 'destacada' : ''}`}>...</div>;
}

//  CORRECTO: CSS Modules con BEM y clsx
import styles from './Tarjeta.module.css';
import clsx from 'clsx';

interface TarjetaProps {
  esDestacada?: boolean;
}

export function Tarjeta({ esDestacada }: TarjetaProps) {
  return (
    <div className={clsx(styles.tarjeta, esDestacada && styles['tarjeta--destacada'])}>
      <h3 className={styles.tarjeta__titulo}>Título de la Tarjeta</h3>
      <p className={styles.tarjeta__descripcion}>Cuerpo de texto...</p>
    </div>
  );
}
```

### 1.3 Reglas de Anidamiento de CSS
* Con CSS Modules no es necesario anidar selectores de forma excesiva.
* **Límite de Anidamiento:** Máximo 1 nivel de anidamiento para pseudo-clases o estados (`:hover`, `:focus`, `:active`, `::before`) o selectores de contexto específicos. Evita anidar selectores de clase (ej. `.tarjeta .tarjeta__titulo`) porque CSS Modules ya garantiza la unicidad.

---

## 2. Design Tokens y CSS Variables (`src/styles/variables.css`)

Todos los valores de diseño (colores, fuentes, espaciados, bordes) deben definirse como variables CSS globales dentro del pseudo-selector `:root`.

### 2.1 Colores (Dark Theme Premium)
* **Fondo Primario:** `--color-bg-primary: #020617;` (Slate 950)
* **Fondo Secundario:** `--color-bg-secondary: #0f172a;` (Slate 900)
* **Fondo Terciario / Bordes:** `--color-bg-border: #1e293b;` (Slate 800)
* **Texto Primario:** `--color-text-primary: #f8fafc;` (Slate 50)
* **Texto Secundario:** `--color-text-secondary: #94a3b8;` (Slate 400)
* **Texto Mutado:** `--color-text-muted: #64748b;` (Slate 500)
* **Acento Neon Blue:** `--color-accent-blue: #06b6d4;` (Neon Blue)
* **Acento Indigo:** `--color-accent-indigo: #6366f1;` (Indigo)
* **Acento Emerald (Status):** `--color-status-success: #10b981;` (Emerald)

### 2.2 Escala Tipográfica (Estilo Técnico)
* `--font-primary: 'Inter', -apple-system, sans-serif;`
* `--font-mono: 'Fira Code', 'Geist Mono', monospace;`
* `--text-xs: 0.75rem;`
* `--text-sm: 0.875rem;`
* `--text-md: 1rem;`
* `--text-lg: 1.125rem;`
* `--text-xl: 1.25rem;`
* `--text-2xl: 1.5rem;`
* `--text-3xl: 1.875rem;`
* `--text-4xl: 2.25rem;`
* `--text-5xl: 3rem;`

### 2.3 Radios de Borde, Sombras y Transiciones
* `--radius-sm: 4px;`
* `--radius-md: 8px;`
* `--radius-lg: 12px;`
* `--radius-full: 9999px;`
* `--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);`
* `--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);`
* `--shadow-accent-indigo: 0 10px 15px -3px rgba(99, 102, 241, 0.15);`
* `--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);`
* `--transition-normal: 300ms cubic-bezier(0.4, 0, 0.2, 1);`

---

## 3. Animaciones con Framer Motion y Accesibilidad

Las transiciones deben ser suaves y sutiles, mejorando la experiencia del portafolio interactivo.

### 3.1 Integración de Animaciones
* Utiliza los componentes `motion` de `framer-motion` para interactividad de hover, foco y scroll.
* Respeta la preferencia `prefers-reduced-motion` utilizando el hook `useReducedMotion` de `framer-motion`.

```typescript
import { motion, useReducedMotion } from 'framer-motion';
import styles from './TarjetaInteractiva.module.css';

export function TarjetaInteractiva({ children }) {
  const shouldReduceMotion = useReducedMotion();

  const hoverAnimation = shouldReduceMotion 
    ? {} 
    : { y: -4, scale: 1.02 };

  return (
    <motion.div
      className={styles['tarjeta-interactiva']}
      whileHover={hoverAnimation}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}
```
