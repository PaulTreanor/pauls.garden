import './globals.css'
import type { Metadata } from 'next'
import React from 'react'; // Import React

export const metadata: Metadata = {
  title: 'My Digital Garden',
  description: 'A stream of thoughts and learnings',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#f8f5f2] text-[#594a4e] min-h-screen">
        <main className="max-w-2xl mx-auto px-4 py-8">
          <header className="mb-8">
            <h1 className="text-3xl font-semibold text-[#3a5a40]">My Digital Garden</h1>
          </header>
          {children}
        </main>
      </body>
    </html>
  )
}

