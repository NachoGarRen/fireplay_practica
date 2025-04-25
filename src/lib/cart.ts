"use client"

import type { Game } from "../types/games.types"

// Interfaz para los items del carrito
export interface CartItem extends Game {
  quantity: number
  price: number
}

// Obtener carrito desde localStorage con userId específico
export const getCart = (userId = ""): CartItem[] => {
  if (typeof window === "undefined") return []

  const cartKey = userId ? `cart_${userId}` : "cart_guest"
  const cart = localStorage.getItem(cartKey)
  return cart ? JSON.parse(cart) : []
}

// Añadir juego al carrito
export const addToCart = (game: Game, quantity = 1, price = 59.99, userId = "") => {
  const cartKey = userId ? `cart_${userId}` : "cart_guest"
  const cart = getCart(userId)

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
  localStorage.setItem(cartKey, JSON.stringify(cart))

  // Disparar evento para actualizar contador en header
  window.dispatchEvent(new Event("storage"))

  return cart
}

// Eliminar juego del carrito
export const removeFromCart = (gameId: number, userId = "") => {
  const cartKey = userId ? `cart_${userId}` : "cart_guest"
  const cart = getCart(userId)
  const updatedCart = cart.filter((item) => item.id !== gameId)
  localStorage.setItem(cartKey, JSON.stringify(updatedCart))

  // Disparar evento para actualizar contador en header
  window.dispatchEvent(new Event("storage"))

  return updatedCart
}

// Actualizar cantidad de un juego en el carrito
export const updateCartItemQuantity = (gameId: number, quantity: number, userId = "") => {
  const cartKey = userId ? `cart_${userId}` : "cart_guest"
  const cart = getCart(userId)

  const updatedCart = cart.map((item) => {
    if (item.id === gameId) {
      return { ...item, quantity: Math.max(1, quantity) }
    }
    return item
  })

  localStorage.setItem(cartKey, JSON.stringify(updatedCart))

  // Disparar evento para actualizar contador en header
  window.dispatchEvent(new Event("storage"))

  return updatedCart
}

// Calcular total del carrito
export const getCartTotal = (userId = "") => {
  const cart = getCart(userId)
  return cart.reduce((total, item) => total + item.price * item.quantity, 0)
}

// Vaciar carrito
export const clearCart = (userId = "") => {
  const cartKey = userId ? `cart_${userId}` : "cart_guest"
  localStorage.setItem(cartKey, JSON.stringify([]))

  // Disparar evento para actualizar contador en header
  window.dispatchEvent(new Event("storage"))

  return []
}

// Migrar carrito de invitado a usuario cuando inicia sesión
export const migrateGuestCart = (userId: string) => {
  const guestCart = getCart("")
  if (guestCart.length === 0) return

  const userCart = getCart(userId)

  // Combinar carritos
  guestCart.forEach((item) => {
    const existingItem = userCart.find((userItem) => userItem.id === item.id)
    if (existingItem) {
      existingItem.quantity += item.quantity
    } else {
      userCart.push(item)
    }
  })

  // Guardar carrito de usuario
  localStorage.setItem(`cart_${userId}`, JSON.stringify(userCart))

  // Limpiar carrito de invitado
  localStorage.setItem("cart_guest", JSON.stringify([]))

  // Disparar evento para actualizar contador en header
  window.dispatchEvent(new Event("storage"))
}
