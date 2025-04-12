const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Function to generate the search data
function generateSearchData() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);
  
  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      slug: filename.replace('.mdx', ''),
      title: data.title || '',
      date: data.date || '',
      tags: data.tags || [],
      content
    };
  });
  
  // Ensure public directory exists
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }
  
  // Write the data to a JSON file
  fs.writeFileSync(
    path.join(publicDir, 'search-data.json'),
    JSON.stringify(posts)
  );
  
  console.log('Search data generated successfully!');
}

// Run the function
generateSearchData();