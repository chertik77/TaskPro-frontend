import { RouterProvider as TanStackRouterProvider } from '@tanstack/react-router'
import { router } from 'shared/lib/react-router'

declare module '@tanstack/react-router' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Register {
    router: typeof router
  }
}

export const RouterProvider = () => <TanStackRouterProvider router={router} />
