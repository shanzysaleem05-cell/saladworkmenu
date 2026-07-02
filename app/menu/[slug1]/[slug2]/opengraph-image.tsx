import { ImageResponse } from 'next/og'
import { getStateMenuData, StateMenuItem } from '@/lib/stateData'
import fs from 'fs'
import path from 'path'

export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug1: string, slug2: string } }) {
  const data = getStateMenuData(params.slug1)
  
  if (!data) {
    return new Response('Not Found', { status: 404 })
  }
  const { state, categories: menuData } = data

  let item: StateMenuItem | undefined
  let categoryName = 'Menu Item'
  for (const cat of menuData) {
    const found = cat.items.find(i => i.slug === params.slug2)
    if (found) {
      item = found
      categoryName = cat.name
      break
    }
  }

  if (!item) {
    return new Response('Not Found', { status: 404 })
  }

  const year = new Date().getFullYear()

  // Try to load the image buffer from public folder
  let imgBuffer: ArrayBuffer | null = null
  let imageBase64 = ''
  
  try {
    if (item.image) {
      const imgPath = path.join(process.cwd(), 'public', item.image)
      if (fs.existsSync(imgPath)) {
        const fileBuffer = fs.readFileSync(imgPath)
        imgBuffer = fileBuffer.buffer.slice(fileBuffer.byteOffset, fileBuffer.byteOffset + fileBuffer.byteLength) as ArrayBuffer
        // Convert to base64 for embedding in the HTML structure
        imageBase64 = `data:image/webp;base64,${fileBuffer.toString('base64')}`
      }
    }
  } catch (error) {
    console.error('OG Image generation error:', error)
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: 'linear-gradient(to bottom right, #ffffff, #f8fafc)',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Left Content Column */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          width: imageBase64 ? '60%' : '100%',
          padding: '80px',
          justifyContent: 'center',
        }}>
          {/* Pills / Badges */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{
              background: '#d65a31',
              color: 'white',
              padding: '10px 24px',
              borderRadius: '9999px',
              fontSize: '20px',
              fontWeight: 'bold',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              display: 'flex',
            }}>
              {state.name}
            </div>
            
            <div style={{
              background: '#1e293b',
              color: 'white',
              padding: '10px 24px',
              borderRadius: '9999px',
              fontSize: '20px',
              fontWeight: 'bold',
              display: 'flex',
            }}>
              ${item.price.toFixed(2)} Avg
            </div>

            {item.calories ? (
              <div style={{
                background: '#f1f5f9',
                color: '#475569',
                padding: '10px 24px',
                borderRadius: '9999px',
                fontSize: '20px',
                fontWeight: 'bold',
                display: 'flex',
                border: '2px solid #e2e8f0',
              }}>
                {item.calories} Cal
              </div>
            ) : null}
          </div>

          <div style={{ 
            fontSize: '28px',
            color: '#64748b',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '16px',
            display: 'flex',
          }}>
            SaladWorks • {categoryName}
          </div>

          <div style={{ 
            fontSize: '76px', 
            fontWeight: '900', 
            color: '#0f172a',
            lineHeight: '1.1',
            marginBottom: '32px',
            display: 'flex',
          }}>
            {item.name}
          </div>
          
          <div style={{ 
            fontSize: '32px', 
            fontWeight: '500', 
            color: '#475569',
            display: 'flex',
          }}>
            Pricing updated for {year}
          </div>
        </div>

        {/* Right Image Column */}
        {imageBase64 && (
          <div style={{
            display: 'flex',
            width: '40%',
            height: '100%',
            background: '#f1f5f9',
            alignItems: 'center',
            justifyContent: 'center',
            borderLeft: '4px solid #e2e8f0',
          }}>
            <img 
              src={imageBase64} 
              alt={item.name} 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
        )}
      </div>
    ),
    { ...size }
  )
}
