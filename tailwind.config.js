const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        '8xl': '88rem',
      },
      lineClamp: {
        10: '10',
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        'xxs': '0.65rem',
      },
      animation: {
        gradientLogo: 'gradientLogo 10s ease infinite',
      },
      keyframes: {
        gradientLogo: {
          "0%, 100%": {
            backgroundSize:"200% 400%",
            backgroundPosition:"60% 0%",
          },
          "50%": {
            backgroundSize:"200% 400%",
            backgroundPosition:"100% 0%",
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
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
