import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'

export default async function Home() {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const filenames = fs.readdirSync(postsDirectory)

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    return {
      slug: filename.replace('.mdx', ''),
      title: data.title,
      date: data.date,
      content,
    }
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="space-y-12">
      {posts.map((post) => (
        <article key={post.slug} className="prose">
          {post.title && (
            <h2 className="text-2xl font-semibold mb-2">
              <a href={`/${post.slug}`} className="text-[#3a5a40] no-underline hover:underline">
                {post.title}
              </a>
            </h2>
          )}
          <div className="text-sm text-[#6b7280] mb-4">{post.date}</div>
          <MDXRemote source={post.content} />
        </article>
      ))}
    </div>
  )
}

