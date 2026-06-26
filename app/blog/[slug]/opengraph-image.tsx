import { ImageResponse } from 'next/og'
import { blogData } from '@/data/blogData'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
  const post = blogData.find((p) => p.slug === params.slug)
  const title = post ? post.title : 'SaladWorks Blog'

  return new ImageResponse(
    (
      <div
        style={{
          background: '#F5F3EE',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        <div
          style={{
            background: '#4A7C2F',
            color: 'white',
            padding: '12px 32px',
            borderRadius: '999px',
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '40px',
          }}
        >
          SaladWorks Blog
        </div>
        
        <h1
          style={{
            fontSize: 80,
            fontWeight: 900,
            color: '#1A1A1A',
            textAlign: 'center',
            lineHeight: 1.1,
            margin: '0 0 40px 0',
            letterSpacing: '-0.02em',
            padding: '0 40px',
          }}
        >
          {title}
        </h1>
        
        <p
          style={{
            fontSize: 32,
            color: '#6B7280',
            textAlign: 'center',
            margin: 0,
            fontWeight: 500,
          }}
        >
          By SaladWorks • Updated 2026
        </p>
      </div>
    ),
    { ...size }
  )
}
