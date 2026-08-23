import { SectionHeading } from "@/components/SectionHeading"
import { BlogCard } from "@/components/BlogCard"
import { blogData } from "@/data/blogData"

export const metadata = {
  title: "Blog | SaladWorks",
  description: "Read the latest news, tips, and stories from SaladWorks.",
}

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen bg-site-bg">
      {/* Header */}
      <div className="bg-site-bg py-16 px-4 text-center border-b border-gray-200">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-site-black tracking-tight mb-4">SaladWorks Blog 2026</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Expert guides, secret menu hacks & money-saving tips - Updated June 2026
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="container mx-auto px-5 md:px-10 lg:px-16 py-16 max-w-7xl flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogData.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}
