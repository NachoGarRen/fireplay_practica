"use client"

import {
  updateProfile,
  updateEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth"
import { auth } from "../firebase/firebase"

// Actualizar perfil de usuario (nombre)
export const updateUserProfile = async (displayName: string) => {
  try {
    const user = auth.currentUser
    if (!user) {
      return { success: false, error: "No hay usuario autenticado" }
    }

    await updateProfile(user, { displayName })
    return { success: true }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Error al actualizar el perfil",
    }
  }
}

// Actualizar email de usuario (requiere reautenticación)
export const updateUserEmail = async (newEmail: string, currentPassword: string) => {
  try {
    const user = auth.currentUser
    if (!user || !user.email) {
      return { success: false, error: "No hay usuario autenticado o no tiene email" }
    }

    // Reautenticar usuario
    const credential = EmailAuthProvider.credential(user.email, currentPassword)
    await reauthenticateWithCredential(user, credential)

    // Actualizar email
    await updateEmail(user, newEmail)
    return { success: true }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Error al actualizar el email",
    }
  }
}

// Actualizar contraseña de usuario (requiere reautenticación)
export const updateUserPassword = async (currentPassword: string, newPassword: string) => {
  try {
    const user = auth.currentUser
    if (!user || !user.email) {
      return { success: false, error: "No hay usuario autenticado o no tiene email" }
    }

    // Reautenticar usuario
    const credential = EmailAuthProvider.credential(user.email, currentPassword)
    await reauthenticateWithCredential(user, credential)

    // Actualizar contraseña
    await updatePassword(user, newPassword)
    return { success: true }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Error al actualizar la contraseña",
    }
  }
}
