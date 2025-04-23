"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../hooks/useAuth"
import { addToFavorites, removeFromFavorites, isGameInFavorites } from "../lib/favorites"
import type { Game } from "../types/games.types"
import { useRouter } from "next/navigation"

interface AddToFavoritesButtonProps {
  gameId: number
  game: Game
}

export default function AddToFavoritesButton({ gameId, game }: AddToFavoritesButtonProps) {
  const { user } = useAuth()
  const [isFavorite, setIsFavorite] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (user) {
        setIsLoading(true)
        const result = await isGameInFavorites(user.uid, gameId)
        if (result.success) {
          setIsFavorite(result.isFavorite)
        }
        setIsLoading(false)
      } else {
        setIsLoading(false)
      }
    }

    checkFavoriteStatus()
  }, [user, gameId])

  const handleToggleFavorite = async () => {
    if (!user) {
      router.push("/login")
      return
    }

    setIsLoading(true)

    if (isFavorite) {
      const result = await removeFromFavorites(user.uid, gameId)
      if (result.success) {
        setIsFavorite(false)
      }
    } else {
      const result = await addToFavorites(user.uid, game)
      if (result.success) {
        setIsFavorite(true)
      }
    }

    setIsLoading(false)
  }

  return (
    <button
      onClick={handleToggleFavorite}
      disabled={isLoading}
      className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition ${
        isFavorite ? "bg-red-100 text-red-600 hover:bg-red-200" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill={isFavorite ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      <span>{isFavorite ? "Favorito" : "Añadir a favoritos"}</span>
    </button>
  )
}
