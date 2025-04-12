const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Function to generate RSS feed
function generateRSSFeed() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);
  
  // Sort posts by date, newest first
  const sortedPosts = filenames
    .filter(filename => filename.endsWith('.mdx'))
    .map((filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      
      return {
        slug: filename.replace('.mdx', ''),
        title: data.title || '',
        date: data.date || '',
        content: content.slice(0, 300).replace(/[#*`]/g, '') + (content.length > 300 ? '...' : ''),
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Site info
  const site = {
    title: "Paul's Garden",
    description: "A digital garden of thoughts and notes",
    url: "https://pauls.garden",
    lastBuildDate: new Date().toUTCString()
  };

  // Start building RSS feed
  let rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${site.title}</title>
  <link>${site.url}</link>
  <description>${site.description}</description>
  <lastBuildDate>${site.lastBuildDate}</lastBuildDate>
  <atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml" />
`;

  // Add each post to RSS feed
  sortedPosts.forEach(post => {
    const postDate = new Date(post.date).toUTCString();
    const postLink = `${site.url}/${post.slug}/`;
    
    rss += `
  <item>
    <title><![CDATA[${post.title}]]></title>
    <link>${postLink}</link>
    <guid>${postLink}</guid>
    <pubDate>${postDate}</pubDate>
    <description><![CDATA[${post.content}]]></description>
  </item>`;
  });

  // Close RSS feed
  rss += `
</channel>
</rss>`;

  // Ensure public directory exists
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }
  
  // Write RSS feed to file - both to public and directly to out directory
  fs.writeFileSync(
    path.join(publicDir, 'rss.xml'),
    rss
  );
  
  // Also write directly to out directory for Vercel deployments
  const outDir = path.join(process.cwd(), 'out');
  if (fs.existsSync(outDir)) {
    fs.writeFileSync(
      path.join(outDir, 'rss.xml'),
      rss
    );
  }
  
  console.log('RSS feed generated successfully!');
}

// Run the function
generateRSSFeed();