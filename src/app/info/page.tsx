export default function InfoPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Información del proyecto</h1>

      <div className="card-riot rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Sobre Fireplay</h2>
        <p className="mb-4">
          Fireplay es una aplicación web moderna desarrollada como proyecto educativo para demostrar el uso de
          tecnologías actuales en el desarrollo web. Simula una tienda de videojuegos online con funcionalidades como
          búsqueda, favoritos, carrito de compra y autenticación de usuarios.
        </p>
        <p>
          Este proyecto no es una tienda real y no procesa pagos ni envía productos. Todos los datos de juegos son
          obtenidos de la API pública de RAWG.
        </p>
      </div>

      <div className="card-riot rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Tecnologías utilizadas</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Next.js 15:</strong> Framework de React para aplicaciones web con renderizado en servidor.
          </li>
          <li>
            <strong>React 19:</strong> Biblioteca para construir interfaces de usuario.
          </li>
          <li>
            <strong>Tailwind CSS 4:</strong> Framework de CSS utilitario para diseño rápido.
          </li>
          <li>
            <strong>Firebase:</strong> Plataforma de desarrollo de aplicaciones que proporciona autenticación y base de
            datos.
          </li>
          <li>
            <strong>RAWG API:</strong> API pública que proporciona información sobre videojuegos.
          </li>
          <li>
            <strong>TypeScript:</strong> Superset de JavaScript que añade tipado estático.
          </li>
        </ul>
      </div>

      <div className="card-riot rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Objetivos del proyecto</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Demostrar el uso de Next.js con App Router y Server Components.</li>
          <li>Implementar autenticación y persistencia de datos con Firebase.</li>
          <li>Crear una interfaz de usuario responsive y atractiva con Tailwind CSS.</li>
          <li>Aplicar buenas prácticas de desarrollo como principios SOLID.</li>
          <li>Desarrollar una aplicación web progresiva (PWA) instalable.</li>
          <li>Integrar APIs externas para obtener datos dinámicos.</li>
        </ul>
      </div>
    </div>
  )
}
