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
import ProfileEditor from "../../components/profile-editor"

interface Message {
  id: string
  message: string
  createdAt: string
}

interface TabProps {
  label: string
  active: boolean
  onClick: () => void
}

const Tab = ({ label, active, onClick }: TabProps) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 font-semibold transition-colors ${
      active ? "text-white border-b-2 border-red-600" : "text-gray-400 hover:text-white"
    }`}
  >
    {label}
  </button>
)

export default function DashboardPage() {
  const { user, loading } = useProtectedRoute()
  const [favorites, setFavorites] = useState<Game[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

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
        const cartItems = getCart(user.uid)
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
      <div className="max-w-7xl mx-auto p-6 text-center py-16">
        <div className="h-8 w-32 bg-gray-700 rounded animate-pulse mx-auto mb-8"></div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="h-64 bg-gray-800 rounded-lg animate-pulse"></div>
          <div className="md:col-span-2 h-64 bg-gray-800 rounded-lg animate-pulse"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6 animate-fadeIn">
      <h1 className="text-3xl font-bold mb-8 title-riot">MI CUENTA</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="card-riot p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
                {user?.displayName?.charAt(0) || user?.email?.charAt(0) || "?"}
              </div>
              <h2 className="text-xl font-semibold">{user?.displayName || "Usuario"}</h2>
              <p className="text-gray-400">{user?.email}</p>
            </div>

            <div className="border-t border-gray-800 pt-4">
              <p className="text-sm text-gray-400">
                Miembro desde:{" "}
                {user?.metadata.creationTime
                  ? new Date(user.metadata.creationTime).toLocaleDateString()
                  : "Desconocido"}
              </p>
            </div>
          </div>

          <div className="mt-6 card-riot overflow-hidden">
            <nav className="flex flex-col">
              <button
                onClick={() => setActiveTab("overview")}
                className={`text-left px-4 py-3 flex items-center ${activeTab === "overview" ? "bg-red-600 text-white" : "hover:bg-gray-800"}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Resumen
              </button>
              <button
                onClick={() => setActiveTab("profile")}
                className={`text-left px-4 py-3 flex items-center ${activeTab === "profile" ? "bg-red-600 text-white" : "hover:bg-gray-800"}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Editar perfil
              </button>
              <button
                onClick={() => setActiveTab("favorites")}
                className={`text-left px-4 py-3 flex items-center ${activeTab === "favorites" ? "bg-red-600 text-white" : "hover:bg-gray-800"}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
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
                Mis favoritos
              </button>
              <button
                onClick={() => setActiveTab("cart")}
                className={`text-left px-4 py-3 flex items-center ${activeTab === "cart" ? "bg-red-600 text-white" : "hover:bg-gray-800"}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Mi carrito
              </button>
              <button
                onClick={() => setActiveTab("messages")}
                className={`text-left px-4 py-3 flex items-center ${activeTab === "messages" ? "bg-red-600 text-white" : "hover:bg-gray-800"}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                Mis mensajes
              </button>
            </nav>
          </div>
        </div>

        <div className="md:col-span-2">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="card-riot p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Mis favoritos</h2>
                  <Link href="/favorites" className="text-red-600 hover:text-red-500 transition-colors text-sm">
                    Ver todos
                  </Link>
                </div>

                {favorites.length === 0 ? (
                  <p className="text-gray-400">No tienes juegos en favoritos</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {favorites.slice(0, 4).map((game) => (
                      <Link
                        key={game.id}
                        href={`/game/${game.slug}`}
                        className="flex items-center p-3 card-riot hover:bg-gray-800 transition-colors"
                      >
                        <img
                          src={game.background_image || "/placeholder.svg"}
                          alt={game.name}
                          className="w-16 h-16 object-cover rounded mr-3"
                        />
                        <div>
                          <h3 className="font-medium line-clamp-1">{game.name}</h3>
                          <p className="text-sm text-gray-400">Rating: {game.rating}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="card-riot p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Mi carrito</h2>
                  <Link href="/cart" className="text-red-600 hover:text-red-500 transition-colors text-sm">
                    Ver carrito
                  </Link>
                </div>

                {cart.length === 0 ? (
                  <p className="text-gray-400">No tienes juegos en el carrito</p>
                ) : (
                  <div className="space-y-4">
                    {cart.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex items-center justify-between border-b border-gray-800 pb-3">
                        <div className="flex items-center">
                          <img
                            src={item.background_image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded mr-3"
                          />
                          <div>
                            <h3 className="font-medium line-clamp-1">{item.name}</h3>
                            <p className="text-sm text-gray-400">Cantidad: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-medium text-red-600">{(item.price * item.quantity).toFixed(2)} €</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="card-riot p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Mis mensajes</h2>
                  <Link href="/contact" className="text-red-600 hover:text-red-500 transition-colors text-sm">
                    Enviar mensaje
                  </Link>
                </div>

                {messages.length === 0 ? (
                  <p className="text-gray-400">No has enviado ningún mensaje</p>
                ) : (
                  <div className="space-y-4">
                    {messages.slice(0, 3).map((msg) => (
                      <div key={msg.id} className="border-b border-gray-800 pb-3">
                        <p className="mb-2 line-clamp-2">{msg.message}</p>
                        <p className="text-sm text-gray-400">
                          Enviado el: {new Date(msg.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "profile" && <ProfileEditor />}

          {activeTab === "favorites" && (
            <div className="card-riot p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold title-riot">MIS FAVORITOS</h2>
                <Link href="/favorites" className="text-red-600 hover:text-red-500 transition-colors">
                  Ver todos
                </Link>
              </div>

              {favorites.length === 0 ? (
                <div className="text-center py-8">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {favorites.map((game) => (
                    <Link
                      key={game.id}
                      href={`/game/${game.slug}`}
                      className="flex items-center p-3 card-riot hover:bg-gray-800 transition-colors"
                    >
                      <img
                        src={game.background_image || "/placeholder.svg"}
                        alt={game.name}
                        className="w-16 h-16 object-cover rounded mr-3"
                      />
                      <div>
                        <h3 className="font-medium line-clamp-1">{game.name}</h3>
                        <p className="text-sm text-gray-400">Rating: {game.rating}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "cart" && (
            <div className="card-riot p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold title-riot">MI CARRITO</h2>
                <Link href="/cart" className="text-red-600 hover:text-red-500 transition-colors">
                  Ver carrito
                </Link>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-8">
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
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <p className="text-gray-400 mb-6">No tienes juegos en el carrito</p>
                  <Link href="/games" className="btn-riot">
                    EXPLORAR JUEGOS
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between border-b border-gray-800 pb-3">
                      <div className="flex items-center">
                        <img
                          src={item.background_image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded mr-3"
                        />
                        <div>
                          <h3 className="font-medium line-clamp-1">{item.name}</h3>
                          <p className="text-sm text-gray-400">Cantidad: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-medium text-red-600">{(item.price * item.quantity).toFixed(2)} €</p>
                    </div>
                  ))}

                  <div className="border-t border-gray-800 pt-4 text-right">
                    <p className="text-lg font-bold text-red-600">
                      Total: {cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)} €
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "messages" && (
            <div className="card-riot p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold title-riot">MIS MENSAJES</h2>
                <Link href="/contact" className="text-red-600 hover:text-red-500 transition-colors">
                  Enviar mensaje
                </Link>
              </div>

              {messages.length === 0 ? (
                <div className="text-center py-8">
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
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                  <p className="text-gray-400 mb-6">No has enviado ningún mensaje</p>
                  <Link href="/contact" className="btn-riot">
                    CONTACTAR
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {messages.map((msg) => (
                    <div key={msg.id} className="card-riot p-4 bg-gray-800">
                      <p className="mb-4">{msg.message}</p>
                      <p className="text-sm text-gray-400">
                        Enviado el:{" "}
                        {new Date(msg.createdAt).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
