import { blogData } from "@/data/blogData"
import { notFound } from "next/navigation"
import { Calendar, Clock, ArrowLeft, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { NutritionCalculator } from "@/components/NutritionCalculator"


export async function generateStaticParams() {
  return blogData.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = blogData.find(p => p.slug === params.slug)
  if (!post) return { title: 'Post Not Found' }
  return {
    title: `${post.title} | SaladWorks Blog`,
    description: post.excerpt,
  }
}

export default function SinglePostPage({ params }: { params: { slug: string } }) {
  const post = blogData.find(p => p.slug === params.slug)
  if (!post) notFound()

  const relatedPosts = blogData
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3)

  return (
    <div className="flex flex-col min-h-screen bg-site-bg">
      {/* Article Header */}
      <div className="bg-site-bg pt-16 pb-24 px-4 border-b border-gray-200">
        <div className="container mx-auto max-w-5xl">
          <Link href="/blog" className="inline-flex items-center text-sm font-bold text-brand-green hover:underline mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Posts
          </Link>
          
          <div className="mb-6 flex items-center gap-4">
            <span className="bg-brand-leaf text-site-white text-xs font-bold px-3 py-1 rounded-full">
              {post.category}
            </span>
            <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-site-black tracking-tight mb-6 leading-tight max-w-4xl">
            {post.title}
          </h1>
          <p className="text-xl text-gray-500 max-w-3xl">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Featured Image */}
      <div className="container mx-auto max-w-5xl px-4 -mt-16 mb-12 relative z-10">
        <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden shadow-xl bg-gray-100 border-4 border-site-bg">
          <Image 
            src={post.image} 
            alt={post.title} 
            title={post.title}
            fill 
            priority
            sizes="(max-width: 1024px) 100vw, 1200px"
            className="object-cover" 
          />
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto max-w-5xl px-4 py-8 mb-16">
        <article className="prose prose-lg prose-green max-w-none text-gray-600">
          {post.content.split('\n\n').map((paragraph, idx) => {
            const trimmed = paragraph.trim();
            if (!trimmed) return null;

            if (trimmed.startsWith('# ')) return null;

            if (trimmed.startsWith('## ')) {
              return <h2 key={idx} className="text-3xl font-extrabold text-site-black mt-12 mb-6">{trimmed.replace(/^## /, '')}</h2>
            }

            if (trimmed.startsWith('### ')) {
              return <h3 key={idx} className="text-2xl font-bold text-site-black mt-8 mb-4">{trimmed.replace(/^### /, '')}</h3>
            }

            if (trimmed.match(/^\d+\./)) {
              return (
                <ul key={idx} className="list-decimal pl-5 my-6 space-y-2 font-medium">
                  {trimmed.split('\n').map((item, i) => (
                    <li key={i}>{item.replace(/^\d+\.\s*/, '')}</li>
                  ))}
                </ul>
              )
            }

            if (trimmed.startsWith('- ')) {
              const lines = trimmed.split('\n').filter(line => line.trim().startsWith('- '));
              const priceMatches = lines.map(line => line.match(/-\s+\*\*(.*?)\*\*\s+(?:—|-)\s+(.*)/));
              const isPriceList = priceMatches.filter(Boolean).length > 0;
              
              if (isPriceList) {
                return (
                  <div key={idx} className="my-8 overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                    <table className="w-full text-left border-collapse m-0">
                      <thead>
                        <tr className="bg-brand-deep border-b-0">
                          <th className="py-4 px-6 font-bold text-[15px] text-white uppercase tracking-wider">Menu Item</th>
                          <th className="py-4 px-6 font-bold text-[15px] text-white uppercase tracking-wider w-48 text-right">Price</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-100">
                        {lines.map((item, i) => {
                          const match = item.match(/-\s+\*\*(.*?)\*\*\s+(?:—|-)\s+(.*)/);
                          if (match) {
                            return (
                              <tr key={i} className="hover:bg-gray-50 transition-colors">
                                <td className="py-4 px-6 text-site-black font-semibold border-0">{match[1]}</td>
                                <td className="py-4 px-6 text-brand-orange font-bold text-right border-0">{match[2]}</td>
                              </tr>
                            )
                          }
                          // Handle non-price items in the list gracefully
                          const cleanItem = item.replace(/^- \*\*(.*?)\*\*/, '$1').replace(/^- /, '');
                          return (
                            <tr key={i} className="hover:bg-gray-50 transition-colors">
                              <td className="py-4 px-6 text-site-black font-semibold border-0" colSpan={2}>{cleanItem}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                )
              }

              // Normal bullet list
              return (
                <ul key={idx} className="list-disc pl-5 my-6 space-y-2 text-gray-700">
                  {lines.map((item, i) => {
                    const cleanItem = item.replace(/^- \*\*(.*?)\*\*/, '<strong>$1</strong>').replace(/^- /, '');
                    return <li key={i} dangerouslySetInnerHTML={{ __html: cleanItem }} />
                  })}
                </ul>
              )
            }
            
            // Image parsing: ![alt](url)
            const imgMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
            if (imgMatch) {
              return (
                <div key={idx} className="my-8 rounded-xl overflow-hidden shadow-md">
                  <img src={imgMatch[2]} alt={imgMatch[1]} title={imgMatch[1]} loading="lazy" className="w-full h-auto object-cover max-h-[400px]" />
                </div>
              );
            }

            if (trimmed === '[CALCULATOR_WIDGET]') {
              return <NutritionCalculator key={idx} />
            }

            // Standard paragraph with link parsing
            const cleanText = trimmed
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/\*(.*?)\*/g, '<em>$1</em>')
              .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-brand-green font-bold hover:underline transition-colors">$1</a>');
              
            return <p key={idx} className="mb-6 leading-relaxed text-gray-600 text-lg" dangerouslySetInnerHTML={{ __html: cleanText }} />
          })}
        </article>

        {/* Author Info */}
        <div className="mt-16 pt-8 border-t border-gray-200 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
            <User className="h-8 w-8 text-gray-400" />
          </div>
          <div>
            <h3 className="font-bold text-site-black text-lg">SaladWorks Editorial Team</h3>
            <p className="text-gray-500 text-sm">Passionate foodies sharing tips on fresh, healthy eating.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
