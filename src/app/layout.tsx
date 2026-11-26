import type { Metadata } from "next";
import { Cormorant_Garamond, Lato } from "next/font/google";
import FavoritesProvider from "@/components/favorites/FavoritesProvider";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Wanderlust Explorer",
  description: "Explora, busca y guarda experiencias de viaje.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${cormorant.variable} ${lato.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-sand font-sans text-ink">
        <FavoritesProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </FavoritesProvider>
      </body>
    </html>
  );
}
