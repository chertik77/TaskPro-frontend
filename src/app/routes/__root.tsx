import type { QueryClient } from '@tanstack/react-query'

import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

import { userQueries } from '@/entities/user'

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
  component: RootRoute,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(userQueries.me())
  }
})
