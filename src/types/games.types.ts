export interface Game {
  id: number
  slug: string
  name: string
  background_image: string
  rating: number
  released?: string
  genres?: { id: number; name: string }[]
  platforms?: { platform: { id: number; name: string } }[]
}

export interface GameDetails extends Game {
  description: string
  description_raw?: string
  background_image_additional?: string
  website?: string
  developers?: { id: number; name: string }[]
  publishers?: { id: number; name: string }[]
  esrb_rating?: { id: number; name: string }
  metacritic?: number
  tags?: { id: number; name: string }[]
  screenshots?: { id: number; image: string }[]
}
