import Link from "next/link"
import type { Game } from "../types/games.types"

export default function GameCard({ game }: { game: Game }) {
  return (
    <Link href={`/game/${game.slug}`} className="block h-full">
      <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 h-full flex flex-col">
        <div className="relative pb-[56.25%] mb-4 overflow-hidden rounded-lg">
          <img
            src={game.background_image || "/placeholder.svg?height=200&width=300"}
            alt={game.name}
            className="absolute top-0 left-0 w-full h-full object-cover transition-transform hover:scale-105"
          />
        </div>
        <h3 className="text-lg font-semibold mb-2 line-clamp-1">{game.name}</h3>
        <div className="mt-auto">
          <div className="flex items-center">
            <div className="bg-blue-600 text-white text-sm px-2 py-1 rounded">{game.rating.toFixed(1)}</div>
            {game.released && <p className="text-sm text-gray-500 ml-2">{new Date(game.released).getFullYear()}</p>}
          </div>
          {game.genres && (
            <div className="mt-2 flex flex-wrap gap-1">
              {game.genres.slice(0, 2).map((genre) => (
                <span key={genre.id} className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {genre.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
