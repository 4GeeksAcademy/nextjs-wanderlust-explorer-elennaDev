"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { useFavorites } from "@/hooks/useFavorites";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/experiences", label: "Experiencias" },
  { href: "/favorites", label: "Favoritos" },
  { href: "/profile", label: "Perfil" },
] as const;

function isActive(pathname: string | null, href: string): boolean {
  if (!pathname) return false;
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

function NavLinks({ pathname }: { pathname: string | null }) {
  const { favoriteIds } = useFavorites();

  return (
    <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
      {LINKS.map(({ href, label }) => {
        const active = isActive(pathname, href);
        return (
          <li key={href}>
            <Link
              href={href}
              aria-current={active ? "page" : undefined}
              className={`inline-flex items-center gap-1.5 border-b-2 pb-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol ${
                active
                  ? "border-petrol text-petrol"
                  : "border-transparent text-ink hover:text-petrol"
              }`}
            >
              {label}
              {href === "/favorites" && favoriteIds.length > 0 && (
                <span className="grid size-5 place-items-center rounded-full bg-petrol text-[10px] text-white">
                  {favoriteIds.length}
                </span>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** Lee la ruta actual. Va dentro de Suspense porque usePathname puede suspender con Cache Components. */
function ActiveNavLinks() {
  const pathname = usePathname();
  return <NavLinks pathname={pathname} />;
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20">
      <div className="bg-petrol-dark py-2 text-xs text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-8">
          <span>Wanderlust Explorer</span>
          <span className="opacity-80">Experiencias de viaje</span>
        </div>
      </div>
      <nav
        aria-label="Navegación principal"
        className="border-b border-line bg-sand/95 backdrop-blur"
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 md:px-8">
          <Link
            href="/"
            className="font-display text-2xl leading-none text-petrol focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol"
          >
            Wanderlust
          </Link>
          <Suspense fallback={<NavLinks pathname={null} />}>
            <ActiveNavLinks />
          </Suspense>
        </div>
      </nav>
    </header>
  );
}
