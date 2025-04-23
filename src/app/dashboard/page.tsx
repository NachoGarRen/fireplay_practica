"use client"

import { useEffect, useState } from "react"
import { useProtectedRoute } from "../../hooks/useProtectedRoute"
import { getFavorites } from "../../lib/favorites"
import { getCart } from "../../lib/cart"
import type { Game } from "../../types/games.types"
import type { CartItem } from "../../lib/cart"
import Link from "next/link"
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../../firebase/firebase"

interface Message {
  id: string
  message: string
  createdAt: string
}

export default function DashboardPage() {
  const { user, loading } = useProtectedRoute()
  const [favorites, setFavorites] = useState<Game[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadUserData = async () => {
      if (!loading && user) {
        setIsLoading(true)

        // Cargar favoritos
        const favoritesResult = await getFavorites(user.uid)
        if (favoritesResult.success) {
          setFavorites(favoritesResult.favorites)
        }

        // Cargar carrito
        const cartItems = getCart()
        setCart(cartItems)

        // Cargar mensajes
        try {
          const q = query(collection(db, "messages"), where("userId", "==", user.uid))

          const querySnapshot = await getDocs(q)
          const userMessages: Message[] = []

          querySnapshot.forEach((doc) => {
            const data = doc.data()
            userMessages.push({
              id: doc.id,
              message: data.message,
              createdAt: data.createdAt,
            })
          })

          setMessages(userMessages)
        } catch (error) {
          console.error("Error loading messages:", error)
        }

        setIsLoading(false)
      }
    }

    loadUserData()
  }, [user, loading])

  if (loading || isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center py-16">
        <p>Cargando datos...</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Mi cuenta</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                {user?.displayName?.charAt(0) || user?.email?.charAt(0) || "?"}
              </div>
              <h2 className="text-xl font-semibold">{user?.displayName || "Usuario"}</h2>
              <p className="text-gray-500">{user?.email}</p>
            </div>

            <div className="border-t pt-4">
              <p className="text-sm text-gray-500">
                Miembro desde:{" "}
                {user?.metadata.creationTime
                  ? new Date(user.metadata.creationTime).toLocaleDateString()
                  : "Desconocido"}
              </p>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Mis favoritos</h2>

            {favorites.length === 0 ? (
              <p className="text-gray-500">No tienes juegos en favoritos</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {favorites.slice(0, 4).map((game) => (
                  <Link
                    key={game.id}
                    href={`/game/${game.slug}`}
                    className="flex items-center p-2 hover:bg-gray-50 rounded"
                  >
                    <img
                      src={game.background_image || "/placeholder.svg"}
                      alt={game.name}
                      className="w-16 h-16 object-cover rounded mr-3"
                    />
                    <div>
                      <h3 className="font-medium">{game.name}</h3>
                      <p className="text-sm text-gray-500">Rating: {game.rating}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            <div className="mt-4 text-right">
              <Link href="/favorites" className="text-blue-600 hover:underline">
                Ver todos los favoritos
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Mi carrito</h2>

            {cart.length === 0 ? (
              <p className="text-gray-500">No tienes juegos en el carrito</p>
            ) : (
              <div className="space-y-4">
                {cart.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center">
                      <img
                        src={item.background_image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded mr-3"
                      />
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium">{(item.price * item.quantity).toFixed(2)} €</p>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 text-right">
              <Link href="/cart" className="text-blue-600 hover:underline">
                Ver carrito completo
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Mis mensajes</h2>

            {messages.length === 0 ? (
              <p className="text-gray-500">No has enviado ningún mensaje</p>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="border-b pb-3">
                    <p className="mb-2">{msg.message}</p>
                    <p className="text-sm text-gray-500">Enviado el: {new Date(msg.createdAt).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 text-right">
              <Link href="/contact" className="text-blue-600 hover:underline">
                Enviar nuevo mensaje
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
