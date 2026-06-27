import fs from 'fs'
import path from 'path'

export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  author: string
}

export function getAllPosts(): Post[] {
  try {
    const postsDirectory = path.join(process.cwd(), 'content', 'posts')
    if (!fs.existsSync(postsDirectory)) return []
    
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map(fileName => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      
      // Super naive frontmatter extraction to avoid heavy dependencies in a simple util
      const titleMatch = fileContents.match(/title:\s*"([^"]+)"/)
      const dateMatch = fileContents.match(/date:\s*"([^"]+)"/)
      const excerptMatch = fileContents.match(/excerpt:\s*"([^"]+)"/)
      const authorMatch = fileContents.match(/author:\s*"([^"]+)"/)

      return {
        slug,
        title: titleMatch ? titleMatch[1] : slug,
        date: dateMatch ? dateMatch[1] : '2026-06-01',
        excerpt: excerptMatch ? excerptMatch[1] : '',
        author: authorMatch ? authorMatch[1] : 'Editorial Team'
      }
    })
    
    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
  } catch (e) {
    return []
  }
}
