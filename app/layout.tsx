import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '../components/theme-provider'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'VITRPM',
  description: 'VIT Professor Rating and Management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <header className="bg-primary text-primary-foreground p-4">
            <Link href="/" className="text-2xl font-bold">VITRPM</Link>
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

