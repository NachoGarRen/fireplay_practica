import type { GameDetails as GameDetailsType } from "../types/games.types"

interface GameDetailsProps {
  game: GameDetailsType
  screenshots?: string[]
}

export default function GameDetails({ game, screenshots = [] }: GameDetailsProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Descripción</h2>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: game.description }} />
      </div>

      {screenshots.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Capturas de pantalla</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {screenshots.map((screenshot, index) => (
              <img
                key={index}
                src={screenshot || "/placeholder.svg"}
                alt={`${game.name} screenshot ${index + 1}`}
                className="w-full h-auto rounded-lg"
              />
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-bold mb-3">Detalles</h2>
          <ul className="space-y-2">
            {game.released && (
              <li className="flex justify-between">
                <span className="text-gray-600">Fecha de lanzamiento:</span>
                <span>{new Date(game.released).toLocaleDateString()}</span>
              </li>
            )}
            {game.developers && game.developers.length > 0 && (
              <li className="flex justify-between">
                <span className="text-gray-600">Desarrollador:</span>
                <span>{game.developers.map((dev) => dev.name).join(", ")}</span>
              </li>
            )}
            {game.publishers && game.publishers.length > 0 && (
              <li className="flex justify-between">
                <span className="text-gray-600">Editor:</span>
                <span>{game.publishers.map((pub) => pub.name).join(", ")}</span>
              </li>
            )}
            {game.esrb_rating && (
              <li className="flex justify-between">
                <span className="text-gray-600">Clasificación:</span>
                <span>{game.esrb_rating.name}</span>
              </li>
            )}
            {game.metacritic && (
              <li className="flex justify-between">
                <span className="text-gray-600">Metacritic:</span>
                <span
                  className={`font-bold ${game.metacritic >= 75 ? "text-green-600" : game.metacritic >= 50 ? "text-yellow-600" : "text-red-600"}`}
                >
                  {game.metacritic}
                </span>
              </li>
            )}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">Géneros</h2>
          <div className="flex flex-wrap gap-2">
            {game.genres?.map((genre) => (
              <span key={genre.id} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                {genre.name}
              </span>
            ))}
          </div>

          {game.tags && game.tags.length > 0 && (
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-3">Etiquetas</h2>
              <div className="flex flex-wrap gap-2">
                {game.tags.slice(0, 8).map((tag) => (
                  <span key={tag.id} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {game.website && (
        <div>
          <h2 className="text-xl font-bold mb-3">Enlaces</h2>
          <a href={game.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            Sitio web oficial
          </a>
        </div>
      )}
    </div>
  )
}
