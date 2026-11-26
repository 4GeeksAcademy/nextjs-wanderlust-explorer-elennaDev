# Especificación — Wanderlust Explorer

> Contexto del proyecto, reglas y referencias de diseño: ver [`CONTEXT.md`](../CONTEXT.md).

## 1. Objetivo

Construir el **explorador de experiencias** de Wanderlust Explorer: una aplicación multipágina con React y Next.js en la que los usuarios puedan **explorar, buscar y filtrar** experiencias de viaje, y **guardar sus favoritas**, sin recargar la página al moverse entre secciones.

## 2. Páginas

| Ruta                | Qué ve y puede hacer el usuario                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `/`                 | Página de inicio: presenta la app, muestra las categorías disponibles e invita a explorar las experiencias.         |
| `/experiences`      | Listado de experiencias con buscador, filtros por categoría y destino, y número de resultados encontrados.          |
| `/experiences/[id]` | Detalle de una experiencia: imagen, título, descripción, categoría, destino, precio y valoración. Permite marcarla o desmarcarla como favorita. |
| `/favorites`        | Listado de las experiencias guardadas como favoritas. Si no hay ninguna, se informa al usuario.                     |
| `/profile`          | Perfil simulado y estático del usuario que muestra cuántos favoritos tiene guardados.                               |

En todas las páginas hay una barra de navegación común que indica en qué sección se encuentra el usuario.

## 3. Funcionalidades

### 3.1 Búsqueda
- El usuario escribe un texto y el listado muestra solo las experiencias cuyo **título** coincide con él.
- La coincidencia no distingue entre mayúsculas y minúsculas.
- Al borrar el texto, vuelven a mostrarse todas las experiencias (según los filtros activos).

### 3.2 Filtros
- **Categoría**: Aventura, Cultura, Gastronomía, Bienestar o Naturaleza.
- **Destino**: cualquiera de los destinos presentes en el catálogo.
- Cada filtro puede usarse por separado o junto con el otro, y ambos se combinan con la búsqueda.
- La búsqueda y los filtros activos quedan reflejados en la dirección de la página, de modo que:
  - se puede compartir o guardar un enlace con una búsqueda concreta;
  - al abrir ese enlace, el buscador y los filtros aparecen ya rellenados y los resultados ya filtrados.
- Si ninguna experiencia cumple los criterios, se muestra el mensaje **"No se encontraron resultados"**.

### 3.3 Favoritos
- El usuario puede añadir o quitar una experiencia de favoritos desde el listado y desde su página de detalle.
- El estado de favorito se ve reflejado de forma coherente en todas las páginas durante la sesión.
- La página `/favorites` muestra las experiencias guardadas y `/profile` muestra el total.
- Los favoritos **no** se conservan al recargar la página.

## 4. Criterios de aceptación

- [x] La app tiene al menos **5 páginas distintas** con navegación del lado del cliente (sin recargas completas de página entre rutas).
- [x] La **búsqueda** filtra resultados por título usando una coincidencia con **regex**.
- [x] Los **filtros de categoría y destino** funcionan de forma independiente y se combinan correctamente con la búsqueda.
- [x] Los filtros activos y el término de búsqueda se reflejan en la **URL como query params**.
- [x] Al cargar la página con query params existentes, los inputs están **prerrellenados** y los resultados **ya están filtrados**.
- [x] `useEffect` se usa correctamente con arrays de dependencias adecuados (sin bucles infinitos ni dependencias faltantes).
- [x] `useState` se usa para gestionar **favoritos** y se pasa correctamente como props.
- [x] Existe al menos **un custom hook** que encapsula lógica con significado.
- [x] Los componentes están **divididos de forma lógica**: ningún fichero contiene toda la app.
- [x] Los **tipos e interfaces de TypeScript** están definidos y se usan de forma consistente.
- [x] La app es **responsive** y visualmente coherente entre páginas.
- [x] Las **referencias de diseño** están documentadas en el `CONTEXT.md`.

> **Nota:** la persistencia de favoritos entre recargas de página **no se evalúa** (`localStorage` está fuera del alcance).
