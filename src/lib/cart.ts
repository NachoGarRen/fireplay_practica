"use client"

import type { Game } from "../types/games.types"

// Interfaz para los items del carrito
export interface CartItem extends Game {
  quantity: number
  price: number
}

// Obtener carrito desde localStorage
export const getCart = (): CartItem[] => {
  if (typeof window === "undefined") return []

  const cart = localStorage.getItem("cart")
  return cart ? JSON.parse(cart) : []
}

// Añadir juego al carrito
export const addToCart = (game: Game, quantity = 1, price = 59.99) => {
  const cart = getCart()

  // Verificar si el juego ya está en el carrito
  const existingItemIndex = cart.findIndex((item) => item.id === game.id)

  if (existingItemIndex >= 0) {
    // Actualizar cantidad si ya existe
    cart[existingItemIndex].quantity += quantity
  } else {
    // Añadir nuevo item
    cart.push({
      ...game,
      quantity,
      price,
    })
  }

  // Guardar en localStorage
  localStorage.setItem("cart", JSON.stringify(cart))
  return cart
}

// Eliminar juego del carrito
export const removeFromCart = (gameId: number) => {
  const cart = getCart()
  const updatedCart = cart.filter((item) => item.id !== gameId)
  localStorage.setItem("cart", JSON.stringify(updatedCart))
  return updatedCart
}

// Actualizar cantidad de un juego en el carrito
export const updateCartItemQuantity = (gameId: number, quantity: number) => {
  const cart = getCart()

  const updatedCart = cart.map((item) => {
    if (item.id === gameId) {
      return { ...item, quantity: Math.max(1, quantity) }
    }
    return item
  })

  localStorage.setItem("cart", JSON.stringify(updatedCart))
  return updatedCart
}

// Calcular total del carrito
export const getCartTotal = () => {
  const cart = getCart()
  return cart.reduce((total, item) => total + item.price * item.quantity, 0)
}

// Vaciar carrito
export const clearCart = () => {
  localStorage.setItem("cart", JSON.stringify([]))
  return []
}
