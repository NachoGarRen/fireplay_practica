# 🎮 Fireplay

## 📝 Descripción

Fireplay es una plataforma moderna para descubrir, explorar y comprar videojuegos. Desarrollada como proyecto educativo, simula una tienda online de videojuegos con funcionalidades como búsqueda, favoritos, carrito de compra y autenticación de usuarios.

La aplicación utiliza la API pública de RAWG para obtener información actualizada sobre videojuegos, y Firebase para la autenticación y almacenamiento de datos de usuario.

## ✨ Características principales

- 🔍 Exploración y búsqueda de videojuegos
- 👤 Sistema de autenticación de usuarios
- ❤️ Gestión de favoritos
- 🛒 Carrito de compra
- 💬 Sistema de reseñas para juegos
- 📱 Diseño responsive adaptado a todos los dispositivos
- 🎨 Interfaz moderna inspirada en Riot Games

## 🛠️ Tecnologías utilizadas

- **Next.js 15**: Framework de React para aplicaciones web con renderizado en servidor
- **React 19**: Biblioteca para construir interfaces de usuario
- **Tailwind CSS 4**: Framework de CSS utilitario para diseño rápido
- **Firebase**: Plataforma de desarrollo que proporciona autenticación y base de datos
- **RAWG API**: API pública que proporciona información sobre videojuegos
- **TypeScript**: Superset de JavaScript que añade tipado estático

## 🚀 Instrucciones de instalación

### Prerrequisitos

- Node.js (versión 18.0.0 o superior)
- npm o yarn
- Cuenta en Firebase
- Clave API de RAWG

### Configuración de variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

\`\`\`
NEXT_PUBLIC_RAWG_API_KEY=tu_clave_api_rawg
NEXT_PUBLIC_RAWG_API_URL=https://api.rawg.io/api

NEXT_PUBLIC_FIREBASE_API_KEY=tu_clave_api_firebase
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_dominio_firebase
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_id_proyecto_firebase
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_bucket_storage_firebase
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_id_sender_firebase
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id_firebase
\`\`\`

### Instalación

1. Clona el repositorio:
   \`\`\`bash
   git clone https://github.com/NachoGarRen/fireplay_practica.git
   cd fireplay
   \`\`\`

2. Instala las dependencias:
   \`\`\`bash
   npm install
   # o
   yarn install
   \`\`\`

3. Ejecuta el servidor de desarrollo:
   \`\`\`bash
   npm run dev
   # o
   yarn dev
   \`\`\`

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

### Construcción para producción

\`\`\`bash
npm run build
# o
yarn build
\`\`\`

## 📁 Estructura del proyecto

\`\`\`
fireplay/
├── src/
│   ├── app/                  # Rutas y páginas de la aplicación
│   ├── components/           # Componentes reutilizables
│   ├── firebase/             # Configuración de Firebase
│   ├── hooks/                # Custom hooks
│   ├── lib/                  # Funciones de utilidad
│   └── types/                # Definiciones de tipos TypeScript
├── public/                   # Archivos estáticos
├── .env.local                # Variables de entorno (no incluido en el repositorio)
├── next.config.mjs           # Configuración de Next.js
├── tailwind.config.js        # Configuración de Tailwind CSS
└── package.json              # Dependencias y scripts
\`\`\`

## 📚 Guía de uso

1. **Registro e inicio de sesión**: Crea una cuenta o inicia sesión para acceder a todas las funcionalidades.
2. **Exploración**: Navega por el catálogo de juegos o utiliza la búsqueda para encontrar títulos específicos.
3. **Favoritos**: Añade juegos a tu lista de favoritos para acceder a ellos fácilmente más tarde.
4. **Carrito**: Añade juegos al carrito y gestiona tus compras.
5. **Reseñas**: Lee y escribe reseñas sobre los juegos.
6. **Perfil**: Gestiona tu información personal y preferencias desde el panel de usuario.

## 🔜 Futuras mejoras

- Implementación de un sistema de pagos
- Filtros avanzados para la búsqueda de juegos
- Sistema de notificaciones
- Modo oscuro/claro
- Integración con redes sociales

## 👥 Créditos

Desarrollado por **Nacho García**

Proyecto educativo de **2 DAW** en **MONLAU**.

Datos de videojuegos proporcionados por [RAWG API](https://rawg.io/apidocs).

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
