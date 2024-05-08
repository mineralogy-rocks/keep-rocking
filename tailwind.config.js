const { fontFamily } = require('tailwindcss/defaultTheme');
const themeSwapper = require('tailwindcss-theme-swapper');
const colors = require('tailwindcss/colors')

const themes = [
  {
    name: 'base',
    selectors: [':root'],
    theme: {
      colors: {
        font: {
          DEFAULT: colors.slate[600],
          primary: '#0f172a',
          secondary: '#4d5c72',
          ternary: '#9ca3af',
          blue: colors.sky[600],
          blueDark: colors.sky[600],// '#1e3a8a',
          orange: '#f3ece9',
        },
        gray: {
          DEFAULT: '#f1f1f1',
        }
      },
    }
  },
  {
    name: 'dark',
		selectors: ['.dark'],
    mediaQuery: '@media (prefers-color-scheme: dark)',
    theme: {
      colors: {
        font: {
          DEFAULT: colors.slate[400],
          primary: '#f1f1f1',
          secondary: colors.slate[300],
          ternary: '#9ca3af',
          blue: colors.sky[400],
          blueDark: colors.blue[400],
          orange: '#f3ece9',
        },
        gray: {
          DEFAULT: '#f1f1f1',
        }
      },
    }
  }
];

/** @type {import('tailwindcss').Config} */
module.exports = {
  experimental: {
    optimizeUniversalDefaults: true,
  },
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./helpers/*.{js,ts,jsx,tsx}",
  ],
  // TODO: remove this after testing dark styles
  // darkMode: 'selector',
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: theme('colors.font.primary'),
            pre: {
              backgroundColor: theme('colors.neutral.50'),
              padding: theme('padding.5'),
              boxShadow: `0.3px 0.5px 0.7px hsl(210deg 12% 67% / 0.18),
                          0.4px 0.8px 1.1px -0.8px hsl(210deg 12% 67% / 0.25),
                          0.9px 1.8px 2.5px -1.6px hsl(210deg 12% 67% / 0.31);`,
              display: 'flex',
              marginTop: `${20 / 14}em`,
              marginBottom: `${32 / 14}em`,
            },
            a: {
              fontWeight: theme('fontWeight.medium'),
              textDecoration: 'none',
              borderBottom: `1px solid ${theme('colors.sky.500')}`,
            },
            'a:hover': {
              borderBottomWidth: '2px',
            },
            'code span': {
              fontWeight: theme('fontWeight.semibold'),
            },
            'pre code': {
              flex: 'none',
              minWidth: '100%',
              lineHeight: theme('lineHeight.tight'),
            },
            p: {
              lineHeight: theme('lineHeight.normal'),
            }
          }
        },
        dark: {
          css: {
            color: theme('colors.font.primary'),
            pre: {
              backgroundColor: theme('colors.slate.800'),
              borderRadius: theme('borderRadius.sm'),
              padding: theme('padding.5'),
              boxShadow: `0.3px 0.5px 0.7px hsl(210deg 12% 67% / 0.18),
                          0.4px 0.8px 1.1px -0.8px hsl(210deg 12% 67% / 0.25),
                          0.9px 1.8px 2.5px -1.6px hsl(210deg 12% 67% / 0.31);`,
              display: 'flex',
              marginTop: `${20 / 14}em`,
              marginBottom: `${32 / 14}em`,
            },
            a: {
              fontWeight: theme('fontWeight.semibold'),
              textDecoration: 'none',
              borderBottom: `1px solid ${theme('colors.indigo.300')}`,
            },
            'a:hover': {
              borderBottomWidth: '2px',
            },
          }
        },
      }),

      colors: {
        lilac: {
          DEFAULT: '#F500AB',
        },
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
        "gray-surface": `
          0.3px 0.5px 0.7px hsl(210deg 12% 67% / 0.18),
          0.4px 0.8px 1.1px -0.8px hsl(210deg 12% 67% / 0.25),
          0.9px 1.8px 2.5px -1.6px hsl(210deg 12% 67% / 0.31);
        `,
      })
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    themeSwapper({
			themes: themes
		})
  ],
}
