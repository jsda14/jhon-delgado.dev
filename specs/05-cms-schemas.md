# Especificación: Esquemas de Contenido en Strapi CMS
Este documento define y documenta la arquitectura técnica de datos de los Content Types en Strapi Headless CMS para alimentar dinámicamente el portafolio de Jhon Delgado.

---

## 1. Project (Collection Type)
Representa los proyectos destacados en el portafolio.
* **i18n (Localización):** Habilitado.

| Nombre del Campo | Tipo de Campo | Atributos / Validación | Descripción |
| :--- | :--- | :--- | :--- |
| `uid` | UID | Requerido, Único, basado en `title` | Identificador URL amigable del proyecto (slug). |
| `title` | String | Requerido | Título representativo del proyecto. |
| `description` | Text | Requerido | Breve resumen introductorio para las tarjetas. |
| `detailedDescription` | RichText (Markdown) | Opcional | Explicación detallada del proyecto (arquitectura, retos, etc.). |
| `technologies` | JSON | Requerido (ej. `["React", "Supabase"]`) | Lista de tecnologías utilizadas. |
| `liveUrl` | String | Opcional, formato URL | Link a la aplicación desplegada en producción. |
| `githubUrl` | String | Opcional, formato URL | Enlace al repositorio de código fuente en GitHub. |
| `highlights` | JSON | Requerido (ej. `["SQL defensivo", "Notificaciones Brevo"]`) | Logros o características destacadas del desarrollo. |
| `metrics` | JSON | Requerido | Parámetros o KPI conseguidos en el proyecto (ej. `[{"label": "Transacciones", "value": "10k+"}]`). |
| `featured` | Boolean | Requerido, Default: `false` | Determina si el proyecto se muestra en la sección principal. |

---

## 2. Experience (Collection Type)
Representa los roles de la trayectoria profesional.
* **i18n (Localización):** Habilitado.

| Nombre del Campo | Tipo de Campo | Atributos / Validación | Descripción |
| :--- | :--- | :--- | :--- |
| `company` | String | Requerido | Nombre de la empresa (ej. Enovate, Newshore, Geekcore). |
| `role` | String | Requerido | Nombre del puesto desempeñado (ej. Tech Lead, Senior Frontend). |
| `period` | String | Requerido | Lapso de tiempo laborado (ej. "2024 - Presente", "2022 - 2024"). |
| `location` | String | Requerido | Ubicación física o modalidad (ej. "Houston, TX (Remoto)", "Colombia"). |
| `description` | Text | Requerido | Descripción general del rol e impacto en la empresa. |
| `achievements` | JSON | Requerido (ej. `["Diseño de dashboard...", "Migración hexagonal..."]`) | Logros principales y entregables destacados del puesto. |
| `technologies` | JSON | Requerido | Tecnologías clave aplicadas en el rol. |

---

## 3. Skill (Collection Type)
Habilidades técnicas y buenas prácticas agrupadas.
* **i18n (Localización):** Deshabilitado (nombres técnicos estandarizados).

| Nombre del Campo | Tipo de Campo | Atributos / Validación | Descripción |
| :--- | :--- | :--- | :--- |
| `name` | String | Requerido, Único | Nombre de la habilidad (ej. "React & Next.js", "FastAPI"). |
| `category` | Enumeration | Requerido: `'frontend' \| 'backend-ai' \| 'cloud' \| 'practices'` | Categoría del stack tecnológico para agrupación. |
| `level` | Integer | Requerido, Rango: `0` a `100` | Nivel de dominio estimado en porcentaje. |
| `iconName` | String | Requerido | Identificador de icono compatible (ej. "Code", "Brain", "Cloud"). |

---

## 4. Profile (Single Type)
Información global y biografía del profesional.
* **i18n (Localización):** Habilitado.

| Nombre del Campo | Tipo de Campo | Atributos / Validación | Descripción |
| :--- | :--- | :--- | :--- |
| `headline` | String | Requerido | Titular de presentación principal (ej. "Full-Stack & AI Integration Engineer"). |
| `bio` | RichText (Markdown) | Requerido | Biografía técnica e introductoria del perfil. |
| `email` | String | Requerido, formato Email | Dirección de contacto oficial (jsda14@gmail.com). |
| `linkedinUrl` | String | Requerido, formato URL | Link al perfil profesional en LinkedIn. |
| `githubUrl` | String | Requerido, formato URL | Link al perfil en GitHub. |
| `resumePdf` | Media (File) | Opcional, un solo archivo (PDF) | Documentación oficial de la hoja de vida (CV) para descarga. |
