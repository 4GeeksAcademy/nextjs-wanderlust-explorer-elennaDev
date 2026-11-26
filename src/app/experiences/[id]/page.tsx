import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ExperienceDetail from "@/components/experiences/ExperienceDetail";
import { experiences } from "@/data/experiences";
import { getExperienceById } from "@/lib/experiences";

/** Las 100 experiencias se prerenderizan en el build. */
export function generateStaticParams() {
  return experiences.map(({ id }) => ({ id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/experiences/[id]">): Promise<Metadata> {
  const { id } = await params;
  const experience = getExperienceById(id);
  return { title: `${experience?.title ?? "Experiencia"} · Wanderlust Explorer` };
}

export default async function ExperienceDetailPage({ params }: PageProps<"/experiences/[id]">) {
  const { id } = await params;
  const experience = getExperienceById(id);

  if (!experience) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
      <nav aria-label="Migas de pan" className="mb-6 text-xs text-stone">
        <Link href="/experiences" className="hover:text-petrol hover:underline">
          Experiencias
        </Link>
        <span className="mx-2" aria-hidden="true">
          ›
        </span>
        <span className="text-petrol">{experience.title}</span>
      </nav>
      <ExperienceDetail experience={experience} />
    </div>
  );
}
