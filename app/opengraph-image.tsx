import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'SaladWorks Menu Prices 2026 — Full Menu, Calories and Nutrition Guide'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 72,
          background: '#d65a31',
          color: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 900,
          fontFamily: 'sans-serif',
          padding: '40px',
          textAlign: 'center'
        }}
      >
        <div style={{ fontSize: 96, marginBottom: 20 }}>SaladWorks</div>
        <div>Menu Prices 2026</div>
      </div>
    ),
    { ...size }
  )
}
