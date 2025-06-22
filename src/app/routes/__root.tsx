import type { useSessionStore } from '@/entities/session'

import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

type RouterContext = {
  session: ReturnType<typeof useSessionStore>
}

const RootRoute = () => (
  <>
    <Analytics />
    <SpeedInsights />
    <Outlet />
  </>
)

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootRoute
})
