"use client";

import { useEffect, useState } from "react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { normalizeParam } from "@/hooks/useExperienceFilters";

type SearchBarProps = {
  /** Valor actual de `search` en la URL. */
  search: string;
  onSearchChange: (value: string) => void;
};

const DEBOUNCE_MS = 300;

export default function SearchBar({ search, onSearchChange }: SearchBarProps) {
  // Estado local para escribir con fluidez; arranca con el valor de la URL (prerrellenado).
  const [value, setValue] = useState(search);
  const [syncedSearch, setSyncedSearch] = useState(search);
  const debounced = useDebouncedValue(value, DEBOUNCE_MS);

  // Si la URL cambia desde fuera (Navbar, atrás/adelante), se sincroniza el input.
  // Se ignora el cambio si lo provocó este mismo buscador.
  if (search !== syncedSearch) {
    setSyncedSearch(search);
    if (search !== normalizeParam(debounced)) setValue(search);
  }

  useEffect(() => {
    // Solo cuando el usuario ha dejado de escribir y el valor difiere del de la URL.
    if (debounced !== value) return;
    if (normalizeParam(debounced) === search) return;
    onSearchChange(debounced);
  }, [debounced, value, search, onSearchChange]);

  return (
    <div className="relative w-full">
      <label htmlFor="experience-search" className="sr-only">
        Buscar experiencias por título
      </label>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 fill-none text-stone"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path strokeLinecap="round" d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z" />
      </svg>
      <input
        id="experience-search"
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Buscar por título: ruta, cata, yoga…"
        autoComplete="off"
        className="w-full rounded-lg border border-line bg-white px-4 py-3 pl-11 text-sm placeholder:text-stone focus:outline-none focus:ring-2 focus:ring-petrol/30"
      />
    </div>
  );
}
