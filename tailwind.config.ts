import type { Config } from 'tailwindcss/types/config'

import animatePlugin from 'tailwindcss-animate'
import textFillPlugin from 'tailwindcss-text-fill'
import plugin from 'tailwindcss/plugin'

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    fontFamily: { poppins: ['Poppins', 'sans-serif'] },
    container: {
      center: true,
      padding: { DEFAULT: '20px', md: '32px', lg: '24px' },
      screens: { sm: '375px', md: '768px', lg: '1440px' }
    },
    backgroundImage: {
      'soft-green': 'linear-gradient(180deg, #fff 25%, #BEDBB0 92.19%)'
    },
    boxShadow: { main: '0px 4px 16px 0px rgba(17, 17, 17, 0.10)' },
    colors: {
      black: '#161616',
      'black-soft': '#121212',
      'black-muted': '#1F1F1F',
      'black-deep': '#151515',

      gray: '#ECEDFD66',
      'gray-light': '#E8E8E8',

      white: '#FFFFFF',
      'white-soft': '#FCFCFC',
      'white-muted': '#F6F6F7',
      'white-gray': '#ECEDFD',

      brand: '#BEDBB0',
      'brand-light': '#9DC888',
      'brand-violet': '#5255BC',
      'brand-violet-light': '#7B7EDE',
      'brand-violet-muted': '#979CEA',
      'brand-violet-soft': '#B8BCFD',

      transparent: 'transparent',
      current: 'currentColor',
      blue: '#8FA1D0',
      red: '#DC2626',
      pink: '#E09CB5'
    },
    fontSize: {
      xs: [
        '8px',
        { lineHeight: 'normal', fontWeight: 400, letterSpacing: '-0.16px' }
      ],
      sm: [
        '10px',
        { lineHeight: 'normal', fontWeight: 400, letterSpacing: '-0.2px' }
      ],
      md: ['12px', { lineHeight: 'normal', letterSpacing: '-0.24px' }],
      base: ['14px', { lineHeight: '1.28', letterSpacing: '-0.28px' }],
      lg: ['16px', { lineHeight: 'normal', letterSpacing: '-0.64px' }],
      xl: [
        '18px',
        { lineHeight: 'normal', fontWeight: 500, letterSpacing: '-0.36px' }
      ],
      '2xl': [
        '28px',
        { lineHeight: 'normal', fontWeight: 600, letterSpacing: '-1.12px' }
      ],
      '3xl': [
        '40px',
        { lineHeight: 'normal', fontWeight: 600, letterSpacing: '-1.6px' }
      ]
    },
    extend: {
      spacing: {
        4.5: '18px',
        84: '335px'
      },
      screens: {
        mobile: '375px',
        tablet: '768px',
        desktop: '1440px'
      }
    }
  },
  plugins: [
    textFillPlugin,
    animatePlugin,
    plugin(({ addVariant }) => {
      addVariant('violet', ':is(:where(.violet) &)')
      addVariant('hocus', ['&:hover', '&:focus-visible', '&:active'])
    })
  ]
} satisfies Config
