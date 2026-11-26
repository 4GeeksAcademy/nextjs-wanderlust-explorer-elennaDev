# Plan técnico — Wanderlust Explorer

> Basado en [`CONTEXT.md`](../CONTEXT.md) y [`spec.md`](./spec.md). Next.js 16 (App Router), React 19, TypeScript estricto, Tailwind v4.

---

## 1. Favoritos: dónde se guardan y por qué

### Decisión

El estado de favoritos vive en **un único `useState`** dentro de un componente cliente, **`FavoritesProvider`**, que envuelve toda la app desde el **layout raíz** (`src/app/layout.tsx`).

- Guarda una lista de **ids** (`string[]`), no experiencias completas. La experiencia se busca en el dataset cuando hace falta.
- Expone tres cosas: `favoriteIds`, `isFavorite(id)` y `toggleFavorite(id)`.
- Las páginas acceden a ellas con el custom hook **`useFavorites()`**.
- Dentro de cada página, esos valores se **pasan por props** a los componentes hijos. Así `ExperienceCard` y `FavoriteButton` reciben `isFavorite` y `onToggle` y no dependen del hook.

```
RootLayout
└── FavoritesProvider        ← useState<string[]> (única fuente de verdad)
    ├── Navbar
    └── {children}  →  página  →  useFavorites()  →  props  →  Card / FavoriteButton
```

### Por qué

1. **El layout no se desmonta al navegar.** En App Router, cuando el usuario va de `/experiences` a `/favorites` con `Link`, solo cambia `{children}`; el layout y su estado siguen vivos. Si el `useState` estuviera dentro de una página, se perdería al salir de ella.
2. **Una sola fuente de verdad.** Explorador, detalle, `/favorites` y `/profile` leen el mismo estado, así que marcar un favorito en el detalle se ve al instante en el contador de `/profile`.
3. **Cumple las restricciones.** El Context es parte de React, no una librería externa como Redux o Zustand. No se usa `localStorage`, y el custom hook `useFavorites` encapsula el acceso.
4. **Pasar props desde el layout no es posible.** El layout no puede pasar props a `{children}`. Por eso el estado se transporta con Context hasta cada página, y desde la página hacia abajo se usan **props**, como pide el spec.
5. **Guardar ids y no objetos** evita duplicar datos y que las copias se desincronicen del dataset.

Consecuencia aceptada: al **recargar** la página (F5) los favoritos se pierden. La spec lo excluye expresamente.

---

## 2. Búsqueda y filtros: del input a la URL

### Principio

**La URL es la única fuente de verdad** de la búsqueda y los filtros. Los resultados se calculan siempre a partir de los query params, nunca de un estado paralelo.

Query params (`search`, `category`, `destination`), **todos los valores en minúsculas**:

`/experiences?search=kayak&category=adventure&destination=portugal`

- `search` → texto libre escrito por el usuario, guardado en minúsculas.
- `category` → id de la categoría en minúsculas (`adventure`, `culture`, `food`, `wellness`, `nature`). Se traduce al valor del tipo `Category` (`Adventure`…) con `lib/categories.ts`. Un valor desconocido se ignora.
- `destination` → **país** en minúsculas, tal como aparece en el dataset (`portugal`, `españa`, `japón`…). Se codifica en la URL de forma automática (`espa%C3%B1a`).

### Recorrido del texto que escribe el usuario

1. **El usuario teclea** en `SearchBar`. El input es controlado por un estado local (`useState`) para que escribir sea fluido.
2. **Valor inicial desde la URL.** Ese estado local arranca con el valor actual de `search` leído con `useSearchParams()`. Así, al abrir un enlace con `?search=…`, el input aparece **prerrellenado**.
3. **Debounce de ~300 ms.** Un `useEffect` con dependencias `[valor]` espera a que el usuario deje de teclear, para no reescribir la URL en cada pulsación. Su cleanup cancela el temporizador.
4. **Construcción de la nueva URL.** Se parte de los params actuales (`new URLSearchParams(searchParams)`) para **no perder** los filtros activos. Se hace `set('search', valor.trim().toLowerCase())` si hay texto y `delete('search')` si está vacío.
5. **Actualización sin recarga.** Se llama a `router.replace(`${pathname}?${params}`, { scroll: false })`, con `usePathname()` y `useRouter()`:
   - Se usa `replace` y no `push` para no llenar el historial con cada búsqueda.
   - Es navegación del lado del cliente, sin recarga de página.
