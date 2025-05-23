import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'

const options = {
	theme: 'kanagawa-wave',  
	keepBackground: true,
}

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
      tags: data.tags,
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
					<div className="flex items-center gap-3 text-sm mb-4">
						<span className="text-[#6b7280]">{post.date}</span>
						{post.tags?.map((tag: string) => (
							<span
								key={tag}
								className="px-2 py-1 bg-[#e6ede8] rounded-full text-xs"
							>
								{tag}
							</span>
						))}
					</div>
					<MDXRemote 
						source={post.content}
						options={{
							mdxOptions: {
								rehypePlugins: [[rehypePrettyCode, options]]
							}
						}}
					/>
					<hr className='mt-10'/>
				</article>
			))}
		</div>
	)
}

