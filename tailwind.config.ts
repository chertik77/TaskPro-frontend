import plugin from 'tailwindcss/plugin'
import { createThemes } from 'tw-colors'

const config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    fontFamily: {
      poppins: ['Poppins', 'sans-serif']
    },
    container: {
      center: true,
      padding: { DEFAULT: '20px', md: '32px', lg: '24px' },
      screens: { sm: '375px', md: '768px', lg: '1440px' }
    },
    backgroundImage: {
      'welcome-page-gradient':
        'linear-gradient(180deg, #fff 25%, #BEDBB0 92.19%)'
    },
    extend: {
      screens: {
        adaptive: { max: '375px' },
        mobile: '375px',
        tablet: '768px',
        'max-tablet': { max: '768px' },
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
        'priority-medium': '#E09CB5'
      },
      fontSize: {
        //! Font size - 8px
        'fs-8-lh-normal-fw-400': [
          '8px',
          { lineHeight: 'normal', fontWeight: 400, letterSpacing: '-0.16px' }
        ],
        //! Font size - 10px
        'fs-10-lh-normal-fw-400': [
          '10px',
          { lineHeight: 'normal', fontWeight: 400, letterSpacing: '-0.2px' }
        ],
        //! Font size - 12px
        'fs-12-lh-normal-fw-400': [
          '12px',
          { lineHeight: 'normal', fontWeight: 400, letterSpacing: '-0.24px' }
        ],
        'fs-12-lh-1.33-fw-400': [
          '12px',
          { lineHeight: '1.33', fontWeight: 400, letterSpacing: '-0.24px' }
        ],
        'fs-12-lh-normal-fw-500': [
          '12px',
          { lineHeight: 'normal', fontWeight: 500, letterSpacing: '-0.24px' }
        ],
        //! Font size - 14px
        'fs-14-lh-1.28-fw-400': [
          '14px',
          { lineHeight: '1.28', fontWeight: 400, letterSpacing: '-0.28px' }
        ],
        'fs-14-lh-1.42-fw-400': [
          '14px',
          { lineHeight: '1.42', fontWeight: 400, letterSpacing: '-0.28px' }
        ],
        'fs-14-lh-normal-fw-500': [
          '14px',
          { lineHeight: 'normal', fontWeight: 500, letterSpacing: '-0.28px' }
        ],
        'fs-14-lh-normal-fw-600': [
          '14px',
          { lineHeight: 'normal', fontWeight: 600, letterSpacing: '-0.28px' }
        ],
        //! Font size - 16px
        'fs-16-lh-normal-fw-500': [
          '16px',
          { lineHeight: 'normal', fontWeight: 500, letterSpacing: '-0.64px' }
        ],
        'fs-16-lh-normal-fw-600': [
          '16px',
          { lineHeight: 'normal', fontWeight: 600, letterSpacing: '-0.64px' }
        ],
        //! Font size - 18px
        'fs-18-lh-normal-fw-500': [
          '18px',
          { lineHeight: 'normal', fontWeight: 500, letterSpacing: '-0.36px' }
        ],
        //! Font size - 28px
        'fs-28-lh-normal-fw-600': [
          '28px',
          { lineHeight: 'normal', fontWeight: 600, letterSpacing: '-1.12px' }
        ],
        //! Font size - 40px
        'fs-40-lh-normal-fw-600': [
          '40px',
          { lineHeight: 'normal', fontWeight: 600, letterSpacing: '-1.6px' }
        ]
      }
    }
  },
  plugins: [
    require('tailwindcss-text-fill'),
    plugin(({ addComponents, addVariant }) => {
      addVariant('hocus', ['&:hover', '&:focus']),
        addComponents({
          '.main-transition': {
            transition: '250ms cubic-bezier(0.4, 0, 0.2, 1)'
          }
        })
    }),
    createThemes({ violet: {}, light: {} })
  ]
}

export default config
