"use client"

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
  type User,
} from "firebase/auth"
import { auth } from "../firebase/firebase"
import { migrateGuestCart } from "./cart"

// Registro de usuario
export const registerUser = async (email: string, password: string, displayName: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    // Actualizar el perfil con el nombre
    if (userCredential.user) {
      await updateProfile(userCredential.user, {
        displayName: displayName,
      })

      // Migrar carrito de invitado a usuario
      migrateGuestCart(userCredential.user.uid)
    }
    return { success: true, user: userCredential.user }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Error al registrar usuario",
    }
  }
}

// Inicio de sesión
export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)

    // Migrar carrito de invitado a usuario
    migrateGuestCart(userCredential.user.uid)

    return { success: true, user: userCredential.user }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Error al iniciar sesión",
    }
  }
}

// Cerrar sesión
export const signOut = async () => {
  try {
    await firebaseSignOut(auth)
    return { success: true }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Error al cerrar sesión",
    }
  }
}

// Obtener usuario actual
export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      resolve(user)
    })
  })
}
