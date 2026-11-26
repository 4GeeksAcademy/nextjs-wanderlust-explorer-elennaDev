type FavoriteButtonProps = {
  isFavorite: boolean;
  onToggle: () => void;
  /** Título de la experiencia, para el texto accesible. */
  title: string;
  className?: string;
};

export default function FavoriteButton({
  isFavorite,
  onToggle,
  title,
  className = "",
}: FavoriteButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? `Quitar «${title}» de favoritos` : `Añadir «${title}» a favoritos`}
      className={`grid size-9 cursor-pointer place-items-center rounded-full bg-white/90 shadow-sm transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={`size-5 ${isFavorite ? "fill-petrol text-petrol" : "fill-none text-ink"}`}
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </svg>
    </button>
  );
}
