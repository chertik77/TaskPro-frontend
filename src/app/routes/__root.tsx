import type { QueryClient } from '@tanstack/react-query'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  createRootRouteWithContext,
  Outlet,
  redirect
} from '@tanstack/react-router'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

import { sessionService } from '@/entities/session'
import { userQueries } from '@/entities/user'

import { attachInternalApiMemoryStorage } from '@/shared/api'

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
    attachInternalApiMemoryStorage({
      refreshTokens: sessionService.refreshTokens,
      logout: () =>
        queryClient.resetQueries({ queryKey: userQueries.current() })
    })

    try {
      const user = await queryClient.fetchQuery(userQueries.me())

      if (user) throw redirect({ to: '/dashboard' })

      return { user }
    } catch {
      return
    }
  },
  component: RootRoute
})
