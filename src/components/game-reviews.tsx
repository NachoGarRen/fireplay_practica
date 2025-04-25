"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "../hooks/useAuth"
import { addReview, getGameReviews, deleteReview, hasUserReviewed } from "../lib/reviews"
import type { Review } from "../types/reviews.types"
import Link from "next/link"

interface GameReviewsProps {
  gameId: number
  gameName: string
}

export default function GameReviews({ gameId, gameName }: GameReviewsProps) {
  const { user } = useAuth()
  const [reviews, setReviews] = useState<Review[]>([])
  const [userReview, setUserReview] = useState<Review | null>(null)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const loadReviews = async () => {
      setIsLoading(true)
      const result = await getGameReviews(gameId)

      if (result.success) {
        setReviews(result.reviews)
      }

      if (user) {
        const userReviewCheck = await hasUserReviewed(user.uid, gameId)
        if (userReviewCheck.success && userReviewCheck.hasReviewed && userReviewCheck.reviewId) {
          const userReview = result.reviews.find((review) => review.id === userReviewCheck.reviewId) || null
          setUserReview(userReview)
        } else {
          setUserReview(null)
        }
      }

      setIsLoading(false)
    }

    loadReviews()
  }, [gameId, user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) return

    setError("")
    setSuccess("")
    setIsSubmitting(true)

    try {
      if (comment.trim().length < 10) {
        setError("La reseña debe tener al menos 10 caracteres")
        setIsSubmitting(false)
        return
      }

      const result = await addReview(
        user.uid,
        user.displayName || user.email?.split("@")[0] || "Usuario",
        gameId,
        rating,
        comment,
      )

      if (result.success && result.review) {
        setReviews([result.review, ...reviews])
        setUserReview(result.review)
        setComment("")
        setRating(5)
        setSuccess("¡Reseña publicada correctamente!")
        setShowForm(false)
      } else {
        setError(result.error || "Error al publicar la reseña")
      }
    } catch (err: any) {
      setError(err.message || "Error al publicar la reseña")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteReview = async (reviewId: string) => {
    if (!user) return

    const confirmed = window.confirm("¿Estás seguro de que quieres eliminar tu reseña?")
    if (!confirmed) return

    try {
      const result = await deleteReview(reviewId, user.uid)

      if (result.success) {
        setReviews(reviews.filter((review) => review.id !== reviewId))
        setUserReview(null)
        setSuccess("Reseña eliminada correctamente")
      } else {
        setError(result.error || "Error al eliminar la reseña")
      }
    } catch (err: any) {
      setError(err.message || "Error al eliminar la reseña")
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 ${star <= rating ? "text-yellow-500" : "text-gray-400"}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    )
  }

  const renderRatingInput = () => {
    return (
      <div className="flex items-center mb-4">
        <span className="mr-2">Puntuación:</span>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-8 w-8 ${star <= rating ? "text-yellow-500" : "text-gray-400"} hover:text-yellow-500 transition-colors`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-700 rounded w-1/4 mb-6"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card-riot p-6">
              <div className="flex justify-between mb-4">
                <div className="h-5 bg-gray-700 rounded w-1/4"></div>
                <div className="h-5 bg-gray-700 rounded w-1/6"></div>
              </div>
              <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 title-riot">RESEÑAS DE USUARIOS</h2>

      {error && <div className="mb-4 p-3 bg-red-900 bg-opacity-50 text-white rounded-md">{error}</div>}
      {success && <div className="mb-4 p-3 bg-green-900 bg-opacity-50 text-white rounded-md">{success}</div>}

      {user ? (
        userReview ? (
          <div className="card-riot p-6 mb-8 border-2 border-red-600">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="font-semibold text-lg mb-1">{userReview.userName} (Tú)</div>
                {renderStars(userReview.rating)}
              </div>
              <button
                onClick={() => handleDeleteReview(userReview.id)}
                className="text-gray-400 hover:text-red-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
            <p className="mb-2">{userReview.comment}</p>
            <p className="text-sm text-gray-400">{formatDate(userReview.createdAt)}</p>
          </div>
        ) : showForm ? (
          <div className="card-riot p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">Escribe tu reseña para {gameName}</h3>
            <form onSubmit={handleSubmit}>
              {renderRatingInput()}

              <div className="mb-4">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Escribe tu opinión sobre este juego..."
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-white"
                  rows={4}
                  required
                ></textarea>
              </div>

              <div className="flex gap-4">
                <button type="submit" disabled={isSubmitting} className="btn-riot">
                  {isSubmitting ? "Publicando..." : "Publicar reseña"}
                </button>

                <button type="button" onClick={() => setShowForm(false)} className="btn-riot-outline">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="mb-8">
            <button onClick={() => setShowForm(true)} className="btn-riot">
              Escribir una reseña
            </button>
          </div>
        )
      ) : (
        <div className="card-riot p-6 mb-8 text-center">
          <p className="mb-4">Debes iniciar sesión para dejar una reseña</p>
          <Link href="/login" className="btn-riot">
            INICIAR SESIÓN
          </Link>
        </div>
      )}

      {reviews.length === 0 ? (
        <div className="card-riot p-6 text-center">
          <p className="text-gray-400">No hay reseñas para este juego todavía. ¡Sé el primero en opinar!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews
            .filter((review) => !userReview || review.id !== userReview.id)
            .map((review) => (
              <div key={review.id} className="card-riot p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="font-semibold text-lg mb-1">{review.userName}</div>
                    {renderStars(review.rating)}
                  </div>
                  <div className="text-sm text-gray-400">{formatDate(review.createdAt)}</div>
                </div>
                <p>{review.comment}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}
