import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Winglish — Learn English Through Real-Life Communication',
  description: 'AI-powered English learning platform. Master English through real-life conversations, instant feedback, and personalized learning paths.',
  keywords: 'English learning, AI tutor, language learning, speaking practice',
}

import { AuthProvider } from '@/context/AuthContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-navy text-white antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
