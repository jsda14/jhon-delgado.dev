# Código Estándar y Convenciones de Programación (TypeScript & React 18)

Este documento establece las directrices de codificación obligatorias para todo el desarrollo del portafolio. Claude Code y Agy deben seguir estrictamente estas reglas para mantener la legibilidad, la robustez y la facilidad de mantenimiento del software.

---

## 1. Tipado Estricto con TypeScript

TypeScript se configurará en su modo más restrictivo (`strict: true`). No se permiten atajos que comprometan la seguridad de tipos.

### 1.1 Prohibición Absoluta de `any`
* **Regla:** El uso del tipo `any` está estrictamente prohibido. Cualquier ocurrencia de `any` fallará en la revisión de código.
* **Soluciones de tipado:**
  * Si un tipo es realmente desconocido, utiliza `unknown` y realiza estrechamiento de tipos (type narrowing) mediante `typeof`, `instanceof` o Type Guards personalizados.
  * Utiliza genéricos (`<T>`) para construir funciones y componentes altamente reutilizables y seguros.
  * Si estás lidiando con librerías externas que carecen de tipos, declara un módulo de definición de tipos (`.d.ts`) o usa `Record<string, unknown>` como último recurso si representa un objeto plano dinámico.

```typescript
// ❌ INCORRECTO
function processData(data: any) {
  console.log(data.name);
}

//  CORRECTO
interface UserData {
  name: string;
  email: string;
}

function processData(data: unknown) {
  if (data && typeof data === 'object' && 'name' in data) {
    console.log((data as UserData).name);
  }
}
```

### 1.2 Declaraciones Explícitas y Utilidades de Tipos
* Escribe tipos de retorno explícitos para todas las funciones públicas y hooks personalizados.
* Utiliza utilidades de TypeScript para evitar duplicidad de tipos:
  * `Readonly<T>` para props u objetos mutables que no deben cambiar.
  * `Pick<T, Keys>` / `Omit<T, Keys>` para crear subtipos a partir de interfaces existentes.
  * `Partial<T>` / `Required<T>` para representar estados parciales de formularios u opciones.
* Prefiere `interface` para definir estructuras de objetos y contratos que puedan ser extendidos, e `type` para uniones, intersecciones, tuplas y tipos primitivos alias.

---

## 2. Estándares para React 18 y Arquitectura de Componentes

React 18 introduce características avanzadas de renderizado y concurrencia. Los componentes deben diseñarse de forma moderna y eficiente.

### 2.1 Componentes Funcionales
* Todos los componentes deben ser declarados como funciones. Se prefiere la sintaxis clásica de función declarativa (`function ComponentName()`) o funciones de flecha constantes (`const ComponentName = () => ...`) para sub-componentes muy simples.
* **Componentes puros:** Minimiza los efectos secundarios dentro del cuerpo del componente. La renderización debe ser una función pura de las props y el estado.

### 2.2 Hooks Personalizados para la Lógica de Negocio (SRP)
* **Regla de Oro:** Los componentes UI deben limitarse a pintar la pantalla y manejar eventos de interacción inmediatos. La lógica de negocio, fetches de datos, cálculos pesados y el estado complejo deben encapsularse en hooks personalizados (`use*`).
* Esto facilita el testeo unitario de la lógica sin tener que montar el componente UI.

```typescript
// ❌ INCORRECTO: Mezcla de UI y lógica compleja
export function ProjectCard({ projectId }: { projectId: string }) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/projects/${projectId}`)
      .then(res => res.json())
      .then(data => {
        setProject(data);
        setLoading(false);
      });
  }, [projectId]);

  if (loading) return <div>Cargando...</div>;
  return <div>{project?.title}</div>;
}

//  CORRECTO: Componente UI limpio y Hook dedicado
import { useProjectDetails } from '@/hooks/useProjectDetails';

