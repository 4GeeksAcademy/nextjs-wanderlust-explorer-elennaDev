"use client";

import { useCallback, useMemo } from "react";
import ExperienceGrid from "@/components/experiences/ExperienceGrid";
import FilterBar from "@/components/experiences/FilterBar";
import SearchBar from "@/components/experiences/SearchBar";
import EmptyState from "@/components/ui/EmptyState";
import { experiences } from "@/data/experiences";
import { useExperienceFilters } from "@/hooks/useExperienceFilters";
import { useFavorites } from "@/hooks/useFavorites";
import { getCountries } from "@/lib/experiences";
import { filterExperiences } from "@/lib/filterExperiences";

const COUNTRIES = getCountries();

export default function ExperiencesExplorer() {
  const { filters, setParam } = useExperienceFilters();
  const { isFavorite, toggleFavorite } = useFavorites();

  // Los resultados se derivan de la URL en cada render; no se copian a otro estado.
  const results = useMemo(() => filterExperiences(experiences, filters), [filters]);

  const handleSearchChange = useCallback((value: string) => setParam("search", value), [setParam]);
  const handleCategoryChange = useCallback(
    (value: string) => setParam("category", value),
    [setParam],
  );
  const handleDestinationChange = useCallback(
    (value: string) => setParam("destination", value),
    [setParam],
  );

  const count = results.length;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 rounded-xl bg-white p-5 shadow-sm md:p-6">
        <SearchBar search={filters.search} onSearchChange={handleSearchChange} />
        <FilterBar
          category={filters.category}
          destination={filters.destination}
          countries={COUNTRIES}
          onCategoryChange={handleCategoryChange}
          onDestinationChange={handleDestinationChange}
        />
      </div>

      <p className="text-xs text-stone" aria-live="polite">
        {count} {count === 1 ? "experiencia encontrada" : "experiencias encontradas"}
      </p>

      {count > 0 ? (
        <ExperienceGrid
          experiences={results}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
        />
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
