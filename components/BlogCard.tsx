import Link from "next/link"
import Image from "next/image"
import { BlogPost } from "@/data/blogData"
import { Calendar, Clock } from "lucide-react"

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <div className="bg-site-white border border-gray-200 rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col h-full group">
      <Link href={`/blog/${post.slug}`} className="relative h-56 overflow-hidden block">
        <Image 
          src={post.image} 
          alt={post.title} 
          title={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 380px"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </Link>
      
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
          <div className="bg-brand-leaf text-site-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            {post.category}
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
        
        <Link href={`/blog/${post.slug}`} className="group-hover:text-brand-green transition-colors">
          <h3 className="text-xl font-bold text-site-black mb-3 line-clamp-2">{post.title}</h3>
        </Link>
        
        <p className="text-gray-500 text-sm mb-6 flex-1 line-clamp-3">
          {post.excerpt}
        </p>
        
        <Link 
          href={`/blog/${post.slug}`}
          className="border border-brand-green text-brand-green hover:bg-brand-green hover:text-site-white px-4 py-2 rounded-lg text-sm inline-flex items-center w-fit transition-colors mt-auto"
        >
          Read More
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </Link>
      </div>
    </div>
  )
}
