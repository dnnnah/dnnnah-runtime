import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import { EasterEggs }     from '@/shared/components/EasterEggs'
import '@/app/globals.css'

/**
 * JetBrains Mono — fuente del sistema para todo el UI.
 * Variable CSS: --font-jetbrains
 */
const jetbrainsMono = JetBrains_Mono({
  subsets:  ['latin'],
  weight:   ['400', '500', '700'],
  variable: '--font-jetbrains',
  display:  'swap',
})

export const metadata: Metadata = {
  title:       'DNNNAH — Runtime Engineer',
  description: 'Senior Software Engineering Portfolio',
}

/**
 * Layout raíz — EasterEggs montado aquí para que funcione
 * en todas las rutas sin duplicar código.
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
        <EasterEggs />
      </body>
    </html>
  )
}