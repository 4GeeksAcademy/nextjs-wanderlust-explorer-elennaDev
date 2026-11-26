import Link from "next/link";
import FavoriteButton from "@/components/favorites/FavoriteButton";
import Price from "@/components/ui/Price";
import Rating from "@/components/ui/Rating";
import { categoryLabel } from "@/lib/categories";
import type { Experience } from "@/types/experience";

type ExperienceCardProps = {
  experience: Experience;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
};

export default function ExperienceCard({
  experience,
  isFavorite,
  onToggleFavorite,
}: ExperienceCardProps) {
  const { id, title, description, category, destination, price, rating, imageUrl } = experience;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-md">
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element -- imágenes externas de picsum.photos */}
        <img
          src={imageUrl}
          alt={title}
          width={600}
          height={400}
          loading="lazy"
          className="aspect-[3/2] w-full object-cover"
        />
        <span className="absolute top-3 right-3 rounded bg-petrol-dark/90 px-2 py-0.5 text-xs text-white">
          <Price amount={price} />
        </span>
        <FavoriteButton
          isFavorite={isFavorite}
          onToggle={() => onToggleFavorite(id)}
          title={title}
          className="absolute top-3 left-3 z-10"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-xs text-stone">{destination}</p>
        <h3 className="font-display text-2xl leading-snug text-petrol line-clamp-2">
          <Link
            href={`/experiences/${id}`}
            className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:underline"
          >
            {title}
          </Link>
        </h3>
        <p className="text-sm leading-relaxed text-stone line-clamp-3">{description}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <span className="rounded-full bg-chip px-2.5 py-0.5 text-[11px] text-stone">
            {categoryLabel(category)}
          </span>
          <Rating value={rating} />
        </div>
      </div>
    </article>
  );
}
