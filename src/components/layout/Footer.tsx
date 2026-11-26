import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-sand">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3 md:px-8">
        <div>
          <p className="font-display text-2xl text-petrol">Wanderlust</p>
          <p className="mt-2 max-w-xs text-sm text-stone">
            Descubre, busca y guarda experiencias de viaje por todo el mundo.
          </p>
        </div>
        <div>
          <p className="text-xs text-stone">Explorar</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/experiences" className="text-petrol hover:underline">
                Todas las experiencias
              </Link>
            </li>
            <li>
              <Link href="/favorites" className="text-petrol hover:underline">
                Mis favoritos
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs text-stone">Cuenta</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/profile" className="text-petrol hover:underline">
                Perfil
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="bg-line/60 py-4 text-center text-xs text-stone">
        © 2026 Wanderlust Explorer · Proyecto educativo
      </p>
    </footer>
  );
}
