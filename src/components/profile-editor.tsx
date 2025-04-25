"use client"

import type React from "react"

import { useState } from "react"
import { updateUserProfile, updateUserEmail, updateUserPassword } from "../lib/user"
import { useAuth } from "../hooks/useAuth"

export default function ProfileEditor() {
  const { user } = useAuth()
  const [displayName, setDisplayName] = useState(user?.displayName || "")
  const [email, setEmail] = useState(user?.email || "")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [nameError, setNameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const [nameSuccess, setNameSuccess] = useState("")
  const [emailSuccess, setEmailSuccess] = useState("")
  const [passwordSuccess, setPasswordSuccess] = useState("")

  const [isUpdatingName, setIsUpdatingName] = useState(false)
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false)
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setNameError("")
    setNameSuccess("")
    setIsUpdatingName(true)

    try {
      if (!displayName.trim()) {
        setNameError("El nombre no puede estar vacío")
        setIsUpdatingName(false)
        return
      }

      const result = await updateUserProfile(displayName)

      if (result.success) {
        setNameSuccess("Nombre actualizado correctamente")
      } else {
        setNameError(result.error || "Error al actualizar el nombre")
      }
    } catch (err: any) {
      setNameError(err.message || "Error al actualizar el nombre")
    } finally {
      setIsUpdatingName(false)
    }
  }

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setEmailError("")
    setEmailSuccess("")
    setIsUpdatingEmail(true)

    try {
      if (!email.trim()) {
        setEmailError("El email no puede estar vacío")
        setIsUpdatingEmail(false)
        return
      }

      if (!currentPassword) {
        setEmailError("Debes introducir tu contraseña actual")
        setIsUpdatingEmail(false)
        return
      }

      const result = await updateUserEmail(email, currentPassword)

      if (result.success) {
        setEmailSuccess("Email actualizado correctamente")
        setCurrentPassword("")
      } else {
        setEmailError(result.error || "Error al actualizar el email")
      }
    } catch (err: any) {
      setEmailError(err.message || "Error al actualizar el email")
    } finally {
      setIsUpdatingEmail(false)
    }
  }

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError("")
    setPasswordSuccess("")
    setIsUpdatingPassword(true)

    try {
      if (!currentPassword) {
        setPasswordError("Debes introducir tu contraseña actual")
        setIsUpdatingPassword(false)
        return
      }

      if (newPassword.length < 6) {
        setPasswordError("La nueva contraseña debe tener al menos 6 caracteres")
        setIsUpdatingPassword(false)
        return
      }

      if (newPassword !== confirmPassword) {
        setPasswordError("Las contraseñas no coinciden")
        setIsUpdatingPassword(false)
        return
      }

      const result = await updateUserPassword(currentPassword, newPassword)

      if (result.success) {
        setPasswordSuccess("Contraseña actualizada correctamente")
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
      } else {
        setPasswordError(result.error || "Error al actualizar la contraseña")
      }
    } catch (err: any) {
      setPasswordError(err.message || "Error al actualizar la contraseña")
    } finally {
      setIsUpdatingPassword(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="card-riot p-6">
        <h2 className="text-xl font-bold mb-6 title-riot">ACTUALIZAR PERFIL</h2>

        {nameError && <div className="mb-4 p-3 bg-red-900 bg-opacity-50 text-white rounded-md">{nameError}</div>}
        {nameSuccess && <div className="mb-4 p-3 bg-green-900 bg-opacity-50 text-white rounded-md">{nameSuccess}</div>}

        <form onSubmit={handleUpdateProfile}>
          <div className="mb-4">
            <label htmlFor="displayName" className="block text-gray-300 mb-2">
              Nombre
            </label>
            <input
              type="text"
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-white"
            />
          </div>

          <button type="submit" disabled={isUpdatingName} className="btn-riot">
            {isUpdatingName ? "Actualizando..." : "Actualizar nombre"}
          </button>
        </form>
      </div>

      <div className="card-riot p-6">
        <h2 className="text-xl font-bold mb-6 title-riot">ACTUALIZAR EMAIL</h2>

        {emailError && <div className="mb-4 p-3 bg-red-900 bg-opacity-50 text-white rounded-md">{emailError}</div>}
        {emailSuccess && (
          <div className="mb-4 p-3 bg-green-900 bg-opacity-50 text-white rounded-md">{emailSuccess}</div>
        )}

        <form onSubmit={handleUpdateEmail}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-300 mb-2">
              Nuevo email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-white"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="currentPasswordEmail" className="block text-gray-300 mb-2">
              Contraseña actual (para verificar)
            </label>
            <input
              type="password"
              id="currentPasswordEmail"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-white"
            />
          </div>

          <button type="submit" disabled={isUpdatingEmail} className="btn-riot">
            {isUpdatingEmail ? "Actualizando..." : "Actualizar email"}
          </button>
        </form>
      </div>

      <div className="card-riot p-6">
        <h2 className="text-xl font-bold mb-6 title-riot">CAMBIAR CONTRASEÑA</h2>

        {passwordError && (
          <div className="mb-4 p-3 bg-red-900 bg-opacity-50 text-white rounded-md">{passwordError}</div>
        )}
        {passwordSuccess && (
          <div className="mb-4 p-3 bg-green-900 bg-opacity-50 text-white rounded-md">{passwordSuccess}</div>
        )}

        <form onSubmit={handleUpdatePassword}>
          <div className="mb-4">
            <label htmlFor="currentPassword" className="block text-gray-300 mb-2">
              Contraseña actual
            </label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-white"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-gray-300 mb-2">
              Nueva contraseña
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-white"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-300 mb-2">
              Confirmar nueva contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-white"
            />
          </div>

          <button type="submit" disabled={isUpdatingPassword} className="btn-riot">
            {isUpdatingPassword ? "Actualizando..." : "Cambiar contraseña"}
          </button>
        </form>
      </div>
    </div>
  )
}
