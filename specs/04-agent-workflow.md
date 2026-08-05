# Protocolo de Trabajo e Interacción de Agentes de IA

Este documento define el marco de gobernanza, el flujo de trabajo técnico y los estándares de validación que los agentes de IA (Agy y Claude Code) deben seguir obligatoriamente cuando colaboren en este repositorio.

---

## 1. Protocolo de Ejecución de la IA

Antes de realizar cualquier modificación, creación o refactorización de código en el proyecto, la IA debe ejecutar los siguientes pasos en secuencia ordenada:

### 1.1 Fase de Lectura y Contexto
* **Lectura de Especificaciones:** Leer en primer lugar la carpeta `.specs/` completa para refrescar los límites arquitectónicos, los estándares de código y la guía de estilos.
* **Inspección del Entorno:** Revisar la estructura del módulo afectado y la presencia de alias en imports antes de sugerir rutas relativas.

### 1.2 Fase de Modificación Incremental y Segura
* **Cambios Atómicos:** Evitar refactorizaciones masivas en un solo paso. Realizar los cambios de forma incremental y modular.
* **Preservación de Lógica y Documentación:** Mantener la integridad de la documentación interna, comentarios del código de negocio y docstrings existentes que no estén directamente afectados por el cambio.
* **Control de Impacto:** Evaluar si el cambio afecta a otros componentes antes de reescribir interfaces globales o custom hooks.

---

## 2. Validación Técnica y Compilación

Ninguna sugerencia o pull request se considerará "lista" hasta haber superado las siguientes validaciones en la máquina del usuario o en entornos de CI:

### 2.1 Verificación de TypeScript
* **Comando:** `npm run type-check` o `npx tsc --noEmit`.
* **Criterio de Aceptación:** Cero errores de compilación de TypeScript. Si se añaden nuevas interfaces o props, se debe asegurar que todos los archivos que las implementan estén adaptados para evitar errores del compilador.

### 2.2 Verificación de Linter y Formato
* **Comando:** `npm run lint` y/o `npm run format`.
* **Criterio de Aceptación:** Cumplimiento total de las reglas de ESLint y formateo con Prettier. No se deben comitear líneas con advertencias de variables no usadas (`no-unused-vars`) o imports redundantes.

---

## 3. Accesibilidad (a11y), Semántica y Optimización SEO

Como portafolio profesional, la web debe destacar por su impecable factura técnica y accesibilidad para todos los usuarios.

### 3.1 Semántica HTML5
* Utiliza etiquetas estructurales semánticas en lugar de divs infinitos (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
* Asegúrate de que los encabezados (`<h1>`, `<h2>`, `<h3>`, etc.) respeten una jerarquía lógica y secuencial estricta. Sólo se permite un único `<h1>` por página (reservado para la identidad de la marca o título principal).

### 3.2 Estándares de Accesibilidad (WCAG 2.1 AA)
* **Contraste:** Asegurar que los colores de acento sobre fondo oscuro cumplan con la relación de contraste WCAG AA (mínimo 4.5:1 para texto normal, 3:1 para texto grande).
* **Imágenes y Multimedia:** Atributos `alt` descriptivos obligatorios en todas las imágenes. Para elementos decorativos, usa `alt=""` o `aria-hidden="true"`.
* **Interactividad con Teclado:**
  * Todos los botones y enlaces interactivos deben poder navegarse utilizando la tecla `Tab`.
  * Define estilos claros para el estado focus (`focus-visible:ring-2 focus-visible:ring-indigo-500`).
  * Utiliza atributos ARIA (`aria-expanded`, `aria-label`, `aria-controls`) para componentes complejos interactivos como menús desplegables o modales.

### 3.3 Velocidad de Carga y SEO (Metas Lighthouse 100/100)
* **Imágenes Optimizadas:** Utiliza formatos modernos de imagen (WebP o AVIF). Aplica cargas perezosas (`loading="lazy"`) a imágenes fuera del primer scroll.
* **Metadatos SEO:** Configura etiquetas meta detalladas (title, description, open graph tags para compartir en redes sociales, twitter cards, favicon y manifest).
* **Tamaño del Bundle:** Evita la inclusión de dependencias innecesarias de gran tamaño. Si es necesario importar librerías pesadas (ej. Three.js o animaciones SVG muy complejas), cárgalas mediante carga dinámica (lazy loading).

---

## 4. Estándar de Mensajes de Commit y Git Workflow

Para mantener un historial limpio y legible del repositorio, la IA debe documentar sus cambios utilizando el estándar de **Conventional Commits**:

### 4.1 Formato del Mensaje
`tipo(ámbito): descripción corta en minúsculas`

* **Tipos permitidos:**
  * `feat`: Incorporación de una nueva funcionalidad.
  * `fix`: Corrección de un error o bug.
  * `docs`: Cambios exclusivos en la documentación.
  * `style`: Cambios cosméticos o de formato que no afectan el comportamiento del código (espacios, prettier, etc.).
  * `refactor`: Cambios de código que no corrigen errores ni añaden funcionalidades (reestructuración interna).
  * `perf`: Cambios enfocados a mejorar el rendimiento.
  * `test`: Adición o corrección de pruebas unitarias/integración.
  * `chore`: Tareas de mantenimiento general, configuración de herramientas de desarrollo o actualización de dependencias.

### 4.2 Ejemplos de Commits
* `feat(components): add ProjectCard with Framer Motion hover animation`
* `fix(hooks): resolve race condition in useProjectDetails fetch`
* `docs(specs): create agent workflow technical specification`
