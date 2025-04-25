export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Buscar juegos</h1>

      <div className="w-full h-12 bg-gray-200 rounded-md mb-8 animate-pulse"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-gray-200 rounded-xl h-72 animate-pulse"></div>
        ))}
      </div>
    </div>
  )
}
