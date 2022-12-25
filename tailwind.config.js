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
        gradientLogo: 'gradientLogo 2s ease infinite',
      },
      keyframes: {
        gradientLogo: {
          "0%,100%": {
            backgroundPosition: "0% 10%",
            backgroundSize: "200% 200%",
          },
          "50%": {
            backgroundPosition: "50% 10%",
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
