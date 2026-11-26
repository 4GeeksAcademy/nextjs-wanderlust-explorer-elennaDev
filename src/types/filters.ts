import type { Category } from "./experience";

/** Id de categoría tal como aparece en la URL (`adventure`, `culture`…). */
export type CategoryId = Lowercase<Category>;

/**
 * Filtros del explorador. Todos los valores van en minúsculas.
 * - `search`: texto buscado en el título.
 * - `category`: id de categoría o "" si no hay filtro.
 * - `destination`: país (por ejemplo, "portugal") o "" si no hay filtro.
 */
export type ExperienceFilters = {
  search: string;
  category: CategoryId | "";
  destination: string;
};

export type FilterKey = keyof ExperienceFilters;
