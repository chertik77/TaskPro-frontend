import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'

import { useTabletAndBelowMediaQuery } from 'hooks'

import { selectUserTheme } from 'redux/user.slice'

export const Layout = () => {
  const theme = useSelector(selectUserTheme)

  const isTabletAndBelow = useTabletAndBelowMediaQuery()

  return (
    <>
      <Outlet />
      <Analytics />
      <SpeedInsights />
      <Toaster
        position={isTabletAndBelow ? 'top-center' : 'bottom-right'}
        richColors
        theme={theme === 'dark' ? 'dark' : 'light'}
        className='text-balance'
      />
    </>
  )
}
