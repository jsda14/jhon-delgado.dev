# Guía de Estilos y Sistema de Diseño (Tailwind v4 & Framer Motion)

Este documento establece las especificaciones estéticas, tokens de diseño y reglas de animación. El portafolio debe presentar un aspecto premium, limpio y de alto impacto, inspirado en la estética de Vercel, Linear y Shadcn UI.

---

## 1. Tokens de Diseño y Paleta de Colores (Dark Theme)

El diseño del portafolio se centrará principalmente en un **Tema Oscuro** de alta gama, que reduce la fatiga visual y proyecta un ambiente tecnológico profesional.

### 1.1 Colores Base y Superficies
* **Background Primario:** Slate 950 (`#020617`) o Zinc 950 (`#09090b`). Ofrece un fondo negro profundo satinado.
* **Background Secundario / Contenedores:** Slate 900 (`#0f172a`) o Zinc 900 (`#18181b`) con bordes sutiles en Zinc 800 (`#27272a`).
* **Texto Primario:** Slate 50 / Zinc 50 (`#f8fafc` / `#fafafa`). Máxima claridad para títulos y contenido de alta relevancia.
* **Texto Secundario / Cuerpo:** Slate 400 / Zinc 400 (`#94a3b8` / `#a1a1aa`). Legible pero atenuado para jerarquía visual.
* **Texto Mutado:** Slate 500 / Zinc 500. Reservado para fechas, descripciones secundarias y meta-información.

### 1.2 Colores de Acento (Semántica e Interacción)
* **Neon Blue / Cyan (Acento Interactivo):** `#06b6d4` o `#38bdf8`. Para enlaces importantes, llamadas a la acción primarias e iluminaciones en hover.
* **Indigo / Violet (Acento Secundario):** `#6366f1` o `#8b5cf6`. Para degradados de branding o badges de especialización.
* **Emerald (Status Activo / Éxito):** `#10b981`. Para indicar proyectos en producción, estado disponible para contratación ("Open to Work") o éxitos del formulario.
* **Amber / Rose (Alertas / Errores):** `#f59e0b` / `#f43f5e`. Para warnings o errores de validación.

---

## 2. Tipografía y Jerarquía Visual

* **Familia Tipográfica:** Utilizaremos fuentes sans-serif de grado técnico. Se recomienda usar **Geist**, **Inter**, u **Outfit** para el cuerpo de la web, y **Geist Mono** o **Fira Code** para fragmentos de código u elementos técnicos.
* **Escala de Tamaños:**
  * `text-xs`: 0.75rem / 12px (Metadatos, tags)
  * `text-sm`: 0.875rem / 14px (Textos de tarjetas, navegación, párrafos secundarios)
  * `text-base`: 1rem / 16px (Párrafos principales, texto de lectura)
  * `text-lg`: 1.125rem / 18px (Subtítulos pequeños, títulos de tarjeta)
  * `text-xl` a `text-2xl`: Títulos de secciones secundarias.
  * `text-4xl` a `text-6xl`: Títulos principales del héroe (Hero Titles).

---

## 3. Convenciones de Tailwind CSS (v4) y Combinación de Clases

Para construir interfaces con Tailwind de forma dinámica e impecable, utilizaremos utilidades que combinen y resuelvan clases dinámicas.

### 3.1 Helper `cn()`
* **Regla:** Queda prohibida la concatenación cruda de cadenas de texto de Tailwind cuando involucre condiciones.
* **Solución:** Utilizar el helper `cn()` que une `clsx` y `tailwind-merge` para resolver colisiones de clases en componentes reutilizables.

```typescript
// @/utils/cn.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

* **Ejemplo de uso en componente:**

```typescript
interface CardProps {
  className?: string;
  active?: boolean;
}

export function Card({ className, active }: CardProps) {
  return (
    <div
      className={cn(
        "p-6 rounded-xl border border-slate-800 bg-slate-900/50 text-slate-100 transition-all",
        active && "border-indigo-500 shadow-lg shadow-indigo-500/10",
        className
      )}
    >
      ...
    </div>
  );
}
```

---

## 4. Animaciones y Micro-Interacciones con Framer Motion

Las animaciones deben complementar la UX del sitio, no distraer ni sobrecargar el hardware (CPU/GPU) del cliente.

### 4.1 Principios de Animación Premium
* **Menos es Más:** Las transiciones deben durar entre 150ms y 300ms. Evita rebotes exagerados o demoras prolongadas en la carga visual.
* **Estética del Movimiento:** Utiliza funciones de easing físicas como `easeOut` o curvas bézier suaves (`[0.16, 1, 0.3, 1]`) en lugar de `linear`.
* **Hardware Acceleration:** Anima únicamente propiedades que activen la GPU: `opacity`, `transform` (utilizando `scale`, `x`, `y`, `rotate`). Evita animar `width`, `height`, `margin` o `top`/`left`, ya que disparan re-layouts pesados.

### 4.2 Ejemplos Prácticos de Animación
* **Fade-In con Desplazamiento (Carga de Secciones):**

```typescript
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
};

export function Section() {
  return (
    <motion.section
      variants={fadeInUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
    >
      Contenido animado suavemente al hacer scroll
    </motion.section>
  );
}
```

* **Efecto Hover Suave en Tarjetas (Micro-interacción):**

```typescript
export function ProjectCard() {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="p-6 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer"
    >
      ...
    </motion.div>
  );
}
```

### 4.3 Accesibilidad: Respeto a Preferencias del Usuario
* **Regla:** Debes respetar la preferencia del usuario sobre reducción de movimiento (`prefers-reduced-motion`).
* Si el sistema operativo del usuario tiene activada la reducción de movimiento, las transiciones complejas de Framer Motion deben desactivarse o simplificarse a un fade-in inmediato sin traslación espacial.

```typescript
import { useReducedMotion } from 'framer-motion';

export function InteractiveButton() {
  const shouldReduceMotion = useReducedMotion();
  const hoverAnimation = shouldReduceMotion ? {} : { scale: 1.05 };

  return <motion.button whileHover={hoverAnimation}>Click me</motion.button>;
}
```
