"use client"

import { useAuth } from "../hooks/useAuth"
import { signOut } from "../lib/auth"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function AuthStatus() {
  const { user, loading } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  if (loading) {
    return <div className="h-8"></div>
  }

  if (!user) {
    return (
      <div className="flex space-x-4">
        <Link href="/login" className="text-white hover:underline">
          Iniciar sesión
        </Link>
        <Link href="/register" className="text-white hover:underline">
          Registrarse
        </Link>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-4">
      <Link href="/dashboard" className="text-white hover:underline">
        {user.displayName || user.email?.split("@")[0] || "Usuario"}
      </Link>
      <button onClick={handleSignOut} className="text-white hover:underline">
        Cerrar sesión
      </button>
    </div>
  )
}
