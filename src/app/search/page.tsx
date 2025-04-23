import { getSearchedGames } from "../../lib/requests"
import GameCard from "../../components/game-card"
import SearchForm from "../../components/search-form"

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { query?: string }
}) {
  const query = searchParams.query || ""
  const games = query ? await getSearchedGames(query) : []

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Buscar juegos</h1>

      <SearchForm initialQuery={query} />

      {query && (
        <p className="mt-4 mb-6">
          {games.length} resultados para "{query}"
        </p>
      )}

      {query && games.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No se encontraron juegos para "{query}"</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  )
}
