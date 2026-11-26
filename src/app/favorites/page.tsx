"use client";

import Link from "next/link";
import ExperienceGrid from "@/components/experiences/ExperienceGrid";
import EmptyState from "@/components/ui/EmptyState";
import { useFavorites } from "@/hooks/useFavorites";
import { getExperiencesByIds } from "@/lib/experiences";

export default function FavoritesPage() {
  const { favoriteIds, isFavorite, toggleFavorite } = useFavorites();
  const favorites = getExperiencesByIds(favoriteIds);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
      <header className="mb-10 text-center">
        <p className="text-xs uppercase tracking-widest text-stone">Tu selección</p>
        <h1 className="mt-2 font-display text-5xl font-light text-petrol md:text-6xl">Favoritos</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-stone">
          Las experiencias que has guardado durante esta visita.
        </p>
      </header>

      {favorites.length > 0 ? (
        <>
          <p className="mb-6 text-xs text-stone">
            {favorites.length} {favorites.length === 1 ? "experiencia guardada" : "experiencias guardadas"}
          </p>
          <ExperienceGrid
            experiences={favorites}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
          />
        </>
      ) : (
        <EmptyState message="Aún no has guardado ninguna experiencia">
          <Link
            href="/experiences"
            className="rounded-full bg-ink px-6 py-3 font-medium text-white transition hover:bg-petrol"
          >
            Explorar experiencias
          </Link>
        </EmptyState>
      )}
    </div>
  );
}
