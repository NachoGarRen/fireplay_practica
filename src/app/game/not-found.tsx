import Link from "next/link"

export default function NotFound() {
  return (
    <div className="max-w-6xl mx-auto p-6 text-center py-16">
      <h1 className="text-3xl font-bold mb-4">Juego no encontrado</h1>
      <p className="mb-8 text-gray-600">Lo sentimos, el juego que estás buscando no existe o ha sido eliminado.</p>
      <Link href="/games" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
        Ver catálogo de juegos
      </Link>
    </div>
  )
}
