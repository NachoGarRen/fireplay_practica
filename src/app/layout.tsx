import "./globals.css"
import type { ReactNode } from "react"
import Header from "../components/header"
import Footer from "../components/footer"
import { AuthProvider } from "../hooks/useAuth"

export const metadata = {
  title: "Fireplay - Tu tienda de videojuegos",
  description: "Encuentra los mejores videojuegos en Fireplay",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-white text-black">
        <AuthProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
