import type { Metadata } from "next";
import { Suspense } from "react";
import ExperiencesExplorer from "@/components/experiences/ExperiencesExplorer";

export const metadata: Metadata = {
  title: "Experiencias · Wanderlust Explorer",
};

function ExplorerFallback() {
  return (
    <div className="flex flex-col gap-8" aria-hidden="true">
      <div className="h-36 animate-pulse rounded-xl bg-white shadow-sm" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <div key={item} className="h-96 animate-pulse rounded-xl bg-white shadow-sm" />
        ))}
      </div>
    </div>
  );
}

export default function ExperiencesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
      <header className="mb-10 text-center">
        <p className="text-xs uppercase tracking-widest text-stone">Explora</p>
        <h1 className="mt-2 font-display text-5xl font-light text-petrol md:text-6xl">
          Experiencias
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-stone">
          Busca por título y filtra por categoría o país para encontrar tu próxima aventura.
        </p>
      </header>

      {/* useSearchParams exige un límite de Suspense para el build de producción. */}
      <Suspense fallback={<ExplorerFallback />}>
        <ExperiencesExplorer />
      </Suspense>
    </div>
  );
}
