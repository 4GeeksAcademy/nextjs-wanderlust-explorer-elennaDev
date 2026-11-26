import { CATEGORIES } from "@/lib/categories";
import type { CountryOption } from "@/lib/experiences";
import type { CategoryId } from "@/types/filters";

type FilterBarProps = {
  category: CategoryId | "";
  destination: string;
  countries: readonly CountryOption[];
  onCategoryChange: (value: string) => void;
  onDestinationChange: (value: string) => void;
};

const selectClass =
  "w-full cursor-pointer rounded-md border border-line bg-white px-3 py-2.5 text-sm text-ink hover:border-petrol focus:outline-none focus:ring-2 focus:ring-petrol/30";

export default function FilterBar({
  category,
  destination,
  countries,
  onCategoryChange,
  onDestinationChange,
}: FilterBarProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2" role="group" aria-label="Filtros">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="filter-category" className="text-xs uppercase tracking-widest text-stone">
          Categoría
        </label>
        <select
          id="filter-category"
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
          className={`${selectClass} ${category ? "border-petrol text-petrol" : ""}`}
        >
          <option value="">Todas</option>
          {CATEGORIES.map(({ id, label }) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="filter-destination" className="text-xs uppercase tracking-widest text-stone">
          Destino (país)
        </label>
        <select
          id="filter-destination"
          value={destination}
          onChange={(event) => onDestinationChange(event.target.value)}
          className={`${selectClass} ${destination ? "border-petrol text-petrol" : ""}`}
        >
          <option value="">Todos</option>
          {countries.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
