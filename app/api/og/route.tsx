import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';


export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'mineralogy.rocks';
  // const backgroundImage = require('/public/og-bg.svg');
  // console.log('backgroundImage', backgroundImage.default.src);

  const fontData = await fetch(
    new URL('../../../public/assets/fonts/Inter-VariableFont_slnt,wght.ttf', import.meta.url),
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        fontFamily: 'Inter, sans-serif',
        justifyContent: 'center',
        backgroundImage: 'url(https://dev.mineralogy.rocks/og-bg.svg)',
        backgroundSize: 'cover',
        borderRadius: 10,
      }}>
        <div style={{
          fontSize: 40,
          fontWeight: 100,
          fontStyle: 'normal',
          letterSpacing: '-0.025em',
          color: 'white',
          marginBottom: 0,
          padding: '0 10px',
          lineHeight: 1.4,
          whiteSpace: 'pre-wrap',
        }}>
          {title}
        </div>
      </div>
    ),
    {
      width: 700,
      height: 400,
      fonts: [
        {
          data: fontData,
          name: 'Inter',
          style: 'normal',
        },
      ],
    },
  );
}
