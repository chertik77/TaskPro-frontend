import type { QueryClient } from '@tanstack/react-query'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  createRootRouteWithContext,
  Outlet,
  redirect
} from '@tanstack/react-router'
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
    <ReactQueryDevtools />
    <Outlet />
  </>
)

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async ({ context: { queryClient } }) => {
    try {
      const user = await queryClient.fetchQuery(userQueries.me())

      if (user) throw redirect({ to: '/dashboard' })
    } catch {
      return
    }
  },
  component: RootRoute
})
