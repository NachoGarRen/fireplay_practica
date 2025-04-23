import axios from "axios"
import type { Game, GameDetails } from "../types/games.types"

const API_URL = process.env.NEXT_PUBLIC_RAWG_API_URL || "https://api.rawg.io/api"
const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY

// Obtener juegos por búsqueda
export async function getSearchedGames(query: string, page = 1): Promise<Game[]> {
  try {
    const url = `${API_URL}/games?key=${API_KEY}&search=${query}&page=${page}&page_size=12`
    const { data } = await axios.get(url)
    return data.results
  } catch (error) {
    console.error("Error fetching searched games:", error)
    return []
  }
}

// Obtener juegos populares
export async function getPopularGames(page = 1): Promise<Game[]> {
  try {
    const url = `${API_URL}/games?key=${API_KEY}&ordering=-rating&page=${page}&page_size=12`
    const { data } = await axios.get(url)
    return data.results
  } catch (error) {
    console.error("Error fetching popular games:", error)
    return []
  }
}

// Obtener detalles de un juego por slug
export async function getGameDetails(slug: string): Promise<GameDetails | null> {
  try {
    const url = `${API_URL}/games/${slug}?key=${API_KEY}`
    const { data } = await axios.get(url)
    return data
  } catch (error) {
    console.error(`Error fetching game details for ${slug}:`, error)
    return null
  }
}

// Obtener capturas de pantalla de un juego
export async function getGameScreenshots(gameId: number): Promise<string[]> {
  try {
    const url = `${API_URL}/games/${gameId}/screenshots?key=${API_KEY}`
    const { data } = await axios.get(url)
    return data.results.map((screenshot: any) => screenshot.image)
  } catch (error) {
    console.error(`Error fetching screenshots for game ${gameId}:`, error)
    return []
  }
}
