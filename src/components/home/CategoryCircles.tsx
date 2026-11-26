import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";

export default function CategoryCircles() {
  return (
    <ul className="flex flex-wrap justify-center gap-8 md:gap-12">
      {CATEGORIES.map(({ id, label }) => (
        <li key={id}>
          <Link
            href={`/experiences?category=${id}`}
            className="group flex flex-col items-center gap-2 focus-visible:outline-none"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- imágenes externas de picsum.photos */}
            <img
              src={`https://picsum.photos/seed/category-${id}/240/240`}
              alt=""
              width={96}
              height={96}
              loading="lazy"
              className="size-24 rounded-full object-cover ring-1 ring-line transition group-hover:ring-2 group-hover:ring-petrol group-focus-visible:ring-2 group-focus-visible:ring-petrol"
            />
            <span className="text-xs text-stone group-hover:text-petrol">{label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
