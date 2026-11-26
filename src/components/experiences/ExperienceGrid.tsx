import ExperienceCard from "@/components/experiences/ExperienceCard";
import type { Experience } from "@/types/experience";

type ExperienceGridProps = {
  experiences: readonly Experience[];
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
};

export default function ExperienceGrid({
  experiences,
  isFavorite,
  onToggleFavorite,
}: ExperienceGridProps) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {experiences.map((experience) => (
        <li key={experience.id} className="flex *:w-full">
          <ExperienceCard
            experience={experience}
            isFavorite={isFavorite(experience.id)}
            onToggleFavorite={onToggleFavorite}
          />
        </li>
      ))}
    </ul>
  );
}
