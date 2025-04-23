"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useProtectedRoute } from "../../hooks/useProtectedRoute"
import { getFavorites, removeFromFavorites } from "../../lib/favorites"
import type { Game } from "../../types/games.types"
import GameCard from "../../components/game-card"
import Link from "next/link"

export default function FavoritesPage() {
  const { user, loading } = useProtectedRoute()
  const [favorites, setFavorites] = useState<Game[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loadFavorites = async () => {
      if (!loading && user) {
        setIsLoading(true)
        const result = await getFavorites(user.uid)
        if (result.success) {
          setFavorites(result.favorites)
        }
        setIsLoading(false)
      }
    }

    loadFavorites()
  }, [user, loading])

  const handleRemoveFromFavorites = async (gameId: number) => {
    if (!user) return

    const result = await removeFromFavorites(user.uid, gameId)
    if (result.success) {
      setFavorites(favorites.filter((game) => game.id !== gameId))
    }
  }

  if (loading || isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center py-16">
        <p>Cargando favoritos...</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Mis favoritos</h1>

      {favorites.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 mb-6">No tienes juegos en favoritos</p>
          <Link href="/games" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            Explorar juegos
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((game) => (
            <div key={game.id} className="relative">
              <GameCard game={game} />
              <button
                onClick={() => handleRemoveFromFavorites(game.id)}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                aria-label="Eliminar de favoritos"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
