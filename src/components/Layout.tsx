import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'

import { selectUserTheme } from 'features/user/user.slice'

import { useTabletAndBelowMediaQuery } from 'hooks'
import { useAppSelector } from 'hooks/redux'

export const Layout = () => {
  const theme = useAppSelector(selectUserTheme)

  const isTabletAndBelow = useTabletAndBelowMediaQuery()

  return (
    <>
      <Outlet />
      <Analytics />
      <SpeedInsights />
      <Toaster
        position={isTabletAndBelow ? 'top-center' : 'bottom-right'}
        richColors
        closeButton
        duration={5000}
        theme={theme === 'dark' ? 'dark' : 'light'}
        className='text-balance'
      />
    </>
  )
}