export function ProjectCard({ projectId }: { projectId: string }) {
  const { project, isLoading } = useProjectDetails(projectId);

  if (isLoading) return <ProjectCardSkeleton />;
  if (!project) return <ProjectNotFound />;

  return (
    <article className="p-4 rounded-lg bg-slate-900 border border-slate-800">
      <h3 className="text-lg font-semibold text-slate-100">{project.title}</h3>
      <p className="text-slate-400">{project.description}</p>
    </article>
  );
}
```

### 2.3 Tipado Explícito de Props
* Todas las props de un componente deben ser tipadas usando una interfaz clara y explícita llamada `[ComponentName]Props`.
* No uses `React.FC` o `React.FunctionComponent` de forma genérica a menos que sea estrictamente necesario para patrones de children específicos, ya que limita el uso de genéricos en componentes. Prefiere tipar directamente las props en la firma de la función.
* Si el componente acepta `children`, típalos explícitamente con `React.ReactNode`.

```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  children?: React.ReactNode;
}

export function Button({ label, onClick, variant = 'primary', children }: ButtonProps) {
  return (
    <button onClick={onClick} className={`btn btn-${variant}`}>
      {children || label}
    </button>
  );
}
```

---

## 3. Rendimiento y Optimización de Renderizado

Evita la optimización prematura, pero implementa patrones eficientes para mitigar re-renders innecesarios.

### 3.1 Uso Correcto de React.memo, useMemo y useCallback
No envuelvas cada función y componente de forma indiscriminada. Analiza cuándo es realmente necesario:
* **`React.memo`:** Úsalo solo en componentes que reciben props complejas y se renderizan con mucha frecuencia en listas largas, o cuyos re-renders tengan un costo computacional alto demostrado.
* **`useMemo`:** Aplícalo cuando ejecutes operaciones costosas de filtrado, transformación o cálculo de datos (ej. procesamiento de 100+ elementos).
* **`useCallback`:** Obligatorio únicamente cuando pases callbacks como props a componentes hijos optimizados con `React.memo`, o cuando la función sea una dependencia de un `useEffect`.

```typescript
// useMemo recomendado para evitar recálculos en cada render
const sortedProjects = useMemo(() => {
  return [...projects].sort((a, b) => b.stars - a.stars);
}, [projects]);
```

### 3.2 Manejo de Eventos y Cleanup de Efectos
* Cada vez que utilices un `useEffect` que añada un event listener global (ej. `window.addEventListener('scroll')`) o inicie un temporizador (`setInterval`/`setTimeout`), debes retornar una función de limpieza (cleanup).
* Utiliza variables de control para evitar condiciones de carrera (race conditions) en efectos asíncronos.

---

## 4. Clean Code y Principios de Diseño de Software

### 4.1 Principio de Responsabilidad Única (SRP)
* Cada archivo de componente debe hacer una sola cosa bien. Si un componente sobrepasa las 150 líneas de código, es un fuerte candidato a ser refactorizado y dividido en sub-componentes.
* Mantén las funciones pequeñas y con un único propósito.

### 4.2 Nomenclatura (Naming Conventions)
* **Componentes React:** `PascalCase` (ej: `ProjectCard.tsx`, `TechStackGrid.tsx`).
* **Hooks personalizados:** Prefijo `use` seguido de `camelCase` (ej: `useWindowSize.ts`, `useTheme.ts`).
* **Funciones y Variables:** `camelCase` (ej: `calculateAge()`, `isMenuOpen`).
* **Constantes Globales:** `UPPER_SNAKE_CASE` (ej: `MAX_PROJECTS_LIMIT`, `THEME_CONFIG`).
* **Interfaces y Tipos:** `PascalCase` (ej: `Project`, `UserProfileProps`).
* **Archivos No-Componente:** `kebab-case` o `camelCase` (ej: `date-formatter.ts`, `analytics.ts`).

### 4.3 Manejo de Errores Robustos
* Envuelve integraciones críticas (llamadas a APIs, localStorage, parsing de JSON) con bloques `try...catch`.
* Implementa **React Error Boundaries** a nivel de sección o página para prevenir que una falla en un componente rompa la aplicación completa.
* Desarrolla funciones de validación de tipo (Type Guards) seguras para verificar datos provenientes del exterior.
