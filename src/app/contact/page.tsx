"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { collection, addDoc } from "firebase/firestore"
import { db } from "../../firebase/firebase"

export default function ContactPage() {
  const { user } = useAuth()
  const [name, setName] = useState(user?.displayName || "")
  const [email, setEmail] = useState(user?.email || "")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)
    setLoading(true)

    try {
      // Validar campos
      if (!name.trim() || !email.trim() || !message.trim()) {
        setError("Todos los campos son obligatorios")
        setLoading(false)
        return
      }

      // Guardar mensaje en Firestore
      await addDoc(collection(db, "messages"), {
        name,
        email,
        message,
        userId: user?.uid || "anonymous",
        createdAt: new Date().toISOString(),
      })

      // Limpiar formulario y mostrar éxito
      setMessage("")
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || "Error al enviar el mensaje")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Contacto</h1>

      {error && <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">{error}</div>}

      {success && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
          ¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 mb-2">
              Mensaje
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? "Enviando..." : "Enviar mensaje"}
          </button>
        </form>
      </div>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Información de contacto</h2>
          <p className="mb-2">
            <strong>Email:</strong> info@fireplay.com
          </p>
          <p className="mb-2">
            <strong>Teléfono:</strong> +34 912 345 678
          </p>
          <p>
            <strong>Dirección:</strong> Calle Ejemplo 123, 28001 Madrid
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Horario de atención</h2>
          <p className="mb-2">
            <strong>Lunes a Viernes:</strong> 9:00 - 18:00
          </p>
          <p className="mb-2">
            <strong>Sábados:</strong> 10:00 - 14:00
          </p>
          <p>
            <strong>Domingos:</strong> Cerrado
          </p>
        </div>
      </div>
    </div>
  )
}
