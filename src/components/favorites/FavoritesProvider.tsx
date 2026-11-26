"use client";

import { createContext, useCallback, useMemo, useState, type ReactNode } from "react";

export type FavoritesContextValue = {
  favoriteIds: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
};

export const FavoritesContext = createContext<FavoritesContextValue | null>(null);

type FavoritesProviderProps = {
  children: ReactNode;
};

/**
 * Única fuente de verdad de los favoritos. Vive en el layout raíz, que no se
 * desmonta al navegar con Link, así que el estado se comparte entre páginas.
 */
export default function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const isFavorite = useCallback((id: string) => favoriteIds.includes(id), [favoriteIds]);

  const toggleFavorite = useCallback((id: string) => {
    setFavoriteIds((current) =>
      current.includes(id) ? current.filter((favId) => favId !== id) : [...current, id],
    );
  }, []);

  const value = useMemo(
    () => ({ favoriteIds, isFavorite, toggleFavorite }),
    [favoriteIds, isFavorite, toggleFavorite],
  );

  return <FavoritesContext value={value}>{children}</FavoritesContext>;
}
