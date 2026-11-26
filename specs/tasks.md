# Tareas — Wanderlust Explorer

> Derivadas de [`spec.md`](./spec.md) y [`plan.md`](./plan.md), en el orden de la sección 4 del plan.
> Marcar con `- [x]` solo después de implementar **y verificar** cada tarea.

## 1. Tipos y funciones de `lib/`

- [x] T1 — Añadir el tipo `Category`, derivado de `Experience["category"]` (archivos: `src/types/experience.ts`)
- [x] T2 — Crear `ExperienceFilters { search; category: Lowercase<Category> | ""; destination }`, con valores en minúsculas y `destination` como país (archivos: `src/types/filters.ts`)
- [x] T3 — Crear la lista de categorías con su id en minúsculas para la URL y su etiqueta en castellano, más la conversión de id a `Category` (archivos: `src/lib/categories.ts`)
- [x] T4 — Crear `getExperienceById(id)`, `getCountries()` (países únicos del dataset, ordenados) y `getExperiencesByIds(ids)` (archivos: `src/lib/experiences.ts`)
- [x] T5 — Crear `escapeRegExp(text)` y `filterExperiences(list, filters)`, que combina con Y lógico tres criterios. Probar a mano varias combinaciones y caracteres especiales (archivos: `src/lib/filterExperiences.ts`)
  - título con regex case-insensitive
  - categoría por igualdad en minúsculas
  - destino que contiene el país, sin distinguir mayúsculas
- [x] T6 — Crear `formatPrice(n)` → «55 €» con `Intl.NumberFormat('es-ES')` (archivos: `src/lib/format.ts`)

## 2. Favoritos y layout

- [x] T7 — Definir los tokens de Design References (colores y fuentes) con `@theme` (archivos: `src/app/globals.css`)
- [x] T8 — Crear `FavoritesProvider` (`"use client"`) con `useState<string[]>`, `isFavorite(id)`, `toggleFavorite(id)` y el Context (archivos: `src/components/favorites/FavoritesProvider.tsx`)
- [x] T9 — Crear el hook `useFavorites()`, que lee el Context y lanza un error si se usa fuera del provider (archivos: `src/hooks/useFavorites.ts`)
- [x] T10 — Crear `Navbar` con `Link` a las 5 rutas y el enlace activo marcado con `usePathname`, con los estilos de Design References de CONTEXT.md (archivos: `src/components/layout/Navbar.tsx`)
- [x] T11 — Crear `Footer`, con los estilos de Design References de CONTEXT.md (archivos: `src/components/layout/Footer.tsx`)
- [x] T12 — Montar en el layout raíz las fuentes (`next/font`), `FavoritesProvider`, `Navbar` y `Footer`, con los estilos de Design References de CONTEXT.md (archivos: `src/app/layout.tsx`)

## 3. Explorador `/experiences`

- [x] T13 — Crear las piezas visuales `Price` (usa `formatPrice`) y `Rating` (estrellas de 1 a 5), con los estilos de Design References de CONTEXT.md (archivos: `src/components/ui/Price.tsx`, `src/components/ui/Rating.tsx`)
- [x] T14 — Crear `FavoriteButton`, que recibe `isFavorite` y `onToggle` por props, con los estilos de Design References de CONTEXT.md (archivos: `src/components/favorites/FavoriteButton.tsx`)
- [x] T15 — Crear `ExperienceCard`: imagen, precio, título, etiqueta de categoría en castellano, `FavoriteButton` y `Link` al detalle; recibe los favoritos por props. Con los estilos de Design References de CONTEXT.md (archivos: `src/components/experiences/ExperienceCard.tsx`)
- [x] T16 — Crear `ExperienceGrid`, una rejilla responsive que recibe la lista y los favoritos por props, con los estilos de Design References de CONTEXT.md (archivos: `src/components/experiences/ExperienceGrid.tsx`)
- [x] T17 — Crear `useExperienceFilters`, que lee `search`, `category` y `destination` de la URL y expone `setParam(key, value)` (archivos: `src/hooks/useExperienceFilters.ts`)
  - escribe siempre en minúsculas
  - borra el param si el valor está vacío
  - conserva el resto de params
  - usa `router.replace` con `scroll: false`
- [x] T18 — Crear `useDebouncedValue(value, ms)`, con un `useEffect` y cleanup del temporizador (archivos: `src/hooks/useDebouncedValue.ts`)
- [x] T19 — Crear `SearchBar`, con los estilos de Design References de CONTEXT.md (archivos: `src/components/experiences/SearchBar.tsx`)
  - input controlado, prerrellenado con `search` de la URL
  - debounce de unos 300 ms
  - solo actualiza la URL si el valor cambió
