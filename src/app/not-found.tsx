import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-8 text-center">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <p className="text-2xl mb-8">Página no encontrada</p>
      <p className="mb-8 text-gray-600 max-w-md">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>
      <Link href="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
        Volver al inicio
      </Link>
    </div>
  )
}
