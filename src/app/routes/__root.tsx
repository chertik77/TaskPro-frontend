import type { QueryClient } from '@tanstack/react-query'

import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

type RouterContext = {
  queryClient: QueryClient
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
