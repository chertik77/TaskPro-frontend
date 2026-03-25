import type { QueryClient } from '@tanstack/react-query'

import { useQueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

import { sessionService } from '@/entities/session'
import { userQueries } from '@/entities/user'

import { attachInternalApiMemoryStorage } from '@/shared/api'

type RouterContext = {
  queryClient: QueryClient
}

const RootRoute = () => {
  const queryClient = useQueryClient()

  attachInternalApiMemoryStorage({
    refreshTokens: sessionService.refreshTokens,
    logout: () => queryClient.resetQueries({ queryKey: userQueries.current() })
  })

  return (
    <>
      <Analytics />
      <SpeedInsights />
      <Outlet />
    </>
  )
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootRoute,
  loader: async ({ context }) => {
    await context.queryClient.fetchQuery(userQueries.me())
  }
})
