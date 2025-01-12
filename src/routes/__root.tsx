import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Toaster } from 'sonner'

import { useGetCurrentUser } from 'features/user/hooks'
import { selectUserTheme } from 'features/user/user.slice'

import { useTabletAndBelowMediaQuery } from 'hooks'
import { useAppSelector } from 'hooks/redux'

const RootRoute = () => {
  useGetCurrentUser()

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

export const Route = createRootRoute({ component: RootRoute })
