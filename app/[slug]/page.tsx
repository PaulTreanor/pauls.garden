import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import rehypePrettyCode from 'rehype-pretty-code'

const options = {
	theme: 'github-dark',  // or any other theme you prefer
	keepBackground: true,
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const filenames = fs.readdirSync(postsDirectory)

  return filenames.map((filename) => ({
    slug: filename.replace('.mdx', ''),
  }))
}

export default async function Post({ params }: { params: { slug: string } }) {
  const { slug } = params
  const filePath = path.join(process.cwd(), 'posts', `${slug}.mdx`)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  return (
    <div className="prose">
      {data.title && <h1 className="text-3xl font-semibold mb-2">{data.title}</h1>}
      <div className="text-sm text-[#6b7280] mb-4">{data.date}</div>
      <MDXRemote 
        source={content} 
        options={{
          mdxOptions: {
            rehypePlugins: [[rehypePrettyCode, options]]
          }
        }}
      />
      <div className="mt-8">
        <Link href="/" className="text-[#588157] hover:underline">
          ← Back to all posts
        </Link>
      </div>
    </div>
  )
}

