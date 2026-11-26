import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex h-[60vh] min-h-[420px] items-center justify-center overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element -- imagen externa de picsum.photos */}
      <img
        src="https://picsum.photos/seed/wanderlust-hero/1600/900"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/50 to-black/30" />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 text-center">
        <p className="text-xs uppercase tracking-widest text-white/80">Wanderlust Explorer</p>
        <h1 className="font-display text-5xl font-light text-white italic md:text-7xl">
          Experiencias que inspiran viajes
        </h1>
        <p className="max-w-xl text-lg text-white/90">
          Busca, filtra y guarda actividades de aventura, cultura, gastronomía, bienestar y
          naturaleza en todo el mundo.
        </p>
        <Link
          href="/experiences"
          className="rounded-full bg-ink px-6 py-3 font-medium text-white transition hover:bg-petrol focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          Explorar experiencias
        </Link>
      </div>
    </section>
  );
}
