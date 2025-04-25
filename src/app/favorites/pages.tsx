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
      <div className="max-w-7xl mx-auto p-6 text-center py-16">
        <div className="h-8 w-32 bg-gray-700 rounded animate-pulse mx-auto mb-8"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="h-64 bg-gray-800 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6 animate-fadeIn">
      <h1 className="text-3xl font-bold mb-8 title-riot">MIS FAVORITOS</h1>

      {favorites.length === 0 ? (
        <div className="text-center py-16 card-riot p-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto mb-4 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <p className="text-gray-400 mb-6">No tienes juegos en favoritos</p>
          <Link href="/games" className="btn-riot">
            EXPLORAR JUEGOS
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((game) => (
            <div key={game.id} className="relative group">
              <GameCard game={game} />
              <button
                onClick={() => handleRemoveFromFavorites(game.id)}
                className="absolute top-2 right-2 bg-gray-900 bg-opacity-70 text-white p-2 rounded-full hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                aria-label="Eliminar de favoritos"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
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
