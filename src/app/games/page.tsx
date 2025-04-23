import { getPopularGames } from "../../lib/requests"
import GameCard from "../../components/game-card"
import Link from "next/link"

export default async function GamesPage() {
  const games = await getPopularGames()

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Catálogo de juegos</h1>
        <Link href="/search" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
          Buscar juegos
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  )
}
