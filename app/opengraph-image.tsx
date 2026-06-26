import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'SaladWorks Menu & Prices'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
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
          UPDATED 2026
        </div>
        
        <h1
          style={{
            fontSize: 90,
            fontWeight: 900,
            color: '#1A1A1A',
            textAlign: 'center',
            lineHeight: 1.1,
            margin: '0 0 24px 0',
            letterSpacing: '-0.02em',
          }}
        >
          SaladWorks Menu
        </h1>
        
        <p
          style={{
            fontSize: 40,
            color: '#6B7280',
            textAlign: 'center',
            margin: '0 0 60px 0',
            fontWeight: 500,
          }}
        >
          Full Prices, Calories & Nutrition
        </p>

        <div
          style={{
            background: '#D85A3B',
            color: 'white',
            padding: '24px 64px',
            borderRadius: '16px',
            fontSize: 32,
            fontWeight: 800,
          }}
        >
          View Complete Menu
        </div>
      </div>
    ),
    { ...size }
  )
}
