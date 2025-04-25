"use client"

import { useAuth } from "../hooks/useAuth"
import { signOut } from "../lib/auth"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"

export default function AuthStatus() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  if (loading) {
    return <div className="h-8 w-8 rounded-full bg-gray-700 animate-pulse"></div>
  }

  if (!user) {
    return (
      <div className="flex space-x-4">
        <Link href="/login" className="btn-riot-outline py-2 px-4 text-sm">
          INICIAR SESIÓN
        </Link>
        <Link href="/register" className="btn-riot py-2 px-4 text-sm">
          REGISTRARSE
        </Link>
      </div>
    )
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
          {user.displayName?.charAt(0) || user.email?.charAt(0) || "?"}
        </div>
        <span className="hidden md:block">{user.displayName || user.email?.split("@")[0] || "Usuario"}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg py-1 z-50 animate-fadeIn">
          <Link
            href="/dashboard"
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
            onClick={() => setIsDropdownOpen(false)}
          >
            Mi cuenta
          </Link>
          <Link
            href="/cart"
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
            onClick={() => setIsDropdownOpen(false)}
          >
            Mi carrito
          </Link>
          <button
            onClick={() => {
              setIsDropdownOpen(false)
              handleSignOut()
            }}
            className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white border-t border-gray-700 mt-1"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  )
}
