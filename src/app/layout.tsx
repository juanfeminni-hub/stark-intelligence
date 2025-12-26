import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'STARK Intelligence - CFO Virtual',
  description: 'Seu CFO Virtual com Inteligência Artificial',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
