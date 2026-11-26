"use client";

import Link from "next/link";
import ExperienceGrid from "@/components/experiences/ExperienceGrid";
import CategoryCircles from "@/components/home/CategoryCircles";
import Hero from "@/components/home/Hero";
import { experiences } from "@/data/experiences";
import { useFavorites } from "@/hooks/useFavorites";

/** Selección fija: las 6 experiencias mejor valoradas. */
const FEATURED = [...experiences].sort((a, b) => b.rating - a.rating).slice(0, 6);

function SectionBand({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-6 bg-ink px-4 py-8">
      <span className="h-px flex-1 bg-white/40" aria-hidden="true" />
      <h2 className="font-display text-2xl text-white italic md:text-3xl">{title}</h2>
      <span className="h-px flex-1 bg-white/40" aria-hidden="true" />
    </div>
  );
}

export default function HomePage() {
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <>
      <Hero />

      <SectionBand title="Descubre por categoría" />
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <CategoryCircles />
      </section>

      <SectionBand title="Experiencias destacadas" />
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <ExperienceGrid
          experiences={FEATURED}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
        />
        <div className="mt-12 flex justify-center">
          <Link
            href="/experiences"
            className="rounded-full bg-ink px-6 py-3 font-medium text-white transition hover:bg-petrol focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol"
          >
            Ver las 100 experiencias
          </Link>
        </div>
      </section>
    </>
  );
}
