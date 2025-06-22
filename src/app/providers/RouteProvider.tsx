import { RouterProvider as TanStackRouterProvider } from '@tanstack/react-router'

import { useSessionStore } from '@/entities/session'

import { router } from '@/shared/lib'

export const RouterProvider = () => {
  const session = useSessionStore()

  return (
    <TanStackRouterProvider
      router={router}
      context={{ session }}
    />
  )
}
