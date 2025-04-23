"use client"

import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from "firebase/firestore"
import { db } from "../firebase/firebase"
import type { Game } from "../types/games.types"

// Añadir juego a favoritos
export const addToFavorites = async (userId: string, game: Game) => {
  try {
    // Verificar si ya existe en favoritos
    const q = query(collection(db, "favorites"), where("userId", "==", userId), where("gameId", "==", game.id))

    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      // No existe, añadir a favoritos
      await addDoc(collection(db, "favorites"), {
        userId,
        gameId: game.id,
        name: game.name,
        slug: game.slug,
        background_image: game.background_image,
        rating: game.rating,
        createdAt: new Date().toISOString(),
      })
      return { success: true }
    } else {
      // Ya existe en favoritos
      return { success: false, error: "El juego ya está en favoritos" }
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Error al añadir a favoritos",
    }
  }
}

// Obtener favoritos de un usuario
export const getFavorites = async (userId: string) => {
  try {
    const q = query(collection(db, "favorites"), where("userId", "==", userId))

    const querySnapshot = await getDocs(q)
    const favorites: Game[] = []

    querySnapshot.forEach((doc) => {
      const data = doc.data()
      favorites.push({
        id: data.gameId,
        slug: data.slug,
        name: data.name,
        background_image: data.background_image,
        rating: data.rating,
      })
    })

    return { success: true, favorites }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Error al obtener favoritos",
      favorites: [],
    }
  }
}

// Eliminar juego de favoritos
export const removeFromFavorites = async (userId: string, gameId: number) => {
  try {
    const q = query(collection(db, "favorites"), where("userId", "==", userId), where("gameId", "==", gameId))

    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      // Eliminar el documento
      await deleteDoc(doc(db, "favorites", querySnapshot.docs[0].id))
      return { success: true }
    } else {
      return { success: false, error: "El juego no está en favoritos" }
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Error al eliminar de favoritos",
    }
  }
}

// Verificar si un juego está en favoritos
export const isGameInFavorites = async (userId: string, gameId: number) => {
  try {
    const q = query(collection(db, "favorites"), where("userId", "==", userId), where("gameId", "==", gameId))

    const querySnapshot = await getDocs(q)
    return { success: true, isFavorite: !querySnapshot.empty }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Error al verificar favoritos",
      isFavorite: false,
    }
  }
}
