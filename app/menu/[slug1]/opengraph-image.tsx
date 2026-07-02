import { ImageResponse } from 'next/og'
import { getStateMenuData } from '@/lib/stateData'

export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug1: string } }) {
  const data = getStateMenuData(params.slug1)
  
  if (!data) {
    return new Response('Not Found', { status: 404 })
  }
  const { state } = data

  const year = new Date().getFullYear()

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(to bottom right, #f8fafc, #f1f5f9)',
          fontFamily: 'sans-serif',
          padding: '80px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
          <div style={{
            background: '#d65a31',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '9999px',
            fontSize: '24px',
            fontWeight: 'bold',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            display: 'flex',
          }}>
            Updated {year}
          </div>
          <div style={{ width: '20px', display: 'flex' }} />
          <div style={{
            background: '#1e293b',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '9999px',
            fontSize: '24px',
            fontWeight: 'bold',
            display: 'flex',
          }}>
            {state.locationCount} Locations
          </div>
        </div>

        <div style={{ 
          fontSize: '96px', 
          fontWeight: '900', 
          color: '#0f172a',
          textAlign: 'center',
          lineHeight: '1.1',
          marginBottom: '24px',
          display: 'flex',
        }}>
          SaladWorks Menu
        </div>
        
        <div style={{ 
          fontSize: '72px', 
          fontWeight: '800', 
          color: '#d65a31',
          textAlign: 'center',
          display: 'flex',
        }}>
          Prices in {state.name}
        </div>
      </div>
    ),
    { ...size }
  )
}
