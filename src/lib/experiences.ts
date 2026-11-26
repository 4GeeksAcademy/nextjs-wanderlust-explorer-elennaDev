import { experiences } from "@/data/experiences";
import type { Experience } from "@/types/experience";

export type CountryOption = {
  /** Valor en minúsculas para la URL (`portugal`). */
  value: string;
  /** Nombre tal como aparece en el dataset (`Portugal`). */
  label: string;
};

export function getExperienceById(id: string): Experience | undefined {
  return experiences.find((experience) => experience.id === id);
}

/** País de un destino: la parte tras la última coma ("Lisboa, Portugal" → "Portugal"). */
export function getCountry(destination: string): string {
  const parts = destination.split(",");
  return parts[parts.length - 1].trim();
}

/** Países únicos del dataset, ordenados alfabéticamente. */
export function getCountries(): CountryOption[] {
  const labels = new Set(experiences.map((e) => getCountry(e.destination)));
  return [...labels]
    .sort((a, b) => a.localeCompare(b, "es"))
    .map((label) => ({ label, value: label.toLocaleLowerCase("es") }));
}

/** Experiencias cuyo id está en la lista, en el orden en que se guardaron. */
export function getExperiencesByIds(ids: readonly string[]): Experience[] {
  return ids
    .map((id) => getExperienceById(id))
    .filter((experience): experience is Experience => experience !== undefined);
}
