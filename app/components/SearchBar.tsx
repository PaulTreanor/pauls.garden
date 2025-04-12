'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export interface Post {
  slug: string
  title: string
  date: string
  tags?: string[]
  content: string
}

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [posts, setPosts] = useState<Post[]>([])
  const [results, setResults] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Fetch all posts data on component mount
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/search-data.json')
        if (!response.ok) throw new Error('Failed to fetch posts')
        const data = await response.json()
        setPosts(data)
      } catch (error) {
        console.error('Error loading posts:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchPosts()
  }, [])

  // Filter posts based on search query
  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      return
    }

    const lowercaseQuery = query.toLowerCase()
    const filteredResults = posts.filter(post => {
      // Search in title
      if (post.title.toLowerCase().includes(lowercaseQuery)) return true
      
      // Search in content
      if (post.content.toLowerCase().includes(lowercaseQuery)) return true
      
      // Search in tags
      if (post.tags && post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))) return true
      
      return false
    })
    
    setResults(filteredResults)
  }, [query, posts])

  const handleResultClick = (slug: string) => {
    setQuery('')
    setResults([])
    router.push(`/${slug}/`)
  }

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts and tags..."
          className="w-full px-4 py-2 border border-[#588157] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3a5a40] bg-white"
          disabled={isLoading}
        />
        {isLoading && (
          <div className="absolute right-3 top-2.5">
            <div className="animate-spin h-5 w-5 border-2 border-[#588157] border-t-transparent rounded-full"></div>
          </div>
        )}
      </div>

      {results.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {results.map((result) => (
            <div
              key={result.slug}
              onClick={() => handleResultClick(result.slug)}
              className="p-3 hover:bg-[#e6ede8] cursor-pointer border-b border-gray-100"
            >
              <h3 className="font-medium text-[#3a5a40]">{result.title}</h3>
              <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mt-1">
                <span>{result.date}</span>
                {result.tags?.map((tag) => (
                  <span key={tag} className="px-1.5 py-0.5 bg-[#e6ede8] rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {result.content.slice(0, 150).replace(/[#*`]/g, '')}
                {result.content.length > 150 ? '...' : ''}
              </p>
            </div>
          ))}
        </div>
      )}
      
      {query.length >= 2 && results.length === 0 && !isLoading && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg p-3 text-center text-gray-500">
          No results found for "{query}"
        </div>
      )}
    </div>
  )
}