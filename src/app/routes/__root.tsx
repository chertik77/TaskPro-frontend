import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

import { ModalProvider } from '../providers'

const RootRoute = () => (
  <>
    <Analytics />
    <SpeedInsights />
    <ModalProvider>
      <Outlet />
    </ModalProvider>
  </>
)

export const Route = createRootRoute({ component: RootRoute })
