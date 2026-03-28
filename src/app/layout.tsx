import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import '@/app/globals.css'

/**
 * JetBrains Mono — fuente del sistema para todo el UI.
 * Monument Extended se activará cuando tengamos la licencia.
 * Variable CSS: --font-jetbrains
 */
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'DNNNAH — Runtime Engineer',
  description: 'Senior Software Engineering Portfolio',
}

/**
 * Layout raíz de la aplicación.
 * - Clase "dark" por defecto (Dracula theme)
 * - Monument Extended comentado hasta tener licencia
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body className={jetbrainsMono.variable}>
        {children}
      </body>
    </html>
  )
}