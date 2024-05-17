import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';


export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'mineralogy.rocks';

  return new ImageResponse(
    (
      <div style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundImage: 'url(https://mineralogy.rocks/og-bg.png)',
        backgroundSize: '1210px 600px',
      }}>
        <div style={{
            fontSize: 60,
            fontWeight: 100,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            color: 'white',
            marginBottom: 0,
            padding: '0 50px',
            lineHeight: 1.4,
            whiteSpace: 'pre-wrap',
          }}>
          {title}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
    },
  );
}
