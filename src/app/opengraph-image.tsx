import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Boosted - Band Booster Software'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #ea580c 0%, #b45309 100%)',
          fontSize: 60,
          fontWeight: 700,
        }}
      >
        <div
          style={{
            color: 'white',
            marginBottom: 20,
            textAlign: 'center',
          }}
        >
          Boosted
        </div>
        <div
          style={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: 32,
            textAlign: 'center',
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          Supercharge Your Band Booster Fundraising
        </div>
        <div
          style={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: 24,
            textAlign: 'center',
            marginTop: 20,
          }}
        >
          Join the waitlist at boosted.band
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}