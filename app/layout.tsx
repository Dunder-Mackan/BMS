import { Sidebar } from '@/components/Sidebar'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'BMS - Systems',
  description: 'En app för att hantera ditt företag',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sv">
      <body className={inter.className}>
        <div className="flex h-screen bg-gray-100">
          <Sidebar />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}

