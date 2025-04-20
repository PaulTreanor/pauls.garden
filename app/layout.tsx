import './globals.css'
import type { Metadata } from 'next'
import React from 'react'; // Import React
import Link from 'next/link'
import SearchBar from './components/SearchBar'

export const metadata: Metadata = {
  title: 'My Digital Garden',
  description: 'For my digital notes',
  alternates: {
    types: {
      'application/rss+xml': 'https://pauls.garden/rss.xml',
    },
  },
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
          <h1 className="text-3xl font-semibold text-[#3a5a40] mb-4 text-center"><Link href="/">🌲 Pauls.Garden </Link></h1>
            <nav className="flex justify-center items-center gap-8">
              <Link href="/2024-11-11-welcome-to-pauls-garden/" className="text-[#3a5a40] hover:underline">About</Link>
              <Link href="/gainsreport" className="text-[#3a5a40] hover:underline">Gainsreport</Link>
              <a href="/rss.xml" className="text-[#3a5a40] hover:underline flex items-center gap-1" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M3.75 4.5a.75.75 0 0 1 .75-.75h.75c8.284 0 15 6.716 15 15v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75C18 11.708 12.292 6 5.25 6H4.5a.75.75 0 0 1-.75-.75V4.5Zm0 6a.75.75 0 0 1 .75-.75h.75a8.25 8.25 0 0 1 8.25 8.25v.75a.75.75 0 0 1-.75.75H12a.75.75 0 0 1-.75-.75v-.75a6 6 0 0 0-6-6H4.5a.75.75 0 0 1-.75-.75v-.75Zm0 7.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
                </svg>
                RSS
              </a>
            </nav>
            
          </header>
          <div className="mb-8">
            <SearchBar />
          </div>
          {children}
        </main>
      </body>
    </html>
  )
}

