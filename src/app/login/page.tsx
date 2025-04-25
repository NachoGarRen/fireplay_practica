"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { signIn } from "../../lib/auth"
import { useAuth } from "../../hooks/useAuth"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()

  const redirect = searchParams.get("redirect") || "/games"

  useEffect(() => {
    // Si el usuario ya está autenticado, redirigir
    if (user) {
      router.push(redirect)
    }
  }, [user, router, redirect])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const result = await signIn(email, password)

      if (result.success) {
        // Redirigir a la página guardada o a games por defecto
        const savedRedirect = sessionStorage.getItem("redirectAfterLogin")
        router.push(savedRedirect || redirect)
      } else {
        setError(result.error || "Error al iniciar sesión")
      }
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto my-12 p-6 card-riot">
      <h1 className="text-2xl font-bold mb-6 text-center title-riot">INICIAR SESIÓN</h1>

      {error && <div className="mb-6 p-4 bg-red-900 bg-opacity-50 text-white rounded-md">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-300 mb-2">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-white"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-300 mb-2">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-white"
            required
          />
        </div>

        <button type="submit" disabled={loading} className="w-full btn-riot">
          {loading ? "Iniciando sesión..." : "INICIAR SESIÓN"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-400">
          ¿No tienes cuenta?{" "}
          <Link
            href={`/register?redirect=${encodeURIComponent(redirect)}`}
            className="text-red-600 hover:text-red-500 transition-colors"
          >
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  )
}
