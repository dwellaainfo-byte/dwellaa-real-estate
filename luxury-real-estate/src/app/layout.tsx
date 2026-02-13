import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { AuthProvider } from '@/contexts/AuthContext'
import SessionProvider from '@/components/providers/SessionProvider'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Luxury Properties International - Premier Real Estate',
  description: 'Discover the world\'s most exclusive luxury properties. From oceanfront estates to penthouse apartments, find your perfect luxury home with our expert team.',
  keywords: 'luxury real estate, premium properties, luxury homes, exclusive listings, high-end real estate, luxury estates, penthouse apartments, waterfront properties',
  authors: [{ name: 'Luxury Properties International' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Luxury Properties International',
    title: 'Luxury Properties International - Premier Real Estate',
    description: 'Discover the world\'s most exclusive luxury properties. From oceanfront estates to penthouse apartments, find your perfect luxury home.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Luxury Properties International',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxury Properties International - Premier Real Estate',
    description: 'Discover the world\'s most exclusive luxury properties.',
    images: ['/images/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <SessionProvider>
          <AuthProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1 pt-20">
                {children}
              </main>
              <Footer />
            </div>
          </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  )
}