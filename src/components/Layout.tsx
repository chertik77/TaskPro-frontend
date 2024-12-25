import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'

import { useAppSelector } from 'hooks/redux'

import { selectUserTheme } from 'redux/user.slice'

export const Layout = () => {
  const theme = useAppSelector(selectUserTheme)

  return (
    <>
      <Outlet />
      <Analytics />
      <SpeedInsights />
      <Toaster
        position='top-right'
        richColors
        closeButton
        duration={5000}
        theme={theme === 'dark' ? 'dark' : 'light'}
        className='text-balance'
      />
    </>
  )
}
