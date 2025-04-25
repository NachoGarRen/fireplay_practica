import Link from "next/link"
import { getPopularGames } from "../lib/requests"
import GameCard from "../components/game-card"

export default async function HomePage() {
  // Obtener juegos destacados para el slider
  const featuredGames = await getPopularGames(1)
  const topGames = featuredGames.slice(0, 4)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"
            style={{
              background:
                "linear-gradient(90deg, rgba(10,10,12,1) 0%, rgba(10,10,12,0.8) 50%, rgba(10,10,12,0.4) 100%)",
            }}
          ></div>
          <img
            src={topGames[0]?.background_image || "/placeholder.svg?height=1080&width=1920"}
            alt="Hero background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="max-w-2xl animate-slideUp">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">DESCUBRE TU PRÓXIMA</span>
              <br />
              <span className="text-red-600">AVENTURA</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              Explora los mejores videojuegos en un solo lugar. Encuentra, compara y compra tus títulos favoritos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/games" className="btn-riot">
                EXPLORAR CATÁLOGO
              </Link>
              <Link href="/info" className="btn-riot-outline">
                SABER MÁS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Games Section */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold title-riot">JUEGOS DESTACADOS</h2>
            <Link href="/games" className="text-red-600 hover:text-red-500 font-semibold flex items-center">
              VER TODOS
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {topGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="diagonal-section bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold title-riot text-center mb-16">CÓMO FUNCIONA</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="card-riot p-8 text-center">
              <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4 uppercase">Explora</h3>
              <p className="text-gray-400">
                Navega por nuestro extenso catálogo de juegos y encuentra los títulos que te interesan con filtros
                avanzados.
              </p>
            </div>
            <div className="card-riot p-8 text-center">
              <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4 uppercase">Guarda</h3>
              <p className="text-gray-400">
                Añade juegos a tus favoritos o al carrito para comprarlos más tarde. Gestiona tu colección fácilmente.
              </p>
            </div>
            <div className="card-riot p-8 text-center">
              <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4 uppercase">Compra</h3>
              <p className="text-gray-400">
                Finaliza tu compra de forma segura y recibe tus juegos al instante. Disfruta de la mejor experiencia
                gaming.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold title-riot text-center mb-16">PLATAFORMAS DISPONIBLES</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="card-riot p-6 flex flex-col items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mb-4 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <h3 className="text-lg font-semibold uppercase">PC</h3>
            </div>
            <div className="card-riot p-6 flex flex-col items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mb-4 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                />
              </svg>
              <h3 className="text-lg font-semibold uppercase">PlayStation</h3>
            </div>
            <div className="card-riot p-6 flex flex-col items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mb-4 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              <h3 className="text-lg font-semibold uppercase">Xbox</h3>
            </div>
            <div className="card-riot p-6 flex flex-col items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mb-4 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              <h3 className="text-lg font-semibold uppercase">Nintendo</h3>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-red-700 to-red-900 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 uppercase">¿Listo para empezar?</h2>
          <p className="text-xl mb-8 text-gray-200">
            Únete a nuestra comunidad de gamers y descubre un mundo de posibilidades. Crea tu cuenta hoy y comienza a
            disfrutar de todos los beneficios.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn-riot bg-white text-red-600 hover:bg-gray-100">
              CREAR CUENTA
            </Link>
            <Link href="/games" className="btn-riot-outline border-white text-white hover:bg-white hover:text-red-600">
              EXPLORAR JUEGOS
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
