import Link from "next/link"

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Bienvenido a Fireplay</h1>
          <p className="text-xl md:text-2xl mb-8">Tu tienda de videojuegos online</p>
          <Link
            href="/games"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition"
          >
            Ver catálogo
          </Link>
        </div>
      </section>

      {/* What is Fireplay Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">¿Qué es Fireplay?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-lg mb-4">
              Fireplay es una plataforma moderna para descubrir, explorar y comprar tus videojuegos favoritos.
              Utilizamos tecnologías de vanguardia para ofrecerte la mejor experiencia de usuario.
            </p>
            <p className="text-lg">
              Navega por nuestro extenso catálogo, guarda tus favoritos y disfruta de una experiencia de compra fluida y
              segura.
            </p>
          </div>
          <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
            <p className="text-gray-500 text-lg">Imagen ilustrativa</p>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-16 px-4 bg-gray-100 w-full">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Cómo funciona</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Explora</h3>
              <p>Navega por nuestro catálogo de juegos y encuentra los títulos que te interesan.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Guarda</h3>
              <p>Añade juegos a tus favoritos o al carrito para comprarlos más tarde.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Compra</h3>
              <p>Finaliza tu compra de forma segura y recibe tus juegos al instante.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">¿Listo para empezar?</h2>
        <Link
          href="/games"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
        >
          Explorar juegos
        </Link>
      </section>
    </div>
  )
}
