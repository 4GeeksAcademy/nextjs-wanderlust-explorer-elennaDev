import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-4 py-24 text-center md:px-8">
      <p className="text-xs uppercase tracking-widest text-stone">Error 404</p>
      <h1 className="font-display text-5xl font-light text-petrol md:text-6xl">
        Página no encontrada
      </h1>
      <p className="text-lg leading-relaxed text-stone">
        La experiencia o página que buscas no existe o ya no está disponible.
      </p>
      <Link
        href="/experiences"
        className="rounded-full bg-ink px-6 py-3 font-medium text-white transition hover:bg-petrol focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol"
      >
        Volver al explorador
      </Link>
    </div>
  );
}
