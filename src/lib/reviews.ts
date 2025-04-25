"use client"

import { collection, addDoc, query, where, getDocs, deleteDoc, doc, orderBy } from "firebase/firestore"
import { db } from "../firebase/firebase"
import type { Review } from "../types/reviews.types"

// Añadir reseña
export const addReview = async (userId: string, userName: string, gameId: number, rating: number, comment: string) => {
  try {
    // Verificar si el usuario ya ha dejado una reseña para este juego
    const q = query(collection(db, "reviews"), where("userId", "==", userId), where("gameId", "==", gameId))
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      return { success: false, error: "Ya has dejado una reseña para este juego" }
    }

    // Añadir nueva reseña
    const reviewData = {
      userId,
      userName,
      gameId,
      rating,
      comment,
      createdAt: new Date().toISOString(),
    }

    const docRef = await addDoc(collection(db, "reviews"), reviewData)

    return {
      success: true,
      review: {
        id: docRef.id,
        ...reviewData,
      },
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Error al añadir reseña",
    }
  }
}

// Obtener reseñas de un juego
export const getGameReviews = async (gameId: number) => {
  try {
    const q = query(collection(db, "reviews"), where("gameId", "==", gameId), orderBy("createdAt", "desc"))

    const querySnapshot = await getDocs(q)
    const reviews: Review[] = []

    querySnapshot.forEach((doc) => {
      const data = doc.data()
      reviews.push({
        id: doc.id,
        userId: data.userId,
        userName: data.userName,
        gameId: data.gameId,
        rating: data.rating,
        comment: data.comment,
        createdAt: data.createdAt,
      })
    })

    return { success: true, reviews }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Error al obtener reseñas",
      reviews: [],
    }
  }
}

// Eliminar reseña
export const deleteReview = async (reviewId: string, userId: string) => {
  try {
    // Verificar que la reseña pertenece al usuario
    const reviewRef = doc(db, "reviews", reviewId)
    const reviewDoc = await getDocs(query(collection(db, "reviews"), where("userId", "==", userId)))

    if (reviewDoc.empty) {
      return { success: false, error: "No tienes permiso para eliminar esta reseña" }
    }

    // Eliminar la reseña
    await deleteDoc(reviewRef)
    return { success: true }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Error al eliminar reseña",
    }
  }
}

// Verificar si un usuario ya ha dejado una reseña para un juego
export const hasUserReviewed = async (userId: string, gameId: number) => {
  try {
    const q = query(collection(db, "reviews"), where("userId", "==", userId), where("gameId", "==", gameId))
    const querySnapshot = await getDocs(q)

    return {
      success: true,
      hasReviewed: !querySnapshot.empty,
      reviewId: querySnapshot.empty ? null : querySnapshot.docs[0].id,
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Error al verificar reseña",
      hasReviewed: false,
      reviewId: null,
    }
  }
}
