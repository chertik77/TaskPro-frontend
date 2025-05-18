import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

const RootRoute = () => (
  <>
    <Analytics />
    <SpeedInsights />
    <Outlet />
  </>
)

export const Route = createRootRoute({ component: RootRoute })
