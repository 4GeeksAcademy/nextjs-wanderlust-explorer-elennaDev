"use client";

import { useContext } from "react";
import {
  FavoritesContext,
  type FavoritesContextValue,
} from "@/components/favorites/FavoritesProvider";

/** Acceso a los favoritos compartidos. Debe usarse dentro de `FavoritesProvider`. */
export function useFavorites(): FavoritesContextValue {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites debe usarse dentro de <FavoritesProvider>.");
  }
  return context;
}