6. **La URL cambia, la lista se recalcula.** `ExperiencesExplorer` lee los params con `useSearchParams()`, llama a `filterExperiences(experiences, { search, category, destination })` y pinta el resultado. Los resultados se **derivan** en el render (`useMemo` como mucho); no se copian a otro estado ni se calculan en un `useEffect`.

Los selects de **categoría** y **destino (país)** de `FilterBar` siguen el mismo camino, pero sin debounce. Al cambiar, actualizan su param al momento, en minúsculas, con la misma función del hook. El valor vacío ("Todas" / "Todos") lo **elimina** de la URL.

### Reglas de filtrado (función pura en `lib/`)

- **Título:** se compara con `new RegExp(escapeRegExp(search), 'i')`. Se escapan los caracteres especiales para que un texto como `(` no rompa la búsqueda.
- **Categoría:** la experiencia coincide si su `category` en minúsculas es igual a `category`.
- **Destino (país):** la experiencia coincide si su `destination` en minúsculas **contiene** el país (`"lisboa, portugal".includes("portugal")`).
  - Las opciones del selector son los **países únicos del dataset**: la parte tras la última coma de `destination`, ordenados alfabéticamente.
  - Cada opción muestra el país tal cual («Portugal») y usa su versión en minúsculas como valor.
- Cada criterio se aplica solo si tiene valor.
- **Combinación:** todos los criterios se cumplen a la vez (Y lógico).
- **Sin coincidencias:** se muestra `EmptyState` con el mensaje "No se encontraron resultados".

### Evitar bucles en `useEffect`

- El efecto de debounce depende solo del texto local. **No** escribe en estado local, solo en la URL, así que no se realimenta.
- Antes de llamar a `replace` se compara con el `search` actual. Si es igual, no se hace nada.
- Los componentes que usan `useSearchParams` van dentro de un `<Suspense>`, como exige Next 16 para el build de producción.

---

## 3. Piezas: componentes, hooks y carpetas

### `src/app/` — rutas (finas, solo componen)

| Archivo                            | Rol                                                                                                   |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `layout.tsx`                       | HTML base, fuentes (`next/font`), `FavoritesProvider`, `Navbar` y `Footer`.                           |
| `page.tsx`                         | Inicio: `Hero`, `CategoryCircles` y una selección de `ExperienceCard`.                                |
| `experiences/page.tsx`             | Monta `ExperiencesExplorer` dentro de `<Suspense>`.                                                   |
| `experiences/[id]/page.tsx`        | Recibe `params` (asíncrono en Next 16), busca la experiencia y muestra `ExperienceDetail`. Si no existe, llama a `notFound()`. |
| `favorites/page.tsx`               | Lista los favoritos con `ExperienceGrid`, o `EmptyState` si no hay ninguno.                           |
| `profile/page.tsx`                 | Perfil simulado estático, maquetado directamente en la página, con el contador de favoritos.         |
| `not-found.tsx`                    | Página 404 con enlace de vuelta al explorador.                                                        |

### `src/components/` — UI pequeña y reutilizable

