import { getGameDetails, getGameScreenshots } from "../../../lib/requests"
import { notFound } from "next/navigation"
import Link from "next/link"
import GameDetails from "../../../components/game-details"
import AddToFavoritesButton from "../../../components/add-to-favorites-button"
import AddToCartButton from "../../../components/add-to-cart-button"

export default async function GamePage({ params }: { params: { slug: string } }) {
  const game = await getGameDetails(params.slug)

  if (!game) {
    notFound()
  }

  const screenshots = game.id ? await getGameScreenshots(game.id) : []

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <Link href="/games" className="text-blue-600 hover:underline">
          ← Volver al catálogo
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-4">{game.name}</h1>

          <div className="mb-6">
            <img
              src={game.background_image || "/placeholder.svg"}
              alt={game.name}
              className="w-full h-auto rounded-lg"
            />
          </div>

          <GameDetails game={game} screenshots={screenshots} />
        </div>

        <div className="md:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-6">
            <h2 className="text-xl font-semibold mb-4">Información de compra</h2>

            <div className="mb-4">
              <p className="text-2xl font-bold text-blue-600">59.99 €</p>
              <p className="text-sm text-gray-500">Impuestos incluidos</p>
            </div>

            <div className="flex gap-2 mb-6">
              <AddToFavoritesButton gameId={game.id} game={game} />
              <AddToCartButton game={game} />
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Plataformas disponibles</h3>
              <ul className="text-sm">
                {game.platforms?.map((platform) => (
                  <li key={platform.platform.id} className="mb-1">
                    {platform.platform.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
