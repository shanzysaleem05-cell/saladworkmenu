import { ImageResponse } from 'next/og';

export const runtime = "edge";
export const alt = "SaladWorks Catering Packages 2026";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#2D5E1E',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          color: 'white',
        }}
      >
        <div style={{ background: 'white', color: '#2D5E1E', padding: '8px 24px', borderRadius: '999px', fontSize: 24, fontWeight: 'bold', marginBottom: 40 }}>
          CATERING 2026
        </div>
        <div style={{ fontSize: 80, fontWeight: 'bold', marginBottom: 20 }}>
          SaladWorks Catering
        </div>
        <div style={{ fontSize: 40, opacity: 0.9, marginBottom: 60 }}>
          Packages from $89.99 — Groups of 10 to 50+
        </div>
        <div style={{ fontSize: 32, color: '#A5D6A7' }}>
          saladworksmenu.us/catering
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