| Carpeta / componente                     | Responsabilidad                                                                                |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `layout/Navbar.tsx`                      | Enlaces con `Link`; marca el activo con `usePathname` y aplica su estilo activo o inactivo.    |
| `layout/Footer.tsx`                      | Pie de página.                                                                                 |
| `home/Hero.tsx`                          | Cabecera con imagen y CTA hacia `/experiences`.                                                |
| `home/CategoryCircles.tsx`               | Las 5 categorías en círculo; cada una enlaza a `/experiences?category=adventure` (etc.).       |
| `experiences/ExperiencesExplorer.tsx`    | Orquesta el listado: lee params, filtra, muestra «N experiencias encontradas» y compone buscador, filtros y grid. |
| `experiences/SearchBar.tsx`              | Input de búsqueda con debounce.                                                                |
| `experiences/FilterBar.tsx`              | Selectores de categoría y de destino (países del dataset).                                     |
| `experiences/ExperienceGrid.tsx`         | Rejilla responsive; recibe la lista y los favoritos por props.                                 |
| `experiences/ExperienceCard.tsx`         | Tarjeta: imagen, precio, título, categoría y `FavoriteButton`.                                 |
| `experiences/ExperienceDetail.tsx`       | Vista de detalle completa.                                                                     |
| `favorites/FavoriteButton.tsx`           | Corazón; recibe `isFavorite` y `onToggle` por props.                                           |
| `favorites/FavoritesProvider.tsx`        | `"use client"`; contiene el `useState` de favoritos y el Context.                              |
| `ui/EmptyState.tsx`                      | Mensaje "No se encontraron resultados" (o el que se le pase).                                  |
| `ui/Rating.tsx`, `ui/Price.tsx`          | Piezas visuales mínimas (estrellas, precio en €).                                              |

### `src/hooks/` — custom hooks

| Hook                       | Qué encapsula                                                                                                        |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `useFavorites.ts`          | Lee el Context de favoritos. Devuelve `favoriteIds`, `isFavorite` y `toggleFavorite`, y avisa si se usa fuera del provider. |
| `useExperienceFilters.ts`  | Lee `search`, `category` y `destination` de la URL y expone `setParam(key, value)`, que guarda siempre en minúsculas. Usa `useSearchParams`, `usePathname` y `useRouter`. |
| `useDebouncedValue.ts`     | Devuelve un valor retrasado N ms. Contiene el `useEffect` con cleanup que usa `SearchBar`.                           |

### `src/lib/` — funciones puras (sin React)

| Archivo                | Contenido                                                                     |
| ---------------------- | ----------------------------------------------------------------------------- |
| `filterExperiences.ts` | `filterExperiences(list, filters)` y `escapeRegExp(text)`.                    |
| `experiences.ts`       | `getExperienceById(id)`, `getCountries()` (países únicos del dataset, ordenados) y `getExperiencesByIds(ids)`. |
| `format.ts`            | `formatPrice(n)` → «55 €» (con `Intl.NumberFormat('es-ES', …)`).              |
| `categories.ts`        | Lista de categorías con su id en minúsculas para la URL (`adventure`) y su etiqueta en castellano («Aventura»). |

### `src/types/` y `src/data/`

- `types/experience.ts` — `Experience` (existente) más un tipo `Category` derivado de él.
- `types/filters.ts` — `ExperienceFilters { search: string; category: Lowercase<Category> | ""; destination: string }`. Los tres valores van en minúsculas; `destination` es el país (por ejemplo, `"portugal"`).
- `data/experiences.ts` — dataset de 100 experiencias (existente, no se modifica).

---

## 4. Orden de implementación sugerido

1. Tipos y funciones de `lib/`, con pruebas manuales del filtrado.
2. `FavoritesProvider` + `useFavorites` y el layout con `Navbar`.
3. `/experiences`: grid y tarjetas, luego `useExperienceFilters`, `SearchBar` y filtros.
4. `/experiences/[id]`, `/favorites` y `/profile`.
5. `/` (home) y el estilo final según **Design References**.
6. Revisión contra los criterios de aceptación de `spec.md`.

---

## 5. Componentes eliminados del plan

| Eliminado           | Dónde se integra su función                                                        |
| ------------------- | ---------------------------------------------------------------------------------- |
| `NavLink`           | Dentro de `Navbar`, que pinta cada `Link` y su estilo activo.                       |
| `CategoryFilter`    | Dentro de `FilterBar` (selector de categoría).                                     |
| `DestinationFilter` | Dentro de `FilterBar` (selector de país).                                          |
| `ResultsCount`      | Una línea de texto en `ExperiencesExplorer`.                                       |
| `ProfileCard`       | Maquetado directamente en `app/profile/page.tsx`.                                  |
| `Badge`             | Etiqueta de categoría con clases Tailwind dentro de `ExperienceCard` y `ExperienceDetail`. |
