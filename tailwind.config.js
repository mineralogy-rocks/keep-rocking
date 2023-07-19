const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./helpers/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        font: {
          DEFAULT: '#1e293b',
          primary: '#0f172a',
          secondary: '#64748b',
          blue: '#1d4ed8',
          blueDark: '#1e3a8a',
        }
      },
      maxWidth: {
        '8xl': '88rem',
      },
      lineClamp: {
        10: '10',
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
      fontSize: {
        'xxs': '0.65rem',
      },
      animation: {
        gradientLogo: 'gradientLogo 10s ease infinite',
      },
      keyframes: {
        shimmer: {
          "100%": {
            "transform": "translateX(100%)",
          },
        },
        gradientLogo: {
          "0%,100%": {
            backgroundPosition: "0% 30%",
            backgroundSize: "200% 200%",
          },
          "50%": {
            backgroundPosition: "70% 30%",
            backgroundSize: "200% 200%",
          },
        },
        wiggleLeft: {
          "0%,100%": {
            transform: "translateX(0%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)"
           },
          "50%": {
            transform: "translateX(-40%)",
            "animation-timing-function": "ease-in-out"
           },
        },
        wiggleRight: {
          "0%,100%": {
            transform: "translateX(0%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)"
           },
          "50%": {
            transform: "translateX(40%)",
            "animation-timing-function": "ease-in-out"
           },
        },
        loading: {
          "0%": {
            opacity: 0.2,
          },
          "20%": {
            opacity: 1,
          },
          to: {
            opacity: 0.2,
          }
        },
        blink: {
          "0%,100%": {
            opacity: 1,
          },
          "50%": {
            opacity: 0.5,
          },
        }
      },
      boxShadow: ({ theme }) => ({
        "surface-low": `
          0.3px 0.5px 0.7px hsl(210deg 12% 67% / 0.18),
          0.4px 0.8px 1.1px -0.8px hsl(210deg 12% 67% / 0.25),
          0.9px 1.8px 2.5px -1.6px hsl(210deg 12% 67% / 0.31);
        `,
        "surface-medium": `
          0.3px 0.5px 0.7px hsl(210deg 12% 67% / 0.19),
          0.9px 1.8px 2.5px -0.5px hsl(210deg 12% 67% / 0.24),
          2px 4px 5.6px -1.1px hsl(210deg 12% 67% / 0.29),
          4.6px 9.1px 12.8px -1.6px hsl(210deg 12% 67% / 0.35);
        `,
      })
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
