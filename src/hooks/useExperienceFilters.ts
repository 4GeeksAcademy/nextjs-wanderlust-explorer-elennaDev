"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toCategoryId } from "@/lib/categories";
import type { ExperienceFilters, FilterKey } from "@/types/filters";

type UseExperienceFilters = {
  filters: ExperienceFilters;
  setParam: (key: FilterKey, value: string) => void;
};

/** Normaliza un valor para la URL: sin espacios sobrantes y en minúsculas. */
export function normalizeParam(value: string): string {
  return value.trim().toLocaleLowerCase("es");
}

/**
 * La URL es la única fuente de verdad de búsqueda y filtros.
 * Lee `search`, `category` y `destination` y permite actualizarlos sin recargar.
 */
export function useExperienceFilters(): UseExperienceFilters {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const filters = useMemo<ExperienceFilters>(
    () => ({
      search: normalizeParam(searchParams.get("search") ?? ""),
      category: toCategoryId(searchParams.get("category")),
      destination: normalizeParam(searchParams.get("destination") ?? ""),
    }),
    [searchParams],
  );

  const setParam = useCallback(
    (key: FilterKey, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const normalized = normalizeParam(value);

      if (normalized) params.set(key, normalized);
      else params.delete(key);

      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [searchParams, pathname, router],
  );

  return { filters, setParam };
}
