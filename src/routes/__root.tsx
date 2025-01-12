import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { useAtomValue } from 'jotai/react'
import { Toaster } from 'sonner'

import { useGetCurrentUser } from 'features/user/hooks'
import { userAtom } from 'features/user/user.atom'

import { useTabletAndBelowMediaQuery } from 'hooks'

const RootRoute = () => {
  useGetCurrentUser()

  const { theme } = useAtomValue(userAtom)

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
