import type { GameDetails as GameDetailsType } from "../types/games.types"

interface GameDetailsProps {
  game: GameDetailsType
  screenshots?: string[]
}

export default function GameDetails({ game, screenshots = [] }: GameDetailsProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4 title-riot">DESCRIPCIÓN</h2>
        <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: game.description }} />
      </div>

      {screenshots.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 title-riot">CAPTURAS DE PANTALLA</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {screenshots.map((screenshot, index) => (
              <div key={index} className="card-riot overflow-hidden">
                <img
                  src={screenshot || "/placeholder.svg"}
                  alt={`${game.name} screenshot ${index + 1}`}
                  className="w-full h-auto transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card-riot p-6">
          <h2 className="text-xl font-bold mb-4 uppercase">Detalles</h2>
          <ul className="space-y-3">
            {game.released && (
              <li className="flex justify-between border-b border-gray-800 pb-2">
                <span className="text-gray-400">Fecha de lanzamiento:</span>
                <span>{new Date(game.released).toLocaleDateString()}</span>
              </li>
            )}
            {game.developers && game.developers.length > 0 && (
              <li className="flex justify-between border-b border-gray-800 pb-2">
                <span className="text-gray-400">Desarrollador:</span>
                <span>{game.developers.map((dev) => dev.name).join(", ")}</span>
              </li>
            )}
            {game.publishers && game.publishers.length > 0 && (
              <li className="flex justify-between border-b border-gray-800 pb-2">
                <span className="text-gray-400">Editor:</span>
                <span>{game.publishers.map((pub) => pub.name).join(", ")}</span>
              </li>
            )}
            {game.esrb_rating && (
              <li className="flex justify-between border-b border-gray-800 pb-2">
                <span className="text-gray-400">Clasificación:</span>
                <span>{game.esrb_rating.name}</span>
              </li>
            )}
            {game.metacritic && (
              <li className="flex justify-between">
                <span className="text-gray-400">Metacritic:</span>
                <span
                  className={`font-bold ${game.metacritic >= 75 ? "text-green-500" : game.metacritic >= 50 ? "text-yellow-500" : "text-red-500"}`}
                >
                  {game.metacritic}
                </span>
              </li>
            )}
          </ul>
        </div>

        <div className="card-riot p-6">
          <h2 className="text-xl font-bold mb-4 uppercase">Géneros</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {game.genres?.map((genre) => (
              <span key={genre.id} className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                {genre.name}
              </span>
            ))}
          </div>

          {game.tags && game.tags.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4 uppercase">Etiquetas</h2>
              <div className="flex flex-wrap gap-2">
                {game.tags.slice(0, 8).map((tag) => (
                  <span key={tag.id} className="bg-gray-800 px-3 py-1 rounded-full text-sm">
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
          <h2 className="text-xl font-bold mb-4 uppercase">Enlaces</h2>
          <a
            href={game.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 hover:text-red-500 transition-colors flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            Sitio web oficial
          </a>
        </div>
      )}
    </div>
  )
}
