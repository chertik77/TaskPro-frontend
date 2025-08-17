import { useQueryClient } from '@tanstack/react-query'
import { RouterProvider as TanstackRouterProvider } from '@tanstack/react-router'

import { sessionService } from '@/entities/session'
import { userQueries } from '@/entities/user'

import { attachInternalApiMemoryStorage } from '@/shared/api'
import { router } from '@/shared/lib'

export const RouterProvider = () => {
  const queryClient = useQueryClient()

  attachInternalApiMemoryStorage({
    refreshTokens: sessionService.refreshTokens,
    logout: () => queryClient.resetQueries({ queryKey: userQueries.current() })
  })

  return <TanstackRouterProvider router={router} />
}
