import './globals.css'
import type { Metadata } from 'next'
import React from 'react'; // Import React
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'My Digital Garden',
  description: 'For my digital notes',
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
          <header className="mb-8 flex justify-between items-center">
            <h1 className="text-3xl font-semibold text-[#3a5a40]"><Link href="/">🌲 Pauls.Garden </Link></h1>
            <nav>
            <Link href="/2024-11-11-welcome-to-pauls-garden/" className="text-[#3a5a40] hover:underline">About</Link>
            </nav>
          </header>
          <div className="mb-8 p-4 bg-[#e6ede8] rounded-lg text-[#3a5a40] text-sm">
            🚧 This site is a work in progress!
            <span className="flex items-center gap-2">
				<span>I still need to add a search bar so use </span> <kbd className="px-1 py-0.5 bg-[#588157] text-white rounded">Ctrl/⌘ F</kbd> for now
			</span>
            
          </div>
          {children}
        </main>
      </body>
    </html>
  )
}

