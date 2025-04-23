"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import AuthStatus from "./auth-status"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path ? "font-bold" : ""
  }

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold tracking-wide">
          Fireplay
        </Link>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/games" className={`hover:underline ${isActive("/games")}`}>
            Juegos
          </Link>
          <Link href="/favorites" className={`hover:underline ${isActive("/favorites")}`}>
            Favoritos
          </Link>
          <Link href="/cart" className={`hover:underline ${isActive("/cart")}`}>
            Carrito
          </Link>
          <Link href="/contact" className={`hover:underline ${isActive("/contact")}`}>
            Contacto
          </Link>
          <AuthStatus />
        </nav>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <nav className="md:hidden pt-4 pb-2 flex flex-col space-y-2">
          <Link
            href="/games"
            className={`hover:bg-blue-700 p-2 rounded ${isActive("/games")}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Juegos
          </Link>
          <Link
            href="/favorites"
            className={`hover:bg-blue-700 p-2 rounded ${isActive("/favorites")}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Favoritos
          </Link>
          <Link
            href="/cart"
            className={`hover:bg-blue-700 p-2 rounded ${isActive("/cart")}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Carrito
          </Link>
          <Link
            href="/contact"
            className={`hover:bg-blue-700 p-2 rounded ${isActive("/contact")}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Contacto
          </Link>
          <div className="p-2">
            <AuthStatus />
          </div>
        </nav>
      )}
    </header>
  )
}
