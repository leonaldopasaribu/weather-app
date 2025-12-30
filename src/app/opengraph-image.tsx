import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'The Weather Channel - Accurate Weather Forecasts';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              fontSize: '120px',
              marginRight: '20px',
            }}
          >
            ☀️
          </div>
        </div>
        <div
          style={{
            fontSize: '72px',
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            marginBottom: '20px',
            textShadow: '2px 2px 10px rgba(0,0,0,0.3)',
          }}
        >
          The Weather Channel
        </div>
        <div
          style={{
            fontSize: '36px',
            color: 'rgba(255,255,255,0.9)',
            textAlign: 'center',
            maxWidth: '900px',
            textShadow: '1px 1px 5px rgba(0,0,0,0.2)',
          }}
        >
          Accurate Weather Forecasts & Real-Time Updates
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: '60px',
            gap: '40px',
            color: 'white',
            fontSize: '28px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>🌡️</span>
            <span>Temperature</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>💨</span>
            <span>Wind Speed</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>💧</span>
            <span>Humidity</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