- [x] T20 — Crear `FilterBar` con los selectores de categoría y país, prerrellenados desde la URL; «Todas» / «Todos» elimina el param. Con los estilos de Design References de CONTEXT.md (archivos: `src/components/experiences/FilterBar.tsx`)
- [x] T21 — Crear `EmptyState`, con el mensaje "No se encontraron resultados" por defecto y los estilos de Design References de CONTEXT.md (archivos: `src/components/ui/EmptyState.tsx`)
- [x] T22 — Crear `ExperiencesExplorer`, con los estilos de Design References de CONTEXT.md (archivos: `src/components/experiences/ExperiencesExplorer.tsx`)
  - lee los params y deriva los resultados con `filterExperiences`
  - muestra «N experiencias encontradas»
  - compone `SearchBar`, `FilterBar` y `ExperienceGrid`, o `EmptyState` si no hay resultados
  - pasa los favoritos por props
- [x] T23 — Crear la página `/experiences`, con `ExperiencesExplorer` dentro de `<Suspense>` y los estilos de Design References de CONTEXT.md (archivos: `src/app/experiences/page.tsx`)

## 4. Detalle, favoritos y perfil

- [x] T24 — Crear `ExperienceDetail`: imagen, título, descripción, etiqueta de categoría, destino, `Price` y `Rating`, con los estilos de Design References de CONTEXT.md (archivos: `src/components/experiences/ExperienceDetail.tsx`)
- [x] T25 — Crear la página `/experiences/[id]`: espera `params` (asíncrono), busca la experiencia con `getExperienceById` y llama a `notFound()` si no existe. Con los estilos de Design References de CONTEXT.md (archivos: `src/app/experiences/[id]/page.tsx`)
- [x] T26 — Permitir marcar y desmarcar favorito desde el detalle: conectar `useFavorites` y pasar `isFavorite` y `onToggle` a `FavoriteButton` dentro de `ExperienceDetail` (archivos: `src/components/experiences/ExperienceDetail.tsx`, `src/app/experiences/[id]/page.tsx`)
- [x] T27 — Crear la página `/favorites`: obtiene los favoritos con `useFavorites` y `getExperiencesByIds` y los muestra con `ExperienceGrid`, o `EmptyState` si no hay ninguno. Con los estilos de Design References de CONTEXT.md (archivos: `src/app/favorites/page.tsx`)
- [x] T28 — Crear la página `/profile`: perfil simulado estático, maquetado en la propia página, con el contador de favoritos y los estilos de Design References de CONTEXT.md (archivos: `src/app/profile/page.tsx`)
- [x] T29 — Crear la página 404 con un enlace de vuelta al explorador, con los estilos de Design References de CONTEXT.md (archivos: `src/app/not-found.tsx`)

## 5. Home y estilo final

- [x] T30 — Crear `Hero`, con imagen, título y CTA hacia `/experiences`, con los estilos de Design References de CONTEXT.md (archivos: `src/components/home/Hero.tsx`)
- [x] T31 — Crear `CategoryCircles`, con las 5 categorías en círculo enlazando a `/experiences?category=<id>`, con los estilos de Design References de CONTEXT.md (archivos: `src/components/home/CategoryCircles.tsx`)
- [x] T32 — Crear la página de inicio con `Hero`, `CategoryCircles` y una selección de `ExperienceCard`, con los estilos de Design References de CONTEXT.md (archivos: `src/app/page.tsx`)
- [x] T33 — Revisar la coherencia visual y el comportamiento responsive en todas las páginas (`/`, `/experiences`, `/experiences/[id]`, `/favorites`, `/profile`, 404) y corregir las diferencias con Design References (archivos: `src/app/**`, `src/components/**`)

## 6. Verificación

- [x] T34 — Verificar uno a uno los criterios de aceptación de `spec.md` (archivos: `specs/spec.md`, `specs/tasks.md`)
  - 5 páginas sin recarga
  - búsqueda por regex
  - filtros independientes y combinados
  - URL sincronizada y prerrellenada al cargar
  - `useEffect` sin bucles
  - favoritos con `useState` y props
  - custom hook
  - componentes divididos
  - tipos consistentes
  - diseño responsive
  - Design References en `CONTEXT.md`

  Marcar en `spec.md` los criterios que se cumplen y anotar en `tasks.md` los fallos que haya.
