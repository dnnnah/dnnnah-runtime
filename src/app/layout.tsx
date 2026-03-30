import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import { EasterEggs }     from '@/shared/components/EasterEggs'
import { TerminalModal }  from '@/features/terminal'
import '@/app/globals.css'

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
        <TerminalModal />
      </body>
    </html>
  )
}