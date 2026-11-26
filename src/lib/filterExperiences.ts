import type { Experience } from "@/types/experience";
import type { ExperienceFilters } from "@/types/filters";

/** Escapa los caracteres especiales para usar un texto literal dentro de una RegExp. */
export function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Filtra experiencias combinando (Y lógico):
 * - título: regex case-insensitive con el texto de búsqueda;
 * - categoría: igualdad en minúsculas;
 * - destino: el destino contiene el país, sin distinguir mayúsculas.
 * Cada criterio se aplica solo si tiene valor.
 */
export function filterExperiences(
  list: readonly Experience[],
  { search, category, destination }: ExperienceFilters,
): Experience[] {
  const term = search.trim();
  const titleRegex = term ? new RegExp(escapeRegExp(term), "i") : null;
  const country = destination.trim().toLocaleLowerCase("es");

  return list.filter((experience) => {
    if (titleRegex && !titleRegex.test(experience.title)) return false;
    if (category && experience.category.toLowerCase() !== category) return false;
    if (country && !experience.destination.toLocaleLowerCase("es").includes(country)) {
      return false;
    }
    return true;
  });
}
