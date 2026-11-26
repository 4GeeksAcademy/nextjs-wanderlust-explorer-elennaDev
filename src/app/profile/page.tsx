"use client";

import Link from "next/link";
import { useFavorites } from "@/hooks/useFavorites";

/** Datos simulados y estáticos del usuario. */
const USER = {
  name: "Viajero Wanderlust",
  initials: "VW",
  location: "Madrid, España",
  memberSince: "2026",
  bio: "Amante de las rutas de senderismo, la buena mesa y los atardeceres junto al mar.",
} as const;

export default function ProfilePage() {
  const { favoriteIds } = useFavorites();
  const count = favoriteIds.length;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-8 md:py-16">
      <header className="mb-10 text-center">
        <p className="text-xs uppercase tracking-widest text-stone">Tu cuenta</p>
        <h1 className="mt-2 font-display text-5xl font-light text-petrol md:text-6xl">Perfil</h1>
      </header>

      <section className="flex flex-col items-center gap-6 rounded-xl bg-white p-8 text-center shadow-sm md:flex-row md:text-left">
        <div
          aria-hidden="true"
          className="grid size-24 shrink-0 place-items-center rounded-full bg-petrol font-display text-3xl text-white"
        >
          {USER.initials}
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-display text-3xl text-petrol">{USER.name}</h2>
          <p className="text-xs uppercase tracking-widest text-stone">
            {USER.location} · Miembro desde {USER.memberSince}
          </p>
          <p className="text-sm leading-relaxed text-stone">{USER.bio}</p>
        </div>
      </section>

      <section className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl bg-white p-6 text-center shadow-sm">
          <p className="text-xs uppercase tracking-widest text-stone">Favoritos guardados</p>
          <p className="mt-2 font-display text-6xl text-petrol lining-nums" aria-live="polite">
            {count}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl bg-white p-6 text-center shadow-sm">
          <p className="text-sm text-stone">
            {count > 0 ? "Revisa las experiencias que has guardado." : "Todavía no has guardado ninguna."}
          </p>
          <Link
            href={count > 0 ? "/favorites" : "/experiences"}
            className="rounded-full bg-ink px-6 py-3 font-medium text-white transition hover:bg-petrol focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol"
          >
            {count > 0 ? "Ver favoritos" : "Explorar experiencias"}
          </Link>
        </div>
      </section>
    </div>
  );
}
