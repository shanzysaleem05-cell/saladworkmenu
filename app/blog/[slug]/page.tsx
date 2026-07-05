import { Metadata } from "next"
import { notFound } from "next/navigation"
import BlogPostClient from "./BlogPostClient"
import { JsonLd } from "@/components/JsonLd"
import { FaqSection } from "@/components/FaqSection"
import { Breadcrumbs } from "@/components/Breadcrumbs"
import { blogData } from "@/data/blogData"

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return blogData.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogData.find(p => p.slug === params.slug)
  
  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  const url = `https://saladworksmenu.us/blog/${post.slug}`
  const imageUrl = `https://saladworksmenu.us${post.image}`

  return {
    title: post.title,
    description: post.excerpt || `Read ${post.title} on the SaladWorks Blog.`,
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: url,
      type: "article",
      publishedTime: post.date,
      authors: ["SaladWorks"],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
    },
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = blogData.find(p => p.slug === params.slug)

  if (!post) notFound()

  const url = `https://saladworksmenu.us/blog/${post.slug}`
  const imageUrl = `https://saladworksmenu.us${post.image}`

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": [imageUrl],
    "datePublished": post.date,
    "dateModified": post.date,
    "author": [{
      "@type": "Person",
      "name": "SaladWorks"
    }],
    "publisher": {
      "@type": "Organization",
      "name": "SaladWorks",
      "logo": {
        "@type": "ImageObject",
        "url": "https://saladworksmenu.us/icon-192x192.png"
      }
    }
  }

  const faqs = [
    {
      question: "Can I find more articles like this?",
      answer: "Yes, visit our main Blog page to read more articles about healthy living, menu updates, and SaladWorks news."
    },
    {
      question: "Are the nutritional facts discussed here accurate?",
      answer: "We strive to provide accurate and up-to-date information. However, nutritional content can vary based on portion sizes and customizations at your local SaladWorks."
    }
  ]

  return (
    <>
      <JsonLd data={schema} />
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Blog", href: "/blog" },
        { label: post.title, href: `/blog/${post.slug}` }
      ]} />
      <BlogPostClient params={params} />
      <FaqSection faqs={faqs} />
    </>
  )
}
