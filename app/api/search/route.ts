import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Helper function to get post content
function getPosts() {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const filenames = fs.readdirSync(postsDirectory)
  
  return filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    
    // Get first 150 characters of content as excerpt
    const excerpt = content.slice(0, 150).replace(/[#*`]/g, '') + (content.length > 150 ? '...' : '')
    
    return {
      slug: filename.replace('.mdx', ''),
      title: data.title || '',
      date: data.date || '',
      tags: data.tags || [],
      content,
      excerpt
    }
  })
}

// Search function
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.toLowerCase() || ''
  
  if (!query || query.length < 2) {
    return NextResponse.json([])
  }
  
  const posts = getPosts()
  
  const results = posts.filter(post => {
    // Search in title
    if (post.title.toLowerCase().includes(query)) return true
    
    // Search in content
    if (post.content.toLowerCase().includes(query)) return true
    
    // Search in tags
    if (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query))) return true
    
    return false
  }).map(post => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    tags: post.tags,
    excerpt: post.excerpt
  }))
  
  return NextResponse.json(results)
}