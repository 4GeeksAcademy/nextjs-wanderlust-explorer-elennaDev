import type { Category } from "@/types/experience";
import type { CategoryId } from "@/types/filters";

export type CategoryOption = {
  id: CategoryId;
  value: Category;
  label: string;
};

export const CATEGORIES: readonly CategoryOption[] = [
  { id: "adventure", value: "Adventure", label: "Aventura" },
  { id: "culture", value: "Culture", label: "Cultura" },
  { id: "food", value: "Food", label: "Gastronomía" },
  { id: "wellness", value: "Wellness", label: "Bienestar" },
  { id: "nature", value: "Nature", label: "Naturaleza" },
];

/** Convierte un valor de la URL en un id de categoría válido, o "" si no lo es. */
export function toCategoryId(value: string | null): CategoryId | "" {
  const normalized = (value ?? "").toLowerCase();
  return CATEGORIES.find((c) => c.id === normalized)?.id ?? "";
}

/** Convierte un id de la URL (`adventure`) en el valor del tipo `Category` (`Adventure`). */
export function categoryFromId(id: CategoryId): Category {
  const found = CATEGORIES.find((c) => c.id === id);
  if (!found) throw new Error(`Categoría desconocida: ${id}`);
  return found.value;
}

/** Etiqueta en castellano de una categoría. */
export function categoryLabel(category: Category): string {
  return CATEGORIES.find((c) => c.value === category)?.label ?? category;
}
