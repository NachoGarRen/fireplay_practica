"use client"

import { useState, useEffect } from "react"
import { addToCart, getCart } from "../lib/cart"
import type { Game } from "../types/games.types"

interface AddToCartButtonProps {
  game: Game
}

export default function AddToCartButton({ game }: AddToCartButtonProps) {
  const [isInCart, setIsInCart] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    const cart = getCart()
    const existingItem = cart.find((item) => item.id === game.id)
    setIsInCart(!!existingItem)
  }, [game.id])

  const handleAddToCart = () => {
    setIsAdding(true)

    // Añadir al carrito con precio ficticio
    addToCart(game, 1, 59.99)

    setIsInCart(true)

    setTimeout(() => {
      setIsAdding(false)
    }, 500)
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition flex items-center justify-center gap-2"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      <span>{isInCart ? "Añadido al carrito" : "Añadir al carrito"}</span>
    </button>
  )
}
