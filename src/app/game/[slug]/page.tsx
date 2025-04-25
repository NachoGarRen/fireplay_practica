import { getGameDetails, getGameScreenshots } from "../../../lib/requests"
import { notFound } from "next/navigation"
import Link from "next/link"
import GameDetails from "../../../components/game-details"
import AddToFavoritesButton from "../../../components/add-to-favorites-button"
import AddToCartButton from "../../../components/add-to-cart-button"
import GameReviews from "../../../components/game-reviews"

export default async function GamePage({ params }: { params: { slug: string } }) {
  const game = await getGameDetails(params.slug)

  if (!game) {
    notFound()
  }

  const screenshots = game.id ? await getGameScreenshots(game.id) : []

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <Link href="/games" className="text-gray-400 hover:text-red-600 transition-colors flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al catálogo
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <h1 className="text-4xl font-bold mb-6 title-riot">{game.name}</h1>

          <div className="mb-8 card-riot overflow-hidden">
            <img src={game.background_image || "/placeholder.svg"} alt={game.name} className="w-full h-auto" />
          </div>

          <div className="card-riot p-6 mb-8">
            <GameDetails game={game} screenshots={screenshots} />
          </div>

          <div className="card-riot p-6 mb-8">
            <GameReviews gameId={game.id} gameName={game.name} />
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="card-riot p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6 title-riot">INFORMACIÓN DE COMPRA</h2>

            <div className="mb-6">
              <p className="text-3xl font-bold text-red-600">59.99 €</p>
              <p className="text-sm text-gray-400">Impuestos incluidos</p>
            </div>

            <div className="flex gap-2 mb-8">
              <AddToFavoritesButton gameId={game.id} game={game} />
              <AddToCartButton game={game} />
            </div>

            <div className="border-t border-gray-800 pt-6">
              <h3 className="font-semibold mb-4 uppercase">Plataformas disponibles</h3>
              <ul className="space-y-2">
                {game.platforms?.map((platform) => (
                  <li key={platform.platform.id} className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {platform.platform.name}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-gray-800 pt-6 mt-6">
              <h3 className="font-semibold mb-4 uppercase">Características</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Entrega digital inmediata
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Soporte 24/7
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Garantía de devolución
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
