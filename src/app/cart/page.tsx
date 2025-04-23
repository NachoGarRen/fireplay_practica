"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getCart, updateCartItemQuantity, removeFromCart, clearCart, getCartTotal } from "../../lib/cart"
import type { CartItem } from "../../lib/cart"

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [total, setTotal] = useState(0)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const cartItems = getCart()
    setCart(cartItems)
    setTotal(getCartTotal())
  }, [])

  const handleUpdateQuantity = (gameId: number, quantity: number) => {
    const updatedCart = updateCartItemQuantity(gameId, quantity)
    setCart(updatedCart)
    setTotal(getCartTotal())
  }

  const handleRemoveItem = (gameId: number) => {
    const updatedCart = removeFromCart(gameId)
    setCart(updatedCart)
    setTotal(getCartTotal())
  }

  const handleClearCart = () => {
    const emptyCart = clearCart()
    setCart(emptyCart)
    setTotal(0)
  }

  if (!isClient) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center py-16">
        <p>Cargando carrito...</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Mi carrito</h1>

      {cart.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 mb-6">No tienes juegos en el carrito</p>
          <Link href="/games" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            Explorar juegos
          </Link>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left">Juego</th>
                  <th className="py-3 px-4 text-center">Precio</th>
                  <th className="py-3 px-4 text-center">Cantidad</th>
                  <th className="py-3 px-4 text-center">Total</th>
                  <th className="py-3 px-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <img
                          src={item.background_image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded mr-4"
                        />
                        <div>
                          <Link href={`/game/${item.slug}`} className="font-medium hover:text-blue-600">
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
                          className="bg-gray-200 px-2 py-1 rounded-l"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-4">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="bg-gray-200 px-2 py-1 rounded-r"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center font-medium">{(item.price * item.quantity).toFixed(2)} €</td>
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700"
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
            <button
              onClick={handleClearCart}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
            >
              Vaciar carrito
            </button>

            <div className="text-right">
              <div className="text-lg mb-2">
                Total: <span className="font-bold">{total.toFixed(2)} €</span>
              </div>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                Finalizar compra
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
