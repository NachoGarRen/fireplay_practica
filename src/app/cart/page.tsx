"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getCart, updateCartItemQuantity, removeFromCart, clearCart, getCartTotal } from "../../lib/cart"
import type { CartItem } from "../../lib/cart"
import { useProtectedRoute } from "../../hooks/useProtectedRoute"

export default function CartPage() {
  const { user } = useProtectedRoute()
  const [cart, setCart] = useState<CartItem[]>([])
  const [total, setTotal] = useState(0)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    if (user) {
      const cartItems = getCart(user.uid)
      setCart(cartItems)
      setTotal(getCartTotal(user.uid))
    }
  }, [user])

  const handleUpdateQuantity = (gameId: number, quantity: number) => {
    if (!user) return

    const updatedCart = updateCartItemQuantity(gameId, quantity, user.uid)
    setCart(updatedCart)
    setTotal(getCartTotal(user.uid))
  }

  const handleRemoveItem = (gameId: number) => {
    if (!user) return

    const updatedCart = removeFromCart(gameId, user.uid)
    setCart(updatedCart)
    setTotal(getCartTotal(user.uid))
  }

  const handleClearCart = () => {
    if (!user) return

    const emptyCart = clearCart(user.uid)
    setCart(emptyCart)
    setTotal(0)
  }

  if (!isClient) {
    return (
      <div className="max-w-7xl mx-auto p-6 text-center py-16">
        <div className="h-8 w-32 bg-gray-700 rounded animate-pulse mx-auto mb-8"></div>
        <div className="h-64 bg-gray-800 rounded-lg animate-pulse max-w-3xl mx-auto"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6 animate-fadeIn">
      <h1 className="text-3xl font-bold mb-8 title-riot">MI CARRITO</h1>

      {cart.length === 0 ? (
        <div className="text-center py-16 card-riot p-8">
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
        <>
          <div className="card-riot overflow-hidden mb-8">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="py-4 px-4 text-left">Juego</th>
                  <th className="py-4 px-4 text-center">Precio</th>
                  <th className="py-4 px-4 text-center">Cantidad</th>
                  <th className="py-4 px-4 text-center">Total</th>
                  <th className="py-4 px-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="border-t border-gray-800">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <img
                          src={item.background_image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded mr-4"
                        />
                        <div>
                          <Link
                            href={`/game/${item.slug}`}
                            className="font-medium hover:text-red-600 transition-colors"
                          >
                            {item.name}
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">{item.price.toFixed(2)} €</td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-l transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-4 py-1 bg-gray-900">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-r transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center font-medium text-red-600">
                      {(item.price * item.quantity).toFixed(2)} €
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                        aria-label="Eliminar"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <button onClick={handleClearCart} className="btn-riot-outline">
              VACIAR CARRITO
            </button>

            <div className="card-riot p-6">
              <div className="text-lg mb-4">
                Subtotal: <span className="font-bold">{total.toFixed(2)} €</span>
              </div>
              <div className="text-lg mb-4">
                IVA (21%): <span className="font-bold">{(total * 0.21).toFixed(2)} €</span>
              </div>
              <div className="text-xl font-bold mb-6 text-red-600 border-t border-gray-800 pt-4">
                Total: <span>{(total * 1.21).toFixed(2)} €</span>
              </div>
              <button className="btn-riot w-full">FINALIZAR COMPRA</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
