import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

import { sessionService, useSessionStore } from '@/entities/session'

import { attachInternalApiMemoryStorage } from '@/shared/api'

type RouterContext = {
  session: ReturnType<typeof useSessionStore>
}

const RootRoute = () => {
  const { tokens, setTokens, logout } = useSessionStore()

  attachInternalApiMemoryStorage({
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    refreshTokens: sessionService.refreshTokens,
    setTokens,
    logout
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
  component: RootRoute
})
