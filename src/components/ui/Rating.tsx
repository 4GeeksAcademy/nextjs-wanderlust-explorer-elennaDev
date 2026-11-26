type RatingProps = {
  /** Valoración de 1 a 5. */
  value: number;
};

const STARS = [1, 2, 3, 4, 5] as const;

export default function Rating({ value }: RatingProps) {
  const rounded = Math.round(value);

  return (
    <span
      className="inline-flex items-center gap-1 text-sm"
      aria-label={`Valoración: ${value.toFixed(1)} de 5`}
    >
      <span aria-hidden="true" className="tracking-tight">
        {STARS.map((star) => (
          <span key={star} className={star <= rounded ? "text-sun" : "text-line"}>
            ★
          </span>
        ))}
      </span>
      <span className="text-stone">{value.toFixed(1)}</span>
    </span>
  );
}
