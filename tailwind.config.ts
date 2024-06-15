import type { Config } from 'tailwindcss/types/config'

import plugin from 'tailwindcss/plugin'
import { createThemes } from 'tw-colors'

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
      'welcome-page-gradient':
        'linear-gradient(180deg, #fff 25%, #BEDBB0 92.19%)'
    },
    boxShadow: { select: '0px 4px 16px 0px rgba(17, 17, 17, 0.10)' },
    extend: {
      spacing: {
        sm: '10px',
        lg: '18px',
        xl: '26px',
        '2xl': '49px',
        '3xl': '56px',
        '4xl': '61px',
        '5xl': '154px',
        '7xl': '260px',
        '8xl': '335px'
      },
      screens: {
        mobile: '375px',
        tablet: '768px',
        desktop: '1440px'
      },
      colors: {
        black: '#161616',
        'black-secondary': '#121212',
        'black-third': '#1F1F1F',
        'black-fourth': '#151515',
        brand: '#BEDBB0',
        'brand-hover': '#9DC888',
        'brand-secondary': '#5255BC',
        'brand-secondary-hover': '##7B7EDE',
        'brand-third': '#B8BCFD',
        'white-primary': '#FCFCFC',
        'white-gray': '#F6F6F7',
        'white-gray-secondary': '#ECEDFD',
        'gray-secondary': '#ECEDFD66',
        'priority-low': '#8FA1D0',
        'priority-medium': '#E09CB5',
        'scroll-white': '#E8E8E8'
      },
      fontSize: {
        extrasm: [
          '8px',
          { lineHeight: 'normal', fontWeight: 400, letterSpacing: '-0.16px' }
        ],
        xs: [
          '10px',
          { lineHeight: 'normal', fontWeight: 400, letterSpacing: '-0.2px' }
        ],
        sm: ['12px', { lineHeight: 'normal', letterSpacing: '-0.24px' }],
        base: ['14px', { lineHeight: '1.28', letterSpacing: '-0.28px' }],
        md: ['16px', { lineHeight: 'normal', letterSpacing: '-0.64px' }],
        lg: [
          '18px',
          { lineHeight: 'normal', fontWeight: 500, letterSpacing: '-0.36px' }
        ],
        '3xl': [
          '28px',
          { lineHeight: 'normal', fontWeight: 600, letterSpacing: '-1.12px' }
        ],
        '4xl': [
          '40px',
          { lineHeight: 'normal', fontWeight: 600, letterSpacing: '-1.6px' }
        ]
      }
    }
  },
  plugins: [
    require('tailwindcss-text-fill'),
    require('tailwindcss-animate'),
    plugin(({ addVariant }) => {
      addVariant('hocus', ['&:hover', '&:focus', '&:active'])
    }),
    createThemes({ violet: {} })
  ]
} satisfies Config
