"use client";

import FavoriteButton from "@/components/favorites/FavoriteButton";
import Price from "@/components/ui/Price";
import Rating from "@/components/ui/Rating";
import { useFavorites } from "@/hooks/useFavorites";
import { categoryLabel } from "@/lib/categories";
import type { Experience } from "@/types/experience";

type ExperienceDetailProps = {
  experience: Experience;
};

export default function ExperienceDetail({ experience }: ExperienceDetailProps) {
  const { id, title, description, category, destination, price, rating, imageUrl } = experience;
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(id);

  return (
    <article className="grid gap-8 overflow-hidden rounded-xl bg-white shadow-sm md:grid-cols-2">
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element -- imágenes externas de picsum.photos */}
        <img
          src={imageUrl}
          alt={title}
          width={600}
          height={400}
          className="aspect-[3/2] h-full w-full object-cover"
        />
        <FavoriteButton
          isFavorite={favorite}
          onToggle={() => toggleFavorite(id)}
          title={title}
          className="absolute top-4 left-4"
        />
      </div>

      <div className="flex flex-col gap-5 p-6 md:p-8 md:pl-0">
        <span className="self-start rounded-full bg-chip px-2.5 py-0.5 text-[11px] text-stone">
          {categoryLabel(category)}
        </span>
        <h1 className="font-display text-4xl leading-tight font-light text-petrol md:text-5xl">
          {title}
        </h1>
        <p className="text-xs uppercase tracking-widest text-stone">{destination}</p>
        <p className="leading-relaxed text-stone">{description}</p>

        <dl className="mt-auto grid grid-cols-2 gap-4 border-t border-line pt-5">
          <div>
            <dt className="text-xs text-stone">Precio</dt>
            <dd className="mt-1 text-2xl text-ink">
              <Price amount={price} />
            </dd>
          </div>
          <div>
            <dt className="text-xs text-stone">Valoración</dt>
            <dd className="mt-2">
              <Rating value={rating} />
            </dd>
          </div>
        </dl>

        <button
          type="button"
          onClick={() => toggleFavorite(id)}
          aria-pressed={favorite}
          className={`rounded-full px-6 py-3 font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol ${
            favorite
              ? "border border-ink/70 text-ink hover:bg-ink hover:text-white"
              : "bg-ink text-white hover:bg-petrol"
          }`}
        >
          {favorite ? "Quitar de favoritos" : "Guardar en favoritos"}
        </button>
      </div>
    </article>
  );
}
