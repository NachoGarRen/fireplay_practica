import Link from "next/link"
import type { Game } from "../types/games.types"

export default function GameCard({ game }: { game: Game }) {
  return (
    <Link href={`/game/${game.slug}`} className="block h-full">
      <div className="card-riot h-full flex flex-col">
        <div className="relative pb-[56.25%] overflow-hidden">
          <img
            src={game.background_image || "/placeholder.svg?height=200&width=300"}
            alt={game.name}
            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          {game.rating > 0 && (
            <div className="absolute bottom-3 left-3 bg-red-600 text-white text-sm px-2 py-1 rounded font-semibold">
              {game.rating.toFixed(1)}
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold mb-2 line-clamp-1">{game.name}</h3>

          <div className="mt-auto">
            {game.released && <p className="text-sm text-gray-400 mb-2">{new Date(game.released).getFullYear()}</p>}

            {game.genres && (
              <div className="flex flex-wrap gap-1">
                {game.genres.slice(0, 2).map((genre) => (
                  <span key={genre.id} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                    {genre.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
